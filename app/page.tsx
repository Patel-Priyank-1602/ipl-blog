"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import PlayerList from "@/components/player-list"
import HeroSection from "@/components/hero-section"
import { batters, bowlers, allrounders } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [playerType, setPlayerType] = useState<"batter" | "bowler" | "allrounder">("batter")
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const getTitle = () => {
    switch (playerType) {
      case "batter":
        return "Top 10 IPL Batters of All Time"
      case "bowler":
        return "Top 10 IPL Bowlers of All Time"
      case "allrounder":
        return "Top 10 IPL All-rounders of All Time"
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Cricket field background */}
      <div className="fixed inset-0 bg-[url('/cricket-field.png')] bg-no-repeat bg-center bg-cover opacity-5 pointer-events-none z-0" />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping" />
                <div className="absolute inset-0 bg-primary rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-xs">
                  IPL
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                IPL Legends
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4">
              <Button
                variant={playerType === "batter" ? "default" : "ghost"}
                onClick={() => setPlayerType("batter")}
                className="relative overflow-hidden group"
              >
                <span>Batters</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Button>
              <Button
                variant={playerType === "bowler" ? "default" : "ghost"}
                onClick={() => setPlayerType("bowler")}
                className="relative overflow-hidden group"
              >
                <span>Bowlers</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Button>
              <Button
                variant={playerType === "allrounder" ? "default" : "ghost"}
                onClick={() => setPlayerType("allrounder")}
                className="relative overflow-hidden group"
              >
                <span>All-rounders</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Button>
            </div>
          </nav>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="mr-2 relative overflow-hidden"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn("md:hidden overflow-hidden transition-all duration-300", isMenuOpen ? "max-h-56" : "max-h-0")}
        >
          <div className="container py-4 flex flex-col space-y-2">
            <Button
              variant={playerType === "batter" ? "default" : "ghost"}
              onClick={() => {
                setPlayerType("batter")
                setIsMenuOpen(false)
              }}
              className="justify-start"
            >
              Batters
            </Button>
            <Button
              variant={playerType === "bowler" ? "default" : "ghost"}
              onClick={() => {
                setPlayerType("bowler")
                setIsMenuOpen(false)
              }}
              className="justify-start"
            >
              Bowlers
            </Button>
            <Button
              variant={playerType === "allrounder" ? "default" : "ghost"}
              onClick={() => {
                setPlayerType("allrounder")
                setIsMenuOpen(false)
              }}
              className="justify-start"
            >
              All-rounders
            </Button>
          </div>
        </div>
      </header>

      <HeroSection playerType={playerType} />

      <main className="container py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {getTitle()}
          </h1>
          <div className="w-24 h-1 bg-primary rounded-full mb-4" />
          <p className="text-center text-muted-foreground max-w-2xl">
            Celebrating the greatest cricket talents who have dominated the Indian Premier League with their exceptional
            skills and memorable performances.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#players" className="flex items-center">
              View Players <ChevronDown className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <div id="players">
          <AnimatePresence mode="wait">
            <motion.div
              key={playerType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {playerType === "batter" && <PlayerList players={batters} />}
              {playerType === "bowler" && <PlayerList players={bowlers} />}
              {playerType === "allrounder" && <PlayerList players={allrounders} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-muted py-8 mt-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-xs">
                  IPL
                </div>
              </div>
              <span className="text-xl font-bold">IPL Legends</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} IPL Legends. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
