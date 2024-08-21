import React, { useEffect } from 'react'
import { useRef, useState } from 'react';

const Manager = () => {
    const ref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    useEffect(() => {

        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }

    }, [])

    const savePassword = () => {

        console.log(form);
        setPasswordArray([...passwordArray, form]);
        localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])



    }

    const showPassword = () => {


        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
        }
        else {
            alert("show the password");
            ref.current.src = "icons/eyecross.png";
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    return (
        <div>
            <div
                className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]">
            </div>



            <div className="mycontainer">

                <h1 className='text-4xl text text-center font-bold'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt; </span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password Manager</p>
                <div className=" flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="site" id="" placeholder='Enter website URL' />
                    <div className='flex w-full gap-8 justify-between'>
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="username" id="" placeholder='Enter Username' />
                        <div className="relative">

                            <input value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="password" id="" placeholder='Enter Password' />
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
                        Add password</button>
                </div>
                <div className="passwords">
                    <h2 className='text-2xl font-bold py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item) => {
                                return <tr>
                                    <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank' >{item.site}</a></td>
                                    <td className='py-2 border border-white text-center w-32'>{item.username} </td>
                                    <td className='py-2 border border-white text-center w-32'>{item.password} </td>
                                </tr>


                            })}

                        </tbody>
                    </table>}
                </div>

            </div>

        </div>
    )
}

export default Manager