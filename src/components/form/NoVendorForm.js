import React, { useState, useEffect } from 'react'
import ChoseType from './ChoseType'
import RevRange from './RevRange'
import Vendor from './Vendor'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux';
const NoVendorForm = () => {
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);

    useEffect(() => {

    }, [])

    const results = dataState.referralLinks.map((referral, key) => {

        return (<Link to={referral.link} className="btn referral" key={key}>
            {referral.company}
        </Link>)
    })
    return (
        <form className='form'>
            <ChoseType />
            {formState.type !== null ? results : null}
        </form>
    )
}

export default NoVendorForm