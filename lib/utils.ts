import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Chains, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import WebRenderer from '@wharfkit/web-renderer';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getSessionKit(): SessionKit | undefined {
    try {
        const webRenderer = new WebRenderer();
        const sessionKit = new SessionKit({
            appName: 'NodeONE Website',
            chains: [Chains.Jungle4, Chains.EOS, Chains.FIO, Chains.Libre, Chains.Proton, Chains.Telos, Chains.WAX],
            ui: webRenderer,
            walletPlugins: [new WalletPluginAnchor()],
        });
        return sessionKit;
    } catch (error:any) {
        console.log(`Modal manually Closed ${error.message}`);
        return;
    }
}
