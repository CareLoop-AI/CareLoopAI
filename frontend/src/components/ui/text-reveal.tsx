import { type ComponentPropsWithoutRef, type FC, type ReactNode, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import type { MotionValue } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // MotionValue that represents reveal progress [0..1]
  const progress = useMotionValue(0)
  // How many pixels the user must scroll while the section is pinned to reach full reveal.
  // Increase for a longer reveal, reduce for a quicker reveal.
  const revealDistance = 420

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    // Outer full-viewport section (does not increase page height)
    <div ref={containerRef} className={cn("relative z-0 w-full md:h-screen", className)}>
      {/* sticky inner keeps text pinned while the page scrolls */}
      <div className={"sticky top-0 mx-auto flex h-screen w-full items-center bg-transparent p-6 md:px-6 md:py-12 overflow-hidden"}>
        <span className={"flex flex-wrap gap-2 text-[15px] font-bold text-neutral-300 md:text-2xl lg:text-2xl xl:text-4xl md:justify-center md:items-center"}>
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={progress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </span>
      </div>
      {/* scroll listener updates the progress MotionValue */}
      <ScrollProgressBinder ref={containerRef} progress={progress} revealDistance={revealDistance} />
    </div>
  )
}


const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [14, 0]) // small rise as it fades in
  return (
    <span className="relative mx-1 lg:mx-1.5 inline-block overflow-hidden">
      <span className="absolute inset-0 opacity-30 text-neutral-500">{children}</span>
      <motion.span
        style={{ opacity, y }}
        className={"relative inline-block bg-gradient-to-r from-[#F9D000] to-[#F2AA00] bg-clip-text text-transparent"}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Helper small component that binds window scroll to the provided MotionValue.
const ScrollProgressBinder = ({ ref: _ref, progress, revealDistance }: { ref: React.RefObject<HTMLDivElement | null>, progress: MotionValue<number>, revealDistance: number }) => {
  // Use a closure ref to access the actual DOM node in the effect
  const containerRef = _ref

  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // rect.top: distance from viewport top to section top
      // when rect.top <= 0 we start revealing; after the user scrolls up 'revealDistance' pixels, progress -> 1
      const startTop = rect.top
      let p = 0
      if (startTop <= 0) {
        p = Math.min(1, Math.abs(startTop) / revealDistance)
      } else {
        p = 0
      }
      // schedule motion value update on RAF for smoother updates
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        progress.set(p)
      })
    }

    // initialize and attach
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [containerRef, progress, revealDistance])

  return null
}
