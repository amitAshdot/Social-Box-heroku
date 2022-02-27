import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import ChoseType from './ChoseType'
// import RevRange from './RevRange'
// import Vendor from './Vendor'

import { useDispatch, useSelector } from 'react-redux';
// import Industry from './Industry';
import { closeResults, findAverage } from '../../store/form/action';

const Results = ({ industryeArr }) => {
    const dispatch = useDispatch();

    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);

    useEffect(() => {
        dispatch(findAverage(industryeArr));
    }, [])

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(closeResults())
    }

    const createRefferalLinks = formState.vendor === '1' ?
        formState.avgArr.map(element => { return <div><p>Name:{element.name}</p><p>Avg:{element.avg}</p></div> })
        :
        dataState.referralLinks.map((referral, key) => {
            return (<Link to={referral.link} className="btn referral" key={key}> {referral.company}</Link>)
        })

    return (
        <div className='results'>
            <button onClick={handleClose}>CLOSE</button>
            {createRefferalLinks}
        </div>
    )
}

export default Results