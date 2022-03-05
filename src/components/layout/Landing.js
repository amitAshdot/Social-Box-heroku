import React, { useEffect, Suspense } from 'react'

import Vendor from '../form/Vendor'

import { useSelector } from 'react-redux';

// import GeneralForm from ;
import MailForm from '../form/mailForm/MailForm';

const GeneralForm = React.lazy(() => import('../form/general/GeneralForm'))
const Landing = () => {
    const formState = useSelector(state => state.formReducer);

    useEffect(() => {

    }, [])

    return (
        <>
            <form className='form'>
                <Vendor />
                <Suspense fallback={<>loading</>} >
                    {formState.vendor ? <GeneralForm /> : null}
                </Suspense>
            </form>
            {formState.mailForm ? <MailForm /> : null}
        </>


    )
}

export default Landing