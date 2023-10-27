import { chains as n1_chains } from '@/constants';
import ChainCard from '../ChainCard';

const chains = () => {
    return (
        <div className="w-full justify-center bg-gradient-to-br py-28 from-white to-slate-400">
            <div className="font-montserrat text-heading1-bold my-14 text-secondary-500 text-center">
                The Blockchain networks we contribute.
            </div>
            <div className="w-full bg-transparent gap-10 flex flex-row px-8 py-4 mb-10 justify-between">
                {n1_chains.map((chain) => (
                    <ChainCard
                        key={chain.title}
                        image={chain.img}
                        title={chain.title}
                        description={chain.description}
                        link={chain.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default chains;
