import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';

export type OnChainInfoTypeProps = {
    title: string;
    data: string | number;
};
const OnChainInfoCard = ({ title, data }: OnChainInfoTypeProps) => {
    return (
        <Card className="flex flex-1 items-center justify-center max-w-xs shadow-xl border-secondary-500 bg-white pt-5">
            <CardContent className="flex flex-col justify-between  text-secondary-500 ">
                <CardTitle className="font-montserrat text-center">
                    {title}
                </CardTitle>
                <CardDescription className="mt-3 text-center font-palanquin block text-secondary-500">
                    {data}
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default OnChainInfoCard;
