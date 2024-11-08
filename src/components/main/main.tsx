'use client'

import {useState, useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Brain, Heart, MessageCircle, Star, Check, Dot} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {OrderModal} from "../order-modal/order-modal"
import {Carousel} from "@/components/carousel/carousel";

// Масив шаблонів питань та відповідей користувача з колонкою
const conversationTemplates = [
    {
        user: "Заспокой мене",
        assistant: "Зробіть глибокий вдих. Уявіть спокійне місце, де ви почуваєтесь у безпеці. Пам'ятайте, що ви сильніші, ніж вам здається. Кожен день - це новий шанс. Ви впораєтесь, я поруч, щоб підтримати вас."
    },
    {
        user: "Як подолати стрес?",
        assistant: "Спробуйте техніку 5-4-3-2-1: назвіть 5 речей, які ви бачите, 4 речі, які ви відчуваєте, 3 звуки, які ви чуєте, 2 запахи, які ви відчуваєте, і 1 смак. Це допоможе вам зосередитися на теперішньому моменті і зменшити стрес."
    },
    {
        user: "Мені важко заснути",
        assistant: "Створіть рутину перед сном: вимкніть електронні пристрої за годину до сну, прийміть теплу ванну, почитайте книгу або послухайте заспокійливу музику. Регулярна практика медитації також може значно покращити якість сну."
    },
    {
        user: "Як підвищити самооцінку?",
        assistant: "Почніть з маленьких перемог. Ставте собі досяжні цілі і відзначайте кожен успіх. Практикуйте позитивні афірмації. Пам'ятайте, що ваша цінність не залежить від думки інших. Ви унікальні і гідні любові та поваги."
    }
];
// Масив шаблонів відгуків
const reviews = [
    {
        text: "Ця колонка змінила моє життя. Тепер я завжди маю підтримку.",
        author: "Олена К."
    },
    {
        text: "Неймовірно зручно мати психолога вдома 24/7.",
        author: "Андрій М."
    },
    {
        text: "Рекомендую всім, хто цінує своє ментальне здоров'я.",
        author: "Ірина В."
    },
    {
        text: "Завдяки цій колонці я навчився краще розуміти свої емоції.",
        author: "Петро С."
    },
    {
        text: "Чудовий помічник у боротьбі зі стресом та тривогою.",
        author: "Марія Д."
    }
]

// Масив особливостей
const features = [
    {
        icon: <Brain className="h-12 w-12 text-yellow-400"/>,
        title: "ШІ-психолог",
        description: "Вбудований штучний інтелект, навчений кращими психологами світу."
    },
    {
        icon: <MessageCircle className="h-12 w-12 text-yellow-400"/>,
        title: "24/7 підтримка",
        description: "Отримуйте психологічну допомогу в будь-який час дня і ночі."
    },
    {
        icon: <Heart className="h-12 w-12 text-yellow-400"/>,
        title: "Персоналізація",
        description: "Колонка адаптується до ваших потреб та особливостей."
    },
    {
        icon: <Check className="h-12 w-12 text-yellow-400"/>,
        title: "Аналіз емоцій",
        description: "Розпізнавання та аналіз емоційного стану користувача."
    },
    {
        icon: <Star className="h-12 w-12 text-yellow-400"/>,
        title: "Медитації",
        description: "Великий вибір медитацій для релаксації та самопізнання."
    }
]

const characteristics = [
    {
        title: "Основне",
        items: [
            { label: "Призначення", value: "розумна колонка з психологічною підтримкою" },
            { label: "Голосовий помічник", value: "ШІ-психолог" },
            { label: "Кількість каналів", value: "1.0" },
        ]
    },
    {
        title: "Технічні характеристики",
        items: [
            { label: "Акустика", value: "2-смугова система / 1 вуфер, 4 твіттери /" },
            { label: "Фазоінвертор", value: "немає" },
        ]
    },
    {
        title: "Інтерфейси і можливості",
        items: [
            { label: "", value: "Wi-Fi 5 (802.11ac), Bluetooth v 5.2, мережеве потокове аудіо" },
            { label: "", value: "Інтелектуальний ШІ-психолог для індивідуальної підтримки" },
            { label: "", value: "Аналіз емоційного стану користувача" },
            { label: "", value: "Персоналізовані рекомендації" },
            { label: "", value: "Голосове управління" },
            { label: "", value: "Мобільний додаток для налаштувань і рекомендацій" },
        ]
    },
    {
        title: "Інше",
        items: [
            { label: "Світлові ефекти", value: "на верхній панелі" },
            { label: "", value: "Сенсорне управління" },
            { label: "Габарити (ВхШхГ)", value: "160x140x140 мм" },
            { label: "Вага", value: "2.1 кг" },
        ]
    },
]

