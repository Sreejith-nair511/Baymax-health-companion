"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LoadingAnimationProps {
  duration?: number
}

const LoadingAnimation = ({ duration = 3000 }: LoadingAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-baymax-white dark:bg-gray-900"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-64 h-64 mb-4"
            >
              <Image
                src="/images/baymax-hello.gif"
                alt="Baymax saying hello"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-baymax-darkBlue dark:text-baymax-blue mb-2"
            >
              Baymax
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-600 dark:text-gray-300"
            >
              Your personal healthcare companion
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 1.5 }}
              className="h-1 bg-baymax-blue w-48 mt-6 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingAnimation
