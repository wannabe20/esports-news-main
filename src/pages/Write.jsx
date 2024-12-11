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
        if (!image) return null;
        try {
            const { data, error } = await supabase.storage
                .from('post-images')
                .upload(uuid, image, { cacheControl: '3600' });
            if (error) throw error;
            return uuid;
        } catch (error) {
            console.error('Image upload error:', error.message);
            toast.error('Failed to upload image.');
            return null;
        }
    };

    const updateImage = async () => {
        if (!image) return state.img;
        try {
            const { error } = await supabase.storage
                .from('post-images')
                .update(state.img, image, { cacheControl: '3600', upsert: true });
            if (error) throw error;
            return state.img;
        } catch (error) {
            console.error('Image update error:', error.message);
            toast.error('Failed to update image.');
            return null;
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        try {
            const fileName = state ? await updateImage() : await uploadImage();

            if (!fileName) {
                toast.error('Image is required.');
                return;
            }

            const payload = { title, description, category, img: fileName, user_id: currentUser.id };
            const { error } = state
                ? await supabase.from('posts').update(payload).eq('id', state.id)
                : await supabase.from('posts').insert(payload);

            if (error) throw error;

            toast.success(state ? 'Post has been updated!' : 'Post has been published!');
            navigate(state ? `/post/${state.id}` : `/post/${uuid}`);
        } catch (error) {
            console.error('Error publishing post:', error.message);
            toast.error('Failed to publish post.');
        } finally {
            setTitle('');
            setDescription('');
            setCategory('');
        }
    };

    useEffect(() => {
        if (!currentUser) navigate('/login');
    }, [currentUser, navigate]);

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
                <div className='border-[1px] flex-1 border-slate-300 p-8'>
                    <h1 className='text-2xl font-bold mb-5'>Games Category</h1>
                    {['league-of-legends', 'dota-2', 'valorant', 'cs2', 'mlbb', 'pubg-mobile'].map((cat) => (
                        <div className="flex items-center mb-4" key={cat}>
                            <input
                                id={cat}
                                checked={category === cat}
                                onChange={(e) => setCategory(e.target.value)}
                                type="radio"
                                value={cat}
                                name="categories"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                            />
                            <label htmlFor={cat} className="ms-2 text-sm font-medium text-gray-900">
                                {cat}
                            </label>
                        </div>
                    ))}
                </div>

                <div className='border-[1px] flex-1 border-slate-300 p-8'>
                    <h1 className='text-2xl font-bold mb-5'>Publish</h1>
                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
                        Upload file
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                        id="file_input"
                        type="file"
                    />
                    <div className='mt-5 flex justify-between items-center'>
                        <button
                            onClick={handlePublish}
                            className='border-[1px] border-green-700 bg-green-700 text-slate-100 py-2 px-4'
                        >
                            {state ? 'Update' : 'Publish'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;
