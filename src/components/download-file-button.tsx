import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  data: string;
  fileName: string;
  mimeType: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  data,
  fileName,
  mimeType,
}) => {
  const handleDownload = () => {
    // Create a Blob from the data
    const blob = new Blob([data], { type: mimeType });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.md`; // Set the desired file name

    // Append the link to the body and trigger a click
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the link and revoke the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant={"outline"} size={"icon"} onClick={handleDownload}>
      <Download />
    </Button>
  );
};

export default DownloadButton;
