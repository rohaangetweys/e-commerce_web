import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export default function Banner() {
    return (
        < div className='h-20 w-full bg-white rounded-2xl my-2 flex items-center px-8 gap-2' >
            <Link href='/' className='text-sm text-[#999999] hover:underline font-semibold tracking-wide'>
                Home
            </Link>
            <IoIosArrowForward className='text-[#999999]' />
            <Link href='/shop' className='text-sm text-[#999999] hover:underline font-semibold tracking-wide'>
                Shop
            </Link>
        </div >
    )
}
