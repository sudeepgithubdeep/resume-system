import { useState } from 'react';
import { Upload, FileText, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

interface ResumeUploadScreenProps {
  onComplete: () => void;
}

const ResumeUploadScreen = ({ onComplete }: ResumeUploadScreenProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        handleFileUpload(droppedFile);
      } else {
        toast.error('Please upload a PDF file', {
          style: {
            background: '#EF4444',
            color: '#fff',
          },
          icon: '❌',
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        handleFileUpload(selectedFile);
      } else {
        toast.error('Please upload a PDF file', {
          style: {
            background: '#EF4444',
            color: '#fff',
          },
          icon: '❌',
        });
      }
    }
  };

  const handleFileUpload = (file: File) => {
    setFile(file);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          toast.success('Resume uploaded successfully!', {
            duration: 3000,
            style: {
              background: '#10B981',
              color: '#fff',
            },
            icon: '📄',
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
    toast('Resume removed', {
      icon: '🗑️',
    });
  };

  const handleContinue = () => {
    toast.success('Moving to subscription options!', {
      icon: '🚀',
      style: {
        background: '#3B82F6',
        color: '#fff',
      },
    });
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-medium text-center text-[#495057] mb-3">
          Upload Your Resume
        </h1>
        
        <p className="text-center text-[#868E96] mb-8">
          Please upload your resume in PDF format. This will be the document we send to partnered companies on your behalf.
        </p>
        
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-md ${
              isDragging ? 'border-[#50A7F9] bg-[#E0F2FE]' : 'border-gray-300 bg-[#E0F2FE]/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-12 w-12 text-[#50A7F9] mb-4" />
            <p className="text-lg font-medium text-[#495057] mb-2">Drag & drop your PDF here</p>
            <p className="text-[#868E96]">or click to browse files</p>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            {uploadProgress < 100 ? (
              <div className="mb-4">
                <p className="text-[#495057] font-medium mb-2">Uploading...</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#50A7F9] h-2.5 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-[#868E96] mt-1">{uploadProgress}%</p>
              </div>
            ) : (
              <div className="flex items-center mb-4">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-[#495057] font-medium">Resume Uploaded Successfully!</p>
              </div>
            )}
            
            <div className="flex items-center p-3 bg-gray-50 rounded-md mb-4">
              <FileText className="h-8 w-8 text-[#50A7F9] mr-3" />
              <div className="flex-1">
                <p className="text-[#495057] font-medium">{file.name}</p>
                <p className="text-sm text-[#868E96]">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                onClick={handleRemoveFile}
                className="p-1 hover:bg-gray-200 rounded-full transition-all"
                aria-label="Remove file"
              >
                <X className="h-5 w-5 text-[#868E96]" />
              </button>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="lightBlue"
                size="lg"
                disabled={!uploadComplete}
                onClick={handleContinue}
                className="transform transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Next: Choose Subscription
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploadScreen;
