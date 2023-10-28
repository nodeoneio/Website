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

type ChainCardTypeProps = {
    image: string;
    title: string;
    description: string;
    link: string;
};
const ChainCard = ({ image, title, description, link }: ChainCardTypeProps) => {
    return (
        <Card className="w-[350px] shadow-xl border-secondary-500 bg-white">
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
                <Button
                    variant="outline"
                    className="bg-primary-500 text-white "
                >
                    More about {title}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ChainCard;
