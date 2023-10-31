import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import Image from 'next/image';
import Link from 'next/link';

type ChainCardTypeProps = {
    image: string;
    title: string;
    description: string;
    link: string;
};
const ChainCard = ({ image, title, description, link }: ChainCardTypeProps) => {
    return (
        <Card className="max-w-xs shadow-xl border-secondary-500 bg-white">
            <div className="flex flex-col h-4/5">
                <CardHeader className="flex items-center">
                    <Image
                        src={image}
                        alt={title}
                        width={100}
                        height={100}
                    />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-heading2-semibold text-center">
                        {title}
                    </CardTitle>
                    <CardDescription className="mt-3 text-center block">
                        {description}
                    </CardDescription>
                </CardContent>
            </div>
            <CardFooter className="relative w-full justify-center">
                <Link
                    href={link}
                    target="_blank"
                >
                    <Button
                        variant="outline"
                        className="bg-primary-500 text-white text-center "
                    >
                        More about {title}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ChainCard;
