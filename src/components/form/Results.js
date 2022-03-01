import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import ChoseType from './ChoseType'
// import RevRange from './RevRange'
// import Vendor from './Vendor'

import { useDispatch, useSelector } from 'react-redux';
// import Industry from './Industry';
import { closeResults, findAverage, toggleMailForm } from '../../store/form/action';
import { faPercent, faShekelSign, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// import Swiper styles
import 'swiper/css';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
        formState.avgArr.map((element, key) =>
        (<SwiperSlide className='item' key={key}>
            <h3>{element.name}</h3>
            <div className='referral-logo'>
                <img defer src={element.image} alt={element.name} width="12" height="50" />
            </div>
            <p className='item-commision'>
                <FontAwesomeIcon className="icon" icon={faPercent} />
                ממוצע עמלה:
                {/* <FontAwesomeIcon className="icon" icon={faPercent} /> */}
                {element.avg.toFixed(2)}
                %
            </p>
            <p>
                <FontAwesomeIcon className="icon" icon={faShekelSign} />
                מחזור חודשי:
                {formState.revRange}
                <FontAwesomeIcon className="icon" icon={faShekelSign} />
            </p>

            <p className='item-compare'>מספר תוצאות במדד:{element.amountToSub}</p>
            <Link to="#" className='referral-btn btn' onClick={handleToggle}>
                {`להתחלת סליקה `}
            </Link>
        </SwiperSlide>)
        )
        :
        dataState.referralLinks.map((referral, key) => {
            return (<Link to={referral.link} className="btn referral" key={key}> {referral.company}</Link>)
        })



    return (
        <div className='results'>

            {/* <FontAwesomeIcon className='close' close='close' icon={faTimesCircle} onClick={handleClose} /> */}

            <div className='results-items'>
                <Swiper
                    dir="rtl"
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"

                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        "@0.75": {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        "@1.00": {
                            slidesPerView: 3.3,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {createRefferalLinks}
                </Swiper>
            </div>
        </div>
    )
}

export default Results