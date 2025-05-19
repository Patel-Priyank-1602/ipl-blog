"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface HeroSectionProps {
  playerType: "batter" | "bowler" | "allrounder"
}

export default function HeroSection({ playerType }: HeroSectionProps) {
  const [heroImage, setHeroImage] = useState("/hero-batter.png")
  const [heroTitle, setHeroTitle] = useState("Master Blasters")
  const [heroSubtitle, setHeroSubtitle] = useState("The greatest run-scorers in IPL history")

  useEffect(() => {
    switch (playerType) {
      case "batter":
        setHeroImage("/hero-batter.png")
        setHeroTitle("Master Blasters")
        setHeroSubtitle("The greatest run-scorers in IPL history")
        break
      case "bowler":
        setHeroImage("/hero-bowler.png")
        setHeroTitle("Wicket Wizards")
        setHeroSubtitle("The most lethal bowlers in IPL history")
        break
      case "allrounder":
        setHeroImage("/hero-allrounder.png")
        setHeroTitle("Complete Champions")
        setHeroSubtitle("The most versatile players in IPL history")
        break
    }
  }, [playerType])

  return (
    <div className="relative bg-gradient-to-b from-primary/10 to-background pt-10 pb-20 overflow-hidden">
      {/* Animated cricket balls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-primary/20 animate-float" />
        <div className="absolute top-40 left-[20%] w-6 h-6 rounded-full bg-primary/30 animate-float animation-delay-500" />
        <div className="absolute top-60 left-[80%] w-8 h-8 rounded-full bg-primary/20 animate-float animation-delay-1000" />
        <div className="absolute top-20 left-[70%] w-5 h-5 rounded-full bg-primary/30 animate-float animation-delay-1500" />
        <div className="absolute top-80 left-[30%] w-3 h-3 rounded-full bg-primary/20 animate-float animation-delay-2000" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroTitle}</h1>
            <p className="text-xl text-muted-foreground mb-6">{heroSubtitle}</p>
            <div className="w-32 h-1 bg-primary rounded-full mx-auto md:mx-0" />
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            key={heroImage}
          >
            <div className="relative h-[300px] md:h-[400px] w-full">
              <Image
                src={heroImage || "/placeholder.svg"}
                alt="Cricket player"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute -bottom-10 -left-10 -right-10 h-20 bg-gradient-to-t from-background to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
