import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Places from "@/components/Places";
import Service from "@/components/service";
import Awards from "@/components/Awards";
import Trips from "@/components/Trips";
import Special from "@/components/special";
import Reviews from "@/components/reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="places" aria-label="Destinations">
        <Places />
      </section>
      <section id="service" aria-label="About our services">
        <Service />
      </section>
      <section id="trips" aria-label="Our trips">
        <Trips />
      </section>
      <section id="special" aria-label="Why choose us">
        <Special />
      </section>
      <section id="awards" aria-label="Awards and recognition">
        <Awards />
      </section>
      <section id="reviews" aria-label="Customer reviews">
        <Reviews />
      </section>
      <footer id="footer">
        <Footer />
      </footer>
    </main>
  );
}
