import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { UserCircleIcon, PhotoIcon } from '@heroicons/react/24/solid';

const ProfileSettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    // Clean up the object URL on component unmount
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Revoke previous blob URL if it exists
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
      
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({ name });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    }
  };
  
  const handleAvatarUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && avatarPreview) {
      // In a real app, you would upload avatarFile to a server and get a URL.
      // For this demo, we'll use the blob URL directly.
      updateUser({ avatarUrl: avatarPreview });
      setMessage({ type: 'success', text: 'Avatar updated successfully!' });
    }
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
        return;
    }
    // TODO: Add logic to call backend API to change password
    console.log({ currentPassword, newPassword });
    setMessage({ type: 'success', text: 'Password changed successfully! (Simulation)' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       {message && (
        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <div className="flex flex-col items-center text-center">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile" className="h-32 w-32 rounded-full object-cover mb-4" />
              ) : (
                <UserCircleIcon className="h-32 w-32 text-gray-300 mb-4" />
              )}
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{user.role}</p>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card title="Edit Profil">
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-telkomsel-red focus:ring-telkomsel-red sm:text-sm p-2"
                />
              </div>
              <div className="text-right">
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </Card>

          <Card title="Ubah Foto Profil">
            <form onSubmit={handleAvatarUpdate} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto Baru</label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover text-gray-300" />
                      ) : (
                        <PhotoIcon className="h-full w-full text-gray-300" />
                      )}
                    </span>
                    <label htmlFor="avatar-upload" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <span>Change</span>
                      <input id="avatar-upload" name="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange}/>
                    </label>
                  </div>
                </div>
                 <div className="text-right">
                    <button type="submit" disabled={!avatarFile} className="inline-flex justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red disabled:bg-gray-400">
                      Simpan Foto
                    </button>
                </div>
            </form>
          </Card>
          
          <Card title="Ubah Kata Sandi">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kata Sandi Saat Ini</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
              </div>
              <div className="text-right">
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red">
                  Ubah Kata Sandi
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
