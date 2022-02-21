import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChoseType from './ChoseType'
import RevRange from './RevRange'
import Vendor from './Vendor'

import { useDispatch, useSelector } from 'react-redux';
import Industry from './Industry';
import { setAvgArr, setType, closeResults, findAverage } from '../../store/form/action';

const Results = ({ industryeArr }) => {
    const dispatch = useDispatch();

    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);

    const referralLinks = [{ name: 'max', url: 'google.come' },]

    useEffect(() => {
        debugger
        dispatch(findAverage(industryeArr))

    }, [])

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(closeResults())
    }

    const createRefferalLinks = dataState.referralLinks.map((referral, key) => {
        return (<Link to={referral.link} className="btn referral" key={key}> {referral.company}</Link>)
    })
    return (
        <div className='results'>
            <button onClick={handleClose}>CLOSE</button>
            {formState.vendor === '1' ? (formState.avgArr.map(element => <div><p>Name:{element.name}</p><p>Avg:{element.avg}</p></div>))
                :
                <>{createRefferalLinks}</>
            }
        </div>
    )
}

export default Results