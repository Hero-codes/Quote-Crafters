import Link from "next/link";
import { Medal } from "lucide-react";
import CalendarClient from "@/components/Calendar"
import { Button } from "@/components/ui/button";

const getData = async () => {
  const res = await fetch('https://zenquotes.io/api/today')
  const data = await res.json();
  return data;
};

export default async function Home() {

  const quotes = await getData();

  return (
    <div className="container mx-auto px-3">

      <h1 className="bg-gradient-to-r text-2xl font-bold text-center mb-3 from-stone-800 via-stone-700 to-stone-600 bg-clip-text text-transparent">Quote Crafters</h1>

      <div className={"flex w-full items-center gap-y-10 flex-col md:flex-row"}>

        <div className="flex w-full md:w-[50%] flex-col items-center space-y-10 justify-center">

          <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
            <Medal className="h-6 w-6 mr-2" />
            No 1 Quote Website
          </div>

          <div className="flex flex-col space-y-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 text-xl md:text-3xl">

            {quotes.map((quote: any) => (
              <div key={quote.q}>
                <span>{quote.q}</span>
                <h3 className="text-lg text-end mt-2">~ {quote.a}</h3>
              </div>
            ))}


          </div>

        </div>

        <div className="md:w-[50%] w-full items-center space-y-5 flex flex-col">
          <div>
            <CalendarClient />
          </div>

          <div className="flex flex-col items-center gap-y-1">
            <span>MM/DD/YYYY</span>
            <span>
              {new Date().toLocaleDateString()}
            </span>
          </div>

          <Link href="/sign-up">
            <Button className="w-fit">Get Started</Button>
          </Link>
        </div>
      </div>

    </div>
  );
};