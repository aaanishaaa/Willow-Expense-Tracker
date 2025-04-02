import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='pb-2'>
            <label className='text-md'>{label}</label>
            <div className='pb-3 flex items-center bg-cyan-800/30 p-2 rounded-md'>
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className='text-md bg-transparent flex-1 outline-none'
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {type === 'password' && (
                    showPassword ? (
                        <FaRegEye
                            size={20}
                            className='text-primary cursor-pointer'
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={20}
                            className='text-slate-400 cursor-pointer'
                            onClick={toggleShowPassword}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
