'use client';
import { getChainIdsFromNames } from '@/lib/utils';
import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

export type ChainInfoType = { id: string; name: string };

type ChainInfoContextType = {
    currentChainInfo: ChainInfoType | undefined;
    onSetCurrentChain: (name: string) => void;
};

const ChainInfoContext = React.createContext<ChainInfoContextType>({
    currentChainInfo: undefined,
    onSetCurrentChain: (name: string) => {},
});

export const ChainInfoContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [currentChainInfo, setCurrentChainInfo]: [
        ChainInfoType | undefined,
        Dispatch<SetStateAction<ChainInfoType | undefined>>
    ] = useState();

    const setChainInfoHandler = (name: string) => {
    
        const chain = getChainIdsFromNames([name]);
        if (chain.length > 0) {
            const chainCtx = {
                id: chain[0].value,
                name: chain[0].label.toUpperCase(),
            };
            setCurrentChainInfo(chainCtx);
        }
    };

    return (
        <ChainInfoContext.Provider
            value={{
                currentChainInfo: currentChainInfo,
                onSetCurrentChain: setChainInfoHandler,
            }}
        >
            {children}
        </ChainInfoContext.Provider>
    );
};
export default ChainInfoContext;
