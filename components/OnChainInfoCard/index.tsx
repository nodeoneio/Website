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
        <Card className="max-w-xs shadow-xl border-secondary-500 bg-white">
            <CardContent className="flex flex-col justify-between pt-4">
                <CardTitle className="text-heading1-bold font-montserrat text-center text-secondary-500">
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
