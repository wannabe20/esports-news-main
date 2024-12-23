import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../../supabase.js';

function Category() {
    const [posts, setPosts] = useState([]);
    const { game } = useParams();

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('category', game);

                if (error) throw error;
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchingData();
    }, [game]);

    return (
        <div className="pt-28">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8">{game.toUpperCase().split('-').join(' ')}</h1>
                <div className="grid gap-x-10 gap-y-10 sm:gap-y-14 sm:gap-x-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-40">
                    {posts.map((post) => (
                        <div className="grid gap-2" key={post.id}>
                            <img
                                className="object-cover h-48 w-full rounded"
                                src={`${supabase.storage
                                    .from('post-images')
                                    .getPublicUrl(post.img).publicUrl}`}
                                alt={post.title}
                            />
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                            <p>{post.desc}</p>
                            <div className="flex mt-3">
                                <Link to={`/post/${post.id}`}>
                                    <p className="bg-blue-900 text-slate-100 font-medium p-2 rounded inline-block">
                                        Read More
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
