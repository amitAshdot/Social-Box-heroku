import React, { useEffect, useState } from 'react'
import ChoseType from '../form/ChoseType'
import HasVendorForm from '../form/HasVendorForm'
import Vendor from '../form/Vendor'
import Select from '../form1/Select'

import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, setRevRange, setType } from '../../store/form/action';
import NoVendorForm from '../form/NoVendorForm';
import GeneralForm from '../form/general/GeneralForm';
import MailForm from '../form/mailForm/MailForm';
import Result from '../results/Result'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faChevronCircleLeft, faCircle, faCircleCheck, faCoffee } from '@fortawesome/free-solid-svg-icons'
const ResultsArr = () => {
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);

    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false)

    const handleToggle = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }

    useEffect(() => { }, [])

    // const [formType, setFormType] = useState(null)
    const filtered = dataState.referralLinks.filter(item => item.type === dataState.type[formState.type])
    const finaleRender = filtered.map((item, key) => {
        return (<div className='result-referral' key={key}>
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
                <Link to="#" className='referral-btn btn' onClick={handleToggle}>
                    {`להתחלת סליקה `}
                    {/* <FontAwesomeIcon className='check' icon={faChevronCircleLeft} /> */}
                    <FontAwesomeIcon className='check' icon={faAngleLeft} />
                </Link>
            </div>
            {toggle ? <MailForm toggle={toggle} setToggle={setToggle} /> : null}
        </div>)

    })

    return (
        <div className='result'>{finaleRender}</div>
    )
}

export default ResultsArr