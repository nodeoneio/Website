import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Chains, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import WebRenderer from '@wharfkit/web-renderer';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getSessionKit(): SessionKit {
    const sessionKit = new SessionKit({
        appName: 'NodeONE',
        chains: [Chains.Jungle4],
        ui: new WebRenderer(),
        walletPlugins: [new WalletPluginAnchor()],
    });
    return sessionKit;
}
