import { useState } from 'react';
import loginImage from '../../assets/undraw/login.svg'
import {BiShowAlt, BiHide} from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


function Login () {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();


    const onSubmit =async data => {
		console.log(data);
        const loginData = {
            email: data.email,
            password: data.password,
            activeStatus: 'active'
        }
        fetch(`http://localhost:8000/api/v1/user/login`,{
            method: 'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.status==='fail'){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops',
                    text: `${data.error}`,
                    footer: ''
                })

            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Great',
                    text: `Successfully logged in to the Account!`,
                    footer: ''
                }).then(()=>{
                    navigate('/');
                })
                localStorage.setItem('userId', data.data._id);
                
            }
        })    
	}


    return (
        <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
            <div className="drop-shadow-md">
                <div className="card lg:card-side bg-base-100 p-4">
                <p className='text-2xl font-semibold text-start'>Research More+</p>
                    <img className='w-72' src={loginImage} alt="" />
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
                            <div class="card flex-shrink-0 w-full md:w-screen lg:w-screen max-w-sm  bg-white pt-3">
                                <div class="card-body">
                                    <h2 className='text-xl font-bold text-center'>Sign in to your account</h2>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Email</span>
                                        </label>
                                        <input type="text" class="input input-bordered bg-white"
                                        {...register('email', {
                                            required:{
                                                value: true,
                                                message: 'Email must be Required'
                                            },
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                message: 'Email is Invaild'
                                            }
                                        })} 
                                        />
                                        <label class="label">
                                            {errors.email?.type === 'required' && <span class="label-text-alt text-red-600">{errors.email.message}</span>}
                                            {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.email.message}</span>}
                                        </label>
                                    </div>
                                    <div class="form-control">
                                    <label class="label">
                                            <span class="label-text">Password</span>
                                            <span class="label-text-alt ">
                                                {
                                                    show?
                                                    <div onClick={()=>{
                                                        setShow(!show)
                                                    }} className='flex items-center text-blue-700 font-semibold'>
                                                        <p>Hide</p><BiShowAlt className='mt-1 ml-2'></BiShowAlt>
                                                    </div>
                                                    :
                                                    <div onClick={() =>{
                                                        setShow(!show)
                                                    }} className='flex items-center text-blue-700 font-semibold'>
                                                        <p>Show</p><BiHide className='mt-1 ml-2'></BiHide>
                                                    </div>

                                                }
                                            </span>
                                        </label>
                                        <input type={ show ? 'text' : 'password'}  class="input input-bordered bg-white"
                                        {...register('password', {
                                            required:{
                                                value: true,
                                                message: 'Password must be Required'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be 6 Character or longer'
                                            }
                                        })}
                                        />
                                        <label class="label">
                                            {errors.password?.type === 'required' && <span class="label-text-alt text-red-600">{errors.password.message}</span>}
                                            {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-600">{errors.password.message}</span>}
                                        </label>
                                    </div>
                                    <div class="form-control mt-2">
                                        <button type='submit' class="btn btn-success text-white">Login</button>
                                    </div>
                                    <p className='label-text-alt ml-1 text-center'>Don't have an account? <Link to='/signup' className='text-blue-800 underline'>Sign up</Link></p>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;