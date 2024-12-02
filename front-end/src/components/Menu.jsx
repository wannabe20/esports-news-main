import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ cat }) => {
    const [rec, setRec] = useState([])

    const fetchingData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts?category=${cat}&limit=5`)

            setRec(res.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        cat && fetchingData()

    }, [cat])

    return (
        <div>
            <h1 className='text-lg font-semibold mb-5'>Other news you may like</h1>
            <div className='grid min-[400px]:grid-cols-2 md:grid-cols-1 gap-10 min-[400px]:gap-5 lg:gap-10'>
                {rec && rec.map(post => (
                    <Link to={`/post/${post.id}`} key={post.id} className='cursor-pointer hover:underline'>
                        <img className='rounded h-42 w-full object-cover' src={`https://mjyonzcfwgauldobukqn.supabase.co/storage/v1/object/public/post-images/${post.img}`} alt={post.title} />
                        <h1 className='text-xl mt-2 font-bold line-clamp-2'>{post.title}</h1>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Menu 