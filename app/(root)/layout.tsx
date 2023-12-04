import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AuthContextProvider } from '../../context/auth-ctx';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Bottombar from '@/components/BottomBar';
import { ChainInfoContextProvider } from '@/context/blockexplorer-ctx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'NodeONE',
    description: 'Antelop based Blockchain validator',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthContextProvider>
            <ChainInfoContextProvider>
            <html lang="en">
                <body className={`bg-secondary-500 ${inter.className}`}>
                    <Header />
                    <main className="main-container">{children}</main>
                    <Footer />
                    <Bottombar />
                </body>
            </html>
            </ChainInfoContextProvider>
        </AuthContextProvider>
    );
}
