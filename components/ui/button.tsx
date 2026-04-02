// Reusable Button component with multiple variants and sizes
// Built using class-variance-authority (cva) for type-safe variant management
// Supports different styles, sizes, and accessibility features

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority" // For variant management
import { Slot } from "radix-ui" // For component composition

import { cn } from "@/lib/utils" // Utility for class name merging

// Define button variants using cva (class-variance-authority)
// This creates type-safe variants with proper Tailwind CSS classes
const buttonVariants = cva(
  // Base button styles with accessibility and interaction states
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      // Different visual variants for the button
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80", // Primary button style
        outline: // Outlined button style
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: // Secondary button style
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: // Ghost button (transparent background)
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: // Destructive/error button style
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline", // Link-style button
      },
      // Different size variants
      size: {
        default: // Default size
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3", // Extra small
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5", // Small
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3", // Large
        icon: "size-8", // Icon-only button
        "icon-xs": // Extra small icon button
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": // Small icon button
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9", // Large icon button
      },
    },
    // Default variants when none are specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Button component with TypeScript props
function Button({
  className, // Additional CSS classes
  variant = "default", // Button variant (from cva)
  size = "default", // Button size (from cva)
  asChild = false, // Whether to render as child component using Radix Slot
  ...props // Standard button props (onClick, disabled, etc.)
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  // Use Radix Slot for component composition if asChild is true
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button" // Data attribute for styling
      data-variant={variant} // Data attribute for variant
      data-size={size} // Data attribute for size
      className={cn(buttonVariants({ variant, size, className }))} // Merge variant classes with custom classes
      {...props} // Spread remaining props
    />
  )
}

// Export the Button component and its variants for use elsewhere
export { Button, buttonVariants }
