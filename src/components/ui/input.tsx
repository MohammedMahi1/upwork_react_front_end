import * as React from "react";

import { cn } from "@/lib/utils";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
type InputProps = {
  visible?: boolean;
  error?: string | null;
} & React.ComponentProps<"input">;
function Input({ className, type,placeholder, error,visible, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative w-full">
      <input
        placeholder={error ? error : placeholder }
        type={showPassword && type === "password" ? "text" : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          error && "placeholder:text-red-400 border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
          className
        )}
        {...props}
      />
      {type === "password" && (
        <div onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <FiEye className="absolute right-5 top-0 h-full z-10 cursor-pointer" />
          ) : (
            <FiEyeOff className="absolute right-5 top-0 h-full z-10 cursor-pointer" />
          )}
        </div>
      )}
    </div>
  );
}

export { Input };
