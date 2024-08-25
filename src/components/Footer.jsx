import React from 'react'

const Footer = () => {
    return (
        <div className='text-white bg-slate-800 flex flex-col justify-center items-center bottom-0 w-full'>

            <div className="logo font-bold text-white text-2xl ">
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className="text-green-500">OP/&gt; </span>
            </div>
            <div  className='flex justify-center items-center' >
                Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" />

            </div>



        </div>


    )
}

export default Footer