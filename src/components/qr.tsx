import React, { useEffect, useState } from "react";
import axios from "axios";
import NextImage from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const Qr = ({ link }: { link: string }) => {

  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const response = await axios.get(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}&color=000&bgcolor=fff`,
          {
            responseType: "arraybuffer",
          }
        );

        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        setQrCodeImage(base64Image);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [link]);

  return (
    <div className="flex flex-col justify-center items-center">
        {qrCodeImage ? (
           <NextImage
              width={250}
              height={250}
              src={`data:image/png;base64,${qrCodeImage}`}
              alt={link}
              className="w-40 h-40"
            />
          ) : (
            <Skeleton className="w-40 h-40" />
          )}
    </div>
  );
};

export default Qr;