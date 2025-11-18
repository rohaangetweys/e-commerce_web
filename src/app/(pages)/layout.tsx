import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className='w-full h-full bg-[#EBEEF6] max-w-screen-2xl mx-auto overflow-hidden max-sm:px-0 px-6  pt-[92px]'>
                {children}
            </main>
            <Footer />
        </>
    )
}
