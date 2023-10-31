import { Button } from '../ui/button';
import { bg_devdocs } from '@/public/assets/images';
import Image from 'next/image';
import Link from 'next/link';

const Devdocs = () => {
    return (
        <div className="relative w-screen flex flex-row-reverse">
            <Image
                src={bg_devdocs}
                alt="bg_devdocs"
                width={1920}
                height={1080}
                className="object-cover w-[1920px] h-[900px] shadow-xl border-y-2 border-black"
            />
            <div className="absolute flex flex-col gap-10 w-1/6 max-sm:w-1/4 right-1/4 max-sm:right-1/4 top-1/4 ">
                <h1 className="relative font-montserrat w-full block text-left text-heading1-bold max-sm:text-heading2-semibold text-white">
                    Localized Antelope Leap Technical Document for Korean
                    Developers
                </h1>
                <Link href="https://devdocs.nodeone.network" target="_blank">
                    <Button
                        variant="outline"
                        className="relative w-full font-palanquin font-semibold bg-primary-500 text-white "
                    >
                        More
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Devdocs;
