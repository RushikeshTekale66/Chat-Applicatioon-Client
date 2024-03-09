import React from 'react'

const Buttons = ({ type = 'button',
    label = 'Button',
    className = '',
    disabled = false
}) => {
    return (
        <button type={type} className={` text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ${className}`} disabled={disabled}>{label}

        </button >
    )
}

export default Buttons
