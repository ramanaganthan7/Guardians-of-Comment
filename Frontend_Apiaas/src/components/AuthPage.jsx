"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import "../styles/auth.css"

// Form validation schemas
const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup")

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSignUpSubmit = (data) => {
    console.log("Sign Up Data:", data)
    // Handle sign up logic here
  }

  const onSignInSubmit = (data) => {
    console.log("Sign In Data:", data)
    // Handle sign in logic here     <div className="flex min-h-screen flex-col md:flex-row">

  }

  return (
    <div className="container_auth">
      
      {/* Left Side - Branding */}
      <motion.div
        className="flex flex-1 items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 p-8 text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md text-center">
          <motion.h1
            className="mb-4 text-4xl font-bold tracking-tight md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Guardians
            <span className="block text-purple-300">OF</span>
            Comments
          </motion.h1>
          <motion.p
            className="text-lg text-purple-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Protect and manage your community discussions with our powerful comment moderation platform.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Authentication */}
      <motion.div
        className="flex flex-1 items-center justify-center bg-gray-50 p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="signin">Sign In</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="signup" className="mt-0">
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...signUpForm.register("name")}
                      placeholder="Enter your name"
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                    {signUpForm.formState.errors.name && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      {...signUpForm.register("email")}
                      placeholder="Enter your email"
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                    {signUpForm.formState.errors.email && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      {...signUpForm.register("password")}
                      placeholder="Create a password"
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                    {signUpForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...signUpForm.register("confirmPassword")}
                      placeholder="Confirm your password"
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                    {signUpForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signin" className="mt-0">
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      {...signInForm.register("email")}
                      placeholder="Enter your email"
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                    {signInForm.formState.errors.email && (
                      <p className="text-sm text-red-500">{signInForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      {...signInForm.register("password")}
                      placeholder="Enter your password"
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                    />
                    {signInForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{signInForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end">
                    <Button variant="link" className="p-0 text-purple-600 hover:text-purple-800">
                      Forgot password?
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-gray-500">
                {activeTab === "signup" ? "Already have an account? " : "Don't have an account? "}
                <Button
                  variant="link"
                  className="p-0 text-purple-600 hover:text-purple-800"
                  onClick={() => setActiveTab(activeTab === "signup" ? "signin" : "signup")}
                >
                  {activeTab === "signup" ? "Sign In" : "Sign Up"}
                </Button>
              </p>
            </CardFooter>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  )
}
