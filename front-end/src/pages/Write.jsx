import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';


const Write = () => {
    const state = useLocation().state

    const navigate = useNavigate()

    // Create a single supabase client for interacting with your database
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

    const [title, setTitle] = useState(state?.title || '');
    const [description, setDescription] = useState(state?.description || '');
    const [category, setCategory] = useState(state?.category || '');
    const [image, setImage] = useState(null)

    const { currentUser } = useContext(AuthContext)

    const uuid = uuidv4()

    const uploadImage = async () => {
        const fileName = uuid
        if (image) {
            const { data, error } = await supabase
                .storage
                .from('post-images')
                .upload(fileName, image, {
                    cacheControl: '10',
                })
            if (data) {
                console.log("file uploaded");
            } else {
                console.log(error);
            }
        }

        return fileName
    }

    const updateImage = async () => {
        if (image) {
            const { data, error } = await supabase
                .storage
                .from('post-images')
                .update(state.img, image, {
                    cacheControl: 10,
                    upsert: true
                })
            if (data) {
                console.log({ ...data, img: state.img });
            } else {
                console.log(error);
            }
        }
    }

    const handlePublish = async (e) => {
        e.preventDefault()

        const fileName = state ? updateImage() : uploadImage()

        try {
            const res = state ?
                await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/update/${state.id}`, {
                    title: title,
                    description: description,
                    category: category,
                    img: state.img
                }, {
                    withCredentials: true
                })
                :
                await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, {
                    title: title,
                    description: description,
                    category: category,
                    img: uuid
                }, {
                    withCredentials: true
                })

            state ? toast.success("Post has been updated!") : toast.success("Post has been published!")
            state ? navigate(`/post/${state.id}`) : navigate(`/post/${res.data.id}`)
            console.log(fileName);
        } catch (error) {
            console.log(error);
        }

        setTitle("")
        setDescription("")
        setCategory("")
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!currentUser) {
            navigate("/login")
        }


    }, [currentUser])

    return (
        <>
            <div className='container grid grid-cols-1 min-[1300px]:grid-cols-4 gap-8 lg:gap-14 mx-auto pt-24 md:pt-32 pb-40'>
                <div className='min-[1300px]:col-span-3'>
                    <input placeholder='Title' className='p-3 mb-5 border-[1px] border-slate-300 w-full font-semibold' value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                    <ReactQuill className='h-[400px]' theme="snow" value={description} onChange={setDescription} />
                </div>


                <div className='flex w-full mt-10 flex-col min-[650px]:flex-row min-[1300px]:flex-col min-[1300px]:mt-0 gap-10'>
                    {/* Games Category */}
                    <div className='border-[1px] flex-1 border-slate-300 p-8'>
                        <h1 className='text-2xl font-bold mb-5'>Games Category</h1>

                        <div class="flex items-center mb-4">
                            <input id="league-of-legends" checked={category === "league-of-legends" ? true : false} onChange={(e) => setCategory(e.target.value)} type="radio" value="league-of-legends" name="categories" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="league-of-legends" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">League of Legends</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="dota-2" checked={category === "dota-2" ? true : false} onChange={(e) => setCategory(e.target.value)} type="radio" value="dota-2" name="categories" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="dota-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dota 2</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="valorant" checked={category === "valorant" ? true : false} onChange={(e) => setCategory(e.target.value)} type="radio" value="valorant" name="categories" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="valorant" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Valorant</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="csgo" checked={category === "csgo" ? true : false} onChange={(e) => setCategory(e.target.value)} type="radio" value="csgo" name="categories" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="csgo" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">CSGO</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="mobile-legends" checked={category === "mlbb" ? true : false} onChange={(e) => setCategory(e.target.value)} type="radio" value="mlbb" name="categories" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="mobile-legends" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mobile Legends</label>
                        </div>
                        <div class="flex items-center">
                            <input id="pubg-mobile" checked={category === "pubg-mobile" ? true : false} onChange={(e) => setCategory(e.target.value)} type="radio" value="pubg-mobile" name="categories" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="pubg-mobile" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">PUBG Mobile</label>
                        </div>
                    </div>


                    {/* Publish Information */}
                    <div className='border-[1px] flex-1 border-slate-300 p-8'>
                        <h1 className='text-2xl font-bold mb-5'>Publish</h1>
                        {/* <div className='mb-2 flex items-center'>
                            <h1 className='font-medium mr-1'>Status : </h1>
                            <h1>Draft</h1>
                        </div>
                        <div className='mb-5 flex items-center'>
                            <h1 className='font-medium mr-1'>Visibility : </h1>
                            <h1>Show</h1>
                        </div> */}
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                        <input onChange={(e) => setImage(e.target.files[0])} name='post-image' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        <div className='mt-5 flex justify-between items-center'>
                            <button onClick={handlePublish} className='border-[1px] border-green-700 bg-green-700 text-slate-100 py-2 px-4'>{state ? "Update" : "Publish"}</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Write