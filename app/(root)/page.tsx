import Image from 'next/image';

import Chains from '@/components/sections/Chains';
import Hero from '@/components/sections/Hero';
import Devdocs from '@/components/sections/Devdocs';
import Contributions from '@/components/sections/Contributions';

export default function Home() {
    return (
        <>
            <Hero />
            <Chains />
            <Devdocs />
            <Contributions />
        </>
    );
}
