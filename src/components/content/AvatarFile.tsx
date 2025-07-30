import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppDispatch } from "@/hooks/storeHooks";
import { uploadImageAsync, userAsync } from "@/modules/user/userSlice";
type AvatarFileProps = {
  children?: React.ReactNode;
  src: string;
  alt?: string;
} & React.ComponentProps<"div">;
const AvatarFile = ({ children, src, alt }: AvatarFileProps) => {
  const fileRef = useRef<HTMLInputElement | null >(null);
  const dispatch = useAppDispatch();
  const handleDivClick = () => {
    fileRef.current?.click(); // Programmatically click the hidden input
  };

  
  const handleFileChange = (event:any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
      dispatch(uploadImageAsync({
        img_name: selectedFile,
      })).unwrap()
        .then(() => {
          console.log("Image uploaded successfully");
          dispatch(userAsync())
        })
    }
  };
  return (
    <Avatar className="w-24 h-24 z-10" onClick={handleDivClick}>
      <AvatarImage src={src} alt={alt}  />
      <AvatarFallback className="text-3xl select-none">
        {children}

      </AvatarFallback>
      <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept=" .jpg , .png , .gif"
          onChange={handleFileChange}
        />
    </Avatar>
  );
};

export default AvatarFile;
