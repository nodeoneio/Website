import { chains as n1_chains } from '@/constants';
import ChainCard from '../ChainCard';

const chains = () => {
    return (
        <div className="relative w-full justify-center py-32 background-repeat h-min-[750px]">
            <p className="relative font-montserrat text-heading1-bold max-sm:text-heading3-bold max-sm:mx-3 max-sm:my-3 my-20 text-secondary-500 text-center">
                The Blockchain networks we get engaged.
            </p>
            <div className="relative w-full gap-10 flex flex-row max-md:flex-col my-20 px-8 py-4 justify-between items-center">
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
