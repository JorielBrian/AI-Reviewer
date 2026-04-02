// Utility functions for the application
// This module provides common helper functions used throughout the app

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge and conditionally apply CSS classes
// Combines clsx for conditional classes with tailwind-merge for proper Tailwind CSS class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
