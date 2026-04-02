// Upload content modal component for file/URL input
// This component provides a modal dialog for users to upload files
// or enter URLs for content processing

"use client"; // Client-side component directive

import { Button } from "@/components/ui/button"; // Reusable button component
import { Card, CardContent } from "@/components/ui/card"; // Card layout components
import { Input } from "@/components/ui/input"; // Reusable input component

// Props interface for the UploadContentModal component
type Props = {
  show: boolean; // Whether the modal should be visible
  setShow: (val: boolean) => void; // Function to control modal visibility
  file: File | null; // Currently selected file
  setFile: (file: File | null) => void; // Function to update selected file
  url: string; // Current URL input value
  setUrl: (url: string) => void; // Function to update URL input
  processContent: () => void; // Function to process the selected content
  processingContent: boolean; // Whether content is currently being processed
  processedContent: string; // The processed content (used to show success message)
};

// UploadContentModal component definition
const UploadContentModal = ({
  show, setShow, file, setFile, url, setUrl, processContent, processingContent, processedContent
}: Props) => {

  // Don't render the modal if it shouldn't be shown
  if (!show) return null;

  return (
    // Modal overlay with backdrop blur
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      {/* Modal card container */}
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          {/* Modal header with title and close button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Upload Content</h3>
            <button
              onClick={() => setShow(false)} // Close the modal
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              × {/* Close icon */}
            </button>
          </div>

          {/* Modal content with input fields */}
          <div className="flex flex-col gap-3">
            {/* File input for uploading files */}
            <input
              type="file"
              accept=".pdf,image/*,video/*" // Accepted file types
              onChange={(e) => setFile(e.target.files?.[0] || null)} // Update selected file
              className="w-full p-2 border rounded"
            />

            {/* URL input for web content */}
            <Input
              placeholder="Enter YouTube URL or website URL"
              value={url} // Controlled input value
              onChange={(e) => setUrl(e.target.value)} // Update URL value
            />

                    <Button onClick={processContent} disabled={processingContent || (!file && !url)}>
                    {processingContent ? "Processing..." : "Process Content"}
                    </Button>
                </div>

                {processedContent && (
                    <p className="text-sm text-green-600 mt-3">
                    Content loaded and ready for questions!
                    </p>
                )}
                </CardContent>
            </Card>
        </div>
    )
}

export default UploadContentModal
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Upload Content</h3>
                    <button
                    onClick={() => setShow(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    >
                    ×
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <input
                    type="file"
                    accept=".pdf,image/*,video/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded"
                    />

                    <Input
                    placeholder="Enter YouTube URL or website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    />

                    <Button onClick={processContent} disabled={processingContent || (!file && !url)}>
                    {processingContent ? "Processing..." : "Process Content"}
                    </Button>
                </div>

                {processedContent && (
                    <p className="text-sm text-green-600 mt-3">
                    Content loaded and ready for questions!
                    </p>
                )}
                </CardContent>
            </Card>
        </div>
    )
}

export default UploadContentModal
