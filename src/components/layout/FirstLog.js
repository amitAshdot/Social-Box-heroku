import React from 'react'

const FirstLog = ({ handleCookie }) => {
    return (
        <div className='intro' onClick={() => handleCookie(false)}>FirstLog</div>
    )
}

export default FirstLog