import { faAngleLeft, faCircleCheck, faPencil, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setType, setStepUp, setStep } from '../../store/form/action';


const ChoseType = () => {
    const stepNumber = 2

    const formState = useSelector(state => state.formReducer);
    const dispatch = useDispatch();

    const [chosenType, setChosenType] = useState(formState.type)
    const handleClick = (e) => {
        e.preventDefault();
        if (e.currentTarget.value)
            setChosenType(e.currentTarget.value)
        else
            setChosenType(e.target.value)
    }

    const handleChoseAgain = (e) => {
        e.preventDefault();
        if (e.target.className === 'again' || e.currentTarget.hasAttribute("again"))
            dispatch(setStep(stepNumber))

    }

    useEffect(() => {

    }, [])

    const btnArr = [
        {
            topText: 'מהמחשב / מהנייד',
            img: '/assets/images/mobilecomp.webp',
            value: '1',
            bottomText: 'סליקת כרטיסי אשראי דרך המחשב או באמצעות אפליקציה מהנייד',
        },
        {
            topText: 'אתר מסחר',
            img: '/assets/images/website.webp',
            value: '2',
            bottomText: 'קבלת תשלום בכרטיסי אשראי  דרך אתר איקומרס שיש לי',
        },
        {
            topText: 'קופה שיש לי בעסק',
            img: '/assets/images/cashier.webp',
            value: '3',
            bottomText: 'השוואת עמלות סליקת כרטיסי אשראי עבור קופה שיש לי בעסק',
        },
    ]
    const show =
        <div className={`form-step-buttons ${formState.revRange ? 'active' : ''}`}>
            {btnArr.map((btn, index) => {
                if (index !== 2)
                    return <button className={`option ${btn.value === chosenType ? 'active' : ''}`} onClick={handleClick} value={index + 1} name="type" disabled={formState.step !== stepNumber} key={index}>
                        {btn.value === chosenType ? <FontAwesomeIcon className='check' icon={faCircleCheck} /> : null}
                        <h3 className='option-head'>{btn.topText}</h3>
                        <picture>
                            <source media="(min-width:650px)" srcSet={btn.img} />
                            <img src={btn.img} alt={btn.topText} />
                        </picture>
                        <p className='option-text'>{btn.bottomText}</p>
                    </button>
            })}

            {formState.vendor === "1" ?
                <button className={`option ${'3' === chosenType ? 'active' : ''}`} onClick={handleClick} value='3' name="type" disabled={formState.step !== stepNumber}>
                    {'3' === chosenType ? <FontAwesomeIcon className='check' icon={faCircleCheck} /> : null}
                    <h3 className='option-head'>קופה שיש לי בעסק</h3>
                    <picture>
                        <source media="(min-width:650px)" srcSet="/assets/images/cashier.webp" />
                        <img src="/assets/images/cashier.webp" alt="Flowers" />
                    </picture>
                    <p className='option-text'>השוואת עמלות סליקת כרטיסי אשראי עבור קופה שיש לי בעסק</p>

                </button>
                :
                null
            }

        </div>

    const handleNextStep = (e) => {
        // const { name, value, type, checked } = e.target
        e.preventDefault();
        dispatch(setStepUp(formState.step + 1))
        dispatch(setType(chosenType))

        // var first_name = document.getElementsByName("first_name")[0].value,
        //     score = document.getElementsByName("score")[0].value;
        // var data = {
        //     name: 'test',
        //     score: 'test'
        // };
        // debugger
        // fetch("https://sheets.googleapis.com/v4/spreadsheets/1vWndKZBKA4IO8JqkDlImqBmH7MyzaqQwnvw8sAA5u0E/values/test!A1:E1:append?id=1&name=amit&score=10", {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify([
        //         ["Door", "$15", "2", "3/15/2016"],
        //         ["Engine", "$100", "1", "3/20/2016"],
        //     ])
        // }).then(res => {
        //     console.log("Request complete! response:", res);
        // }).catch(err => {
        //     console.log('err idiot')

        // })

    }
    const stepExtraClass = formState.step > stepNumber ? 'chose' : ''

    return (

        <div
            className={`form-step ${formState.step === stepNumber ? 'active' : stepExtraClass}  type`}
            again={formState.step !== stepNumber && formState.type ? `again` : ''}
            onClick={formState.step !== stepNumber && formState.type ? handleChoseAgain : null}
        >

            {formState.type && formState.step !== stepNumber ?
                <FontAwesomeIcon className='step-num' icon={faCircleCheck} />
                :
                null}
            <h3>אני רוצה לסלוק באמצעות:</h3>
            {formState.step !== stepNumber ?
                <>
                    <p>{chosenType ? btnArr[chosenType - 1].bottomText : null}</p>
                    <button className='again' onClick={handleChoseAgain}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        בחר שוב
                    </button>
                </>
                :
                <>
                    {show}

                    <button className='next' onClick={handleNextStep} disabled={chosenType === null}>
                        לשלב הבא
                        <FontAwesomeIcon className='check' icon={faAngleLeft} />
                    </button>
                </>}
        </div>
    )
}

export default ChoseType