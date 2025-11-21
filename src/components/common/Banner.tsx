'use client'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { usePathname } from 'next/navigation'

export default function Banner({ hasProduct = false, productName }: { hasProduct?: boolean, productName?: string }) {
    const pathname = usePathname()
    
    const paths = pathname.split('/').filter(path => path !== '')
    
    const getBreadcrumbName = (path: string, isLast: boolean = false) => {
        if (hasProduct && isLast && productName) {
            return productName
        }
        
        const routeNames: { [key: string]: string } = {
            '': 'Home',
            'shop': 'Shop',
            'cart': 'Cart',
            'checkout': 'Checkout',
            'profile': 'My Profile',
        }
        
        return routeNames[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
    }
    
    return (
        <div className='h-20 w-full bg-white rounded-2xl my-2 flex items-center px-8 gap-2'>
            <Link href='/' className='text-sm text-[#999999] hover:underline font-semibold tracking-wide'>
                Home
            </Link>
            
            {paths.map((path, index) => {
                const href = '/' + paths.slice(0, index + 1).join('/')
                const isLast = index === paths.length - 1
                const label = getBreadcrumbName(path, isLast)
                
                return (
                    <div key={href} className="flex items-center gap-2">
                        <IoIosArrowForward className='text-[#999999]' />
                        {isLast ? (
                            <span className={`text-sm font-semibold tracking-wide ${
                                hasProduct && productName ? 'text-[#999999]' : 'text-black'
                            }`}>
                                {label}
                            </span>
                        ) : (
                            <Link href={href} className='text-sm text-[#999999] hover:underline font-semibold tracking-wide'>
                                {label}
                            </Link>
                        )}
                    </div>
                )
            })}
        </div>
    )
}