import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const Write = () => {
    const state = useLocation().state;
    const navigate = useNavigate();
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

    const [title, setTitle] = useState(state?.title || '');
    const [description, setDescription] = useState(state?.description || '');
    const [category, setCategory] = useState(state?.category || '');
    const [image, setImage] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const uuid = uuidv4();

    const uploadImage = async () => {
        if (image) {
            console.log("Uploading image:", image.name);
            const { data, error } = await supabase.storage
                .from('post-images')
                .upload(uuid, image, {
                    cacheControl: '10',
                });
    
            if (error) {
                console.error("Image upload error:", error.message);
                return null;
            }
    
            console.log("Image uploaded successfully:", data.path);
            return uuid; // Return the filename
        }
        console.log("No image selected for upload.");
        return null;
    };
    

    const updateImage = async () => {
        if (image) {
            const { data, error } = await supabase
                .storage
                .from('post-images')
                .update(state.img, image, {
                    cacheControl: 10,
                    upsert: true,
                });

            if (error) {
                console.error("Image update error:", error);
                return null;
            }

            console.log("Image updated:", data);
            return state.img; // Return the existing filename
        }
        return state.img; // If no new image, keep the current one
    };

    const handlePublish = async (e) => {
        e.preventDefault();

        try {
            const fileName = state ? await updateImage() : await uploadImage();

            const res = state
                ? await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/update/${state.id}`, {
                      title,
                      description,
                      category,
                      img: fileName,
                  }, { withCredentials: true })
                : await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, {
                      title,
                      description,
                      category,
                      img: fileName,
                  }, { withCredentials: true });

            toast.success(state ? "Post has been updated!" : "Post has been published!");
            navigate(state ? `/post/${state.id}` : `/post/${res.data.id}`);
        } catch (error) {
            console.error("Error publishing post:", error);
            toast.error("Failed to publish post.");
        } finally {
            setTitle('');
            setDescription('');
            setCategory('');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!currentUser) navigate("/login");
    }, [currentUser]);

    return (
        <div className='container grid grid-cols-1 min-[1300px]:grid-cols-4 gap-8 lg:gap-14 mx-auto pt-24 md:pt-32 pb-40'>
            <div className='min-[1300px]:col-span-3'>
                <input
                    placeholder='Title'
                    className='p-3 mb-5 border-[1px] border-slate-300 w-full font-semibold'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                />
                <ReactQuill
                    className='h-[400px]'
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                />
            </div>

            <div className='flex w-full mt-10 flex-col min-[650px]:flex-row min-[1300px]:flex-col min-[1300px]:mt-0 gap-10'>
                {/* Category Selection */}
                <div className='border-[1px] flex-1 border-slate-300 p-8'>
                    <h1 className='text-2xl font-bold mb-5'>Games Category</h1>
                    {[
                        { id: "league-of-legends", value: "league-of-legends", label: "League of Legends" },
                        { id: "dota-2", value: "dota-2", label: "Dota 2" },
                        { id: "valorant", value: "valorant", label: "Valorant" },
                        { id: "cs2", value: "cs2", label: "Counter-Strike 2" },
                        { id: "mlbb", value: "mlbb", label: "Mobile Legends" },
                        { id: "pubg-mobile", value: "pubg-mobile", label: "PUBG-mobile" },
                    ].map((cat) => (
                        <div className="flex items-center mb-4" key={cat.id}>
                            <input
                                id={cat.id}
                                checked={category === cat.value}
                                onChange={(e) => setCategory(e.target.value)}
                                type="radio"
                                value={cat.value}
                                name="categories"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor={cat.id}
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {cat.label || cat.value}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Publish Information */}
                <div className='border-[1px] flex-1 border-slate-300 p-8'>
                    <h1 className='text-2xl font-bold mb-5'>Publish</h1>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                    >
                        Upload file
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        name='post-image'
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                    />
                    <div className='mt-5 flex justify-between items-center'>
                        <button
                            onClick={handlePublish}
                            className='border-[1px] border-green-700 bg-green-700 text-slate-100 py-2 px-4'
                        >
                            {state ? "Update" : "Publish"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;
