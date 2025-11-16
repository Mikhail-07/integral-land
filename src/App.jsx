import Header from "./components/layout/AppHeader"
import { useState } from "react"
import Hero from "./components/sections/Hero"
import SplitView from "./components/sections/SplitView"
import PhaseScroller from "./components/sections/PhaseScroller"
import Environment from "./components/sections/Environment"
import Carousel from "./components/sections/Carousel"
import TopView from "./components/sections/TopView/TopView"
import Gallery from "./components/sections/Gallery"
import Specifications from "./components/sections/Specifications"
import Faq from "./components/sections/FAQ"
import ContactForm from "./components/sections/ContactForm"
import Footer from "./components/sections/Footer"
import CustomLoader from "./components/CustomLoader"

function App() {
  const [loaderComplete, setLoaderComplete] = useState(false)

  return (
    <div className="min-h-screen bg-brand-deep-teal w-full max-w-full overflow-x-hidden">
      <Header />
      {/* Основной контент */}
      <main className="flex-1 pt-10 w-full max-w-full">
        {/* Hero секция */}
        <Hero />

        {/* SplitView секция */}
        <SplitView />

        {/* <PhaseScroller /> */}

        {/* Carousel секция */}
        <Carousel />

        {/* TopView секция с анимацией */}
        <TopView />

        {/* Gallery секция */}
        <Gallery />

        {/* Environment секция */}
        <Environment />

        {/* Specifications секция */}
        <Specifications />

        {/* FAQ секция */}
        <Faq />

        {/* ContactForm секция */}
        <ContactForm />
      </main>
      {/* Custom Loader */}
      {!loaderComplete && (
        <CustomLoader onLoaded={() => setLoaderComplete(true)} />
      )}
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
