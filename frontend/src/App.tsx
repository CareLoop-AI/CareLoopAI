// import Footer from "./components/footer/Footer";
import Features from "./components/Features/Features";
import HeroSection from "./components/HeroPage/HeroSection";
import { Particles } from "./components/ui/particles";



function App() {
  
  return (
    <div className="overflow-hidden relative bg-black">
      <Particles className="h-screen"/>
      <HeroSection />
      {/* <Footer /> */}
      <Features />
    </div>
  );
}

export default App






