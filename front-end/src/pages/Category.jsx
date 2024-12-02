import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Category() {
    const [posts, setPosts] = useState([])

    const { game } = useParams()

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts?category=${game}`)

                setPosts(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchingData()
    }, [game])


    return (
        <div className='pt-28'>
            <div className='container mx-auto'>
                <h1 className='text-4xl font-bold mb-8'>{game.toUpperCase().split('-').join(" ")}</h1>
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
    )
}

export default Category