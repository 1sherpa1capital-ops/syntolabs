import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline"
}

const variantStyles = {
  default: "bg-zinc-800 text-zinc-300 border border-zinc-700",
  accent: "bg-accent text-black",
  outline: "border border-zinc-700 text-zinc-400 bg-transparent",
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
export type { BadgeProps }
