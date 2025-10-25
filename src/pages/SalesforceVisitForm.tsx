import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { submitVisitForm } from '../services/api';
import { MapPinIcon, CameraIcon, MagnifyingGlassIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { MOCK_OUTLETS } from '../constants';

const SalesforceVisitForm: React.FC = () => {
  const [outletId, setOutletId] = useState('');
  const [outletName, setOutletName] = useState('');
  const [outletAddress, setOutletAddress] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    return () => {
      photoPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError('');
        },
        (error) => {
          setLocationError(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleOutletIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value.toUpperCase();
    setOutletId(newId);
    setOutletName('');
    setOutletAddress('');

    if (newId.length > 5) {
      setIsLookingUp(true);
      setTimeout(() => {
        const outletData = MOCK_OUTLETS[newId];
        if (outletData) {
          setOutletName(outletData.name);
          setOutletAddress(outletData.address);
        }
        setIsLookingUp(false);
      }, 1000);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      setPhotos(prevPhotos => [...prevPhotos, ...filesArray]);

      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPhotoPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const photoNames = photos.map(p => p.name);

    try {
      const result = await submitVisitForm({
        outletId,
        outletName,
        outletAddress,
        latitude: location?.lat ?? null,
        longitude: location?.lng ?? null,
        photos: photoNames,
      });
      setSubmitMessage(result.message);
      setOutletId('');
      setOutletName('');
      setOutletAddress('');
      setPhotos([]);
      setPhotoPreviews([]);

    } catch (error) {
      setSubmitMessage('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title="Form Kunjungan Salesforce (IDS)">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b pb-6">
          <h4 className="font-semibold text-telkomsel-gray-700 mb-2">Informasi Outlet</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="outletId" className="block text-sm font-medium text-gray-700">ID Outlet</label>
              <div className="mt-1 relative">
                <input type="text" id="outletId" value={outletId} onChange={handleOutletIdChange} className="w-full p-2 border rounded-md" placeholder="e.g., OUTLET001" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {isLookingUp ? (
                     <svg className="animate-spin h-5 w-5 text-telkomsel-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="outletName" className="block text-sm font-medium text-gray-700">Nama Outlet</label>
              <input type="text" id="outletName" value={outletName} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="outletAddress" className="block text-sm font-medium text-gray-700">Alamat Outlet</label>
              <textarea id="outletAddress" value={outletAddress} readOnly className="w-full p-2 border rounded-md bg-gray-100 h-20" />
            </div>
          </div>
        </div>

        <div className="border-b pb-6">
          <h4 className="font-semibold text-telkomsel-gray-700 mb-2 flex items-center"><MapPinIcon className="h-5 w-5 mr-2"/> Geolocation</h4>
          {location ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input type="text" value={location.lat} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input type="text" value={location.lng} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
              </div>
            </div>
          ) : (
             <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-md">{locationError || "Getting location data..."}</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-telkomsel-gray-700 mb-2 flex items-center"><CameraIcon className="h-5 w-5 mr-2"/> Dokumentasi Foto</h4>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
               <ArrowUpOnSquareIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-telkomsel-red hover:text-telkomsel-dark-red focus-within:outline-none">
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handlePhotoChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
               <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {photoPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {photoPreviews.map((src, index) => (
                <img key={index} src={src} alt={`preview ${index}`} className="w-full h-32 object-cover rounded-md" />
              ))}
            </div>
          )}
        </div>
        
        <div className="pt-5">
           {submitMessage && <p className="text-center text-green-600 mb-4">{submitMessage}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !location}
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-telkomsel-red hover:bg-telkomsel-dark-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-telkomsel-red disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Kunjungan'}
            </button>
          </div>
        </div>

      </form>
    </Card>
  );
};

export default SalesforceVisitForm;