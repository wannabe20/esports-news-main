import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase'; // Import Supabase client

const Menu = ({ cat }) => {
    const [rec, setRec] = useState([]);

    const fetchingData = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('category', cat)
                .limit(5);

            if (error) throw error;
            setRec(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (cat) fetchingData();
    }, [cat]);

    return (
        <div>
            <h1 className="text-lg font-semibold mb-5">Other news you may like</h1>
            <div className="grid min-[400px]:grid-cols-2 md:grid-cols-1 gap-10 min-[400px]:gap-5 lg:gap-10">
                {rec &&
                    rec.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id} className="cursor-pointer hover:underline">
                            <img
                                className="rounded h-42 w-full object-cover"
                                src={`${supabase.storage
                                    .from('post-images')
                                    .getPublicUrl(post.img).publicUrl}`}
                                alt={post.title}
                            />
                            <h1 className="text-xl mt-2 font-bold line-clamp-2">{post.title}</h1>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Menu;
