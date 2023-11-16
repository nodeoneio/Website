import OnChainInfoCard, { OnChainInfoTypeProps } from '../OnChainInfoCard';
import ProducerTable, {
    bpInfoType,
    columnDataType,
} from '../ProducerTable.tsx';

const BlockExplorerMain = ({
    liveInfo,
    producers,
    setCurrentPage,
    setPageSize,
    currentPage,
    pageSize,
    totalCount,
    isLiveInfoLoading,
}: {
    liveInfo: OnChainInfoTypeProps[] | undefined;
    producers: bpInfoType[] | undefined;
    setCurrentPage: (page: number) => void;
    setPageSize: (page: number) => void;
    currentPage: number;
    pageSize: number;
    totalCount: number;
    isLiveInfoLoading: boolean;
}) => {
    // console.log(producers);
    const data =
        producers &&
        producers.map((producer) => {
            const isBPJsonExist = producer.bp_json[0] ? true : false;

            const res: columnDataType = {
                rank: producer.rank,
                logo: isBPJsonExist
                    ? producer.bp_json[0].org.branding
                        ? producer.bp_json[0].org.branding.logo_256
                        : ''
                    : '',
                name: isBPJsonExist
                    ? producer.bp_json[0].org.candidate_name
                    : producer.owner,
                url: isBPJsonExist
                    ? producer.bp_json[0].org.website
                    : producer.url,

                location: isBPJsonExist
                    ? producer.location + ' (' +
                      [
                          producer.bp_json[0].org.location.name,
                          producer.bp_json[0].org.location.country,
                      ].join(', ') +
                      ')'
                    : producer.location,
                total_votes: Number(producer.total_votes),
            };

            return res;
        });

    // console.log(data);

    return (
        <>
            <div className="flex flex-row flex-wrap w-full gap-3 justify-between text-body-bold">
                {liveInfo?.map((i) => (
                    <OnChainInfoCard
                        key={i.title}
                        title={i.title}
                        data={i.data}
                        isLiveInfoLoading={isLiveInfoLoading}
                    />
                ))}
            </div>
            <div className="w-full h-[3px] mt-6 mb-3 bg-slate-500 rounded-lg" />
            <div className="w-full h-full">
                {data ? (
                    <ProducerTable
                        data={data}
                        setCurrentPage={setCurrentPage}
                        setPageSize={setPageSize}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalCount={totalCount}
                        isLiveInfoLoading={isLiveInfoLoading}
                    />
                ) : (
                    <div className="w-full h-screen text-center">
                        {!isLiveInfoLoading && 'No Chain Data'}
                    </div>
                )}
            </div>
        </>
    );
};

export default BlockExplorerMain;
