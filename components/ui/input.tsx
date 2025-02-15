import * as React from "react";
import { cn } from "@/lib/utils";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, name, register, error, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className="mb-1 text-sm font-medium text-gray-500"
          >
            {label}
          </label>
        )}
        <input
          id={name}
          type={type}
          className={cn(
            "flex h-12 w-full  border  border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            error && "border-red-500 focus-visible:ring-red-500"
          )}
          {...(register ? register(name) : {})}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
