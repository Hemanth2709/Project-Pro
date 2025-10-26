// // import Link from "next/link"
// // import { BarChart3 } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"

// // export default function LoginPage() {
// //   return (
// //     <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
// //       <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold text-xl">
// //         <BarChart3 className="h-6 w-6" />
// //         <span>ProjectPro</span>
// //       </Link>
// //       <Card className="w-full max-w-md">
// //         <CardHeader className="space-y-1">
// //           <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
// //           <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form action="/dashboard">
// //             <div className="grid gap-4">
// //               <div className="grid gap-2">
// //                 <Label htmlFor="email">Correo electrónico</Label>
// //                 <Input id="email" type="email" placeholder="nombre@ejemplo.com" required />
// //               </div>
// //               <div className="grid gap-2">
// //                 <div className="flex items-center justify-between">
// //                   <Label htmlFor="password">Contraseña</Label>
// //                   <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
// //                     ¿Olvidaste tu contraseña?
// //                   </Link>
// //                 </div>
// //                 <Input id="password" type="password" required />
// //               </div>
// //               <Button type="submit" className="w-full">
// //                 Iniciar Sesión
// //               </Button>
// //             </div>
// //           </form>
// //         </CardContent>
// //         <CardFooter className="flex flex-col">
// //           <div className="text-center text-sm text-muted-foreground mt-2">
// //             ¿No tienes una cuenta?{" "}
// //             <Link href="/register" className="text-primary underline-offset-4 hover:underline">
// //               Regístrate
// //             </Link>
// //           </div>
// //         </CardFooter>
// //       </Card>
// //     </div>
// //   )
// // }
// import Link from "next/link"
// import { BarChart3 } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
//       <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold text-xl">
//         <BarChart3 className="h-6 w-6" />
//         <span>ProjectPro</span>
//       </Link>
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
//           <CardDescription>Enter your credentials to access your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form action="/dashboard">
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" placeholder="name@example.com" required />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Password</Label>
//                   <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
//                     Forgot your password?
//                   </Link>
//                 </div>
//                 <Input id="password" type="password" required />
//               </div>
//               <Button type="submit" className="w-full">
//                 Sign In
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col">
//           <div className="text-center text-sm text-muted-foreground mt-2">
//             Don't have an account?{" "}
//             <Link href="/register" className="text-primary underline-offset-4 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn } from "lucide-react"

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}