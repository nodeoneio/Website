'use client';

import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import OnChainInfoCard, {
    OnChainInfoTypeProps,
} from '@/components/OnChainInfoCard';

import { chainIdsToIndices } from '@wharfkit/session';

import AuthContext from '@/context/auth-context';
import SelectChain from '@/components/SelectChain';

const page = () => {
    const [info, setInfo] = useState<OnChainInfoTypeProps[]>();
    const [producers, setProducers] = useState<OnChainInfoTypeProps[]>();
    const ctx = useContext(AuthContext);

    const fetchProducers = async () => {
        // session kit 이 BlockExplorer 의 모든 기능을 구현하기엔 미비한 부분이 있어서 일단 버전업/기능확충 대기.
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
    };
    const fetchCurrentBlock = async () => {
        // session kit 이 BlockExplorer 의 모든 기능을 구현하기엔 미비한 부분이 있어서 일단 버전업/기능확충 대기.
        //const res = await ctx.session?.client.v1.chain.get_info();
        const response = await fetch('/jungle/v1/chain/get_info');

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
                title: 'Irreversible Block',
                data: info?.last_irreversible_block_num
                    ? info?.last_irreversible_block_num
                    : 0,
            },
            {
                title: 'Irreversible Block Time',
                data: info?.last_irreversible_block_time
                    ? new Date(
                          info?.last_irreversible_block_time
                      ).toLocaleString()
                    : '-',
            },
        ];

        setInfo(infoType);
    };

    useEffect(() => {
        //fetchProducers();
        fetchCurrentBlock();
        // const interval = setInterval(() => {
        //     fetchCurrentBlock();
        // }, 10000);

        //return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col w-full h-screen pt-32 bg-secondary-500 items-center text-white text-body-bold">
            <div className="text-center">
                <h1 className="text-heading1-bold font-montserrat text-white sm:text-4.5xl">
                    NodeONE Blockchain Explorer
                </h1>
                <p className="mt-2 text-heading3-bold font-palanquin sm:text-base">
                    Explore accounts, transactions, blocks, and on-chain data
                    for the Antelope Based Blockchains.
                </p>
            </div>

            <div className="flex w-full mt-10 justify-center items-center space-x-2">
                <SelectChain />
                <Input
                    type="search"
                    placeholder="Search for the Accounts, Transactions or Blocks..."
                />
                <Button
                    type="submit"
                    className="bg-slate-500"
                >
                    Search
                </Button>
            </div>
            <div className="flex flex-row my-10 gap-5 justify-center items-center text-white text-body-bold">
                {info?.map((i) => (
                    <OnChainInfoCard
                        key={i.title}
                        title={i.title}
                        data={i.data}
                    />
                ))}
            </div>
        </div>
    );
};

export default page;
