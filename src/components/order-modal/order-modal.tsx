'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Minus, Plus } from "lucide-react"
import { toast } from 'react-toastify'

interface OrderModalProps {
    isOpen: boolean
    onOpenChangeAction: (open: boolean) => void
    initialQuantity: number
}

export function OrderModal({ isOpen, onOpenChangeAction, initialQuantity }: OrderModalProps) {
    const UNIT_PRICE = 299;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [quantity, setQuantity] = useState(initialQuantity)
    const [total, setTotal] = useState(UNIT_PRICE * quantity);

    useEffect(() => {
        if (isOpen) {
            // Reset form when modal opens
            setName('')
            setEmail('')
            setPhone('')
            setQuantity(initialQuantity)
            setTotal(UNIT_PRICE * initialQuantity)
        }
    }, [isOpen, initialQuantity])

    const incrementQuantity = () => {
        setQuantity(prev => {
            const newQuantity = prev + 1;
            setTotal(UNIT_PRICE * newQuantity);
            return newQuantity;
        });
    };
    const decrementQuantity = () => {
        setQuantity(prev => {
            const newQuantity = prev > 1 ? prev - 1 : 1;
            setTotal(UNIT_PRICE * newQuantity);
            return newQuantity;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !email || !phone) {
            toast.error("Будь ласка, заповніть всі поля форми.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toast-error',
            });
            return
        }
        // Тут ви можете додати логіку для обробки замовлення
        console.log('Order submitted:', { name, email, phone, quantity, total })
        toast.success(`Дякуємо за ваше замовлення, ${name}! Ми зв'яжемося з вами найближчим часом.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'toast-success',
        });
        onOpenChangeAction(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChangeAction}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Замовити розумну колонку</DialogTitle>
                    <DialogDescription>
                        Заповніть форму нижче, щоб замовити вашу персональну розумну колонку психолога.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Ім&#39;я
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Телефон
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Кількість
                            </Label>
                            <div className="flex items-center space-x-2 col-span-3">
                                <Button type="button" onClick={decrementQuantity} variant="outline" size="icon">
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-2xl font-bold">{quantity}</span>
                                <Button type="button" onClick={incrementQuantity} variant="outline" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Сума
                            </Label>
                            <div className="col-span-3">
                                <span className="text-2xl font-bold">${total}</span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="secondary">Замовити</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}