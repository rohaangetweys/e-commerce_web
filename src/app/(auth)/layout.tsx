import Header from '@/components/common/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <Header isAuthPage /> */}
            <main className='w-full min-h-screen bg-[#EBEEF6] max-w-screen-2xl mx-auto overflow-hidden px-6 flex flex-col justify-center items-center'>
                {children}
            </main>
        </>
    )
}
