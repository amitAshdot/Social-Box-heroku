import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, setRevRange, setType, setIndustry, setStepUp } from '../../store/form/action';
import AnimateHeight from 'react-animate-height';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faCircle, faCircleCheck, faCoffee } from '@fortawesome/free-solid-svg-icons'
const Industry = () => {
    const stepNumber = 3;
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    const [extraClass, setExtraClass] = useState('active')
    const [chosenIndustry, setChosenIndustry] = useState(formState.industry)

    const handleClick = (e) => {
        e.preventDefault();
        // dispatch(setIndustry(e.target.value));
        setChosenIndustry(e.target.value)
    }

    const handleChoseAgain = (e) => { e.preventDefault(); dispatch(setIndustry(null)) }

    const buttons = dataState.industry.map((industry) =>
        <button className={`option ${industry.indname === chosenIndustry ? 'active' : ''}`} onClick={handleClick} value={industry.indname} disabled={formState.step !== stepNumber} key={industry.indid}>


            {industry.indname === chosenIndustry ? <FontAwesomeIcon className='check' icon={faCircleCheck} /> : null}
            {industry.indname}
        </button>
    )

    const show =
        <div className={`form-step-buttons ${extraClass} industry`}>
            {buttons}
        </div>

    const handleNextStep = (e) => {
        e.preventDefault();
        dispatch(setStepUp(formState.step + 1));
        dispatch(setIndustry(chosenIndustry));
        setExtraClass('');
    }


    const stepExtraClass = formState.step > stepNumber ? 'chose' : ''
    return (

        <div className={`form-step ${formState.step === stepNumber ? 'active' : stepExtraClass} `}>
            {formState.industry && formState.step !== stepNumber ?
                <FontAwesomeIcon className='step-num' icon={faCircleCheck} />
                :
                null}
            <h3>סוג העסק</h3>
            {formState.industry && formState.step !== stepNumber ? <><p>{formState.industry}</p><button className='again' onClick={handleChoseAgain}> בחר שוב</button></>
                :
                <>
                    {show}

                    <button className='next' onClick={handleNextStep} disabled={chosenIndustry === null}>
                        לשלב הבא
                        <FontAwesomeIcon className='check' icon={faAngleLeft} />
                    </button>
                </>}
        </div>

    )
}

export default Industry