"use client"

import type React from "react"
import { useRef } from "react"
import { useDrag } from "react-dnd"
import type { PlaygroundElement } from "@/lib/types"
import { Trash2 } from "lucide-react"

interface ShapeElementProps {
  element: PlaygroundElement
  isSelected: boolean
  onSelect: () => void
  onMove: (x: number, y: number) => void
  onResize: (width: number, height: number) => void
  onDelete: () => void
}

export default function ShapeElement({ element, isSelected, onSelect, onMove, onResize, onDelete }: ShapeElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const initialPosition = useRef({ x: 0, y: 0 })
  const initialSize = useRef({ width: 0, height: 0 })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "positioned-element",
    item: () => {
      return { id: element.id, type: element.type }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect()

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      initialPosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current && ref.current.parentElement) {
        const parentRect = ref.current.parentElement.getBoundingClientRect()
        const x = e.clientX - parentRect.left - initialPosition.current.x
        const y = e.clientY - parentRect.top - initialPosition.current.y

        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          onMove(Math.max(0, x), Math.max(0, y))
        })
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation()
    e.preventDefault()

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      initialSize.current = { width: rect.width, height: rect.height }
      initialPosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const dx = e.clientX - initialPosition.current.x
      const dy = e.clientY - initialPosition.current.y

      let newWidth = initialSize.current.width
      let newHeight = initialSize.current.height

      if (direction.includes("e")) {
        newWidth = Math.max(50, initialSize.current.width + dx)
      }
      if (direction.includes("s")) {
        newHeight = Math.max(50, initialSize.current.height + dy)
      }

      onResize(newWidth, newHeight)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      ref={(node) => {
        drag(node)
        ref.current = node
      }}
      className={`absolute cursor-move ${isSelected ? "outline outline-2 outline-blue-500" : ""}`}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.width}px`,
        height: `${element.height}px`,
        opacity: isDragging ? 0.5 : 1,
        transition: isDragging ? "none" : "transform 0.05s ease-out",
        transform: "translate(0, 0)",
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onMouseDown={handleMouseDown}
    >
      <svg width="100%" height="100%" viewBox="0 0 150 150" preserveAspectRatio="none">
        <path d={element.properties.path} fill="#4f46e5" stroke="#3730a3" strokeWidth="2" />
      </svg>

      {isSelected && (
        <>
          <div
            className="absolute w-6 h-6 -right-3 -top-3 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <Trash2 size={14} className="text-red-500" />
          </div>

          <div
            className="absolute w-3 h-3 right-0 bottom-0 bg-blue-500 rounded-full cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
        </>
      )}
    </div>
  )
}
