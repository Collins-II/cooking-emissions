"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Quote {
  text: string
  author: string
}

const fallbackQuotes: Quote[] = [
  {
    text: "The Earth is what we all have in common.",
    author: "Wendell Berry",
  },
  {
    text: "We won't have a society if we destroy the environment.",
    author: "Margaret Mead",
  },
  {
    text: "What we do to the Earth, we do to ourselves.",
    author: "Chief Seattle",
  },
  {
    text: "The greatest threat to our planet is the belief that someone else will save it.",
    author: "Robert Swan",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    text: "Climate change is not a lie, it’s science.",
    author: "Greta Thunberg",
  },
  {
    text: "The future depends on what we do in the present.",
    author: "Mahatma Gandhi",
  },
];

export function SectionCards() {
  const [index, setIndex] = useState(0)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setQuotes(fallbackQuotes)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!quotes.length) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [quotes])

  return (
   <div className="relative flex min-h-[250px] items-center justify-center px-4 lg:px-6">
  {loading ? (
    <Card className="max-w-xl animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-50 dark:from-muted dark:via-muted-foreground/20 dark:to-muted-foreground/10 p-8 text-center text-muted-foreground shadow-lg">
      Loading climate quotes...
    </Card>
  ) : (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-5xl"
      >
        <Card className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#e0f7fa] via-white to-[#e3f2fd] dark:from-[#1e1e2f] dark:via-[#2e2e3f] dark:to-[#1e1e2f] shadow-xl transition-shadow hover:shadow-2xl">
          <CardHeader className="px-6 pt-6 pb-3">
            <CardTitle className="text-center text-1xl font-bold text-slate-700 dark:text-slate-100 md:text-3xl">
              <TypewriterText key={index} text={`"${quotes[index]?.text}"`} />
            </CardTitle>
            <CardDescription className="mt-3 text-center text-base italic text-slate-600 dark:text-slate-400">
              – {quotes[index]?.author}
            </CardDescription>
          </CardHeader>
          <CardFooter className="pb-6 pt-2 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            🌿 Environmental Inspiration #{index + 1}
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  )}
</div>

  )
}

interface TypewriterTextProps {
  text: string
  speed?: number
}

export function TypewriterText({ text, speed = 40 }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let i = 0
    setDisplayed("")

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))

      if (i >= text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span>{displayed}</span>
}
