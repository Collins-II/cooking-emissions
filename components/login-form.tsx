"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

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


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSignup, setIsSignup] = useState(false);
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "student",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      // 🔒 Send sign-up data
      console.log("Signing up:", formData);
    } else {
      // 🔐 Send login data
      console.log("Logging in:", { email: formData.email, password: formData.password });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{isSignup ? "Create an Account" : "Welcome Back"}</h1>
              <p className="text-muted-foreground">
                {isSignup ? "Sign up to continue" : "Login to your Carbon Yanga account"}
              </p>
            </div>

            {isSignup && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="user_type">User Type</Label>
                  <select
                    aria-label="selection"
                    id="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input id="email" type="text" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignup && (
                  <a href="#" className="text-sm underline hover:text-primary">
                    Forgot password?
                  </a>
                )}
              </div>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full">
              {isSignup ? "Sign Up" : "Login"}
            </Button>

            <div className="text-center text-sm">
              {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="underline underline-offset-4 text-primary"
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </div>
          </form>
           <div className="hidden md:flex relative h-full w-full justify-center items-center bg-muted px-6">
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
            <Card className="@container/card bg-gradient-to-br from-slate-100/70 to-neutral-100/50 dark:from-muted dark:to-muted-foreground/20">
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
       </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
