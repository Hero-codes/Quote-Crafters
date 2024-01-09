import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Library, Star, UserRound, ChevronRight, Blocks, Download } from "lucide-react"
import { Button } from '@/components/ui/button';

export default async function Extension() {

    const user = await currentUser();

    return (
        <div className='max-w-5xl mx-auto px-3'>

            <div className='flex space-x-1 font-semibold items-center justify-center mb-8'>
                <Link href='/'>Home</Link>
                <ChevronRight />
                <span>Extension Page</span>
            </div>

            <div className='flex flex-col justify-center md:flex-row gap-y-10'>

                <div className='md:w-[40%] py-4 w-full flex flex-col space-y-9'>
                    <div className='flex flex-col items-center gap-y-4'>
                        <Image
                            src={user?.imageUrl!}
                            alt="..."
                            height={100}
                            width={100}
                            className='rounded-full' />

                        <h1 className='font-semibold text-lg'>{user?.firstName} {user?.lastName}</h1>
                    </div>

                    <div className='flex flex-col space-y-4'>

                        <Link href="/profile" className='flex rounded-md py-3 px-2 items-center gap-1 hover:bg-gray-200 transition'>
                            <UserRound />
                            <span>Profile</span>
                        </Link>

                        <Link href="/quotes" className='flex rounded-md py-3 px-2 items-center gap-1 hover:bg-gray-200 transition'>
                            <Library />
                            <span>Your Quotes</span>
                        </Link>

                        <Link href="/favourites" className='flex rounded-md py-3 px-2 items-center gap-1 hover:bg-gray-200 transition'>
                            <Star />
                            <span>Favourites</span>
                        </Link>

                        <Link href="/extension" className='flex rounded-md py-3 px-2 items-center gap-1 hover:bg-gray-200 transition'>
                            <Blocks />
                            <span>Extension</span>
                        </Link>

                    </div>
                </div>

                <div className='ml-auto md:w-[50%] w-full'>
                    <h3 className='text-xl font-semibold mb-10'>Download Our Extension</h3>

                    <div className='flex flex-col space-y-7'>

                        <video
                            src='/extension.mp4'
                            poster='/banner.png'
                            controls
                        />

                        <a target='_blank' className='w-full' href="https://github.com/RitheshP23/1-8-2024/blob/main/Quotify-10.zip" download={"extension"}>
                            <Button className='flex w-full gap-x-2 items-center'>
                                Download Extension
                                <Download />
                            </Button>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}