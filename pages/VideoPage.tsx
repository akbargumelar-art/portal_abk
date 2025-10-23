import React from 'react';
import Card from '../components/ui/Card';
import { MOCK_VIDEOS } from '../constants';
import { VideoCameraIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const VideoPage: React.FC = () => {
  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Video Roleplay</h2>
        <button className="flex items-center bg-telkomsel-red text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-telkomsel-dark-red transition-colors">
          <ArrowUpOnSquareIcon className="h-5 w-5 mr-2" />
          Upload Video Baru
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_VIDEOS.map((video) => (
          <Card key={video.id} className="p-0 overflow-hidden">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 truncate">{video.title}</h4>
              <p className="text-sm text-gray-600">Oleh: {video.user}</p>
              <p className="text-xs text-gray-400 mt-1">{video.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
