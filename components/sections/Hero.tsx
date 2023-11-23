'use client'
import Image from 'next/image';
import { nodeone_hero1 } from '@/public/assets/images';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const [t] = useTranslation();
    return (
        <div className="relative w-screen">
            <Image
                src={nodeone_hero1}
                alt="nodeone hero"
                width={1920}
                height={720}
                className="object-cover w-[1920px] h-[1080px] max-sm:h-[900px] shadow-xl border-y-2 border-black"
            />

            <div className="absolute flex flex-col justify-center top-1/3 bg-slate-400 w-full h-1/3 bg-opacity-40 border-y-2 border-slate-800">
                <h1 className="font-montserrat text-center text-heading1-bold text-white drop-shadow-xl mx-32 max-sm:mx-2 max-sm:text-heading2-semibold">
                    {t('Hero_Message')}
                </h1>
            </div>
        </div>
    );
};

export default Hero;
