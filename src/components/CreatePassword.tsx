'use client'

import React, { FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { EyeIcon, EyeOffIcon } from "lucide-react"

interface CreatePasswordProps {
  setPassword: (password: string) => void
}

const CreatePassword: React.FC<CreatePasswordProps> = ({ setPassword }) => {
  const [password, setLocalPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = useState<number>(0)

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 6) strength += 50 // Lowered to allow 6 characters minimum
    if (pwd.match(/[a-z]/)) strength += 15 // At least one lowercase letter
    if (pwd.match(/[A-Z]/)) strength += 10 // At least one uppercase letter (optional)
    if (pwd.match(/\d/)) strength += 15 // At least one number
    if (pwd.match(/[^a-zA-Z\d]/)) strength += 10 // Special characters (optional)
    setPasswordStrength(strength)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setLocalPassword(newPassword)
    calculatePasswordStrength(newPassword)
  }

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match")
    } else if (passwordStrength < 10) {
      setError("Password is not strong enough")
    } else {
      setError("")
      setPassword(password)
      localStorage.setItem("password", password)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Password</CardTitle>
        <CardDescription>Choose a password to secure your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handlePasswordChange}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            <Progress value={passwordStrength} className="h-1" />
            <p className="text-sm text-muted-foreground">
              Password strength:{" "}
              {passwordStrength >= 100 ? "Strong" : passwordStrength >= 75 ? "Good" : passwordStrength >= 50 ? "Fair" : "Weak"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              type="password"
              id="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button className="w-full" type="submit">
            Confirm Password
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Use at least 6 characters, including letters and numbers.
        </p>
      </CardFooter>
    </Card>
  )
}

export default CreatePassword
