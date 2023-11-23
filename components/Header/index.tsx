'use client';
import Authentication from '@/components/Authentication';
import NavMenu from '@/components/NavMenu';
import NewsHeadlineCard from '@/components/NewsHeadline';

import MenuButton from '../MenuButton';
import { useState, useEffect } from 'react';

import TopLogoCard from '../TopLogoCard';
import MobileMenu from '../sections/MobileMenu';
import { LanguageSelector } from '../LanguageSelector';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    
    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        setShowMenu(false);
    }, []);

    return (
        <>
            {/* TODO: <NewsHeadlineCard /> */}
            <nav className="topbar">
                <div className="flex flex-row w-full justify-between items-center">
                    <TopLogoCard />
                    <NavMenu />
                    <div className='flex gap-3'>
                    <Authentication />
                    <LanguageSelector />
                    </div>
                    
                    <MenuButton toggleMenu={toggleShowMenu} />
                </div>
            </nav>
            <MobileMenu showMenu={showMenu} menuToggle={toggleShowMenu}/>
        </>
    );
};

export default Header;
