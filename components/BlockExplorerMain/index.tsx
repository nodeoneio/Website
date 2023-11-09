import OnChainInfoCard, { OnChainInfoTypeProps } from '../OnChainInfoCard';
import ProducerTable, { ProducerType } from '../ProducerTable.tsx';

const BlockExplorerMain = ({
    liveInfo,
    producers,
}: {
    liveInfo: OnChainInfoTypeProps[] | undefined;
    producers: ProducerType[] | undefined;
}) => {
    return (
        <>
            <div className="flex flex-row flex-wrap w-full gap-3 justify-between text-body-bold">
                {liveInfo?.map((i) => (
                    <OnChainInfoCard
                        key={i.title}
                        title={i.title}
                        data={i.data}
                    />
                ))}
            </div>
            <div className="w-full h-[3px] mt-6 mb-3 bg-slate-500 rounded-lg" />
            <div className="w-full h-full">
                {producers ? (
                    <ProducerTable data={producers} />
                ) : (
                    <p className="w-full text-center">No Data</p>
                )}
            </div>
        </>
    );
};

export default BlockExplorerMain;
