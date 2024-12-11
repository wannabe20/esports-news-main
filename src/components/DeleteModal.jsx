import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../supabase'; // Import Supabase client

function DeleteModal({ handleOpenModal }) {
    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split('/')[2];

    const deletePost = async () => {
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;

            handleOpenModal();
            toast.success('Post has been deleted');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete post');
        }
    };

    return (
        <div className="fixed flex z-50 items-center justify-center h-full w-full left-0 top-0 bg-black bg-opacity-30">
            <div className="bg-slate-50 p-5 rounded z-10">
                <h1 className="font-medium text-xl">Are you sure to delete this post?</h1>
                <div className="flex justify-between items-center mt-8">
                    <button onClick={handleOpenModal} className="px-3 py-2 rounded border-[2px] border-slate-400">
                        Cancel
                    </button>
                    <button onClick={deletePost} className="px-3 py-2 rounded border-[2px] bg-blue-300 border-blue-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
