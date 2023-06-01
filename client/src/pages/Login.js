import React, { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { axiosClient } from '../axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../localStorageManager';
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post("/auth/login", {
                email,
                password
            });
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <Card color="transparent" shadow={false} className='item-center  justify-center top-12 bg-gray-200 shadow-xl max-w-lg p-4 left-[30%]'>
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to login.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">

                        <Input size="lg" label="Email" onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" size="lg" label="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <Button className="mt-6" fullWidth onClick={handleSubmit}>
                        Login
                    </Button>

                </form>
            </Card>

        </>
    )
}

export default Login