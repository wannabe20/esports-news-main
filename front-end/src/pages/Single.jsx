import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext.jsx'
import DeleteModal from '../components/DeleteModal.jsx'
import parse from 'html-react-parser';

const Single = () => {
    const [post, setPost] = useState({
        id: 0,
        title: "",
        description: "",
        img: "",
        category: "",
        date: "",
        uid: 0
    })
    const [isOpenModal, setIsOpenModal] = useState(false)


    let { id } = useParams()

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchingData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)

                setPost((prev) => ({ ...prev, ...res.data[0] }))
            } catch (error) {
                console.log(error);
            }
        }
        fetchingData()
    }, [id])

    const handleOpenModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    return (
        <>
            <div className='container grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-14 mx-auto pt-24 md:pt-32 pb-40'>
                {post && <div className="md:col-span-3">
                    <img className='w-full object-cover h-72 rounded mb-6' src={`https://mjyonzcfwgauldobukqn.supabase.co/storage/v1/object/public/post-images/${post.img}`} alt="bg" />
                    <div className='flex gap-x-5 items-center mb-8'>
                        {/* Profile */}
                        <img className='h-12 w-12 rounded-full' src="/bg.png" alt="profile" />
                        <div>
                            <h3 className='text-lg font-semibold text-slate-700'>{post.username}</h3>
                            <h5 className='text-slate-600'>Posted 2 days ago</h5>
                        </div>

                        {post.uid === currentUser?.id ? <Link to={`/write?edit=${post.id}`} state={post}>
                            <button className='h-9 w-9 flex items-center justify-center rounded-full bg-yellow-400'>
                                <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        </Link> : ""}
                        {post.uid === currentUser?.id ? <button onClick={handleOpenModal} className='h-9 w-9 flex items-center justify-center rounded-full bg-red-400'>
                            <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button> : ""}

                        {isOpenModal && <DeleteModal handleOpenModal={handleOpenModal} />}
                    </div>
                    <h1 className='text-4xl font-bold mb-8'>{post.title}</h1>
                    <div className='text-justify'>
                        <div>
                            {parse(post.description)}
                        </div>
                    </div>
                </div>}

                {post && <Menu cat={post.category} />}
            </div>
        </>
    )
}

export default Single