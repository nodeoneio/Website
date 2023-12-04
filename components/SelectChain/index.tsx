'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { cn, getChainIdsFromNames as getChainIdsFromNames } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import ChainInfoContext from '@/context/blockexplorer-ctx';

const supportedChains = getChainIdsFromNames([
    'EOS',
    'JUNGLE4',
    'FIO',
    'PROTON',
    'LIBRE',
]);

const SelectChain = ({ selectedChain }: { selectedChain: string }) => {
    const ctx = useContext(ChainInfoContext);
    const [open, setOpen] = React.useState(false);
    const currentChainId = getChainIdsFromNames([selectedChain])[0].value;
    const [id, setId] = React.useState(currentChainId);
    const router = useRouter();

    const chainSelectHandler = (route: string) => {
        router.push('/blockexplorer/'.concat(route.toLowerCase()));
    };

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] max-md:w-full justify-between bg-white text-black"
                >
                    {id
                        ? supportedChains.find((chain) => chain.value === id)
                              ?.label
                        : 'Select Chain...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white text-black">
                <Command>
                    <CommandInput placeholder="Search Chain..." />
                    <CommandEmpty>No Chain found.</CommandEmpty>
                    <CommandGroup>
                        {supportedChains.map((chain) => (
                            <CommandItem
                                className="cursor-pointer hover:bg-slate-400"
                                key={chain.value}
                                value={chain.label}
                                onSelect={(currentValue) => {
                                    const val = supportedChains.find(
                                        (chain) =>
                                            chain.label.toLowerCase() ===
                                            currentValue.toLowerCase()
                                    )?.value;
                                    setId(val ? (val === id ? '' : val) : '');
                                    // setOpen(false);
                                    ctx.onSetCurrentChain(chain.label);
                                    chainSelectHandler(chain.label);
                                }}
                            >
                                <span>{chain.label}</span>
                                <CheckIcon
                                    className={cn(
                                        'ml-auto h-4 w-4',
                                        id === chain.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectChain;
