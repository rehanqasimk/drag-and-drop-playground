"use client"

import { forwardRef, useRef, useEffect } from "react"
import { useDrop } from "react-dnd"
import type { PlaygroundElement } from "@/lib/types"
import TextElement from "./elements/text-element"
import ImageElement from "./elements/image-element"
import ShapeElement from "./elements/shape-element"

interface CanvasProps {
  elements: PlaygroundElement[]
  selectedElementId: string | null
  onElementSelect: (id: string | null) => void
  onElementMove: (id: string, x: number, y: number) => void
  onElementResize: (id: string, width: number, height: number) => void
  onElementDelete: (id: string) => void
  onDrop: (type: string, x: number, y: number) => void
}

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ elements, selectedElementId, onElementSelect, onElementMove, onElementResize, onElementDelete, onDrop }, ref) => {
    const canvasRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (ref && typeof ref === "object" && ref.current) {
        canvasRef.current = ref.current
      }
    }, [ref])

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "element",
      drop: (item: { type: string }, monitor) => {
        if (!canvasRef.current) return

        const canvasRect = canvasRef.current.getBoundingClientRect()
        const dropOffset = monitor.getClientOffset()

        if (dropOffset) {
          const x = dropOffset.x - canvasRect.left
          const y = dropOffset.y - canvasRect.top
          onElementSelect(null)
          // Call the onDrop function passed from the parent
          if (item.type) {
            onDrop(item.type, x, y)
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }))

    useEffect(() => {
      const handleCanvasClick = (e: MouseEvent) => {
        if (e.target === canvasRef.current) {
          onElementSelect(null)
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete" && selectedElementId) {
          onElementDelete(selectedElementId)
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      canvasRef.current?.addEventListener("click", handleCanvasClick)

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        canvasRef.current?.removeEventListener("click", handleCanvasClick)
      }
    }, [selectedElementId, onElementSelect, onElementDelete])

    const renderElement = (element: PlaygroundElement) => {
      const isSelected = element.id === selectedElementId

      switch (element.type) {
        case "text":
          return (
            <TextElement
              key={element.id}
              element={element}
              isSelected={isSelected}
              onSelect={() => onElementSelect(element.id)}
              onMove={(x, y) => onElementMove(element.id, x, y)}
              onResize={(width, height) => onElementResize(element.id, width, height)}
              onDelete={() => onElementDelete(element.id)}
            />
          )
        case "image":
          return (
            <ImageElement
              key={element.id}
              element={element}
              isSelected={isSelected}
              onSelect={() => onElementSelect(element.id)}
              onMove={(x, y) => onElementMove(element.id, x, y)}
              onResize={(width, height) => onElementResize(element.id, width, height)}
              onDelete={() => onElementDelete(element.id)}
            />
          )
        case "shape":
          return (
            <ShapeElement
              key={element.id}
              element={element}
              isSelected={isSelected}
              onSelect={() => onElementSelect(element.id)}
              onMove={(x, y) => onElementMove(element.id, x, y)}
              onResize={(width, height) => onElementResize(element.id, width, height)}
              onDelete={() => onElementDelete(element.id)}
            />
          )
        default:
          return null
      }
    }

    return (
      <div
        ref={(node) => {
          drop(node)
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          canvasRef.current = node
        }}
        className={`flex-1 relative overflow-auto bg-white border border-gray-200 ${isOver ? "bg-blue-50" : ""}`}
        style={{ minHeight: "100%" }}
      >
        <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, rowIndex) =>
            Array.from({ length: 20 }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="border border-gray-200" />
            )),
          )}
        </div>
        {elements.map(renderElement)}
      </div>
    )
  },
)

Canvas.displayName = "Canvas"
export default Canvas
