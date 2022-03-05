import React, { useEffect } from 'react'
import ChoseType from '../ChoseType'
import RevRange from '../RevRange'

import { useSelector } from 'react-redux';
import Industry from '../Industry';
import Results from '../Results'
import ResultsArr from '../../results/ResultsArr';
const GeneralForm = () => {
    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);


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