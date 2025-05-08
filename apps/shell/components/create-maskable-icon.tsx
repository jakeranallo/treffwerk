"use client"

import { useEffect, useRef } from "react"

// This is a utility component to help create a maskable icon
// You can use it once to generate the icon, then save the output

export function CreateMaskableIcon() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 512
    canvas.height = 512

    // Create a new image
    const img = new Image()
    img.crossOrigin = "anonymous"

    // When image loads, draw it to canvas with proper padding for maskable icons
    img.onload = () => {
      // Clear canvas
      ctx.fillStyle = "#020617" // Dark background matching the app
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate dimensions to maintain aspect ratio with proper safe zone
      // Maskable icons need 10% padding on all sides (safe zone)
      const safeZone = 0.1
      const safeSize = canvas.width * (1 - 2 * safeZone)

      // Calculate scaling to fit the image in the safe zone
      const scale = Math.min(safeSize / img.width, safeSize / img.height)

      // Calculate centered position
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2

      // Draw the image centered and scaled
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

      // Provide download link
      const downloadLink = document.getElementById("download-link") as HTMLAnchorElement
      if (downloadLink) {
        downloadLink.href = canvas.toDataURL("image/png")
        downloadLink.download = "webclip-maskable.png"
        downloadLink.style.display = "block"
      }
    }

    // Set image source
    img.src = "/webclip.png"
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Maskable Icon Generator</h2>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 mb-4"
        style={{ width: "256px", height: "256px" }}
      ></canvas>
      <a id="download-link" className="bg-primary text-white px-4 py-2 rounded hidden" href="#">
        Download Maskable Icon
      </a>
      <p className="mt-4 text-sm text-gray-500">
        This tool creates a maskable icon with proper safe zones for Android adaptive icons. After generating, download
        the icon and place it in your public folder.
      </p>
    </div>
  )
}
