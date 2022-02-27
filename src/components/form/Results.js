import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import ChoseType from './ChoseType'
// import RevRange from './RevRange'
// import Vendor from './Vendor'

import { useDispatch, useSelector } from 'react-redux';
// import Industry from './Industry';
import { closeResults, findAverage, toggleMailForm } from '../../store/form/action';
import { faCheckCircle, faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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


    const handleToggle = (e) => {
        e.preventDefault();
        dispatch(toggleMailForm(!formState.mailForm))
    }
    const createRefferalLinks = formState.vendor === '1' ?
        formState.avgArr.map(element =>
        (<div>
            <p>Name:{element.name}</p>
            <p>Avg:{element.avg}</p>
            <div className='referral-logo'>
                <img defer src={element.image} alt={element.name} width="12" height="50" />
            </div>
        </div>)
        )
        :
        dataState.referralLinks.map((referral, key) => {
            return (<Link to={referral.link} className="btn referral" key={key}> {referral.company}</Link>)
        })

    return (
        <div className='results'>

            <FontAwesomeIcon className='close' close='close' icon={faTimesCircle} onClick={handleClose} />

            {createRefferalLinks}


            {/* <div className='referral-btn' > */}
            <Link to="#" className='referral-btn btn' onClick={handleToggle}>
                {`להתחלת סליקה `}
                {/* <FontAwesomeIcon className='check' icon={faChevronCircleLeft} /> */}
                {/* <FontAwesomeIcon className='check' icon={faAngleLeft} /> */}
            </Link>
            {/* </div> */}
        </div>
    )
}

export default Results