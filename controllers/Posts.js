import supabase from '../supabase.js';
import jwt from "jsonwebtoken"

export const getAllPosts = async (req, res) => {
    const category = req.query.category || "";
    const limit = parseInt(req.query.limit) || 10;
    const page = req.query.page || 1;

    const offset = (page - 1) * limit;

    try {
        const query = supabase
            .from("posts")
            .select("*", { count: "exact" })
            .range(offset, offset + limit - 1);

        if (category) query.eq("category", category);

        const { data, error, count } = await query;

        if (error) return res.status(500).json(error);
        if (data.length < 1) return res.status(404).json("No posts available.");

        return res.status(200).json({ data, total: count });
    } catch (err) {
        return res.status(500).json(err);
    }
};


export const getPostById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("posts")
            .select("*, users(username)")
            .eq("id", req.params.id)
            .single();

        if (error) return res.status(500).json(error);
        if (!data) return res.status(404).json("Post not found.");

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
};


export const publishPost = async (req, res) => {
    const currentTime = new Date().toISOString();

    try {
        const { data, error } = await supabase
            .from("posts")
            .insert([
                {
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    img: req.body.img,
                    date: currentTime,
                    uid: req.data.id,
                },
            ])
            .select();

        if (error) return res.status(500).json(error);

        return res.status(200).json({ msg: "Post has been published", id: data[0].id });
    } catch (err) {
        return res.status(500).json(err);
    }
};


export const deletePost = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("posts")
            .delete()
            .eq("id", req.params.id)
            .eq("uid", req.data.id);

        if (error) return res.status(500).json(error);
        if (data.length === 0) return res.status(404).json("Post not found or unauthorized.");

        return res.status(200).json("Post has been deleted.");
    } catch (err) {
        return res.status(500).json(err);
    }
};


export const updatePost = async (req, res) => {
    const currentTime = new Date().toISOString();

    try {
        const { data, error } = await supabase
            .from("posts")
            .update({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                img: req.body.img,
                date: currentTime,
            })
            .eq("id", req.params.id);

        if (error) return res.status(500).json(error);
        if (data.length === 0) return res.status(404).json("Post not found.");

        return res.status(200).json("Post has been updated.");
    } catch (err) {
        return res.status(500).json(err);
    }
};
