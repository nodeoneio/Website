import Image from 'next/image';

import Chains from '@/components/sections/Chains';
import Hero from '@/components/sections/Hero';

export default function Home() {
    return (
        <>
            <Hero />
            <Chains />
        </>
    );
}
