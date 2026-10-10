import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-purple-primary to-purple-bright text-white shadow-[0_10px_30px_-12px_rgba(109,40,217,0.55)] hover:-translate-y-0.5",
  secondary:
    "bg-warm-ivory text-purple-deep border border-soft-border hover:border-purple-primary/40 hover:bg-lavender",
  outline:
    "bg-transparent text-purple-deep border border-purple-primary/30 hover:bg-lavender",
  ghost: "bg-transparent text-muted hover:text-purple-deep hover:bg-lavender",
  danger: "bg-red-600 text-white hover:bg-red-700",
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-2xl",
  lg: "h-12 px-6 text-base rounded-2xl",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
