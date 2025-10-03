import { useState } from 'react';
import { Heart, ShoppingCart, Star, SlidersHorizontal, Delete } from 'lucide-react';
import FilterSidebar from '../Global/FilterSidebar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartProducts, addToWishListProducts, deleteProducts } from '../Global/Slice/ProductsSlice.jsx';

const ProductCard = ({ product, theme }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();

    return (
        <div
            className={`group relative ${theme == 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x600/C0C9D0/000000?text=Jewelry"
                    }}
                />

                {/* Overlay Buttons (appear on hover) */}
                <div
                    className={`absolute inset-0 ${theme == 'dark' ? 'bg-black/30' : 'bg-black/10'} flex items-center justify-center space-x-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button
                        aria-label="Add to Wishlist"
                        className={`p-3 cursor-pointer rounded-full ${theme == 'dark' ? 'bg-gray-700 text-white hover:bg-[#D4AF37]' : 'bg-white text-gray-800 hover:bg-[#D4AF37] hover:text-white'} transition-colors duration-200 shadow-md`}
                        onClick={() => dispatch(addToWishListProducts(product.id))}
                    >
                        <Heart size={20} />
                    </button>
                    <button
                        aria-label="Add to Cart"
                        className={`p-3 cursor-pointer rounded-full ${theme == 'dark' ? 'bg-gray-700 text-white hover:bg-[#D4AF37]' : 'bg-white text-gray-800 hover:bg-[#D4AF37] hover:text-white'} transition-colors duration-200 shadow-md`}
                        onClick={() => dispatch(addToCartProducts(product.id))}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 text-center">
                <h3 className={`text-lg font-semibold ${theme == 'dark' ? 'text-white' : 'text-gray-800'} truncate mb-1`}>
                    {product.productName}
                </h3>

                {/* Price Display */}
                <div className="flex justify-center items-center space-x-2 mb-2">
                    <p className="text-xl font-bold text-[#D4AF37]">
                        {(product.price)}
                    </p>
                    {product.originalPrice && (
                        <p className={`text-sm ${theme == 'dark' ? 'text-gray-500' : 'text-gray-400'} line-through`}>
                            {(product.originalPrice)}
                        </p>
                    )}

                    <div
                        id="deleteButton"
                        className={`${theme == 'dark' ? 'text-white' : 'text-black'} ml-3 cursor-pointer`}
                        onClick={() => dispatch(deleteProducts(product.id))}
                    >
                        <Delete />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Product Component ---
export default function Product() {

    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const theme = useSelector((store) => store.themeSlice.value);
    const products = useSelector(state => state.productSlice.products);

    return (
        <div className={`min-h-screen ${theme == 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>

            <FilterSidebar
                isMobileModalOpen={isMobileModalOpen}
                setIsMobileModalOpen={setIsMobileModalOpen}
            />

            <main className="lg:ml-72 xl:ml-80 pt-20 p-4 sm:p-8">

                {/* Header and Sorting */}
                <header className={`flex justify-between items-center pb-6 ${theme == 'dark' ? 'border-gray-700' : 'border-gray-200'} border-b mb-6`}>
                    <h1 className={`text-3xl font-serif font-bold ${theme == 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        All Diamond Jewelry
                    </h1>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsMobileModalOpen(true)}
                            className="flex lg:hidden items-center px-4 py-2 bg-[#D4AF37] text-white rounded-lg font-semibold hover:bg-[#C2A233] transition-colors shadow-md text-sm"
                        >
                            <SlidersHorizontal size={18} className="mr-2" />
                            Filters
                        </button>

                        <label
                            htmlFor="sort"
                            className={`${theme == 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm hidden sm:block`}
                        >
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`p-2 ${theme == 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-md focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm font-medium`}
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
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} theme={theme} />
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