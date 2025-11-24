// import Footer from "./components/footer/Footer";
import HeroSection from "./components/HeroPage/HeroSection";
import ScrollTriggerBoxes from "./components/ScrollTriggerBoxes";
import { Particles } from "./components/ui/particles";



function App() {
  
  return (
    <div className="overflow-hidden bg-black relative">
      <Particles className="h-screen"/>
      
      <HeroSection />
      <ScrollTriggerBoxes />
    </div>
  );
}

export default App






