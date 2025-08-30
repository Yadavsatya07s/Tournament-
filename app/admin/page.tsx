"use client"

import { useState } from "react"
import { useTournaments } from "@/contexts/TournamentContext"
import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Users, Trophy, Calendar, DollarSign, Send, Award } from "lucide-react"
import { format } from "date-fns"
import CreateTournamentForm from "@/components/admin/CreateTournamentForm"
import EditTournamentForm from "@/components/admin/EditTournamentForm"
import ViewPlayersDialog from "@/components/admin/ViewPlayersDialog"
import SendNotification from "@/components/admin/SendNotification"
import TournamentResults from "@/components/admin/TournamentResults"
import type { Tournament } from "@/types"

export default function AdminDashboard() {
  const { tournaments, loading, deleteTournament } = useTournaments()
  const { currentUser } = useAuth()
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPlayersDialog, setShowPlayersDialog] = useState(false)
  const [showNotificationDialog, setShowNotificationDialog] = useState(false)
  const [showResultsDialog, setShowResultsDialog] = useState(false)

  const handleDeleteTournament = async (id: string) => {
    if (confirm("Are you sure you want to delete this tournament?")) {
      await deleteTournament(id)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Upcoming</Badge>
      case "ongoing":
        return <Badge className="bg-green-600 hover:bg-green-700">Ongoing</Badge>
      case "completed":
        return <Badge className="bg-gray-600 hover:bg-gray-700">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const upcomingTournaments = tournaments.filter((t) => t.status === "upcoming")
  const ongoingTournaments = tournaments.filter((t) => t.status === "ongoing")
  const completedTournaments = tournaments.filter((t) => t.status === "completed")

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Manage Free Fire tournaments and players</p>
            </div>
            <div className="flex gap-2">
              <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Notification
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Send Notification</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Send notifications to users about tournaments and updates.
                    </DialogDescription>
                  </DialogHeader>
                  <SendNotification tournaments={tournaments} onClose={() => setShowNotificationDialog(false)} />
                </DialogContent>
              </Dialog>

              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Tournament
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Tournament</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Fill in the details to create a new Free Fire tournament.
                    </DialogDescription>
                  </DialogHeader>
                  <CreateTournamentForm onClose={() => setShowCreateDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Tournaments</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{tournaments.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Upcoming</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{upcomingTournaments.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Ongoing</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{ongoingTournaments.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Prize Pool</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ₹{tournaments.reduce((sum, t) => sum + t.prizePool, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tournaments Table */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">All Tournaments</CardTitle>
              <CardDescription className="text-gray-400">Manage your Free Fire tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              ) : tournaments.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Trophy className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No tournaments created yet. Create your first tournament!</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-gray-300">Tournament</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Entry Fee</TableHead>
                      <TableHead className="text-gray-300">Players</TableHead>
                      <TableHead className="text-gray-300">Prize Pool</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournaments.map((tournament) => (
                      <TableRow key={tournament.id} className="border-slate-700">
                        <TableCell className="text-white font-medium">{tournament.name}</TableCell>
                        <TableCell className="text-gray-300">{format(tournament.date, "MMM dd, yyyy HH:mm")}</TableCell>
                        <TableCell className="text-gray-300">₹{tournament.entryFee}</TableCell>
                        <TableCell className="text-gray-300">
                          {tournament.registeredPlayers.length}/{tournament.maxPlayers}
                        </TableCell>
                        <TableCell className="text-gray-300">₹{tournament.prizePool.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(tournament.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedTournament(tournament)
                                setShowPlayersDialog(true)
                              }}
                              className="border-slate-600 text-gray-300 hover:bg-slate-700"
                            >
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedTournament(tournament)
                                setShowEditDialog(true)
                              }}
                              className="border-slate-600 text-gray-300 hover:bg-slate-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {tournament.status === "completed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedTournament(tournament)
                                  setShowResultsDialog(true)
                                }}
                                className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white"
                              >
                                <Award className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteTournament(tournament.id)}
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Edit Tournament Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Tournament</DialogTitle>
              <DialogDescription className="text-gray-400">Update tournament details and settings.</DialogDescription>
            </DialogHeader>
            {selectedTournament && (
              <EditTournamentForm
                tournament={selectedTournament}
                onClose={() => {
                  setShowEditDialog(false)
                  setSelectedTournament(null)
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* View Players Dialog */}
        <Dialog open={showPlayersDialog} onOpenChange={setShowPlayersDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Registered Players</DialogTitle>
              <DialogDescription className="text-gray-400">
                View all players registered for this tournament.
              </DialogDescription>
            </DialogHeader>
            {selectedTournament && (
              <ViewPlayersDialog
                tournament={selectedTournament}
                onClose={() => {
                  setShowPlayersDialog(false)
                  setSelectedTournament(null)
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white">Tournament Results</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add or update tournament results and prize distribution.
              </DialogDescription>
            </DialogHeader>
            {selectedTournament && (
              <TournamentResults
                tournament={selectedTournament}
                onClose={() => {
                  setShowResultsDialog(false)
                  setSelectedTournament(null)
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
