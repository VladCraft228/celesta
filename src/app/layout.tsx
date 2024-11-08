import { ThemeProvider } from '@/components/theme/theme-provider'
import './globals.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="uk" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <ToastContainer />
        </ThemeProvider>
        </body>
        </html>
    )
}