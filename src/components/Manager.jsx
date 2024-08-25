import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])



    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    useEffect(() => {

        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }

    }, [])

    const savePassword = () => {

        if(form.site.length > 3 && form.username.length > 3 && form.password.length >5){

            
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
            localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            
            navigator.clipboard.writeText(text)
            toast('Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    
    
    }
    
    else{
            toast('Error: Password not Saved'); 
    }
        
        
    }
    const deletePassword = (id) => {
        console.log("Delete password with id", id);
        let c =  confirm("Do you really want to delete this password")
        if(c){

            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))

        }

        navigator.clipboard.writeText(text)
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    
}


    const editPassword = (id) => {
        console.log("Delete password with id", id);
        setform(passwordArray.filter(i=>i.id===id));
        setPasswordArray(passwordArray.filter(item => item.id !== id));

        
    }

    const showPassword = () => {


        passwordRef.current.type = "text";

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password";

        }
        else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text";

        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            <div
                className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]">
            </div>



            <div className=" p-3  md:mycontainer min-h-[85.4vh]">

                <h1 className='text-4xl text text-center font-bold'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt; </span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password Manager</p>
                <div className=" flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="site" id="site" placeholder='Enter website URL' />
                    <div className='flex w-full gap-8 justify-between'>
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="username" id="username" placeholder='Enter Username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name="password" id="" placeholder='Enter Password' />
                            <span className="absolute right-[3px] top-[0px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='p-2' src="icons/eye.png" alt="show" width={40} />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex text-black justify-center items-center gap-2 bg-green-400 rounded-full px-10 py-2 w-fit hover:bg-green-300 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/vcuhguff.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='text-2xl font-bold py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-5 ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className="py-2">Detele</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item) => {
                                return <tr>
                                    <td className='  py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank' >{item.site}</a>
                                            <div className='cursor-pointer lordiconcopy size-7' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                            {item.username}
                                            <div className='cursor-pointer lordiconcopy size-7' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>

                                            {item.password}
                                            <div className='cursor-pointer lordiconcopy size-7' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center '>
                                        <span className='cursor-pointer mx-1'  onClick={ () => {editPassword(item.id)}}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={ () => {deletePassword(item.id)}}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>


                            })}

                        </tbody>
                    </table>}
                </div>

            </div>

        </>
    )
}

export default Manager;