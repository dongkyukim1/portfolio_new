"use client"

import dynamic from "next/dynamic"

/** Client-only loader: three.js must never run on the server. */
export const Backdrop3D = dynamic(() => import("./backdrop-3d").then((m) => m.Backdrop3D), { ssr: false })
