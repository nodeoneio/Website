import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AuthContextProvider } from '../../context/auth-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
            <html lang="en">
                <body className={`bg-secondary-500 ${inter.className}`}>
                    <main className="main-container">
                        <Header />
                        {children}
                        <Footer />
                    </main>
                </body>
            </html>
        </AuthContextProvider>
    );
}
