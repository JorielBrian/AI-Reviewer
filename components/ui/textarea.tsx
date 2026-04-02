// Reusable Textarea component with consistent styling and accessibility
// Provides a multi-line text input field with auto-sizing, focus states,
// validation states, and dark mode support

import * as React from "react"
import { cn } from "@/lib/utils" // Utility for class name merging

// Textarea component with TypeScript props
function Textarea({
  className, // Additional CSS classes
  ...props // Standard textarea props (value, onChange, placeholder, rows, etc.)
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea" // Data attribute for styling consistency
      className={cn(
        // Base textarea styles with accessibility and interaction states
        // field-sizing-content enables automatic height adjustment based on content
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className // Merge with additional classes
      )}
      {...props} // Spread remaining props
    />
  )
}

export { Textarea }
