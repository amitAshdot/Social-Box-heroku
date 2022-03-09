import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import { setCurrentCompany, findAverage, toggleMailForm } from '../../store/form/action';
import { faPercent, faShekelSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

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

    const handleToggle = (e) => {
        e.preventDefault();
        dispatch(toggleMailForm(!formState.mailForm))
        const brand = e.target.getAttribute('brand')
        const imgUrl = e.target.getAttribute('img-url')
        const referralLink = e.target.getAttribute('referral-link')
        dispatch(setCurrentCompany({ brand: brand, imgUrl: imgUrl, referralLink: referralLink }))
    }

    const createRefferalLinks = formState.vendor === '1' ?
        formState.avgArr.map((element, key) =>
        (<SwiperSlide className='item' key={key}>
            <h3 >{element.name}</h3>
            <div className='referral-logo'>
                <img defer src={element.img} alt={element.name} width="500" height="120" />
            </div>
            <p className='item-commision'>
                <FontAwesomeIcon className="icon" icon={faPercent} />
                ממוצע עמלה:
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
            <Link to="#" className='referral-btn btn' onClick={handleToggle} brand={element.name} img-url={element.img} referral-link={'#'} >
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
                    {createRefferalLinks.length ? createRefferalLinks : 'לא נמצאו תוצאות מתאימות'}
                </Swiper>
            </div>
        </div>
    )
}

export default Results