import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  data: string | Blob | ArrayBuffer | Uint8Array;
  fileName: string;
  mimeType: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  data,
  fileName,
  mimeType,
}) => {
  const getBlobParts = (d: DownloadButtonProps["data"]): BlobPart[] => {
    if (typeof d === "string") return [d];
    if (d instanceof Blob) return [d];
    if (d instanceof ArrayBuffer) return [new Uint8Array(d)];
    if (ArrayBuffer.isView(d)) return [d as ArrayBufferView];
    return [String(d)];
  };

  const handleDownload = () => {
    // Create a Blob from the normalized parts
    const blob = new Blob(getBlobParts(data), { type: mimeType });

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
