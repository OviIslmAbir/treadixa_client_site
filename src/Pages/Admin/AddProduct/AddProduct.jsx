import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';

const AddProduct = () => {
    // Set Page Title
    useEffect(() => {
        document.title = "Trendixa | Add Product";
    }, []);

    const [specs, setSpecs] = useState([{ key: '', value: '' }]);

    // Function to add a new specification row at the bottom
    const addMoreSpec = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    // Function to remove a specific row
    const removeSpec = (index) => {
        const updatedSpecs = specs.filter((_, i) => i !== index);
        setSpecs(updatedSpecs);
    };

    const handleSpecChange = (index, event) => {
        const newSpecs = [...specs];
        newSpecs[index][event.target.name] = event.target.value;
        setSpecs(newSpecs);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const f = e.target;

        // Convert the specs array into a clean object for the database
        const finalSpecs = {};
        specs.forEach(item => {
            if (item.key.trim() && item.value.trim()) {
                finalSpecs[item.key.trim()] = item.value.trim();
            }
        });

        const newProduct = {
            name: f.name.value,
            brand: f.brand.value,
            category: f.category.value,
            price: parseFloat(f.price.value) || 0,
            discount_price: parseFloat(f.discount_price.value) || 0,
            discount_percentage: f.discount.value + "%",
            image1: f.image1.value, 
            image2: f.image2.value,
            image3: f.image3.value,
            image: f.image1.value, 
            total_sell: parseInt(f.total_sell.value) || 0,
            rating: 4.9, 
            description: f.description.value,
            specifications: finalSpecs 
        };

        fetch('https://ecomerce-server-kohl.vercel.app/products', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                toast.success("Product added successfully!");
                f.reset();
                setSpecs([{ key: '', value: '' }]); 
            }
        })
        .catch(err => toast.error("Error adding product"));
    };

    return (
        <div className="bg-white p-6 md:p-10 rounded-[32px] shadow-sm max-w-4xl mx-auto my-10 font-sans text-black border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-[#7E53AC] text-center">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="flex flex-col gap-6 text-start">
                
                {/* Product Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="name" placeholder="Product Name" className="input input-bordered w-full bg-white border-gray-300" required />
                    <input name="brand" placeholder="Brand Name" className="input input-bordered w-full bg-white border-gray-300" />
                    
                    <select name="category" className="select select-bordered w-full bg-white border-gray-300">
                        <option value="electronics">Gadgets & Electronics</option>
                        <option value="bags">Bags & Accessories</option>
                        <option value="beauty">Beauty & Skincare</option>
                        <option value="wellness">Trendy Watch</option>
                    </select>

                    <input name="total_sell" type="number" placeholder="Initial Total Sales" className="input input-bordered w-full bg-white border-gray-300" />
                </div>

                {/* Pricing Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="price" type="number" placeholder="Regular Price (TK)" className="input input-bordered w-full bg-white border-gray-300" required />
                    <input name="discount_price" type="number" placeholder="Discount Price (TK)" className="input input-bordered w-full bg-white border-gray-300" />
                    <input name="discount" placeholder="Discount % (Number only)" className="input input-bordered w-full bg-white border-gray-300" />
                </div>

                {/* Image URLs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="image1" placeholder="Main Image URL (1)" className="input input-bordered w-full bg-white border-gray-300" required />
                    <input name="image2" placeholder="Gallery Image URL (2)" className="input input-bordered w-full bg-white border-gray-300" />
                    <input name="image3" placeholder="Gallery Image URL (3)" className="input input-bordered w-full bg-white border-gray-300" />
                </div>

{/* Specifications Section - Clean Vertical List */}
<div className="bg-[#F9F7FF] p-6 rounded-2xl border border-[#7E53AC]/20 shadow-sm">
    <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest">Product Specifications</h3>
            <p className="text-[10px] text-gray-500 mt-1">Add features like Color, Size, or Material</p>
        </div>
        <button 
            type="button" 
            onClick={addMoreSpec} 
            className="btn btn-sm bg-[#7E53AC] hover:bg-[#6c4fb3] text-white border-none rounded-lg px-4 shadow-md transition-all active:scale-95"
        >
            <FaPlus className="mr-2 text-[10px]" /> Add Row
        </button>
    </div>
    
        {/* Specs inputs list */}
        <div className="flex flex-col gap-4">
            {specs.map((spec, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-3 items-start md:items-center animate-fadeIn group">
                    {/* Key Input (e.g., Color) */}
                    <div className="w-full md:w-1/2">
                        <label className="label py-1">
                            <span className="label-text text-[10px] font-bold text-[#7E53AC]">Feature Name</span>
                        </label>
                        <input 
                            type="text"
                            name="key" 
                            placeholder="e.g. Color"
                            value={spec.key} 
                            onChange={(e) => handleSpecChange(index, e)}
                            className="input input-bordered w-full bg-white border-gray-300 h-11 focus:border-[#7E53AC] focus:ring-1 focus:ring-[#7E53AC] transition-all" 
                        />
                    </div>

                    {/* Value Input (e.g., Red) */}
                    <div className="w-full md:w-1/2">
                        <label className="label py-1">
                            <span className="label-text text-[10px] font-bold text-[#7E53AC]">Value</span>
                        </label>
                        <div className="flex gap-2 items-center">
                            <input 
                                type="text"
                                name="value" 
                                placeholder="e.g. Midnight Black"
                                value={spec.value} 
                                onChange={(e) => handleSpecChange(index, e)}
                                className="input input-bordered w-full bg-white border-gray-300 h-11 focus:border-[#7E53AC] focus:ring-1 focus:ring-[#7E53AC] transition-all" 
                            />
                            
                            {/* Remove Button */}
                            {specs.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={() => removeSpec(index)} 
                                    className="btn btn-square btn-sm border-none bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors mt-6 md:mt-0"
                                    title="Remove Specification"
                                >
                                    <FaTrash size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div> 
    </div>

                <textarea name="description" placeholder="Write product description here..." className="textarea textarea-bordered h-32 bg-white border-gray-300 text-base"></textarea>

                <button type="submit" className="btn bg-[#7E53AC] hover:bg-[#6b4594] text-white border-none w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-transform active:scale-95">
                    Upload Product To Store
                </button>
            </form>
        </div>
    );
};

export default AddProduct;