import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className = 'flex h-screen'>
        <Sidebar />
        <section className = 'flex flex-col flex-1 h-full'>
            <MobileNavigation />
            <Header />
            <div className = 'main-content'>
                {children}
            </div>
        </section>
    </main>
  )
}

export default layout