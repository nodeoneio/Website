'use client';
import { user, logout } from '@/public/assets/icons';
import Image from 'next/image';
import AuthContext from '@/context/auth-context';
import { useContext } from 'react';
import { Logo } from '@wharfkit/session';

const MobileMenu = ({
    showMenu,
    menuToggle,
}: {
    showMenu: boolean;
    menuToggle: () => void;
}) => {
    const auth = useContext(AuthContext);
    let chainLogo = auth.session?.chain.getLogo();

    return (
        <div
            className={
                showMenu
                    ? 'flex fixed flex-row items-center flex-1 w-full h-full z-50'
                    : 'hidden'
            }
        >
            <div
                className="fixed text-white w-full h-full z-50 bg-transparent cursor-pointer backdrop-blur-sm"
                onClick={menuToggle}
            />

            <div
                className={
                    'fixed flex flex-col text-body-bold text-white w-[70%] px-5 py-10 h-screen z-50 bg-glassmorphism backdrop-blur-lg gap-5 rounded-2xl border-1 border-secondary-500'
                }
            >
                <p className="text-heading2-semibold text-white">SideBar</p>
                <div className="h-[2px] bg-slate-600 rounded-lg" />
                {auth.session?.actor ? (
                    <div
                        onClick={auth.onLogout}
                        className="flex flex-col gap-3"
                    >
                        <p className="font-montserrat flex gap-3 items-center max-sm:text-body-bold">
                            {chainLogo ? (
                                <Image
                                    src={chainLogo.toString()}
                                    alt="chainlogo"
                                    width={24}
                                    height={24}
                                    className="max-sm:w-6 max-sm:h-6"
                                />
                            ) : (
                                <p>No Logo</p>
                            )}

                            {auth.session.chain.name}
                        </p>

                        <p className="font-montserrat max-sm:text-body-semibold">
                            {auth.session.actor.toString()} (
                            {auth.session.permission.toString()})
                        </p>
                        <div className="flex flex-row gap-3 mt-5 items-center">
                            <Image
                                src={logout}
                                alt="logo"
                                width={24}
                                height={24}
                                className="max-sm:w-7 max-sm:h-7"
                            />
                            <p className="font-montserrat max-sm:text-body-semibold">
                                Logout
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex t-1/2">
                            <p className="font-montserrat max-sm:text-body-semibold">
                                No Login Accounts
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
                            <p className="font-montserrat max-sm:text-body-semibold">
                                Login
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;
