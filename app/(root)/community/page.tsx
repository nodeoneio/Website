'use client';
import { communuty_bg } from '@/public/assets/images';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const page = () => {
    const [t] = useTranslation();
    return (
        <div className="relative w-screen">
            <Image
                src={communuty_bg}
                alt="Community"
                width={1920}
                height={720}
                className="object-cover w-[1920px] h-[1080px] mt-20 max-sm:h-[900px]"
            />

            <h1 className="absolute flex font-montserrat w-full text-center top-1/2 text-heading1-bold text-secondary-500 drop-shadow-xl max-sm:mx-2 max-sm:text-heading2-semibold">
                <p className='w-full justify-center items-center text-center'>
                    NodeONE is preparing to listen to the rights of token
                    holders.
                </p>

                {/* {t('Community_BuildMessage')} */}
            </h1>
        </div>
    );
};

export default page;
