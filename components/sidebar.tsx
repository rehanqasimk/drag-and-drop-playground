"use client"

import type React from "react"
import { useDrag } from "react-dnd"
import type { ElementType } from "@/lib/types"
import { Square, Type, ImageIcon } from "lucide-react"

interface SidebarProps {
  onDrop: (type: ElementType, x: number, y: number) => void
  canvasRef: React.RefObject<HTMLDivElement>
}

interface DraggableItemProps {
  type: ElementType
  icon: React.ReactNode
  label: string
}

function DraggableItem({ type, icon, label }: DraggableItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 cursor-move transition-all ${
        isDragging ? "opacity-50" : "opacity-100 hover:shadow-md"
      }`}
    >
      <div className="text-gray-700 mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

export default function Sidebar({ onDrop, canvasRef }: SidebarProps) {
  return (
    <div className="w-full md:w-64 bg-gray-100 p-4 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <p className="text-sm text-gray-600 mb-4">Drag and drop elements onto the canvas</p>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        <DraggableItem type="text" icon={<Type size={24} />} label="Text" />
        <DraggableItem type="image" icon={<ImageIcon size={24} />} label="Image" />
        <DraggableItem type="shape" icon={<Square size={24} />} label="Shape" />
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">How to use</h3>
        <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
          <li>Drag elements from sidebar to canvas</li>
          <li>Click on elements to select and edit properties</li>
          <li>Drag elements on canvas to reposition</li>
          <li>Use the properties panel to customize elements</li>
        </ul>
      </div>
    </div>
  )
}
