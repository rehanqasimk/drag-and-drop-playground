export type ElementType = "text" | "image" | "shape"

export interface PlaygroundElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  properties: any
}
