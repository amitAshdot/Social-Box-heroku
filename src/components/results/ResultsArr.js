import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { toggleMailForm, setCurrentCompany } from '../../store/form/action';

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
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

    const filtered = dataState.referralLinks.filter(item => {
        const compSize = {
            "0-5,000": 'small',
            "5,001-10,00": 'small',
            "10,001-20,000": 'small',
            "20,001-40,000": 'medium',
            "40,001-70,000": 'medium',
            "70,001-100,000": 'big',
            "100,001 ומעלה": 'large',
        }
        const isPart = item.size.filter(size => size === compSize[formState.revRange])
        return isPart.length
    });

    const sortArr = filtered.sort(function (a, b) { return b.rating[0] - a.rating[0] });

    const finaleRender = sortArr.map((item, index) => {
        let specificConstAverage = null
        const lowEnd = formState.revRange.substr(0, formState.revRange.indexOf('-')).replace(/,/g, '');
        const highEnd = formState.revRange.substr(formState.revRange.indexOf('-') + 1, formState.revRange.length).replace(/,/g, '');
        // const isNumber = (value) => {
        //     return typeof value === 'number' && isFinite(value);
        // }
        let averageRev = null
        if (lowEnd !== '') {
            averageRev = (parseFloat(highEnd) + parseFloat(lowEnd)) / 2;
        }
        else {
            averageRev = 100001;
        }

        if (item.month) {
            specificConstAverage = item.monthly_cost !== '' ? parseFloat(item.monthly_cost) + parseFloat(((item.month / 100) * averageRev).toFixed(2)) : ((item.month / 100) * averageRev).toFixed(2);
        } else {
            specificConstAverage = item.monthly_cost !== '' ? parseFloat(item.monthly_cost) + parseFloat(((item.daily / 100) * averageRev).toFixed(2)) : ((item.daily / 100) * averageRev).toFixed(2);
        }

        let starsArr = []
        if (item.rating) {

            for (let i = 0; i < item.rating[0]; i++) {
                starsArr.push(<FontAwesomeIcon className='rating-start' icon={faStar} key={`${item.id} ${index}${i} ${Date.now()}`} />)
            }
            if (item.rating[1])
                starsArr.push(<FontAwesomeIcon className='rating-start' icon={faStarHalfStroke} key={`${item.id} ${index} ${Date.now()}`} />)

            if (starsArr.length < 5) {
                let tempStarsArr = []
                for (let i = 0; i < 5 - starsArr.length; i++) {
                    tempStarsArr.push(<FontAwesomeIcon icon={faStarEmpty} key={i + `empty ${item.id}${i} ${index} ${Date.now()}`} />)
                }
                starsArr = [...starsArr, ...tempStarsArr]
            }
        }

        return (

            <SwiperSlide className='result-referral' key={item.id}>
                <div className='referral-logo' >
                    <img defer src={item.image} alt={item.brand} width="300" height="300" />
                    <h3>{item.brand}</h3>
                    <div className='rating'>

                        <p className='rating-stars'>{starsArr.length ? starsArr : null}</p>

                        <p className='rating-deatils'>
                            כל הדירוגים וחוות הדעת באתר הן מגולשים
                            <span>
                                אמיתיים
                            </span>
                            ומפוקחות על ידי צוות צ'ק בוקס
                        </p>
                    </div>
                </div>
                <div className='referral-main'>
                    <h3 className='referral-main-title'>{item.post_title}</h3>
                    <p className='referral-main-cost'>₪{item.monthly_cost ? item.monthly_cost : "0"} / לחודש</p>
                </div>
                <div className='referral-details'>
                    {
                        <div className='referral-details-row'>
                            <p className='referral-details-text'>קבלת הכסף פעם בחודש</p>
                            <p className='referral-details-number'>{item.month ? `${item.month}%` : `-`}</p>

                        </div>
                    }
                    {
                        item.daily &&
                        <div className='referral-details-row'>
                            <p className='referral-details-text'>קבלת הכסף באותו היום</p>
                            <p className='referral-details-number'>{item.daily ? `${item.daily}%` : `-`}</p>
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
                    <div className='referral-details-row'>
                        <p className='referral-details-text'>עלות ממוצעת</p>
                        <p className='referral-details-number'>
                            {item.month || (item.daily && !isNaN(specificConstAverage)) ?
                                <>
                                    {specificConstAverage.toFixed(2)}
                                </>
                                :
                                item.monthly_cost.toFixed(2)
                            }
                        </p>
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
            </SwiperSlide>)
    });

    return (
        <div className='result'>
            <p className='result-text'>להלן חבילות הסליקה המתאימות ביותר לעסק בהתאם לנתונים שהזנת.</p>
            <p className='result-text'>החבילות מסודרות מהציון הגבוה לנמוך.</p>
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