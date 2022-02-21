import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, setType, setStepUp, setOption } from '../../store/form/action';


const Select = ({ name }) => {

    const formState = useSelector(state => state.formReducer);
    const dataState = useSelector(state => state.dataReducer);
    const dispatch = useDispatch();

    const [chosenOption, setChosenOption] = useState(formState.type);
    useEffect(() => {

    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        setChosenOption(e.target.value)
    }

    const handleChoseAgain = (e) => {
        const { name, value, type, checked } = e.target
        e.preventDefault();
        dispatch(setOption(name, null))
    }

    const handleNextStep = (e) => {
        const { name, value, type, checked } = e.target
        e.preventDefault();
        dispatch(setStepUp(formState.step + 1))
        // dispatch(setType(chosenOption))

        dispatch(setOption(name, value))

    }

    const buttons = dataState[name].options.map((option, key) =>
        <button className={`option ${option.name === chosenOption ? 'active' : ''}`} onClick={handleClick} value={option.name} disabled={formState.step !== 2} key={key}>
            {option.value}
        </button>
    )
    return (
        <div>Select
            {buttons}
        </div>
    )
}

export default Select