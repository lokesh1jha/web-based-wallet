"use client";
import React from 'react';
import { UploadDropzone } from '@/lib/uploadthing';

interface CustomUploadDropzoneProps {
  isUploading: boolean;
  onClientUploadComplete: (res: any) => void;
  onUploadError: (error: Error) => void;
}

const CustomUploadDropzone: React.FC<CustomUploadDropzoneProps> = ({
  isUploading,
  onClientUploadComplete,
  onUploadError,
}) => (
  <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
      className="h-full w-full m-0 gap-2 px-4 ut-button:mt-0 ut-button:text-xs ut-button:py-1
      ut-upload-icon:w-full ut-label:hidden ut-allowed-content:hidden"
      disabled={isUploading}
    />
);

export default CustomUploadDropzone;