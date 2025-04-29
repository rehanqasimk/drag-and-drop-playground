"use client"

import { useState } from "react"
import type { PlaygroundElement } from "@/lib/types"
import { X } from "lucide-react"

interface PropertiesPanelProps {
  element: PlaygroundElement
  onPropertiesChange: (properties: any) => void
  onSizeChange: (width: number, height: number) => void
}

export default function PropertiesPanel({ element, onPropertiesChange, onSizeChange }: PropertiesPanelProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <span className="sr-only">Open Properties</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
    )
  }

  const renderProperties = () => {
    switch (element.type) {
      case "text":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
              <textarea
                value={element.properties.content}
                onChange={(e) => onPropertiesChange({ content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
              <select
                value={element.properties.fontFamily}
                onChange={(e) => onPropertiesChange({ fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
                <option value="cursive">Cursive</option>
                <option value="fantasy">Fantasy</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={element.properties.fontSize}
                  onChange={(e) => onPropertiesChange({ fontSize: Number.parseInt(e.target.value) })}
                  className="w-full mr-2"
                />
                <span className="text-sm w-8 text-center">{element.properties.fontSize}px</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Style</label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => onPropertiesChange({ bold: !element.properties.bold })}
                  className={`px-3 py-1 border rounded-md ${
                    element.properties.bold ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
                  }`}
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => onPropertiesChange({ italic: !element.properties.italic })}
                  className={`px-3 py-1 border rounded-md italic ${
                    element.properties.italic ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
                  }`}
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => onPropertiesChange({ underline: !element.properties.underline })}
                  className={`px-3 py-1 border rounded-md underline ${
                    element.properties.underline ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
                  }`}
                >
                  U
                </button>
              </div>
            </div>
          </>
        )

      case "image":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
            <input
              type="text"
              value={element.properties.src}
              onChange={(e) => onPropertiesChange({ src: e.target.value })}
              placeholder="Enter image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Enter a URL or use the placeholder</p>
          </div>
        )

      case "shape":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">SVG Path</label>
            <textarea
              value={element.properties.path}
              onChange={(e) => onPropertiesChange({ path: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              rows={3}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter an SVG path (e.g., M 0,0 L 100,0 L 50,100 Z for triangle)
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onPropertiesChange({ path: "M 75,0 L 150,150 L 0,150 Z" })}
                className="px-2 py-1 text-xs border rounded-md bg-white border-gray-300 hover:bg-gray-50"
              >
                Triangle
              </button>
              <button
                type="button"
                onClick={() => onPropertiesChange({ path: "M 0,0 L 150,0 L 150,150 L 0,150 Z" })}
                className="px-2 py-1 text-xs border rounded-md bg-white border-gray-300 hover:bg-gray-50"
              >
                Square
              </button>
              <button
                type="button"
                onClick={() => onPropertiesChange({ path: "M 75,0 A 75,75 0 1,0 75,150 A 75,75 0 1,0 75,0 Z" })}
                className="px-2 py-1 text-xs border rounded-md bg-white border-gray-300 hover:bg-gray-50"
              >
                Circle
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full md:w-72 bg-gray-50 border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium">Properties</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
          <span className="sr-only">Close</span>
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Element Type</h4>
          <div className="px-3 py-2 bg-gray-100 rounded-md text-sm capitalize">{element.type}</div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Dimensions</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Width</label>
              <input
                type="number"
                value={element.width}
                onChange={(e) => onSizeChange(Number.parseInt(e.target.value), element.height)}
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Height</label>
              <input
                type="number"
                value={element.height}
                onChange={(e) => onSizeChange(element.width, Number.parseInt(e.target.value))}
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Position</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">X</label>
              <input
                type="number"
                value={Math.round(element.x)}
                disabled
                className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Y</label>
              <input
                type="number"
                value={Math.round(element.y)}
                disabled
                className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>

        {renderProperties()}
      </div>
    </div>
  )
}
