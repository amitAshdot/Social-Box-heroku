import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const FirstLog = ({ handleCookie }) => {
    const handleClick = (e) => {
        e.preventDefault()
        handleCookie(false)
    }
    return (
        <div className='intro' >
            <FontAwesomeIcon className='intro-check' icon={faCircleXmark} onClick={handleClick} />
            <h1 className='intro-title'>ברוכים המשווים!</h1>
            <p className='intro-text'>
                מחפשים את חבילת הסליקה המתאימה ביותר לעסק? אתם מרחק 4 קליקים מהתשובה.
            </p>
            <p className='intro-text'>
                ענו על 4 שאלות פשוטות וקבלו הצעות מחיר מותאמות אישית לסליקה במחשב ובנייד, בקופה / מסופון או לאתר האינטרנט של העסק.

                <button className='intro-next' onClick={handleClick}>
                    לשאלה ראשונה
                    <FontAwesomeIcon className='check' icon={faAngleLeft} />
                    {/* <FontAwesomeIcon className='check' icon={faAngleLeft} onClick={handleClick} /> */}
                </button>

            </p>

        </div>
    )
}

export default FirstLog