import { useState } from 'react';
import signupImage from '../../assets/undraw/signup.svg'
import {BiShowAlt, BiHide} from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Select from 'react-select';
import universityList from '../../data/universityListBD';
import universityDepartment from '../../data/universityDepartment';

function Signup () {
    const { register, formState: { errors }, control, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    console.log(universityList);
    const onSubmit = async data => {
        data.activeStatus= 'active';
        console.log(data);
        fetch(`http://localhost:8000/api/v1/user/`,{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(data)
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
                    text: `Successfully created the Account!`,
                    footer: ''
                }).then(()=>{
                    navigate('/');
                })
                localStorage.setItem('userId', data.data._id);
                
            }
        })  
    }

    return (
        <div className="bg-gray-200 w-full h-screen flex justify-center items-center ">
            <div className="drop-shadow-md">
                <div className="card lg:card-side bg-base-100 px-8 py-6">
                    <img className='w-72 px-6' src={signupImage} alt="" />
                    <div className="card-body overflow-y-scroll h-[600px] pl-4">
                        <form onSubmit={handleSubmit(onSubmit)} className=''>
                            <div class="card flex-shrink-0 w-full md:w-screen lg:w-screen max-w-sm  bg-white drop-shadow-md">
                                <div class="card-body">
                                    <h2 className='text-xl font-bold text-center'>Create your account</h2>
                                    {/* Email */}
                                    <div class="form-control">
                                        <label class="label mb-[-5px]">
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
                                    {/* Password */}
                                    <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
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
                                    {/* First Name */}
                                    <div class="form-control mt-[-15px]">
                                        <label class="label mb-[-5px]">
                                            <span class="label-text">First Name</span>
                                        </label>
                                        <input type="text" class="input input-bordered bg-white"
                                        {...register('firstName', {
                                            required:{
                                                value: true,
                                                message: 'First Name must be Required'
                                            }
                                        })} 
                                        />
                                        <label class="label">
                                            {errors.firstName?.type === 'required' && <span class="label-text-alt text-red-600">{errors.firstName.message}</span>}
                                        </label>
                                    </div>
                                    {/* Last Name */}
                                    <div  class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                            <span class="label-text">Last Name</span>
                                        </label>
                                        <input type="text" class="input input-bordered bg-white"
                                        {...register('lastName', {
                                            required:{
                                                value: true,
                                                message: 'Last Name must be Required'
                                            }
                                        })}
                                        />
                                        <label class="label">
                                            {errors.lastName?.type === 'required' && <span class="label-text-alt text-red-600">{errors.lastName.message}</span>}
                                        </label>
                                    </div>
                                    {/* Contact Number */}
                                    <div class="form-control mt-[-15px]">
                                        <label class="label mb-[-5px]">
                                            <span class="label-text">Contact Number</span>
                                        </label>
                                        <input type="number"  class="input input-bordered bg-white"
                                        {...register('contactNumber', {
                                            required:{
                                                value: true,
                                                message: 'Contact must be Required'
                                            }
                                        })} 
                                        />
                                        <label class="label">
                                            {errors.contactNumber?.type === 'required' && <span class="label-text-alt text-red-600">{errors.contactNumber.message}</span>}
                                        </label>
                                     </div>
                                     {/* University */}
                                     <div class="form-control mt-[-15px]">
                                        <label class="label mb-[-5px]">
                                            <span class="label-text">University</span>
                                        </label>
                                        {/* <input type="text" class="input input-bordered bg-white"
                                        {...register('university', {
                                            required:{
                                                value: true,
                                                message: 'University must be Required'
                                            }
                                        })} 
                                        /> */}
                                        {/* <Controller 
                                            control={control}
                                            as = {<Select />}
                                            name="university"
                                            defaultValue={props.universityList[0]}
                                            options={props.universityList}
                                            {...register('university', {
                                                required:{
                                                    value: true,
                                                    message: 'University must be Required'
                                                }
                                            })}
                                            className="basic-single"
                                            classNamePrefix="select"
                                        /> */}
                                        <Controller
                                            name="university"
                                            control={control}
                                            render={({ 
                                                field: {onChange, value, ref}
                                             }) => (
                                            <Select
                                                options={universityList}
                                                value={universityList.find(c => c.value === value)}
                                                onChange={val => onChange(val.value)}
                                                inputRef={ref}
                                            />
                                            )}
                                            rules={{ required:{
                                                value: true,
                                                message: 'University must be Required'
                                            } }}
                                        />
                                        {/* <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            // defaultValue={universityList[0]}
                                            name="university"
                                            options={universityList}
                                            {...register('university', {
                                                required:{
                                                    value: true,
                                                    message: 'University must be Required'
                                                }
                                            })}
                                        /> */}
                                        <label class="label ">
                                            {errors.university?.type === 'required' && <span class="label-text-alt text-red-600">{errors.university.message}</span>}
                                        </label>
                                     </div>
                                      {/* Department */}
                                      <div class="form-control mt-[-15px]">
                                        <label class="label mb-[-5px]">
                                            <span class="label-text">Department</span>
                                        </label>
                                        <Controller
                                            name="department"
                                            control={control}
                                            render={({ 
                                                field: {onChange, value, ref}
                                             }) => (
                                            <Select
                                                options={universityDepartment}
                                                value={universityDepartment.find(c => c.value === value)}
                                                onChange={val => onChange(val.value)}
                                                inputRef={ref}
                                            />
                                            )}
                                            rules={{ required:{
                                                value: true,
                                                message: 'Department must be Required'
                                            } }}
                                        />
                                       
                                        <label class="label ">
                                            {errors.university?.type === 'required' && <span class="label-text-alt text-red-600">{errors.department.message}</span>}
                                        </label>
                                     </div>
                                     {/* role */}
                                     <div className="form-control w-full max-w-xs mt-[-15px]">
                                        <label className="label mb-[-5px]">
                                            <span className="label-text">Your Role</span>
                                        </label>
                                        <select 
                                        {...register('role', {
                                            required:{
                                                value: true,
                                                message: 'Role must be Required'
                                            }
                                        })} 
                                        className="select select-bordered">
                                            <option disabled selected value="">Not choosed yet</option>
                                            <option value="Professor">Professor</option>
                                            <option value="Student">Student</option>
                                        </select>
                                        <label class="label">
                                            {errors.role?.type === 'required' && <span class="label-text-alt text-red-600">{errors.role.message}</span>}
                                        </label>
                                        </div>

                                    <div class="form-control mt-2">
                                        <button type='submit' class="btn btn-success text-white">Sign up</button>
                                    </div>
                                    <p className='label-text-alt ml-1 text-center'>Already have an account? <Link to='/login' className='text-blue-800 underline'>Log in</Link></p>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;