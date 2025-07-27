import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
type AvatarFileProps = {
  children?: React.ReactNode;
  src: string;
  alt?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"div">;
const AvatarFile = ({ children, src, alt, onChange }: AvatarFileProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileRef.current.click(); // Programmatically click the hidden input
  };
  return (
    <Avatar className="w-24 h-24" ref={fileRef} onClick={handleDivClick}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="text-3xl">
        {children}
        <input
          type="file"
          className="hidden"
          onChange={onChange}
          ref={fileRef}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarFile;
