import Link from 'next/link';
import Image from 'next/image';
import Authentication from '@/components/Authentication';
import NavMenu from '@/components/NavMenu';
import NewsHeadlineCard from '@/components/NewsHeadline'
import { nodeone_logo } from '@/public/assets/icons';

const Header = () => {
    return (
        <div className='flex flex-col flex-1 w-full'>
            {/* TODO: <NewsHeadlineCard /> */}
            <nav className="topbar">
                <Link
                    href="/"
                    className="flex items-center gap-4"
                >
                    <Image
                        src={nodeone_logo}
                        alt="logo"
                        width={70}
                        height={70}
                    />
                    <div className="flex flex-col max-xs:hidden ml-1">
                        <p className="text-heading2-bold text-white font-montserrat">
                            NodeONE
                        </p>
                        <p className="text-heading5-bold text-white font-montserrat">
                            We are All One, or None
                        </p>
                    </div>
                </Link>
                <NavMenu />
                <Authentication />
            </nav>
        </div>
    );
};

export default Header;
