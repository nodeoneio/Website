'use client';

import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OnChainInfoTypeProps } from '@/components/OnChainInfoCard';
import SelectChain from '@/components/SelectChain';
import { ProducerType } from '@/components/ProducerTable.tsx';
import BlockExplorerMain from '@/components/BlockExplorerMain';

import { nodeone_logo } from '@/public/assets/icons';
import AuthContext from '@/context/auth-context';

import { chainIdsToIndices } from '@wharfkit/session';
import Image from 'next/image';
import path from 'path';

const page = () => {
    const [liveInfo, setLiveInfo] = useState<OnChainInfoTypeProps[]>();
    const [producers, setProducers] = useState<ProducerType[]>();
    const [chainId, setChainId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [totalCount, setTotalCount] = useState(0);

    const ctx = useContext(AuthContext);

    const fetchProducers = async () => {
        // TODO: session kit 이 BlockExplorer 의 모든 기능을 구현하기엔 미비한 부분이 있어서 일단 버전업/기능확충 대기.
        // const res = await ctx.session?.client.v1.chain.get_producer_schedule();
        // console.log('URL: ' + ctx.session?.chain.url);
        // if (res) {
        //     console.log(JSON.stringify(res.toJSON()));
        //     const producers = res.active.producers.map((producer) => ({
        //         p: producer.producer_name.toString(),
        //         i: producer.authority.toString(),
        //     }));
        //     console.log('active: ' + res.active.producers);
        //     console.log('active: ' + producers.reduce);
        //     console.log(
        //         'pending: ' + (res.pending ? res.pending.producers : 'empty')
        //     );
        //     console.log(
        //         'proposed: ' + (res.proposed ? res.proposed.producers : 'empty')
        //     );
        // }
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         limit: '21',
        //         lower_bound: 'lioninjungle',
        //         json: true,
        //     }),
        // };
        // const response = await fetch(
        //     '/jungle/v1/chain/get_producers',
        //     requestOptions
        // );

        const pathStr = path.join(
            '/api-n1/getproducers',
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

        //const response = await fetch('/jungle/v1/chain/get_info');
        const response = await fetch('/eos/v1/chain/get_info');

        const info = await response.json();
        const infoType: OnChainInfoTypeProps[] = [
            {
                title: 'Chain',
                data: chainIdsToIndices.get(info?.chain_id),
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
        fetchProducers();
        if (chainId !== '') fetchLiveBlock();
        // const interval = setInterval(() => {
        //     fetchCurrentBlock();
        // }, 10000);

        //return () => clearInterval(interval);
    }, [chainId, currentPage, pageSize]);

    return (
        <div className="flex flex-col w-full h-full pt-32 bg-secondary-500 items-start text-white text-body-bold">
            <div className="flex flex-row max-md:flex-col w-full justify-between max-md:items-start items-end text-left gap-5">
                <h1 className="text-heading1-bold font-montserrat text-white sm:text-4.5xl">
                    Blockchain Explorer
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
                <SelectChain setSelectedChain={setChainId} />
                <div className="flex w-full gap-2">
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

            {chainId ? (
                <BlockExplorerMain
                    liveInfo={liveInfo}
                    producers={producers}
                    setCurrentPage={setCurrentPage}
                    setPageSize={setPageSize}
                    totalCount={totalCount}
                />
            ) : (
                <div className="w-full h-screen text-heading1-bold text-center">
                    Please Select a Blockchain
                </div>
            )}
        </div>
    );
};

export default page;
