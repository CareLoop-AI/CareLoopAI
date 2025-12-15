import HeroSection from "./components/HeroPage/HeroSection";
import { Particles } from "./components/ui/particles";
import { ReactLenis } from "lenis/react";
import Footer from "./components/footer/Footer";
import AboutSection from "./components/About/AboutSection";
// import CommunityGallery from "./components/About/CommunityGallery";
import FinalCTA from "./components/About/FinalCTA";
import CareLoopUsp from "./components/USP/CareLoopUsp";
import CoreVision from "./components/About/CoreVision";
import TextShowcase from "./components/About/TextShowcase";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import { usePageLoader } from "./utils/usePageLoader";

function App() {
  const isLoading = usePageLoader();

  return (
    <>
      {isLoading && <FullScreenLoader />}

      {!isLoading && (
        <ReactLenis root options={{ duration: 1.2 }}>
          <main className="bg-black">
            <Particles className="fixed inset-0 h-screen w-screen pointer-events-none z-0" />

            <article className="relative z-10">
              <section className="text-white min-h-screen w-full grid place-content-center sticky top-0">
                <HeroSection />
              </section>

              <section className="text-white w-full bg-black relative z-50">
                <AboutSection />
                <CoreVision />
                <TextShowcase />
              </section>
              <CareLoopUsp />
              {/* <CommunityGallery /> */}
              <FinalCTA />
              <Footer />
            </article>
          </main>
        </ReactLenis>
      )}
    </>
  );
}

export default App;
