'use client';

import { useEffect, useState } from 'react';
import { OnChainInfoTypeProps } from '@/components/OnChainInfoCard';
import { bpInfoType } from '@/components/ProducerTable.tsx';
import BlockExplorerMain from '@/components/BlockExplorerMain';
import { useTranslation } from 'react-i18next';
import { chainIdsToIndices } from '@wharfkit/session';
import path from 'path';
import { getChainIdsFromNames } from '@/lib/utils';
// import { useContext } from 'react';
// import ChainInfoContext from '@/context/blockexplorer-ctx';

const page = ({ params }: { params: { chainName: string } }) => {
    const [liveInfo, setLiveInfo] = useState<OnChainInfoTypeProps[]>();
    const [producers, setProducers] = useState<bpInfoType[]>();
    const [currentChain, setCurrentChain] = useState(params.chainName.toUpperCase())
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [totalCount, setTotalCount] = useState(0);
    const [isPageInfoLoading, setIsPageInfoLoading] = useState(false);
    const [t] = useTranslation();

    const isExplorerDataEmpty =
        !params.chainName && !isPageInfoLoading ? true : false;
        // !ctx.currentChainInfo && !isPageInfoLoading ? true : false;

    const fetchProducers = async (chainId: string) => {
        const pathStr = path.join(
            '/api-n1/getproducers',
            chainId,
            String(currentPage),
            String(pageSize)
        );
        const response = await fetch(pathStr);
        const data = await response.json();

        setProducers(data.producers);
        setTotalCount(data.totalCount);
    };

    const fetchLiveBlock = async (chainId: string) => {
        // TODO: session kit 이 BlockExplorer 의 모든 기능을 구현하기엔 미비한 부분이 있어서 일단 버전업/기능확충 대기.
        //const res = await ctx.session?.client.v1.chain.get_info();
        const chainName = String(chainIdsToIndices.get(chainId)) || '-';

        const getInfo = async () => {
            if (chainName !== '-') {
                const response = await fetch(
                    path.join(
                        '/' + chainName.toLowerCase(),
                        'v1',
                        'chain',
                        'get_info'
                    )
                );

                return await response.json();
            }

            return;
        };

        const info = await getInfo();

        const infoType: OnChainInfoTypeProps[] = [
            {
                title: 'Chain',
                data: chainName,
            },
            {
                title: 'Head Block',
                data: info?.head_block_num ? info?.head_block_num : 0,
            },
            {
                title: 'Head Block Time',
                data: info?.head_block_time
                    ? new Date(info?.head_block_time).toLocaleString()
                    : '-',
            },
            {
                title: 'Producer',
                data: info?.head_block_producer
                    ? info?.head_block_producer
                    : '-',
            },
            {
                title: 'LIB',
                data: info?.last_irreversible_block_num
                    ? info?.last_irreversible_block_num
                    : 0,
            },
            {
                title: 'LIB Time',
                data: info?.last_irreversible_block_time
                    ? new Date(
                          info?.last_irreversible_block_time
                      ).toLocaleString()
                    : '-',
            },
        ];

        setLiveInfo(infoType);
    };

    useEffect(() => {
        const init = async () => {
            if (params.chainName) {
                const cId = getChainIdsFromNames([params.chainName])[0].value;
                setIsPageInfoLoading(true);
                await fetchLiveBlock(cId);
                await fetchProducers(cId);
                setIsPageInfoLoading(false);
            }
        };
        //ctx.onSetCurrentChain(params.chainName);
        init();
        // const interval = setInterval(() => {
        //     fetchCurrentBlock();
        // }, 10000);

        //return () => clearInterval(interval);
    }, [currentPage]);
    // }, [ctx.currentChainInfo, currentPage]);

    return (
        <div>
            {isExplorerDataEmpty ? (
                <div className="w-full h-screen text-heading1-bold text-center">
                    {t('EmptyBlockExplorerMessage')}
                </div>
            ) : (
                <BlockExplorerMain
                    liveInfo={liveInfo}
                    producers={producers}
                    setCurrentPage={setCurrentPage}
                    setPageSize={setPageSize}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    isLiveInfoLoading={isPageInfoLoading}
                />
            )}
        </div>
    );
};

export default page;
