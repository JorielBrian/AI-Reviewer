"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  show: boolean;
  setShow: (val: boolean) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  url: string;
  setUrl: (url: string) => void;
  processContent: () => void;
  processingContent: boolean;
  processedContent: string;
};

const UploadContentModal = ({
  show, setShow, file, setFile, url, setUrl, processContent, processingContent, processedContent
}: Props) => {

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
                <CardContent className="p-6">
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