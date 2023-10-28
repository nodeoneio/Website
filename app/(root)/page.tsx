import Image from 'next/image';

import Chains from '@/components/sections/Chains';
import Hero from '@/components/sections/Hero';
import Devdocs from '@/components/sections/Devdocs';

export default function Home() {
    return (
        <>
            <Hero />
            <Chains />
            <Devdocs />
        </>
    );
}
