import React, { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data for filter options
const mockFilters = {
    categories: [
        { id: 'rings', name: 'Rings', count: 120 },
        { id: 'necklaces', name: 'Necklaces', count: 85 },
        { id: 'earrings', name: 'Earrings', count: 54 },
        { id: 'bracelets', name: 'Bracelets', count: 32 },
        { id: 'watches', name: 'Watches', count: 18 },
    ],
    metals: [
        { id: 'gold', name: 'Gold', color: '#FFD700' },
        { id: 'silver', name: 'Silver', color: '#C0C0C0' },
        { id: 'platinum', name: 'Platinum', color: '#E5E4E2' },
        { id: 'rosegold', name: 'Rose Gold', color: '#B76E79' },
    ],
};

/**
 * FilterSidebar Component
 * A fixed, sticky sidebar for filtering products on the left side of the screen.
 * It features collapsible sections, category checklists, and a price range slider.
 */
export default function FilterSidebar() {
    // State to hold the currently applied filters
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        metals: [],
        priceRange: { min: 0, max: 20000 },
    });

    // State to manage the collapse/expand status of each filter section
    const [collapsed, setCollapsed] = useState({
        categories: false,
        metals: false,
        price: false,
    });

    // Price range slider state (for UI interaction)
    const [price, setPrice] = useState(selectedFilters.priceRange);

    const MIN_PRICE = 0;
    const MAX_PRICE = 20000;

    // Toggle collapse state for a section
    const toggleCollapse = (key) => {
        setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Handle checkbox change for categories and metals
    const handleFilterChange = (type, value) => {
        setSelectedFilters(prev => {
            const current = prev[type];
            if (current.includes(value)) {
                return { ...prev, [type]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [type]: [...current, value] };
            }
        });
    };

    // Apply price filter (simulated on mouse up for the slider)
    const applyPriceFilter = () => {
        setSelectedFilters(prev => ({ ...prev, priceRange: price }));
    };

    // Reset all filters
    const clearFilters = () => {
        setSelectedFilters({
            categories: [],
            metals: [],
            priceRange: { min: MIN_PRICE, max: MAX_PRICE },
        });
        setPrice({ min: MIN_PRICE, max: MAX_PRICE });
    };

    // --- Filter Section Helper Components ---

    const FilterHeader = ({ title, sectionKey }) => (
        <div 
            className="flex justify-between items-center py-3 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleCollapse(sectionKey)}
        >
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            {collapsed[sectionKey] ? <ChevronDown size={18} className="text-gray-500" /> : <ChevronUp size={18} className="text-gray-500" />}
        </div>
    );

    const CategoryFilter = () => (
        <div className={`p-4 transition-all duration-300 ${collapsed.categories ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-96 opacity-100'}`}>
            {mockFilters.categories.map((cat) => (
                <label key={cat.id} className="flex items-center justify-between py-2 cursor-pointer hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedFilters.categories.includes(cat.id)}
                            onChange={() => handleFilterChange('categories', cat.id)}
                            className="mr-3 h-4 w-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                        />
                        {cat.name}
                    </span>
                    <span className="text-sm text-gray-500">({cat.count})</span>
                </label>
            ))}
        </div>
    );

    const PriceFilter = () => (
        <div className={`p-4 transition-all duration-300 ${collapsed.price ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-96 opacity-100'}`}>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-4">
                <span>${price.min.toLocaleString()}</span>
                <span>${price.max.toLocaleString()}</span>
            </div>
            {/* Simple two-input range simulation */}
            <div className="space-y-4">
                <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={100}
                    value={price.min}
                    onChange={(e) => setPrice(p => ({ ...p, min: Math.min(Number(e.target.value), p.max) }))}
                    onMouseUp={applyPriceFilter}
                    onTouchEnd={applyPriceFilter}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-moz-range-thumb]:bg-[#D4AF37]"
                />
                 <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={100}
                    value={price.max}
                    onChange={(e) => setPrice(p => ({ ...p, max: Math.max(Number(e.target.value), p.min) }))}
                    onMouseUp={applyPriceFilter}
                    onTouchEnd={applyPriceFilter}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-moz-range-thumb]:bg-[#D4AF37]"
                />
            </div>
        </div>
    );

    const MetalFilter = () => (
        <div className={`p-4 transition-all duration-300 ${collapsed.metals ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-96 opacity-100'}`}>
            <div className="flex flex-wrap gap-4">
                {mockFilters.metals.map((metal) => (
                    <button
                        key={metal.id}
                        onClick={() => handleFilterChange('metals', metal.id)}
                        className={`w-12 h-12 rounded-full border-4 transition-all duration-200 flex items-center justify-center text-xs font-semibold uppercase ${
                            selectedFilters.metals.includes(metal.id)
                                ? 'border-[#D4AF37] scale-110 shadow-md'
                                : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: metal.color, color: metal.id === 'gold' ? '#333' : '#333' }}
                        title={metal.name}
                    >
                        {metal.name.substring(0, 1)}
                    </button>
                ))}
            </div>
        </div>
    );

    // --- Main Component Render ---
    return (
        // The sidebar is fixed on the left, takes 1/5 of the screen on large desktops, and is hidden on small screens
        <aside className="hidden lg:block lg:w-72 xl:w-80 h-full fixed top-0 left-0 pt-20 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center">
                    <SlidersHorizontal size={24} className="mr-2 text-[#D4AF37]" />
                    Filters
                </h3>
                <button
                    onClick={clearFilters}
                    className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                    <X size={16} className="mr-1" />
                    Clear All
                </button>
            </div>

            {/* Total items found indicator */}
            <div className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-600">
                Showing 1,500 Results
            </div>
            
            <div className="divide-y divide-gray-100">
                {/* 1. Category Filter */}
                <section>
                    <FilterHeader title="Product Category" sectionKey="categories" />
                    <CategoryFilter />
                </section>

                {/* 2. Price Filter */}
                <section>
                    <FilterHeader title="Price Range" sectionKey="price" />
                    <PriceFilter />
                </section>

                {/* 3. Metal/Color Filter */}
                <section>
                    <FilterHeader title="Metal Type" sectionKey="metals" />
                    <MetalFilter />
                </section>

                {/* You can add more filter sections here (e.g., Diamond Cut, Carat, etc.) */}
            </div>
        </aside>
    );
}
