import Head from 'next/head';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import MarketGif from '../assets/market.gif';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Interactive Dashboard</title>
                <meta
                    name="description"
                    content="Developed for CMPE 274 at San Jose State University"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins"
                    rel="stylesheet"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="home-background h-screen w-screen">
                <div className="container h-full">
                    <NavBar />
                    <div className="h-full flex items-center justify-center -mt-28">
                        <div>
                            <Image
                                src={MarketGif}
                                alt="LOGO"
                                width={250}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-5xl font-medium">
                                Instacart Market Analysis
                            </div>
                            <div className="mt-5 text-3xl font-medium">
                                CMPE 274 - Business Intelligence Technologies
                            </div>
                        </div>
                        <div className="absolute bottom-5 mt-4 font-medium">
                            &copy; 2023 - Chetan Gour, Kaushal Karinaga Shetter
                            Raju, Pranika Kakkar, Raj Choksi
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
