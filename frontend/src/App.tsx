// import Footer from "./components/footer/Footer";
import HeroSection from "./components/HeroPage/HeroSection";
import ScrollTriggerBoxes from "./components/Features/ScrollTriggerBoxes";
import { Particles } from "./components/ui/particles";

import { ReactLenis } from 'lenis/react';
import Footer from "./components/footer/Footer";
import AboutSection from "./components/About/AboutSection";
import CommunityGallery from "./components/About/CommunityGallery";
import FinalCTA from "./components/About/FinalCTA";

function App() {

  return (
    // enable basic smooth scrolling
    <ReactLenis root options={{ duration: 1.2 }}>
      <main className=" bg-black ">
        {/* Particles should be fixed so they cover the whole viewport and stay behind content */}
        <Particles className="fixed inset-0 h-screen w-screen pointer-events-none z-0" />
        <article className="relative z-10">
          <section className='text-white m-h-screen w-full bg-transparent grid place-content-center sticky top-0'>
            <HeroSection />
          </section>
          <section className='text-white w-full bg-black relative z-50 '>
            <AboutSection />
          </section>
          <ScrollTriggerBoxes />
          <CommunityGallery />
          <FinalCTA />
          <Footer />
        </article>
      </main>
    </ReactLenis>
  );
}

export default App






