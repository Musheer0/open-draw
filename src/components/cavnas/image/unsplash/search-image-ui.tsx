"use client"
import { Input } from "../../../ui/input"
import React, { useState } from "react"
import { SearchUnsplashImage } from "./search-image"

type Props = {
  onSelectImage: (url: string) => void
}

export const UnsplashImagePicker = ({ onSelectImage }: Props) => {
  const [query, setQuery] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    try {
      const images = await SearchUnsplashImage(query)
      setResults(images)
    } catch (err) {
      console.error("Search failed:", err)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="unsplash">
      <Input
        disabled={isLoading}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await handleSubmit()
          }
        }}
        onFocus={() => setShowHint(true)}
        onBlur={() => setShowHint(false)}
        placeholder="Search Images"
        className="w-full"
      />
      {showHint && (
        <p className="text-xs text-muted-foreground">press enter to search</p>
      )}
      <div className="results  overflow-y-auto thin-scrollbar gap-2 h-[400px] w-full py-2">
        {isLoading && (
          <p className="text-sm text-muted-foreground animate-pulse">
            Looking for Images...
          </p>
        )}
        {results.map((url, i) => (
          <img
            key={i}
            src={url}
            onClick={() => onSelectImage(url)}
            className="cursor-pointer hover:opacity-75 transition"
          />
        ))}
      </div>
    </div>
  )
}
