import React from 'react';
import { UploadDropzone } from '@/lib/uplodathing';

interface CustomUploadDropzoneProps {
  isUploading: boolean;
  ready: boolean;
  onClientUploadComplete: (res: any) => void;
  onUploadProgress: () => void;
  onUploadError: (error: Error) => void;
}

const CustomUploadDropzone: React.FC<CustomUploadDropzoneProps> = ({
  isUploading,
  ready,
  onClientUploadComplete,
  onUploadProgress,
  onUploadError,
}) => (
  <div className="mt-1 w-full h-32 border-2 border-gray-300 rounded-lg border-dashed relative" data-state={isUploading ? "uploading" : ready ? "ready" : "readying"}>
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={onClientUploadComplete}
      onUploadProgress={onUploadProgress}
      onUploadError={onUploadError}
      className="h-32 absolute opacity-0 z-50"
    />
    
    <svg data-ut-element="upload-icon" data-state={isUploading ? "uploading" : ready ? "ready" : "readying"} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide text-gray-400 z-0 lucide-cloud-upload absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45px]">
    <path d="M12 13v8"/>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
    <path d="m8 17 4-4 4 4"/>
    </svg>
    <button
      data-ut-element="button"
      data-state={isUploading ? "uploading" : ready ? "ready" : "readying"}
      disabled={true}
      className='border-2 bg-blue-400 hover:bg-blue-600 z-0 rounded-lg px-4 py-2 text-white absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/6'
    >
      {isUploading ? "Uploading..." : ready ? "Uploaded" : "Upload"}
    </button>
  </div>
);

export default CustomUploadDropzone;