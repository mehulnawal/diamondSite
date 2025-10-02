import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, SlidersHorizontal } from 'lucide-react'; // Added SlidersHorizontal for the mobile button
// Attempting fix by explicitly adding the file extension again
import FilterSidebar from '../Global/FilterSidebar.jsx'; 

// --- Mock Product Data ---
const mockProducts = [
    {
        id: 1,
        name: 'Classic Solitaire Ring',
        price: 7999,
        originalPrice: 9999,
        category: 'rings',
        metal: 'platinum',
        rating: 4.8,
        reviews: 154,
        image: 'https://placehold.co/600x600/F0F0F0/333?text=Solitaire+Ring',
    },
    {
        id: 2,
        name: 'Diamond Cluster Necklace',
        price: 4500,
        category: 'necklaces',
        metal: 'gold',
        rating: 4.5,
        reviews: 88,
        image: 'https://placehold.co/600x600/E8E8E8/333?text=Cluster+Necklace',
    },
    {
        id: 3,
        name: 'Rose Gold Hoop Earrings',
        price: 1250,
        originalPrice: 1500,
        category: 'earrings',
        metal: 'rosegold',
        rating: 4.9,
        reviews: 210,
        image: 'https://placehold.co/600x600/F5E6E6/333?text=Rose+Hoops',
    },
    {
        id: 4,
        name: 'Tennis Bracelet (Silver)',
        price: 3500,
        category: 'bracelets',
        metal: 'silver',
        rating: 4.2,
        reviews: 45,
        image: 'https://placehold.co/600x600/D0D0D0/333?text=Tennis+Bracelet',
    },
    {
        id: 5,
        name: 'Luxury Chronograph Watch',
        price: 19500,
        originalPrice: 22000,
        category: 'watches',
        metal: 'platinum',
        rating: 4.7,
        reviews: 12,
        image: 'https://placehold.co/600x600/E0E0E0/333?text=Luxury+Watch',
    },
    {
        id: 6,
        name: 'Emerald Cut Pendant',
        price: 6200,
        category: 'necklaces',
        metal: 'gold',
        rating: 4.6,
        reviews: 93,
        image: 'https://placehold.co/600x600/F0F0E0/333?text=Emerald+Pendant',
    },
];

// --- Product Card Component (Same as before) ---
const ProductCard = ({ product }) => {
    // State for hover effect to show CTA buttons
    const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price) => `$${price.toLocaleString()}`;

    return (
        <div
            className="group relative bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x600/C0C9D0/000000?text=Jewelry" }}
                />
                
                {/* Overlay Buttons (appear on hover) */}
                <div 
                    className={`absolute inset-0 bg-black/10 flex items-center justify-center space-x-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button 
                        aria-label="Add to Wishlist"
                        className="p-3 rounded-full bg-white text-gray-800 hover:bg-[#D4AF37] hover:text-white transition-colors duration-200 shadow-md"
                    >
                        <Heart size={20} />
                    </button>
                    <button 
                        aria-label="Add to Cart"
                        className="p-3 rounded-full bg-white text-gray-800 hover:bg-[#D4AF37] hover:text-white transition-colors duration-200 shadow-md"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                    {product.name}
                </h3>
                
                {/* Price Display */}
                <div className="flex justify-center items-center space-x-2 mb-2">
                    <p className="text-xl font-bold text-[#D4AF37]">
                        {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                        <p className="text-sm text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                        </p>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center text-sm text-gray-500">
                    <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="ml-2">({product.reviews})</span>
                </div>
            </div>
        </div>
    );
};


// --- Main Product Component ---
export default function Product() {
    // State to control the visibility of the mobile filter modal
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
    // In a real application, you would manage filter state here and use it to filter mockProducts
    const [sortBy, setSortBy] = useState('featured'); // Example sort state

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. Filter Sidebar (Fixed Position, passes modal state handlers) */}
            <FilterSidebar 
                isMobileModalOpen={isMobileModalOpen} 
                setIsMobileModalOpen={setIsMobileModalOpen} 
            />

            {/* 2. Main Content Grid (Pushed by Sidebar on Desktop) */}
            <main className="lg:ml-72 xl:ml-80 pt-20 p-4 sm:p-8">
                
                {/* Header and Sorting */}
                <header className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">
                        All Diamond Jewelry
                    </h1>
                    
                    <div className="flex items-center space-x-4">
                        {/* Mobile Filter Button (Visible on Small Screens) */}
                        <button
                            onClick={() => setIsMobileModalOpen(true)}
                            className="flex lg:hidden items-center px-4 py-2 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#C2A233] transition-colors shadow-md text-sm"
                        >
                            <SlidersHorizontal size={18} className="mr-2" />
                            Filters
                        </button>

                        <label htmlFor="sort" className="text-gray-600 text-sm hidden sm:block">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm font-medium"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Average Rating</option>
                        </select>
                    </div>
                </header>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-12 flex justify-center">
                    <button className="px-6 py-3 bg-[#D4AF37] text-white rounded-full font-semibold hover:bg-[#C2A233] transition-colors shadow-md">
                        Load More Products
                    </button>
                </div>
            </main>
        </div>
    );
}
