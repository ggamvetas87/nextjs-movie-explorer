"use client"

import { usePathname } from "next/navigation"

export function useHideForRoutes(
  hiddenRoutes: string[] = [],
  hasAccess: boolean = true
) {
  const pathname = usePathname()
  return !hasAccess || hiddenRoutes.includes(pathname)
};
