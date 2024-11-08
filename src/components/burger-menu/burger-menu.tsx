'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-background border-b border-border rotate-0 scale-100 transition-all">
                    <nav className="flex flex-col items-center py-4">
                        <Link
                            className="w-full text-center py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            href="#features"
                            onClick={toggleMenu}
                        >
                            Особливості
                        </Link>
                        <Link
                            className="w-full text-center py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            href="#characteristics"
                            onClick={toggleMenu}
                        >
                            Характеристики
                        </Link>
                        <Link
                            className="w-full text-center py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            href="#order"
                            onClick={toggleMenu}
                        >
                            Замовити
                        </Link>
                        <Link
                            className="w-full text-center py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            href="#reviews"
                            onClick={toggleMenu}
                        >
                            Відгуки
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    )
}