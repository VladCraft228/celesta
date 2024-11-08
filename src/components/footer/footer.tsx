'use client'

import Link from "next/link";

export function Footer () {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">© 2024 Lumia. Всі права захищені.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="text-xs hover:underline underline-offset-4" href="#">
                    Політика конфіденційності
                </Link>
                <Link className="text-xs hover:underline underline-offset-4" href="#">
                    Умови використання
                </Link>
            </nav>
        </footer>
    )
}