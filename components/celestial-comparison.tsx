"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const celestialBodies = [
  { name: "Mercury", diameter: 4879 },
  { name: "Venus", diameter: 12104 },
  { name: "Earth", diameter: 12742 },
  { name: "Mars", diameter: 6779 },
  { name: "Jupiter", diameter: 139820 },
  { name: "Saturn", diameter: 116460 },
  { name: "Uranus", diameter: 50724 },
  { name: "Neptune", diameter: 49244 },
  { name: "Pluto", diameter: 2377 },
  { name: "Moon", diameter: 3475 },
  { name: "Sun", diameter: 1392700 },
  { name: "Sirius", diameter: 2400000 },
  { name: "Betelgeuse", diameter: 1234000000 },
  { name: "VY Canis Majoris", diameter: 1975000000 },
  { name: "UY Scuti", diameter: 2376000000 },
  { name: "Stephenson 2-18", diameter: 2150000000 },
]

export function CelestialComparisonComponent() {
  const [body1, setBody1] = useState(celestialBodies[2]) // Earth
  const [body2, setBody2] = useState(celestialBodies[10]) // Sun
  const [key1, setKey1] = useState(0)
  const [key2, setKey2] = useState(1)

  const maxDiameter = Math.max(body1.diameter, body2.diameter)
  const scale = 300 / maxDiameter // Scale to fit within 300px

  useEffect(() => {
    setKey1((prevKey) => prevKey + 2)
  }, [body1])

  useEffect(() => {
    setKey2((prevKey) => prevKey + 2)
  }, [body2])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Celestial Body Size Comparison</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <Select onValueChange={(value) => setBody1(celestialBodies.find(body => body.name === value) || body1)}>
          <SelectTrigger className="w-[180px] bg-gray-800 text-white">
            <SelectValue placeholder="Select body 1" />
          </SelectTrigger>
          <SelectContent>
            {celestialBodies.map((body) => (
              <SelectItem key={body.name} value={body.name}>
                {body.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setBody2(celestialBodies.find(body => body.name === value) || body2)}>
          <SelectTrigger className="w-[180px] bg-gray-800 text-white">
            <SelectValue placeholder="Select body 2" />
          </SelectTrigger>
          <SelectContent>
            {celestialBodies.map((body) => (
              <SelectItem key={body.name} value={body.name}>
                {body.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-end space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={key1}
              className="bg-white rounded-full"
              style={{
                width: body1.diameter * scale,
                height: body1.diameter * scale,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            />
          </AnimatePresence>
          <p className="mt-2 text-center">{body1.name}<br />{body1.diameter.toLocaleString()} km</p>
        </div>
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={key2}
              className="bg-white rounded-full"
              style={{
                width: body2.diameter * scale,
                height: body2.diameter * scale,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            />
          </AnimatePresence>
          <p className="mt-2 text-center">{body2.name}<br />{body2.diameter.toLocaleString()} km</p>
        </div>
      </div>
    </div>
  )
}