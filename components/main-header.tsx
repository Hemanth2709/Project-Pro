"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/common/Header"
import { useAuth } from "@/contexts/AuthContext"
import MiniHeader from "./common/MiniHeader"

const publicRoutes = ["/", "/login", "/register"]

export function MainHeader() {
  const { user, loading } = useAuth()
  const pathname = usePathname()

  if (loading) {
    // You might want a skeleton loader here
    return null
  }

  const isPublicRoute = publicRoutes.includes(pathname)

  if (user && !isPublicRoute) {
    // User is logged in and on a protected page
    return <MiniHeader />
  }

  if (!user && isPublicRoute) {
    // User is not logged in and on a public page
    return <Header />
  }

  // In other cases (e.g., logged-in user on public page, or logged-out user
  // trying to access a protected page before redirect), render nothing.
  // The protected routes will handle the redirect.
  return null
}