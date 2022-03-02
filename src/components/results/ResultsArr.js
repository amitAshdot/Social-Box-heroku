import React, { useEffect } from 'react'
// import ChoseType from '../form/ChoseType'

// import Vendor from '../form/Vendor'
// import Select from '../form1/Select'

import { useDispatch, useSelector } from 'react-redux';
import { toggleMailForm, setCurrentCompany } from '../../store/form/action';

// import GeneralForm from '../form/general/GeneralForm';
// import Result from '../results/Result'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// import Swiper styles
import 'swiper/css';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const ResultsArr = () => {
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);

    const dispatch = useDispatch();
    // const [toggle, setToggle] = useState(false)

    const handleToggle = (e) => {
        e.preventDefault();
        dispatch(toggleMailForm(!formState.mailForm))
        const brand = e.target.getAttribute('brand')
        const imgUrl = e.target.getAttribute('img-url')
        const referralLink = e.target.getAttribute('referral-link')
        dispatch(setCurrentCompany({ brand: brand, imgUrl: imgUrl, referralLink: referralLink }))
    }

    useEffect(() => { }, [])

    // const [formType, setFormType] = useState(null)
    const filtered = dataState.referralLinks.filter(item => item.type === dataState.type[formState.type]);
    const finaleRender = filtered.map((item, index) =>
        <SwiperSlide className='result-referral' key={index}>
            <div className='referral-logo'>
                <img defer src={item.image} alt={item.brand} width="12" height="50" />
                <h3>{item.brand}</h3>
            </div>
            <div className='referral-main'>
                <h3 className='referral-main-title'>{item.post_title}</h3>
                <p className='referral-main-cost'>₪{item.monthly_cost ? item.monthly_cost : "0"} / לחודש</p>
            </div>
            <div className='referral-details'>
                {item.month ?
                    <div className='referral-details-row'>
                        <p className='referral-details-text'>קבלת הכסף פעם בחודש</p>
                        <p className='referral-details-number'>{item.month}%</p>

                    </div>
                    :
                    <div className='referral-details-row'>
                        <p className='referral-details-text'>קבלת הכסף באותו היום</p>
                        <p className='referral-details-number'>{item.daily}%</p>
                    </div>
                }
                <div className='referral-details-row'>
                    <p className='referral-details-text'>עמלת סליקה לויזת תייר</p>
                    <p className='referral-details-number'>{item.tourista !== "" ? `${item.tourista}%` : '-'}</p>
                </div>
                <div className='referral-details-row'>
                    <p className='referral-details-text'>תוסף סליקה</p>
                    <p className='referral-details-number'>{item.plugin !== "" ? `${item.plugin}` : '-'}</p>
                </div>

            </div>
            <div className='referral-info'>
                <p className='referral-info-text'>פרטים נוספים</p>
                <p className='referral-info-deatils'>{item.comments}</p>
            </div>
            <div className='referral-btn' >
                <Link to="#" className='referral-btn btn' onClick={handleToggle} brand={item.brand} img-url={item.image} referral-link='#' >
                    {`להתחלת סליקה `}

                    <FontAwesomeIcon className='check' icon={faAngleLeft} />
                </Link>
            </div>
        </SwiperSlide>);

    return (
        <div className='result'>
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
                        spaceBetween: 10,
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
                {finaleRender}
            </Swiper>
        </div>
    )
}

export default ResultsArr