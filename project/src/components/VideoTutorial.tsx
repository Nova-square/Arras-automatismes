import { VideoTutorial as VideoTutorialType } from '../types';
import { PlayCircle } from 'lucide-react';

interface VideoTutorialProps {
  tutorial: VideoTutorialType;
  onSelect: (videoUrl: string) => void;
}

export default function VideoTutorial({ tutorial, onSelect }: VideoTutorialProps) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={() => onSelect(tutorial.videoUrl)}
    >
      <div className="relative">
        <img
          src={tutorial.thumbnail}
          alt={tutorial.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
          {tutorial.title}
        </h3>
        <p className="text-gray-600 font-open-sans">
          Durée : {tutorial.duration}
        </p>
      </div>
    </div>
  );
}