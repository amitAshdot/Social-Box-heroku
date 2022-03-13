import React, { useEffect, Suspense, useRef } from 'react'

// import Vendor from '../form/Vendor'
import { useCookies } from "react-cookie";

import { useSelector } from 'react-redux';

// import GeneralForm from ;
import MailForm from '../form/mailForm/MailForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import FirstLog from './FirstLog';
const GeneralForm = React.lazy(() => import('../form/general/GeneralForm'));
const Vendor = React.lazy(() => import('../form/Vendor'));

const Landing = () => {
    const formState = useSelector(state => state.formReducer);
    const [cookies, setCookie] = useCookies(['is_first']);

    useEffect(() => {
        // if (cookies.is_first ) {
        // setCookie("is_first", true, {
        //     path: "/"
        // });
        // }
        cookies.is_first ?? setCookie("is_first", true, {
            path: "/"
        });
    }, [cookies.is_first])

    function handleCookie(e) {
        setCookie("is_first", false, {
            path: "/"
        });
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [formState.step]);
    return (
        <>
            <form className='form'>
                {cookies.is_first === 'undefined' || cookies.is_first === "true" ? <FirstLog handleCookie={handleCookie} /> :
                    <>
                        <Suspense fallback={<FontAwesomeIcon icon={(faSpinner)} />} >
                            <Vendor />
                            {formState.vendor ? <GeneralForm /> : null}
                        </Suspense>
                    </>
                }
            </form>
            {formState.mailForm ? <MailForm /> : null}
            <div ref={messagesEndRef} />

        </>


    )
}

export default Landing