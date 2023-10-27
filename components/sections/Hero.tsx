import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative w-screen">
            <Image
                src="/assets/images/nodeone-hero.jpg"
                alt="nodeone hero"
                width={1920}
                height={800}
            />

            <div className="absolute flex flex-col justify-center top-1/4 bg-slate-400 w-full h-2/5 bg-opacity-40 ">
                <h1 className="text-center text-heading1-bold text-white drop-shadow-lg py-3">
                    We provide the Antelope protocol based Blockchain technology
                    and governance.
                </h1>
            </div>
        </div>
    );
};

export default Hero;
