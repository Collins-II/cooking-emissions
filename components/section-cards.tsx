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
        <Card className="max-w-xl animate-pulse bg-muted p-8 text-center text-muted-foreground">
          Loading climate quotes...
        </Card>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl"
          >
            <Card className="@container/card bg-gradient-to-br from-slate-100/70 to-neutral-100/50 dark:from-muted dark:to-muted-foreground/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-center text-xl font-semibold md:text-2xl">
                  <TypewriterText key={index} text={`"${quotes[index]?.text}"`} />
                </CardTitle>
                <CardDescription className="mt-2 text-center text-base italic text-muted-foreground">
                  – {quotes[index]?.author}
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-center text-sm text-muted-foreground">
                Environmental Inspiration #{index + 1}
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
