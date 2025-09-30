import { ChevronRight, Diamond, Star } from "lucide-react";

// Mock data for features, products and testimonials
const features = [
    { icon: <Diamond size={32} />, title: "Ethically Sourced", desc: "Our diamonds are certified conflict-free and ethically sourced from responsible mines." },
    { icon: <Star size={32} />, title: "Exceptional Clarity", desc: "Only the top 2% of stones make it to our premium luxury collection." },
    { icon: <ChevronRight size={32} />, title: "Personalized Service", desc: "Get expert advice and tailored diamond recommendations." }
];

const products = [
    { id: 1, name: "Brilliant Cut Diamond", price: "$7,850", image: "/products/diamond1.jpg" },
    { id: 2, name: "Emerald Luxury Necklace", price: "$12,400", image: "/products/diamond2.jpg" },
    { id: 3, name: "Classic Solitaire Ring", price: "$6,500", image: "/products/diamond3.jpg" }
];

const testimonials = [
    { id: 1, quote: "Absolutely stunning craftsmanship—my wife adored the ring!", name: "James A." },
    { id: 2, quote: "The quality and sparkle are unmatched. Highly recommended!", name: "Priya S." }
];

export default function Home() {
    return (
        <div className="w-full pt-0">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] overflow-hidden">
                {/* Diamond Image Overlay */}
                <img src="/hero-diamond.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                {/* Content */}
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <h1 className="text-white text-5xl md:text-6xl font-playfair font-bold mb-4 drop-shadow-lg">
                        Discover Every Facet of Luxury
                    </h1>
                    <p className="text-white/90 font-inter text-xl mb-8">
                        Exclusive, conflict-free diamonds & fine jewelry. Crafted for those who demand excellence.
                    </p>
                    <a
                        href="/products"
                        className="bg-[#D4AF37] text-white text-lg font-montserrat font-semibold rounded-full px-12 py-4 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                        Shop Diamonds
                    </a>
                </div>
                {/* Subtle Parallax Effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-t from-[#1E40AF] to-transparent pointer-events-none" />
            </section>

            {/* Features Section */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                    {features.map(f => (
                        <div key={f.title} className="flex flex-col items-center text-center gap-4">
                            <div className="text-[#D4AF37]">{f.icon}</div>
                            <h3 className="text-2xl font-playfair font-bold text-[#0F172A]">{f.title}</h3>
                            <p className="text-[#94A3B8] font-inter text-base">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products Carousel */}
            <section className="py-16 max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#0F172A] mb-8 text-center">Featured Diamonds</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.10)] p-6 flex flex-col gap-4 hover:shadow-[0_8px_15px_rgba(0,0,0,0.12)] hover:scale-105 transition transform duration-300 border-2 border-transparent hover:border-[#D4AF37]">
                            <div className="aspect-square overflow-hidden bg-[#F8FAFC] rounded-lg">
                                <img src={product.image} alt={product.name} className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" />
                            </div>
                            <h4 className="font-playfair text-xl font-bold text-[#0F172A]">{product.name}</h4>
                            <span className="text-[#D4AF37] text-lg font-semibold">{product.price}</span>
                            <a
                                href={`/products/${product.id}`}
                                className="bg-[#D4AF37] text-white font-montserrat rounded-md px-6 py-2 mt-auto transition-all hover:bg-[#B08D32] hover:scale-105"
                            >
                                View Details
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#0F172A] mb-8">Testimonials</h3>
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        {testimonials.map(t => (
                            <blockquote key={t.id} className="bg-white rounded-lg shadow p-6 italic text-[#94A3B8] font-light max-w-sm mx-auto">
                                "{t.quote}"
                                <footer className="mt-4 text-[#1E40AF] font-montserrat font-semibold">- {t.name}</footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#D4AF37] py-12 text-center">
                <h4 className="text-2xl md:text-3xl font-playfair font-bold text-[#0F172A] mb-4">
                    Experience Diamond Luxury <span className="font-inter">— Shop Today</span>
                </h4>
                <a
                    href="/contact"
                    className="bg-white text-[#1E40AF] font-montserrat font-semibold rounded-full px-10 py-3 shadow-lg hover:scale-105 hover:bg-[#F8FAFC] transition-all duration-300"
                >
                    Contact Us
                </a>
            </section>
        </div>
    );
}
