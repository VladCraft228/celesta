'use client'

import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
    children: React.ReactNode
    slidesToShow?: number
}

export function Carousel({ children, slidesToShow = 1 }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaApi) return

        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, setScrollSnaps, onSelect])

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {React.Children.map(children, (child, index) => (
                        <div key={index} className={`flex-[0_0_100%] md:flex-[0_0_33.3333%] min-w-0 px-4`}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {scrollSnaps.map((_, index) => (
                    <Button
                        key={index}
                        className={`w-3 h-3 rounded-full mx-1 ${
                            index === selectedIndex ? 'bg-primary' : 'bg-gray-300'
                        }`}
                        onClick={() => scrollTo(index)}
                        variant="ghost"
                        size="sm"
                    />
                ))}
            </div>
        </div>
    )
}