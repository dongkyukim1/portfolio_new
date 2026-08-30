import type { DetailedHTMLProps, HTMLAttributes } from "react"

type ModelViewerAttrs = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string
  alt?: string
  exposure?: string
  "camera-orbit"?: string
  "environment-image"?: string
  "interaction-prompt"?: string
  "shadow-intensity"?: string
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": ModelViewerAttrs
      }
    }
  }
}

export {}
