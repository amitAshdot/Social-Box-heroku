import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChoseType from './ChoseType'
import RevRange from './RevRange'
import Vendor from './Vendor'

import { useSelector } from 'react-redux';
import Industry from './Industry';
const HasVendorForm = () => {
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);

    useEffect(() => {

    }, [])


    const results = dataState.data.filter((item, key) => {
        let filteredCompamies
        if (item.industry === formState.industry || item.rev_range === formState.industry) {

            filteredCompamies = dataState.company.filter(company => {
                return company.compname === item.company
            })

        }

        return formState.industry ? (<Link to={filteredCompamies.link} className="btn referral" key={item.id}>
            {filteredCompamies.company}
        </Link>) : null
    })

    return (
        <form className='form'>
            <ChoseType />

            <p>כמה שאלות זריזות לפני שנוכל
                תוצאותלהציג לך ממוצע עמלות סליקה של
                חברות האשראי
            </p>
            <RevRange />
            <Industry />

            {formState.industry !== null ? results : null}
        </form>
    )
}

export default HasVendorForm
