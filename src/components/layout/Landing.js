import React, { useEffect } from 'react'
// import ChoseType from '../form/ChoseType'

import Vendor from '../form/Vendor'
// import Select from '../form1/Select'

import { useSelector } from 'react-redux';
// import { fetchStart, setRevRange, setType } from '../../store/form/action';

import GeneralForm from '../form/general/GeneralForm';
import MailForm from '../form/mailForm/MailForm';
// import ResultsArr from '../results/ResultsArr'

const Landing = () => {
    const formState = useSelector(state => state.formReducer);
    // const dispatch = useDispatch();
    // const [formType, setFormType] = useState(null)
    useEffect(() => {

    }, [])

    return (
        <>
            {/* <MailForm /> */}
            <form className='form'>
                <Vendor />
                {formState.vendor ? <GeneralForm /> : null}

                {/* <Select name={'industry1'} />
            <Select name={'vendor1'} /> */}
            </form>
            {formState.mailForm ? <MailForm /> : null}
        </>


    )
}

export default Landing