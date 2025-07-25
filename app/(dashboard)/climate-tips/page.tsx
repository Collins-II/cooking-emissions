// app/(home)/climate-tips/page.tsx

import { Metadata } from "next"
import { FaRecycle, FaCar, FaTree, FaLightbulb, FaWater, FaLeaf } from "react-icons/fa"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Climate Change Tips",
  description: "Practical tips to help you prevent climate change and live sustainably.",
}

const climateTips = [
  {
    icon: <FaRecycle className="text-green-600 size-6" />,
    title: "Reduce, Reuse, Recycle",
    description: "Minimize waste by recycling and reusing products. Choose sustainable packaging.",
  },
  {
    icon: <FaCar className="text-blue-600 size-6" />,
    title: "Use Public Transport",
    description: "Reduce emissions by using buses, biking, or walking instead of driving solo.",
  },
  {
    icon: <FaTree className="text-green-700 size-6" />,
    title: "Plant More Trees",
    description: "Trees absorb CO₂ and help combat climate change. Support afforestation efforts.",
  },
  {
    icon: <FaLightbulb className="text-yellow-500 size-6" />,
    title: "Switch to LED Lighting",
    description: "LED bulbs use less energy and last longer, reducing power consumption.",
  },
  {
    icon: <FaWater className="text-cyan-600 size-6" />,
    title: "Conserve Water",
    description: "Fix leaks and use water-efficient fixtures to save precious resources.",
  },
  {
    icon: <FaLeaf className="text-lime-500 size-6" />,
    title: "Adopt a Plant-Based Diet",
    description: "Eating less meat helps lower emissions from livestock and agriculture.",
  },
]

export default function ClimateTipsPage() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-green-800 text-3xl md:text-4xl font-bold text-center mb-4">
        Climate Change Prevention Tips
      </h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Small actions lead to big impact. Explore tips to reduce your carbon footprint and help protect the planet.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {climateTips.map((tip, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition duration-200 ease-in-out">
            <CardHeader>
              <div className="flex items-center gap-3">
                {tip.icon}
                <CardTitle className="text-lg">{tip.title}</CardTitle>
              </div>
              <CardDescription className="mt-2 text-sm text-muted-foreground">
                {tip.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
