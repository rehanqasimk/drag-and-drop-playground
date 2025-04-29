"use client"

import { useState, useRef, useEffect } from "react"
import Sidebar from "./sidebar"
import Canvas from "./canvas"
import PropertiesPanel from "./properties-panel"
import type { ElementType, PlaygroundElement } from "@/lib/types"
import { nanoid } from "nanoid"

export default function Playground() {
  const [elements, setElements] = useState<PlaygroundElement[]>([])
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const selectedElement = elements.find((el) => el.id === selectedElementId)

  const handleDrop = (type: ElementType, x: number, y: number) => {
    const newElement: PlaygroundElement = {
      id: nanoid(),
      type,
      x,
      y,
      width: type === "text" ? 200 : 150,
      height: type === "text" ? 50 : 150,
      properties: getDefaultProperties(type),
    }

    setElements((prev) => [...prev, newElement])
    setSelectedElementId(newElement.id)
  }

  const getDefaultProperties = (type: ElementType) => {
    switch (type) {
      case "text":
        return {
          content: "Edit this text",
          fontFamily: "sans-serif",
          fontSize: 16,
          bold: false,
          italic: false,
          underline: false,
        }
      case "image":
        return {
          src: "/placeholder.svg?height=150&width=150",
        }
      case "shape":
        return {
          path: "M 75,0 L 150,150 L 0,150 Z", // Triangle
        }
      default:
        return {}
    }
  }

  const updateElementPosition = (id: string, x: number, y: number) => {
    // Use functional update to avoid potential stale state issues
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              x: Math.round(x), // Round for better performance
              y: Math.round(y),
            }
          : el,
      ),
    )
  }

  const updateElementProperties = (id: string, properties: any) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, properties: { ...el.properties, ...properties } } : el)),
    )
  }

  const updateElementSize = (id: string, width: number, height: number) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, width, height } : el)))
  }

  const handleElementSelect = (id: string | null) => {
    setSelectedElementId(id)
  }

  const handleDeleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id))
    if (selectedElementId === id) {
      setSelectedElementId(null)
    }
  }

  const savePlaygroundState = () => {
    localStorage.setItem("playgroundState", JSON.stringify(elements))
    alert("Playground state saved!")
  }

  const loadPlaygroundState = () => {
    const savedState = localStorage.getItem("playgroundState")
    if (savedState) {
      setElements(JSON.parse(savedState))
      setSelectedElementId(null)
    } else {
      alert("No saved state found!")
    }
  }

  useEffect(() => {
    // Check for saved state on initial load
    const savedState = localStorage.getItem("playgroundState")
    if (savedState) {
      try {
        setElements(JSON.parse(savedState))
      } catch (e) {
        console.error("Failed to load saved state:", e)
      }
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-50">
      <Sidebar onDrop={handleDrop} canvasRef={canvasRef} />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-xl font-bold">Drag-and-Drop Playground</h1>
          <div className="flex gap-2">
            <button
              onClick={savePlaygroundState}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={loadPlaygroundState}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Load
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <Canvas
            ref={canvasRef}
            elements={elements}
            selectedElementId={selectedElementId}
            onElementSelect={handleElementSelect}
            onElementMove={updateElementPosition}
            onElementResize={updateElementSize}
            onElementDelete={handleDeleteElement}
            onDrop={handleDrop}
          />

          {selectedElement && (
            <PropertiesPanel
              element={selectedElement}
              onPropertiesChange={(props) => updateElementProperties(selectedElement.id, props)}
              onSizeChange={(width, height) => updateElementSize(selectedElement.id, width, height)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
