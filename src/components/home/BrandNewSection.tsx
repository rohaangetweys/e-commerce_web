import BrandNewCard from '../cards/BrandNewCard'

export default function BrandNewSection() {
    const items = [
        {
            image: "/brandnew1.png",
            title: "Zumac Steel Computer Case",
            description: "And an option to upgrade every three years",
        },
        {
            image: "/brandnew2.png",
            title: "Summer Sale with Sale up to 50% OFF for Foam Gaming Chair.",
            description: "Limited time offer. Hurry up",
        },
        {
            image: "/brandnew3.png",
            title: "Summer Sale with Sale up to 50% OFF for Foam Gaming Chair.",
            description: "Limited time offer. Hurry up",
        },
        {
            image: "/brandnew4.png",
            title: "iPed Pro Mini 6 - Powerful I in hand",
            description:
                "From $19.99/month for 36 months. $280.35 final payment due in month 37",
        },
    ];

    return (
        <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
            <h2 className="text-lg font-semibold cursor-default mb-6">BRAND NEW FOR YOU</h2>

            <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
                <div className="flex gap-6 w-full">
                    {items.map((item, i) => (
                        <BrandNewCard
                            key={i}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
