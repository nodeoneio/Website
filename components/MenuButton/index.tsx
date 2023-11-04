import Image from 'next/image';
import { menu } from '@/public/assets/icons';

const MenuButton = ({ toggleMenu }: { toggleMenu: () => void }) => {
    return (
        <div
            className="flex flex-col items-center md:hidden cursor-pointer"
            onClick={toggleMenu}
        >
            <Image
                src={menu}
                alt="menu"
                width={40}
                height={40}
                className="invert"
            />
        </div>
    );
};

export default MenuButton;
