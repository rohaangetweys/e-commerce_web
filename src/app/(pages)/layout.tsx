import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full h-full bg-[#EBEEF6]'>
            {children}
        </main>
    )
}
