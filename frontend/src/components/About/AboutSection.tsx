import FeatureSection from '../Features/FeatureSection';
import HeroGrid from './HeroGrid';


const AboutSection = () => {
    return (
        <div id='about' className='w-full bg-black relative z-50 selection:bg-[#F9D000] selection:text-black overflow-hidden'>
            <div className="pt-20 min-h-screen w-full bg-black rounded-t-[3rem] md:rounded-t-[4rem] relative shadow-2xl md:mt-10 mx-auto">
                <div className='max-w-[90rem] mx-auto relative z-10'>
                    <HeroGrid />
                    <FeatureSection />
                </div>
            </div>
        </div>
    );
};

export default AboutSection;