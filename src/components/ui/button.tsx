import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "destructive" | "link";
type ButtonSize    = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Render the first child element as the button (avoids button-in-button) */
  asChild?: boolean;
}

function getClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  const base =
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary:     "bg-black text-white hover:bg-neutral-800 active:scale-[0.98]",
    outline:     "border border-black text-black hover:bg-black hover:text-white active:scale-[0.98]",
    ghost:       "text-black hover:bg-neutral-100 active:scale-[0.98]",
    destructive: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
    link:        "text-black underline-offset-4 hover:underline p-0 h-auto",
  };

  const sizes: Record<ButtonSize, string> = {
    sm:   "h-8 px-3 text-xs rounded-md gap-1.5",
    md:   "h-10 px-5 text-sm rounded-md gap-2",
    lg:   "h-12 px-8 text-base rounded-lg gap-2",
    icon: "h-10 w-10 rounded-md",
  };

  return cn(base, variants[variant], sizes[size], className);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      asChild,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = getClasses(variant, size, className);

    // asChild: clone the immediate child element and merge button styles onto it.
    // This lets you do <Button asChild><Link href="...">label</Link></Button>
    // without creating invalid nested interactive elements.
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        className: cn(
          classes,
          (children as React.ReactElement<{ className?: string }>).props.className,
        ),
      });
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export { Button };
