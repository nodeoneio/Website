import { copyrightSign, nodeone_logo } from '@/public/assets/icons';
import { footerLinks, socialMedia } from '@/constants';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="w-full flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
                <div className="w-2/5 flex flex-col items-start">
                    <Link href="/">
                        <Image
                            src={nodeone_logo}
                            alt="footer"
                            width={50}
                            height={50}
                        />
                    </Link>

                    <p className="mt-2 text-base-semibold leading-7 font-montserrat text-white sm:max-w-sm flex">
                        NodeONE 2023.
                    </p>
                    <p className="mt-1 text-base-semibold leading-7 font-montserrat text-white sm:max-w-sm flex gap-2">
                        <Image
                            src={copyrightSign}
                            alt="copyright"
                            width={20}
                            height={20}
                            className="rounded-full m-0"
                        />
                        Copyright, All rights reserved.{' '}
                    </p>

                    <p className="mt-5 text-base leading-7 font-montserrat text-white sm:max-w-sm">
                        We’re a leading Antelope Protocol based block chain
                        validator startup from Seoul, South Korea.
                    </p>
                    <div className="flex items-center gap-5 mt-6">
                        {socialMedia.map((icon: any) => (
                            <div
                                key={icon.alt}
                                className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
                            >
                                <Link
                                    href={icon.src}
                                    target="_blank"
                                >
                                    <Image
                                        src={icon.icon}
                                        alt={icon.alt}
                                        width={30}
                                        height={30}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/5 flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap ">
                    {footerLinks.map((section: any) => (
                        <div key={section}>
                            <h4 className="text-white font-montserrat text-heading3-bold leading-normal mb-6 font-bold">
                                {section.title}
                            </h4>
                            <ul>
                                {section.links.map((link: any) => (
                                    <li
                                        key={link.name}
                                        className="mt-3 text-white font-montserrat text-base leading-normal hover:text-slate-gray cursor-pointer"
                                    >
                                        <Link
                                            href={link.link}
                                            target="_blank"
                                        >
                                            {link.name}{' '}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
