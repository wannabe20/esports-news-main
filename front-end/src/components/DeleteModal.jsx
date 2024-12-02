import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

function DeleteModal({ handleOpenModal }) {

    const location = useLocation()
    const navigate = useNavigate()

    const postId = location.pathname.split('/')[2]

    const deletePost = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/delete/${postId}`,
                {
                    withCredentials: true,
                })

            handleOpenModal()
            toast.success("Post has been deleted")
            navigate("/")
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className='fixed flex z-50 items-center justify-center h-full w-full left-0 top-0 bg-black bg-opacity-30'>
                <div className='bg-slate-50 p-5 rounded z-10'>
                    <h1 className='font-medium text-xl'>Are you sure to delete this post?</h1>
                    <div className='flex justify-between items-center mt-8'>
                        <button onClick={handleOpenModal} className='px-3 py-2 rounded border-[2px] border-slate-400'>Cancel</button>
                        <button onClick={() => deletePost()} className='px-3 py-2 rounded border-[2px] bg-red-300 border-red-700'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal