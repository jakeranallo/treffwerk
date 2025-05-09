"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Mock the required data and hooks
const mockReadingData = {
  readingList: [],
  addToReadingList: () => {},
  removeFromReadingList: () => {},
}

const mockReadingProgress = {
  progress: {},
  updateProgress: () => {},
}

// Create a context provider for the tool
const TrefflesenContext = React.createContext({
  readingData: mockReadingData,
  readingProgress: mockReadingProgress,
})

// Dynamically import the tool's page component
const TrefflesenPage = dynamic(() => import("../../../../tools/trefflesen/app/page"), {
  ssr: false,
  loading: () => <div>Loading Trefflesen...</div>
})

export default function TrefflesenWrapper() {
  return (
    <TrefflesenContext.Provider value={{
      readingData: mockReadingData,
      readingProgress: mockReadingProgress,
    }}>
      <TrefflesenPage />
    </TrefflesenContext.Provider>
  )
} 