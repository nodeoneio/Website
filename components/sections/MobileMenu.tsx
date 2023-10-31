'use client';
import { user, logout } from '@/public/assets/icons';
import Image from 'next/image';
import AuthContext from '@/context/auth-context';
import { useContext } from 'react';

const MobileMenu = ({
    showMenu,
    menuToggle,
}: {
    showMenu: boolean;
    menuToggle: () => void;
}) => {
    const auth = useContext(AuthContext);

    return (
        <div
            className={
                showMenu
                    ? 'flex fixed flex-row items-center justify-center flex-1 w-full h-full z-50'
                    : 'hidden'
            }
        >
            <div
                className="fixed text-white w-screen h-screen z-50 bg-transparent cursor-pointer backdrop-blur-sm"
                onClick={menuToggle}
            />

            <div
                className={
                    'fixed flex flex-col justify-center items-center text-body-bold text-white w-[95%] p-5 h-2/3 top-[16%] z-50 bg-glassmorphism backdrop-blur-lg gap-5 rounded-2xl border-1 border-secondary-500'
                }
            >
                {auth.session?.actor ? (
                    <div
                        onClick={auth.onLogout}
                        className="flex flex-col items-center gap-3"
                    >
                        <p className="font-montserrat max-sm:text-heading3-bold">
                            {auth.session.actor.toString()}{' '}(
                            {auth.session.permission.toString()})
                        </p>
                        <div className='flex flex-row gap-3 items-center'>
                            <Image
                                src={logout}
                                alt="logo"
                                width={24}
                                height={24}
                                className="max-sm:w-7 max-sm:h-7"
                            />
                            <p className="font-montserrat max-sm:text-heading3-bold">
                                Logout
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex t-1/2">
                            <p className="font-montserrat max-sm:text-heading3-bold">
                                No Added Accounts
                            </p>
                        </div>
                        <div
                            onClick={auth.onLogin}
                            className="flex flex-row gap-3 items-center"
                        >
                            <Image
                                src={user}
                                alt="logo"
                                width={24}
                                height={24}
                                className="max-sm:w-7 max-sm:h-7"
                            />
                            <p className="font-montserrat max-sm:text-heading3-bold">
                                Add Account
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;
