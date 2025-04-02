import React from 'react';
import { CameraIcon, TrashIcon } from 'lucide-react';

const ProfilePhotoInput = ({ image, setImage }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-2 relative rounded-lg">
      <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-gray-400 overflow-hidden relative">
        {image ? (
          <img src={image} alt="Profile Preview" className="w-full h-full object-cover rounded-full" />
        ) : (
          <CameraIcon size={30} className="text-gray-400" />
        )}
        {image && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            <TrashIcon size={14} />
          </button>
        )}
      </div>
      <label className="cursor-pointer bg-cyan-600 text-white px-3 py-1 rounded-full hover:bg-blue-600 flex items-center gap-1 shadow-sm mt-2 text-sm">
        <CameraIcon size={16} /> Upload
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </label>
    </div>
  );
};

export default ProfilePhotoInput;
