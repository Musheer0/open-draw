'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

const shortcuts = [
  { combo: 'Ctrl + S', action: 'Save file' },
  { combo: 'Ctrl + D', action: 'Duplicate item' },
  { combo: 'Ctrl + L', action: 'Lock  unlock object' },
  { combo: 'Escape', action: 'Disable/Unfocus/Blur current item' },
]

export default function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false)

  // Optional: Open dialog when user presses "?"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Keyboard Shortcuts</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>⌨️ Keyboard Shortcuts</AlertDialogTitle>
        </AlertDialogHeader>
        <ScrollArea className="max-h-60 pr-2">
          <div className="flex flex-col gap-3 py-2">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex justify-between border-b pb-1 text-sm">
                <span className="text-muted-foreground">{s.combo}</span>
                <span>{s.action}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
