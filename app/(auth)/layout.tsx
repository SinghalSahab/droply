import React from 'react'
import Image from 'next/image'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
        <section className='hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5'>
            <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12'>
               <div className='flex items-center gap-2 '>
               <Image src="/assets/icons/VectorLogo.png" alt='logo' width={52} height={42} className='h-auto' />
               <h1 className='text-white font-semibold text-2xl'>Droply</h1>
               </div>

               <div className='text-white space-y-5'>
                <h1 className='h1'>Manage your files the best way</h1>
                <p className='body1'>Awesome, we've created the perfect place for you to store all your documents.</p>
               </div>

               <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
            </div>
        </section>
        
        <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
        <div className='flex items-center gap-2 '>
        <Image src="/assets/icons/logo-brand.svg" alt='logo' width={52} height={42} className='h-auto' />
        <h1 className='text-brand font-semibold text-2xl'>Droply</h1>
        </div>
        </div>

        {children}
      </section>
    </div>
  )
}

export default layout