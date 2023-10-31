import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { img_govern } from '@/public/assets/images';

import Image from 'next/image';
import Link from 'next/link';

const ContrbutionCard = () => {
    const bg = (
        <Image
            src={img_govern}
            alt="contribution"
            width={1000}
            height={1000}
            className='max-sm:absolute flex w-1/2 max-sm:w-full max-sm:h-full border-4 max-sm:border-0 border-red-500 max-sm:opacity-30 object-fill'
        />
    );

    return (
        <Card className="relative flex flex-row max-sm:flex-col w-5/6 max-sm:w-full max-sm:mx-2 rounded-none shadow-xl justify-center max-sm:justify-start items-center bg-white">
            <div className="flex flex-col max-sm:w-5/6 w-1/2 py-8 justify-between">
                <CardContent className='flex flex-col justify-between items-center'>
                    <CardTitle className="text-[90px] max-sm:text-heading1-bold space-y-6 font-montserrat text-center">
                        <div>
                            <p>Blockchain</p>
                            <p>is</p>
                            <p>Democracy</p>
                        </div>
                    </CardTitle>
                    <CardDescription className="font-palanquin max-sm:mt-10 mt-20 text-heading3-bold max-sm:px-5 px-8 font-semibold text-center block">
                        NodeONE is dreaming a society that promotes sound
                        democracy and governance by utilizing blockchain
                        technology.
                    </CardDescription>
                    <CardFooter className="mt-20 max-sm:mt-10 font-montserrat text-heading2-bold text-center z-10">
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="https://eosverse.io"
                                    className="hover:underline underline-offset-8 cursor-pointer drop-shadow-md"
                                    target='_blank'
                                >
                                    EOSVerse
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="https://myvoteeos.com/home"
                                    className="hover:underline underline-offset-8 cursor-pointer drop-shadow-md"
                                    target='_blank'
                                >
                                    MyVoteEOS
                                </Link>
                            </li>
                        </ul>
                    </CardFooter>
                </CardContent>
            </div>
            {bg}
            {/* <div className="">
                {bg}
            </div> */}
        </Card>
    );
};

export default ContrbutionCard;
