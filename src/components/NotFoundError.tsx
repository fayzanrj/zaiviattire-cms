import Image from "next/image";
import React from "react";
import notFoundImage from "@/assets/not_found.png";

// Props
interface NotFoundProps {
  children: React.ReactNode;
}

const NotFoundError: React.FC<NotFoundProps> = ({ children }) => {
  return (
    <div className="pl-72 relative">
      <div className="h-dvh">
        <div className="CENTER text-center">
          <Image
            src={notFoundImage}
            width={1000}
            height={1000}
            quality={100}
            alt="Error"
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default NotFoundError;
