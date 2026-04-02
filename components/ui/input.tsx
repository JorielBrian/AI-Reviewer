// Reusable Input component with consistent styling and accessibility
// Provides a styled text input field with focus states, validation states,
// and dark mode support

import * as React from "react"
import { cn } from "@/lib/utils" // Utility for class name merging

// Input component with TypeScript props
function Input({
  className, // Additional CSS classes
  type, // Input type (text, email, password, etc.)
  ...props // Standard input props (value, onChange, placeholder, etc.)
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type} // Input type attribute
      data-slot="input" // Data attribute for styling consistency
      className={cn(
        // Base input styles with accessibility and interaction states
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className // Merge with additional classes
      )}
      {...props} // Spread remaining props
    />
  )
}

export { Input }
