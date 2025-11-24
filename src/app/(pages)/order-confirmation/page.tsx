import { Suspense } from 'react'
import SearchSection from '@/components/common/SearchSection'
import Banner from '@/components/common/Banner'
import OrderConfirmationContent from '@/components/checkout/OrderConfirmationContent'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function OrderConfirmationPage({ searchParams }: PageProps) {
    const params = await searchParams
    const orderId = params.orderId as string

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />
            <Suspense fallback={
                <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8 flex justify-center">
                    <div className="text-lg">Loading order confirmation...</div>
                </div>
            }>
                <OrderConfirmationContent orderId={orderId} />
            </Suspense>
        </div>
    )
}