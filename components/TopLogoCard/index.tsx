import Link from 'next/link';
import Image from 'next/image';
import { nodeone_logo } from '@/public/assets/icons';

const TopLogoCard = () => {
    return (
        <Link
            href="/"
            className="flex items-center gap-4"
        >
            <Image
                src={nodeone_logo}
                alt="logo"
                width={60}
                height={60}
                className="max-sm:w-13 max-sm:h-13"
            />
            <div className="flex flex-col">
                <p className="text-heading2-bold text-white font-montserrat max-sm:text-heading3-bold">
                    NodeONE
                </p>
                <p className="text-white font-montserrat max-sm:text-[15px] whitespace-nowrap">
                    We are All One, or None
                </p>
            </div>
        </Link>
    );
};

export default TopLogoCard;
