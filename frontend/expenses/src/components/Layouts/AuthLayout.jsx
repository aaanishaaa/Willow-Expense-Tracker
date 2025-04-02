import React from 'react'
import bg from '../../assets/images/bg.jpg'
import logo from '../../assets/images/logo.png'
const AuthLayout = ({children}) => {
return (
    <div className="flex">
        <div className="w-screen h-screen md:w-[50vw] px-10 pb-40">
            <img src={logo} className='w-[8rem]'/>
            {children}
        </div>
        <div className="hidden md:block w-[50vw] h-screen">
            <img src={bg} className="w-full h-full object-cover" />
        </div>
    </div>
)
}

export default AuthLayout 