import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (!query || query.trim() === "") {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`https://ecomerce-server-kohl.vercel.app/products?search=${query}`)
            .then(res => res.json())
            .then(data => {
                const filteredData = data.filter(product => 
                    product.name.toLowerCase().includes(query.toLowerCase())
                );
                
                setResults(filteredData);
                setLoading(false);
            })
            .catch(() => {
                setResults([]);
                setLoading(false);
            });
    }, [query]);


    const getDetailLink = (product) => {
        if (product.category === 'electronics') return `/electronics/${product._id}`;
        if (product.category === 'bags') return `/bags/${product._id}`;
        if (product.category === 'beauty') return `/beauty/${product._id}`;
        if (product.category === 'watch') return `/watch/${product._id}`; 
        return `/product/${product._id}`; 
    };

    if (loading) return <div className="text-center py-20 font-bold text-xl">Searching...</div>;

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen">
            <h2 className="text-2xl font-bold mb-8 italic">
                Search Results for: <span className="text-[#6c4fb3]">"{query}"</span>
            </h2>

            {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {results.map((product) => (
                        <Link to={getDetailLink(product)}  key={product._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                            <div>
                                <img 
                                    src={product.image1 || product.image} 
                                    className="w-full h-44 object-cover rounded-lg mb-3" 
                                    alt={product.name}
                                />
                                <h3 className="font-semibold text-sm line-clamp-2 h-10">{product.name}</h3>
                                <p className="text-[#6c4fb3] font-bold mt-2">{product.price} TK</p>
                            </div>
                            
                            <Link 
                                className="btn btn-sm w-full mt-4 bg-[#6c4fb3] hover:bg-[#5a4196] text-white border-none"
                            >
                                View Details
                            </Link>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                    <p className="text-gray-500 text-lg font-semibold">No products found matching your search.</p>
                    <p className="text-gray-400 text-sm mt-2">Try searching with a different name.</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;