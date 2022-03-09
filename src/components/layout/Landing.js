import React, { useEffect, Suspense } from 'react'

import Vendor from '../form/Vendor'
import { useCookies } from "react-cookie";

import { useSelector } from 'react-redux';

// import GeneralForm from ;
import MailForm from '../form/mailForm/MailForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import FirstLog from './FirstLog';
const GeneralForm = React.lazy(() => import('../form/general/GeneralForm'));

const Landing = () => {
    const formState = useSelector(state => state.formReducer);
    const [cookies, setCookie, removeCookie] = useCookies(['is_first']);

    useEffect(() => {
        if (cookies.is_first) {
            setCookie("is_first", true, {
                path: "/"
            });
        }

    }, [cookies.is_first])

    function handleCookie() {
        setCookie("is_first", false, {
            path: "/"
        });
    }
    return (
        <>
            <form className='form'>
                {!cookies.is_first ? <FirstLog handleCookie={handleCookie} /> :
                    <>
                        <Vendor />
                        <Suspense fallback={<FontAwesomeIcon icon={(faSpinner)} />} >
                            {formState.vendor ? <GeneralForm /> : null}
                        </Suspense>
                    </>
                }
            </form>
            {formState.mailForm ? <MailForm /> : null}
        </>


    )
}

export default Landing