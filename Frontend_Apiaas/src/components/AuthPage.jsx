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
import { useNavigate } from 'react-router-dom';
import "../styles/auth.css"

// Validation Schemas
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

  const onSignUpSubmit = async (data) => {
    try {
      const response = await fetch("https://guardians-of-comment-7g14.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()
      console.log(result,'res');

      if (response.ok) {
        setActiveTab("signin")
        signUpForm.reset()
      } else {
        alert(result.message || "Registration failed")
      }
    } catch (error) {
      console.error("Sign up error:", error)
      alert("Something went wrong during registration")
    }
  }
  const navigate = useNavigate();

  const onSignInSubmit = async (data) => {
    try {
      const response = await fetch("https://guardians-of-comment-7g14.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        alert("Login successful!")
        // You can redirect or store token here
        signInForm.reset()
        localStorage.setItem("userId", result.user.id);
        localStorage.setItem("userName", result.user.name);
        console.log(localStorage.getItem("userId"),'i got it ');
        navigate('/subscription');
      } else {
        alert(result.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Something went wrong during login")
    }
  }

  return (
    <div className="container_auth">
      {/* Left Section */}
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

      {/* Right Section */}
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
              <TabsContent value="signup">
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...signUpForm.register("name")} />
                    {signUpForm.formState.errors.name && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" {...signUpForm.register("email")} />
                    {signUpForm.formState.errors.email && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" {...signUpForm.register("password")} />
                    {signUpForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" {...signUpForm.register("confirmPassword")} />
                    {signUpForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500">{signUpForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Create Account
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signin">
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" {...signInForm.register("email")} />
                    {signInForm.formState.errors.email && (
                      <p className="text-sm text-red-500">{signInForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" type="password" {...signInForm.register("password")} />
                    {signInForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{signInForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button variant="link" className="text-purple-600">
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign In
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500">
                {activeTab === "signup" ? "Already have an account? " : "Don't have an account? "}
                <Button
                  variant="link"
                  className="text-purple-600"
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
