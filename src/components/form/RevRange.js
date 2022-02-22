import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, setRevRange, setType, setStepUp } from '../../store/form/action';

import AnimateHeight from 'react-animate-height';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faCircle, faCircleCheck, faCoffee } from '@fortawesome/free-solid-svg-icons'
const RevRange = () => {

    const stepNumber = 4
    // const { formData, setFormData } = props
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();
    const [chosenRevRange, setChosenRevRange] = useState(formState.revRange)

    const handleClick = (e) => {
        e.preventDefault();
        setChosenRevRange(e.target.value)
        // dispatch(setRevRange(e.target.value))
    }

    const handleChoseAgain = (e) => { e.preventDefault(); dispatch(setRevRange(null)) }

    const buttons = dataState.range.map((range, key) =>
        <button className={`option ${range.range_name === chosenRevRange ? 'active' : ''}`} onClick={handleClick} value={range.range_name} disabled={formState.step !== stepNumber} key={key}>
            {range.range_name === chosenRevRange ? <FontAwesomeIcon className='check' icon={faCircleCheck} /> : null}

            {range.range_name}
        </button>
    )

    const stepExtraClass = formState.step > stepNumber ? 'chose' : ''
    const show =
        <div className={`form-step-buttons ${formState.industry ? 'active' : ''} revRange`}>
            {buttons}
        </div>


    const handleNextStep = (e) => {
        e.preventDefault();
        dispatch(setStepUp(formState.step + 1))
        dispatch(setRevRange(chosenRevRange))
        // dispatch(findAverage())
    }

    return (
        <div className={`form-step ${formState.step === stepNumber ? 'active' : stepExtraClass} rev-range`}>
            {formState.revRange && formState.step !== stepNumber ?
                <FontAwesomeIcon className='step-num' icon={faCircleCheck} />
                :
                null}
            <h3>מה הוא מחזור העסקאות</h3>

            {formState.revRange && formState.step !== stepNumber ? <><p>{formState.revRange}</p><button className='again' onClick={handleChoseAgain}> בחר שוב</button></>
                :
                <>
                    {show}

                    <button className='next' onClick={handleNextStep} disabled={chosenRevRange === null}>
                        הבא
                        <FontAwesomeIcon className='check' icon={faAngleLeft} />

                    </button>
                </>}
        </div>
        // </AnimateHeight>
    )
}

export default RevRange