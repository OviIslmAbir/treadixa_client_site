import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaSave, FaTrash, FaArrowLeft, FaImage, FaListUl, FaAlignLeft, FaPlus } from 'react-icons/fa';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [productData, setProductData] = useState({
        name: '', brand: '', category: '', price: '',
        discount_price: '', discount_percentage: '', 
        image1: '', image2: '', image3: '',
        total_sell: '', description: ''
    });

    const [specs, setSpecs] = useState([{ key: '', value: '' }]);

    useEffect(() => {
        fetch(`https://ecomerce-server-kohl.vercel.app/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProductData({
                    name: data.name || '',
                    brand: data.brand || '',
                    category: data.category || '',
                    price: data.price || '',
                    discount_price: data.discount_price || '',
                    discount_percentage: data.discount_percentage || '', 
                    image1: data.image || '', 
                    image2: data.image2 || '',
                    image3: data.image3 || '',
                    total_sell: data.total_sell || '',
                    description: data.description || ''
                });
                if (data.specifications) {
                    const loadedSpecs = Object.entries(data.specifications).map(([key, value]) => ({ key, value }));
                    setSpecs(loadedSpecs.length > 0 ? loadedSpecs : [{ key: '', value: '' }]);
                }
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load product!");
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecChange = (index, e) => {
        const newSpecs = [...specs];
        newSpecs[index][e.target.name] = e.target.value;
        setSpecs(newSpecs);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const finalSpecs = {};
        specs.forEach(item => {
            if (item.key.trim() && item.value.trim()) finalSpecs[item.key.trim()] = item.value.trim();
        });

        const updatedProduct = {
            ...productData,
            price: Number(productData.price) || 0,
            discount_price: Number(productData.discount_price) || 0,
            total_sell: Number(productData.total_sell) || 0,
            specifications: finalSpecs,
            image: productData.image1, 
            image2: productData.image2,
            image3: productData.image3 
        };

        fetch(`https://ecomerce-server-kohl.vercel.app/products/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                toast.success("Successfully Updated everything");
                navigate('/dashboard/manage-items');
            } else {
                toast.error("No changes made!");
            }
        });
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-[#7E53AC]"></span></div>;

    return (
        <div className="min-h-screen bg-[#F8F9FD] py-4 md:py-10 px-2 md:px-4 text-start">
            <div className="max-w-6xl mx-auto bg-white rounded-[24px] md:rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header - Fixed for Mobile */}
                <div className="bg-[#7E53AC] p-6 md:p-10 text-white flex items-center gap-4 md:gap-6">
                    <button onClick={() => navigate(-1)} className="p-2 md:p-3 bg-white/20 hover:bg-white/30 rounded-xl md:rounded-2xl transition-all active:scale-90">
                        <FaArrowLeft />
                    </button>
                    <div>
                        <h2 className="text-xl md:text-3xl font-black truncate max-w-[200px] md:max-w-full">{productData.name}</h2>
                        <p className="text-[10px] uppercase tracking-widest opacity-70">Update Product Info</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="p-4 md:p-12 space-y-6 md:space-y-10">
                    
                    {/* Pricing Section - Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-5 md:p-8 rounded-[24px] md:rounded-[32px]">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Base Price</label>
                            <input name="price" type="number" value={productData.price} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 font-black outline-none focus:border-[#7E53AC]" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Offer Price</label>
                            <input name="discount_price" type="number" value={productData.discount_price} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 font-black text-[#30AD5E] outline-none" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-[#7E53AC] uppercase block mb-2">Discount (%)</label>
                            <input name="discount_percentage" type="text" value={productData.discount_percentage} onChange={handleChange} className="w-full bg-white border border-[#7E53AC]/20 rounded-xl md:rounded-2xl p-3 md:p-4 font-black text-[#7E53AC] outline-none" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-orange-500 uppercase block mb-2">Total Sell</label>
                            <input name="total_sell" type="number" value={productData.total_sell} onChange={handleChange} className="w-full bg-white border border-orange-200 rounded-xl md:rounded-2xl p-3 md:p-4 font-black text-orange-600 outline-none" />
                        </div>
                    </div>

                    {/* Images Section - Vertical on Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                                <div className="aspect-video sm:aspect-square w-full mb-3 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                                    {productData[`image${num}`] ? <img src={productData[`image${num}`]} className="h-full w-full object-contain p-2" /> : <FaImage className="text-gray-200" size={30} />}
                                </div>
                                <input name={`image${num}`} value={productData[`image${num}`]} onChange={handleChange} placeholder={`Image ${num} URL`} className="w-full bg-white border border-gray-200 rounded-xl p-3 text-[10px] outline-none focus:border-[#7E53AC]" />
                            </div>
                        ))}
                    </div>

                    {/* Description - Large Touch Area */}
                    <div className="space-y-3">
                        <h3 className="text-gray-800 font-bold flex items-center gap-2 uppercase text-[10px] tracking-widest"><FaAlignLeft className="text-[#7E53AC]"/> Description</h3>
                        <textarea name="description" value={productData.description} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-[20px] p-4 text-sm text-gray-600 h-32 md:h-44 outline-none focus:ring-1 focus:ring-[#7E53AC]"></textarea>
                    </div>

                    {/* Specifications - Optimized for Mobile Typing */}
                    <div className="bg-[#FAF9FF] p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-[#7E53AC]/10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-gray-800 flex items-center gap-2 uppercase text-[10px] tracking-widest"><FaListUl className="text-[#7E53AC]" /> Specifications</h3>
                            <button type="button" onClick={() => setSpecs([...specs, { key: '', value: '' }])} className="btn btn-xs bg-[#7E53AC] text-white rounded-full border-none px-4">
                                <FaPlus size={10} className="mr-1"/> ADD
                            </button>
                        </div>
                        <div className="space-y-4">
                            {specs.map((spec, index) => (
                                <div key={index} className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-sm relative">
                                    <input name="key" placeholder="Feature Name (e.g. RAM)" value={spec.key} onChange={(e) => handleSpecChange(index, e)} className="w-full bg-gray-50 border-none rounded-lg p-2 text-xs font-bold outline-none focus:bg-white" />
                                    <input name="value" placeholder="Detail (e.g. 8GB)" value={spec.value} onChange={(e) => handleSpecChange(index, e)} className="w-full bg-gray-50 border-none rounded-lg p-2 text-xs outline-none focus:bg-white" />
                                    
                                    {specs.length > 1 && (
                                        <button type="button" onClick={() => setSpecs(specs.filter((_, i) => i !== index))} className="absolute top-2 right-2 text-red-300 hover:text-red-500 p-1">
                                            <FaTrash size={12}/>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Save Button - Sticky for Mobile */}
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-[#7E53AC] active:scale-95 text-white py-4 md:py-6 rounded-2xl md:rounded-[24px] text-lg font-black shadow-lg transition-all flex items-center justify-center gap-3">
                            <FaSave /> SAVE CHANGES
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;