export function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quantity] = useState(1)
    const [currentConversation, setCurrentConversation] = useState(conversationTemplates[0])
    const [displayedUserText, setDisplayedUserText] = useState('')
    const [displayedAssistantText, setDisplayedAssistantText] = useState('')
    const [conversationIndex, setConversationIndex] = useState(0)


    useEffect(() => {
        let userTypingTimer: NodeJS.Timeout;
        let assistantTypingTimer: NodeJS.Timeout;

        // Анімація друкування тексту користувача
        const animateUserTyping = (index: number) => {
            if (index <= currentConversation.user.length) {
                setDisplayedUserText(currentConversation.user.slice(0, index))
                userTypingTimer = setTimeout(() => animateUserTyping(index + 1), 50)
            } else {
                // Почати анімацію відповіді асистента після завершення друкування користувача
                setTimeout(() => animateAssistantTyping(0), 500)
            }
        }

        // Анімація друкування відповіді асистента
        const animateAssistantTyping = (index: number) => {
            if (index <= currentConversation.assistant.length) {
                setDisplayedAssistantText(currentConversation.assistant.slice(0, index))
                assistantTypingTimer = setTimeout(() => animateAssistantTyping(index + 1), 30)
            } else {
                // Перейти до наступного шаблону розмови після паузи
                setTimeout(() => {
                    const nextIndex = (conversationIndex + 1) % conversationTemplates.length
                    setConversationIndex(nextIndex)
                    setCurrentConversation(conversationTemplates[nextIndex])
                    setDisplayedUserText('')
                    setDisplayedAssistantText('')
                }, 5000)
            }
        }

        // Почати анімацію
        animateUserTyping(0)

        // Очистити таймери при розмонтуванні компонента
        return () => {
            clearTimeout(userTypingTimer)
            clearTimeout(assistantTypingTimer)
        }
    }, [currentConversation, conversationIndex])


    return (
        <main className="flex-1">
            <section
                className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary dark:bg-secondary flex justify-center">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4 text-white">
                            <div className="space-y-2">
                                <h1 className="text-3xl text-foreground font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Ваш особистий психолог завжди поруч
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Розумна колонка з вбудованим ШІ-психологом. Отримайте підтримку та поради 24/7.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <Button onClick={() => setIsModalOpen(true)} variant="outline" size="lg"
                                        className="text-black dark:text-white">
                                    Замовити зараз
                                </Button>
                                <Button asChild variant="outline" size="lg" className="text-black dark:text-white">
                                    <Link href="#features">Дізнатися більше</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                alt="Smart Speaker"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                                height="400"
                                src="/placeholder.png"
                                width="600"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32 flex justify-center scroll-mt-[55px]">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Особливості</h2>
                    <Carousel>
                        {features.map((feature, index) => (
                            <Card key={index} className="h-full">
                                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                                    {feature.icon}
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-center text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                </div>
            </section>
            <section id="characteristics"
                     className="w-full py-12 md:py-24 lg:py-32 bg-secondary dark:bg-secondary flex justify-center scroll-mt-[55px]">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Характеристики
                        Lumia</h2>
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col justify-start space-y-4">
                            <Image
                                alt="Lumia колонка"
                                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                                height="400"
                                src="/placeholder.png"
                                width="750"
                            />
                            <div
                                className="flex flex-col bg-background dark:bg-background-dark p-4 rounded-xl md:h-48 h-60 overflow-hidden">
                                <p className="text-xl font-bold mb-2">Приклади спілкування з колонкою:</p>
                                <p className="text-sm text-muted-foreground mb-2">Користувач: {displayedUserText}</p>
                                <p className="text-sm font-medium">Lumia: {displayedAssistantText}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start space-y-4">
                            <div
                                className="flex flex-col space-y-4 h-fit pr-4">
                                {characteristics.map((category, index) => (
                                    <div key={index} className="space-y-2">
                                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">{category.title}</h2>
                                        <ul className="space-y-2">
                                            {category.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-center">
                                                    <Dot className="h-10 w-10 mr-2 text-primary flex-shrink-0"/>
                                                    <p>
                                                        {item.label &&
                                                            <span className="font-bold">{item.label}: </span>}
                                                        {item.value}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="order" className="w-full py-12 md:py-24 lg:py-32 flex justify-center scroll-mt-[55px]">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center text-white">
                        <h2 className="text-3xl text-foreground font-bold tracking-tighter sm:text-5xl">Замовте свою
                            розумну колонку сьогодні</h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                            &quot;{"Зробіть перший крок до покращення вашого ментального здоров'я."}&quot;
                        </p>
                        <Button onClick={() => setIsModalOpen(true)} size="lg" variant="outline"
                                className="text-black dark:text-white">
                            Замовити зараз
                        </Button>
                    </div>
                </div>
            </section>
            <section id="reviews"
                     className="w-full py-12 md:py-24 lg:py-32 bg-secondary dark:bg-secondary flex justify-center scroll-mt-[55px]">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Відгуки
                        клієнтів</h2>
                    <Carousel>
                        {reviews.map((review, index) => (
                            <Card key={index} className="h-full">
                                <CardContent className="flex flex-col items-center space-y-4 p-6 h-full">
                                    <Star className="h-12 w-12 text-yellow-400"/>
                                    <p className="text-center italic">&quot;{review.text}&quot;</p>
                                    <p className="font-bold">- {review.author}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                </div>
            </section>
            <OrderModal
                isOpen={isModalOpen}
                onOpenChangeAction={setIsModalOpen}
                initialQuantity={quantity}
            />
        </main>
    )
}