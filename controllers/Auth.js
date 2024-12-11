import supabase from '../supabase.js'; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register function using Supabase
export const Register = async (req, res) => {
    try {
        // Check if the user already exists by email or username
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .or(`email.eq.${req.body.email},username.eq.${req.body.username}`);

        if (error) return res.json(error);

        if (data.length) {
            return res.status(409).json("User already exists!");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Insert the new user into the users table
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                { username: req.body.username, email: req.body.email, password: hash }
            ]);

        if (insertError) return res.json(insertError);

        return res.status(200).json("User has been created!");
    } catch (err) {
        return res.status(500).json(err);
    }
}

// Login function using Supabase
export const Login = async (req, res) => {
    try {
        // Fetch user by username
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', req.body.username)
            .single(); // Assuming username is unique

        if (error) return res.json(error);
        if (!data) return res.status(404).json("User not found");

        // Check password
        if (!bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(401).json("Wrong password");
        }

        // Create JWT token
        const token = jwt.sign({ id: data.id }, "kuncijwt");

        // Exclude password from the response
        const { password, ...other } = data;

        // Set the JWT token as a cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        }).status(200).json(other);

    } catch (err) {
        return res.status(500).json(err);
    }
}

// Logout function
export const Logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out");
}
