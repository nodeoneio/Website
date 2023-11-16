'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OnChainInfoTypeProps } from '@/components/OnChainInfoCard';
import SelectChain from '@/components/SelectChain';
import { bpInfoType } from '@/components/ProducerTable.tsx';
import BlockExplorerMain from '@/components/BlockExplorerMain';

import { nodeone_logo } from '@/public/assets/icons';
import { chainIdsToIndices } from '@wharfkit/session';
import Image from 'next/image';
import path from 'path';

const page = () => {
    const [liveInfo, setLiveInfo] = useState<OnChainInfoTypeProps[]>();
    const [producers, setProducers] = useState<bpInfoType[]>();
    const [chainId, setChainId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [totalCount, setTotalCount] = useState(0);
    const [isPageInfoLoading, setIsPageInfoLoading] = useState(false);

    const fetchProducers = async () => {
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

    const fetchLiveBlock = async () => {
        // TODO: session kit 이 BlockExplorer 의 모든 기능을 구현하기엔 미비한 부분이 있어서 일단 버전업/기능확충 대기.
        //const res = await ctx.session?.client.v1.chain.get_info();
        const chainName = String(chainIdsToIndices.get(chainId)) || '-';

        const getInfo = async () => {
            if (chainName !== '-') {
                const response = await fetch(
                    path.join(chainName, 'v1', 'chain', 'get_info')
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
            if (chainId !== '') {
                // console.log(chainId);
                setIsPageInfoLoading(true);
                await fetchLiveBlock();
                await fetchProducers();
                setIsPageInfoLoading(false);
            }
        };

        init();
        // const interval = setInterval(() => {
        //     fetchCurrentBlock();
        // }, 10000);

        //return () => clearInterval(interval);
    }, [chainId, currentPage]);
    // }, [chainId, currentPage, pageSize]);

    const isExplorerDataEmpty =
        chainId === '' && !isPageInfoLoading ? true : false;

    return (
        <div className="flex flex-col w-full h-full pt-32 bg-secondary-500 items-start text-white text-body-bold">
            <div className="flex flex-row max-md:flex-col w-full justify-between max-md:items-start items-end text-left gap-5">
                <h1 className="text-heading1-bold font-montserrat text-white sm:text-4.5xl">
                    Blockchain Explorer
                    <span className="text-body-medium font-palanquin ml-5">
                        v1.0 (alpha)
                    </span>
                </h1>
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-white text-body-medium font-palanquin">
                        Powered by{' '}
                        <span className="text-body-bold">NodeONE</span>
                    </p>
                    <Image
                        src={nodeone_logo}
                        alt="logo"
                        width={20}
                        height={20}
                        className="max-sm:w-13 max-sm:h-13"
                    />
                </div>
            </div>

            <div className="flex max-md:flex-col w-full mt-5 justify-start items-start gap-2">
                <SelectChain
                    setSelectedChain={setChainId}
                    setCurrentPage={setCurrentPage}
                />
                <div
                    className={`flex w-full gap-2 ${
                        chainId ? '' : 'pointer-events-none opacity-70'
                    }`}
                >
                    <Input
                        type="search"
                        placeholder="Search for the Accounts, Transactions or Blocks..."
                        className="text-secondary-500"
                    />
                    <Button
                        type="submit"
                        className="bg-slate-500"
                    >
                        Search
                    </Button>
                </div>
            </div>
            <div className="w-full h-[3px] my-5 bg-slate-500 rounded-lg" />

            {isExplorerDataEmpty ? (
                <div className="w-full h-screen text-heading1-bold text-center">
                    Please Select a Blockchain
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
