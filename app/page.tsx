"use client"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Playground from "@/components/playground"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <DndProvider backend={HTML5Backend}>
        <Playground />
      </DndProvider>
    </main>
  )
}
