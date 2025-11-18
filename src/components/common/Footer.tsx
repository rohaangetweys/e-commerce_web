import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    items: FooterLink[];
}

export default function Footer() {
    const footerData: FooterSection[] = [
        {
            title: "TOP CATEGORIES",
            items: [
                { label: "Laptops", href: "/laptops" },
                { label: "PC & Computers", href: "/pc-computers" },
                { label: "Cell Phones", href: "/cell-phones" },
                { label: "Tablets", href: "/tablets" },
                { label: "Gaming & VR", href: "/gaming-vr" },
                { label: "Networks", href: "/networks" },
                { label: "Cameras", href: "/cameras" },
                { label: "Sounds", href: "/sounds" },
                { label: "Office", href: "/office" },
            ],
        },
        {
            title: "COMPANY",
            items: [
                { label: "About Swoo", href: "/about-us" },
                { label: "Contact", href: "/contact" },
                { label: "Career", href: "/career" },
                { label: "Blog", href: "/blog" },
                { label: "Sitemap", href: "/sitemap" },
                { label: "Store Locations", href: "/store-locations" },
            ],
        },
        {
            title: "HELP CENTER",
            items: [
                { label: "Customer Service", href: "/customer-service" },
                { label: "Policy", href: "/policy" },
                { label: "Terms & Conditions", href: "/terms-conditions" },
                { label: "Track Order", href: "/track-order" },
                { label: "FAQs", href: "/faqs" },
                { label: "My Account", href: "/my-account" },
                { label: "Product Support", href: "/product-support" },
            ],
        },
        {
            title: "PARTNER",
            items: [
                { label: "Become Seller", href: "/become-seller" },
                { label: "Affiliate", href: "/affiliate" },
                { label: "Advertise", href: "/advertise" },
                { label: "Partnership", href: "/partnership" },
            ],
        },
    ];

    const socialIcons = [FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaPinterest];

    return (
        <footer className="bg-white w-full pt-20 flex justify-center items-center mt-20">
            <div className="px-6 max-w-screen-2xl w-full">

                <div className="flex justify-between">

                    <div className="flex flex-col gap-7">
                        <h2 className="text-lg font-semibold cursor-default">Swoo - 1st NYC tech online market</h2>

                        <div className="flex flex-col">
                            <h4 className="text-sm">HOTLINE 24/7</h4>
                            <h3 className="text-[30px] text-[#1aba1a] font-bold">(025) 3686 25 16</h3>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm">257 Thatcher Road St, Brooklyn, Manhattan, <br />NY 10092</p>
                            <p className="text-sm">contact@Swootechmart.com</p>
                        </div>

                        <div className="flex gap-4">
                            {
                                socialIcons.map((Icon, index) => (
                                    <div key={index} className="rounded-full flex bg-[#E1E3EB] w-9 h-9">
                                        <Icon className="m-auto" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {
                        footerData.map((section) => {
                            return (
                                <div key={section.title}>
                                    <h2 className="text-lg font-semibold cursor-default">{section.title}</h2>
                                    <div className="flex flex-col gap-4 mt-7">
                                        {section.items.map((link) => {
                                            return (
                                                <p className="text-sm text-[#666666] cursor-pointer hover:text-green-600" key={link.label}>{link.label}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="h-[104px] w-full border-t border-[#999999] mt-16 flex justify-center items-center">
                    <p className="text-sm text-[#666666]">© 2024 SwooTechMart. All Rights Reserved.</p>
                </div>

            </div>
        </footer>
    )
}
