import React, { useEffect, Suspense } from 'react'
import ChoseType from '../ChoseType'
import RevRange from '../RevRange'

import { useSelector } from 'react-redux';
import Industry from '../Industry';
// import Results from '../Results'
// import ResultsArr from '../../results/ResultsArr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Results = React.lazy(() => import('../Results'));
const ResultsArr = React.lazy(() => import('../../results/ResultsArr'));

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
                    <Suspense fallback={<FontAwesomeIcon icon={(faSpinner)} />} >
                        <Results industryeArr={industryeArr} />
                    </Suspense>
                    :
                    <Suspense fallback={<FontAwesomeIcon icon={(faSpinner)} />} >
                        <ResultsArr />
                    </Suspense>
                :
                null}
            {/* <Results industryeArr={industryeArr} /> */}
        </>
    )
}

export default GeneralForm