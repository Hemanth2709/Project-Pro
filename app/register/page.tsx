// // import Link from "next/link"
// // import { BarChart3 } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"

// // export default function RegisterPage() {
// //   return (
// //     <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
// //       <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold text-xl">
// //         <BarChart3 className="h-6 w-6" />
// //         <span>ProjectPro</span>
// //       </Link>
// //       <Card className="w-full max-w-md">
// //         <CardHeader className="space-y-1">
// //           <CardTitle className="text-2xl font-bold">Crear una cuenta</CardTitle>
// //           <CardDescription>Ingresa tus datos para registrarte en la plataforma</CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form action="/dashboard">
// //             <div className="grid gap-4">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="grid gap-2">
// //                   <Label htmlFor="first-name">Nombre</Label>
// //                   <Input id="first-name" type="text" required />
// //                 </div>
// //                 <div className="grid gap-2">
// //                   <Label htmlFor="last-name">Apellido</Label>
// //                   <Input id="last-name" type="text" required />
// //                 </div>
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="email">Correo electrónico</Label>
// //                 <Input id="email" type="email" placeholder="nombre@ejemplo.com" required />
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="password">Contraseña</Label>
// //                 <Input id="password" type="password" required />
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="confirm-password">Confirmar contraseña</Label>
// //                 <Input id="confirm-password" type="password" required />
// //               </div>
// //               <Button type="submit" className="w-full">
// //                 Crear cuenta
// //               </Button>
// //             </div>
// //           </form>
// //         </CardContent>
// //         <CardFooter className="flex flex-col">
// //           <div className="text-center text-sm text-muted-foreground mt-2">
// //             ¿Ya tienes una cuenta?{" "}
// //             <Link href="/login" className="text-primary underline-offset-4 hover:underline">
// //               Iniciar sesión
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

// export default function RegisterPage() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
//       <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold text-xl">
//         <BarChart3 className="h-6 w-6" />
//         <span>ProjectPro</span>
//       </Link>
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
//           <CardDescription>Enter your details to register on the platform</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form action="/dashboard">
//             <div className="grid gap-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="first-name">First name</Label>
//                   <Input id="first-name" type="text" required />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="last-name">Last name</Label>
//                   <Input id="last-name" type="text" required />
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" placeholder="name@example.com" required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input id="password" type="password" required />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="confirm-password">Confirm password</Label>
//                 <Input id="confirm-password" type="password" required />
//               </div>
//               <Button type="submit" className="w-full">
//                 Create account
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col">
//           <div className="text-center text-sm text-muted-foreground mt-2">
//             Already have an account?{" "}
//             <Link href="/login" className="text-primary underline-offset-4 hover:underline">
//               Sign in
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
import { UserPlus } from "lucide-react"

export default function RegisterPage() {
  const { signUp } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password, name)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              <UserPlus className="mr-2 h-4 w-4" />
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}