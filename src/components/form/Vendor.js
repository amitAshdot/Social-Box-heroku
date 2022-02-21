import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, setVendor, setStepDown, setStepUp } from '../../store/form/action';


const Vendor = () => {
    const stepNumber = 1;
    const dispatch = useDispatch();
    const formState = useSelector(state => state.formReducer);
    const [chosenVender, setChosenVender] = useState(formState.vendor)
    const options = {
        1: 'יש לי מספר ספק מחברת אשראי',
        2: ' אין לי מספר ספק ואני רוצה להתחיל'
    }
    const handleClick = (e) => {
        e.preventDefault();
        e.preventDefault();
        if (e.currentTarget.value)
            setChosenVender(e.currentTarget.value)
        else
            setChosenVender(e.target.value)
    }

    const handleChoseAgain = (e) => {
        e.preventDefault();
        dispatch(setVendor(null))
    }

    const handleNextStep = (e) => {
        e.preventDefault();
        if (chosenVender) {
            dispatch(setStepUp(formState.step + 1))
            dispatch(setVendor(chosenVender))
        }

    }


    useEffect(() => {

    }, [])

    const show =
        <div className='form-step-buttons'>

            <button className={`option ${'2' === chosenVender ? 'active' : ''}`} onClick={handleClick} value="2" name="type" disabled={formState.step !== stepNumber} >
                <h3> אין לי מספר ספק</h3>

                <picture>
                    <source media="(min-width:650px)" srcSet='/assets/images/ainli.webp' />
                    <img src='/assets/images/ainli.webp' alt='אין לי ספק ' />
                </picture>
                אני רוצה להתחיל לסלוק דרך אפליקציה או המחשב או באמצעות אתר מסחר
            </button>

            <button className={`option ${'1' === chosenVender ? 'active' : ''}`} onClick={handleClick} value="1" name="type" disabled={formState.step !== stepNumber}>

                <h3>יש לי מספר ספק</h3>
                <picture>
                    <source media="(min-width:650px)" srcSet='/assets/images/yeshli.webp' />
                    <img src='/assets/images/yeshli.webp' alt="יש לי ספק" />
                </picture>
                יש לי כבר מסוף סליקה פעיל ואני רוצה להשוות בין עמלות הסליקה השונות
            </button>
        </div>

    return (

        <div className={`form-step ${formState.step === stepNumber ? 'active' : 'chose'} vendor`}>
            <h3>יאללה מתחילים!<br />
                האם יש לך מספר ספק מחברת האשראי? </h3>


            {formState.vendor && formState.step !== stepNumber ?
                <><p>{options[formState.vendor]}</p><button className='again' onClick={handleChoseAgain}> בחר שוב</button></> :
                <>
                    {show}
                    <button className='next' onClick={handleNextStep} disabled={chosenVender === null}>
                        לשלב הבא
                        <FontAwesomeIcon className='check' icon={faAngleLeft} />

                    </button>
                </>}


        </div>

    )
}

export default Vendor