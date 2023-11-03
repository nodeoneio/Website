'use client';
import { topNavLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../ui/badge';

const Page = () => {
    const pathName = usePathname();
    return (
        <div className="flex w-full flex-1 flex-row gap-1 px-6 justify-end max-sm:hidden">
            {topNavLinks.map((link) => {
                const isActive =
                    (pathName.includes(link.route) && link.route.length > 1) ||
                    pathName === link.route;

                return (
                    <Link
                        href={link.route}
                        key={link.label}
                        className={`leftsidebar_link ${
                            isActive && 'bg-primary-500'
                        }`}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}
                        />
                        <p className="text-light-1 max-lg:hidden">
                            {link.label}
                        </p>
                        {link.badge && (
                            <Badge
                                variant="outline"
                                className="bg-slate-400 text-subtle-medium"
                            >
                                {link.badge}
                            </Badge>
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default Page;
