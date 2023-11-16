import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { spinner } from '@/public/assets/icons';
import Image from 'next/image';

export type OnChainInfoTypeProps = {
    title: string;
    data: string | number;
};
const OnChainInfoCard = ({
    title,
    data,
    isLiveInfoLoading,
}: {
    title: string;
    data: string | number;
    isLiveInfoLoading: boolean;
}) => {
    return (
        <Card className="flex flex-1 items-center justify-center max-w-xs shadow-xl border-secondary-500 bg-white pt-5">
            <CardContent className="flex flex-col justify-between  text-secondary-500 ">
                <CardTitle className="font-montserrat text-center">
                    {title}
                </CardTitle>
                <CardDescription className="flex justify-center mt-3 text-center font-palanquin  text-secondary-500">
                    {isLiveInfoLoading ? (
                        <Image
                            src={spinner}
                            alt="spinner"
                            width={30}
                            height={30}
                        />
                    ) : (
                        data
                    )}
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default OnChainInfoCard;
