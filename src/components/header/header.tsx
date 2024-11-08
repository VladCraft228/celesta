'use client'

import Link from "next/link"
import { ThemeToggle } from "../theme/theme-toggle"
import { BurgerMenu } from "../burger-menu/burger-menu"
import Image from "next/image"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background  px-4 lg:px-6 h-14 flex items-center justify-between">
            <Link className="flex items-center justify-center" href="#">
                <Image
                    alt="Logo"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                    width="32"
                    height="32"
                    src="./logo.png"
                />
                <span className="ml-2 text-2xl font-bold text-foreground">Lumia</span>
            </Link>
            <div className="flex items-center gap-1 lg:gap-3">
                <nav className="hidden lg:flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
                        Особливості
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#characteristics">
                        Характеристики
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#order">
                        Замовити
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#reviews">
                        Відгуки
                    </Link>
                </nav>
                <ThemeToggle/>
                <BurgerMenu/>
            </div>
        </header>
    )
}