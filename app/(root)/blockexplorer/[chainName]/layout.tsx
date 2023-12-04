'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SelectChain from '@/components/SelectChain';
import { nodeone_logo } from '@/public/assets/icons';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import ChainInfoContext from '@/context/blockexplorer-ctx';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const BlockExplorerLayout = ({
    params,
    children,
}: {
    params: { chainName: string };
    children: React.ReactNode;
}) => {
    const [t] = useTranslation();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const ctx = useContext(ChainInfoContext);

    const SEARCH_BY_ENUMS = {
        ACCOUNT: 'account',
        TX: 'transaction',
        BLOCK: 'block',
    } as const;

    type SearchByValues =
        (typeof SEARCH_BY_ENUMS)[keyof typeof SEARCH_BY_ENUMS];

    const isBlock = (v: string): boolean => /^\d+$/.test(v);

    const isTx = (v: string): boolean => v.length > 12 && !/^\d+$/.test(v);

    function findOutSearchBy(value: string): SearchByValues | null {
        if (isBlock(value)) {
            return SEARCH_BY_ENUMS.BLOCK;
        } else if (isTx(value)) {
            return SEARCH_BY_ENUMS.TX;
        } else if (value !== '') {
            return SEARCH_BY_ENUMS.ACCOUNT;
        } else {
            return null;
        }
    }
    useEffect(() => {
        ctx.onSetCurrentChain(params.chainName);
        
        // if(ctx.currentChainInfo) {
        //     console.log('id:',ctx.currentChainInfo.id)
        //     setChainId(ctx.currentChainInfo.id)
        // }
    }, []);

    const searchHandler = () => {
        if(searchTerm){
            const _searchBy = findOutSearchBy(searchTerm);
            router.push(`/blockexplorer/${params.chainName}/${_searchBy}/${searchTerm}`);
        }
        
        // router.push({
        //   pathname: `/${_searchBy}/[searchTerm]`,
        //   query: { searchTerm: _searchTerm },
        // });
        setSearchTerm(() => '');
    };
    return (
        <div className="flex flex-col w-full h-full pt-32 bg-secondary-500 items-start text-white text-body-bold">
            <div className="flex flex-row max-md:flex-col w-full justify-between max-md:items-start items-end text-left gap-5">
                <h1 className="text-heading1-bold font-montserrat text-white sm:text-4.5xl">
                    {t('Block_Explorer_Title')}
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
                    selectedChain={params.chainName}
                    // setSelectedChain={setChainId}
                    // setCurrentPage={setCurrentPage}
                />
                <div
                    className={`flex w-full gap-2 ${
                        ctx.currentChainInfo
                            ? ''
                            : 'pointer-events-none opacity-70'
                    }`}
                >
                    <form action={searchHandler} className="flex w-full gap-2">
                        <Input
                            type="search"
                            placeholder={t(
                                'BlockExplorerMainSearchPlaceholder'
                            )}
                            className="text-secondary-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="bg-slate-500"
                        >
                            {t('SearchButton')}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="w-full h-[3px] my-5 bg-slate-500 rounded-lg" />
            <div className="w-full">{children}</div>
        </div>
    );
};

export default BlockExplorerLayout;
