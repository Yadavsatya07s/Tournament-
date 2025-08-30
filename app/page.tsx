"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { currentUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && currentUser) {
      if (currentUser.isAdmin) {
        router.push("/admin")
      } else {
        router.push("/user")
      }
    }
  }, [currentUser, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (currentUser) {
    return null // Will redirect based on user role
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
            Free Fire Tournament
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the ultimate Free Fire tournament experience. Compete with the best players, win amazing prizes, and
            become a champion!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-white">Win Big Prizes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-center">
                Compete for amazing cash prizes and exclusive rewards in every tournament.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-white">Fair Competition</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-center">
                Organized tournaments with proper room management and fair play rules.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <Zap className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-white">Instant Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-center">
                Secure and instant payment processing with Razorpay integration.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-white">Secure Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-center">
                Advanced security measures to protect your data and transactions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl text-white mb-4">Ready to Dominate?</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Join thousands of players in the most exciting Free Fire tournaments. Register now and start your
                journey to becoming a champion!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Playing Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
