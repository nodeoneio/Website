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
    return (
        <Card className="flex flex-row w-5/6 rounded-none shadow-xl justify-between items-center bg-white">
            <div className="flex flex-col w-1/2 py-8">
                <CardContent>
                    <CardTitle className="text-[90px] space-y-6 font-montserrat text-center">
                        <div>
                            <p>Blockchain</p>
                            <p>is</p>
                            <p>Democracy</p>
                        </div>
                    </CardTitle>
                    <CardDescription className="font-palanquin mt-20 text-heading3-bold px-8 font-semibold text-center block">
                        NodeONE is contributing to a society that promotes sound
                        democracy and governance by utilizing blockchain
                        technology.
                    </CardDescription>
                    <CardFooter className="flex justify-center mt-20 font-montserrat text-heading2-bold text-center">
                        <ul className='space-y-3'>
                            <li>
                                <Link
                                    href="https://eosverse.io"
                                    className="hover:underline underline-offset-auto cursor-pointer"
                                >
                                    EOSVerse
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="https://myvoteeos.com/home"
                                    className="hover:underline underline-offset-auto cursor-pointer"
                                >
                                    MyVoteEOS
                                </Link>
                            </li>
                        </ul>
                    </CardFooter>
                </CardContent>
            </div>
            <div className="flex justify-end w-1/2 border-4 border-red-400 obj">
                <Image
                    src={img_govern}
                    alt="contribution"
                    width={700}
                    height={500}
                />
            </div>
        </Card>
    );
};

export default ContrbutionCard;
