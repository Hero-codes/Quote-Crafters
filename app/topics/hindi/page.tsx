import React from 'react';
import { Button } from '@/components/ui/button'
import { getXataClient } from '@/src/xata';
import { currentUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import RefreshBtn from '@/components/RefreshBtn';

const xata = getXataClient();

async function getHindiQuotes() {
    const response = await fetch("https://hindi-quotes.vercel.app/random", {
        cache: "no-store"
    });
    const quotes = await response.json();
    return quotes.quote;
}

export default async function HindiQuote() {

    const user = await currentUser();

    const hindiQuote = await getHindiQuotes();

    const addFavQuote = async (e: FormData) => {
        "use server"

        const quote = e.get("quote") as string;

        const addQuote = await xata.db.FavouriteQuotes.create({
            user_id: user?.id,
            quote,
            category: "Hindi"
        });

        revalidatePath("/favourites");
        redirect("/favourites");
    }

    return (
        <div className='px-3 flex flex-col justify-center space-y-7 items-center'>

            <span className='capitalize text-3xl font-semibold'>Topic: Hindi Quote</span>

            <div className='bg-gradient-to-r from-rose-300 via-fuchsia-400 to-indigo-500 rounded-xl p-10 flex flex-col space-y-3'>

                <span className='block mb-2 text-xl'>{hindiQuote}</span>
                <form action={addFavQuote} className='flex items-center justify-center'>

                    <input type='hidden' name='quote' value={hindiQuote} />

                    <Button variant={"secondary"} className='w-fit mt-2 bg-pink-500'>
                        Add To
                        <Heart className='ml-1' />
                    </Button>
                </form>

            </div>

            <div className='flex gap-x-1'>
                <Link href="/topics">
                    <Button>GO BACK</Button>
                </Link>

                <RefreshBtn />
            </div>
        </div >
    )
}