import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='w-full min-h-screen bg-[#EBEEF6] max-w-screen-2xl mx-auto overflow-hidden px-6 flex flex-col justify-center items-center max-h-screen'>
                {children}
            </main>
        </>
    )
}
