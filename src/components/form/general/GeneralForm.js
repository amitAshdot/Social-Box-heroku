import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChoseType from '../ChoseType'
import RevRange from '../RevRange'

import { useDispatch, useSelector } from 'react-redux';
import Industry from '../Industry';
import Results from '../Results'
import ResultsArr from '../../results/ResultsArr';
const GeneralForm = () => {
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);
    // const dispatch = useDispatch();

    // const [formType, setFormType] = useState(null)

    const industryeArr = dataState.data.filter(data => {
        return (data.industry.trim() === formState.industry && data.rev_range === formState.revRange)
    })

    useEffect(() => { }, [])

    return (
        <>
            <ChoseType />
            <Industry />
            <RevRange />
            {/* <ChoseType /> */}
            {/* {formState.step === 5 ? <Results industryeArr={industryeArr} /> : null} */}
            {formState.step === 5 ?
                formState.vendor === '1' ?
                    <Results industryeArr={industryeArr} />
                    :
                    <ResultsArr />
                :
                null}
            {/* <Results industryeArr={industryeArr} /> */}
        </>
    )
}

export default GeneralForm