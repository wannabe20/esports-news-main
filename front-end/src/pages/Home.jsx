import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios"

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)

                setPosts(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchingData()
    }, [])

    return (
        <>
            <img className='absolute -z-10 h-screen w-screen object-cover max-h-[700px]' src="./esports.jpg" alt="esports" />
            <div className='absolute -z-10 h-screen w-full  bg-black bg-opacity-80 max-h-[700px]' ></div>
            <div className='pt-24 md:pt-28'>
                <div className='container mx-auto'>
                    <div className='h-[600px] text-slate-100 flex flex-col items-center text-center relative'>
                        <h1 className='text-5xl sm:text-6xl font-bold mt-16 sm:mt-20 md:mt-24'>Welcome to E-Sports News!</h1>
                        <p className='mt-10 text-xl md:text-2xl w-11/12 sm:w-9/12 md:w-1/2'>The E-Sports Hub for Fast, Fresh, and Furious Updates</p>
                        <div className='absolute top-52 md:top-64 w-full h-20'>
                            <div class="mouse_scroll">
                                <div class="mouse">
                                    <div class="wheel"></div>
                                </div>
                                <div>
                                    <span class="m_scroll_arrows unu"></span>
                                    <span class="m_scroll_arrows doi"></span>
                                    <span class="m_scroll_arrows trei"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-4xl font-bold mb-8'>Recent News</h1>
                    <div className='grid gap-x-10 gap-y-10 sm:gap-y-14 sm:gap-x-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-40'>
                        {
                            posts.map((post) => (
                                <div className='grid gap-2' key={post.id}>
                                    <img className='object-cover h-48 w-full rounded' src={`https://mjyonzcfwgauldobukqn.supabase.co/storage/v1/object/public/post-images/${post.img}`} alt={post.title} />
                                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                                    <p>{post.desc}</p>
                                    <div className='flex mt-3'>
                                        <Link to={`/post/${post.id}`}>
                                            <p className='bg-red-900 text-slate-100 font-medium p-2 rounded inline-block'>Read More</p>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home