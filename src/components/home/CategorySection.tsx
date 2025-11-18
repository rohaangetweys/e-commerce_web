import React from 'react'
import CategoryCard from '../cards/CategoryCard'

const categories = [
    {
        title: "AUDIOS & CAMERAS",
        promoImage: "/audiocard.png",
        items: [
            { image: "/category/speaker.png", name: "Speaker", itemCount: "12 Items" },
            { image: "/category/camera.png", name: "DSLR Camera", itemCount: "9 Items" },
            { image: "/category/earbuds.png", name: "Earbuds", itemCount: "5 Items" },
            { image: "/category/mic.png", name: "Microphone", itemCount: "12 Items" },
        ],
    },
    {
        title: "GAMING",
        promoImage: "/gamingcard.png",
        items: [
            { image: "/category/monitor.png", name: "Monitors", itemCount: "28 Items" },
            { image: "/category/chair.png", name: "Chair", itemCount: "12 Items" },
            { image: "/category/controller.png", name: "Controller", itemCount: "9 Items" },
            { image: "/category/keyboard.png", name: "Keyboards", itemCount: "30 Items" },
        ],
    },
    {
        title: "OFFICE EQUIPMENTS",
        promoImage: "/officecard.png",
        items: [
            { image: "/category/printer.png", name: "Printers", itemCount: "9 Items" },
            { image: "/category/network.png", name: "Network", itemCount: "90 Items" },
            { image: "/category/security.png", name: "Security", itemCount: "12 Items" },
            { image: "/category/projector.png", name: "Projectors", itemCount: "12 Items" },
        ],
    },
]

export default function CategorySection() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {categories.map((c, i) => (
                <CategoryCard
                    key={i}
                    title={c.title}
                    promoImage={c.promoImage}
                    items={c.items}
                />
            ))}
        </div>
    )
}
