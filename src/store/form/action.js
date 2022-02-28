import { formTypes } from './formTypes'
// import axios from 'axios';

export const fetchStart = () => { return { type: formTypes.FETCH_FAVORITE_START } };

export const fetchSuccess = (allData, localStorage) => {
    let finaleData = []
    for (let i = 0; i < localStorage.length; i++) {
        let temp = { ...allData[i].data[0], ...localStorage[i] };
        finaleData.push(temp)
    }
    return { type: formTypes.FETCH_FAVORITE_SUCCESS, finaleData }
};

export const fetchFail = () => { return { type: formTypes.FETCH_FAVORITE_FAIL } };

export const toggleMailForm = (value) => { return { type: formTypes.TOGGLE_MAIL_FORM, payload: value } }

export const setVendor = (value) => { return { type: formTypes.SET_VENDOR, payload: value } }

export const setType = (value) => { return { type: formTypes.SET_TYPE, payload: value } }

export const setRevRange = (value) => { return { type: formTypes.SET_REV_RANGE, payload: value } }

export const setIndustry = (value) => { return { type: formTypes.SET_INDUSTRY, payload: value } }

export const setAvgArr = (arr) => { return { type: formTypes.SET_AVERAGE_COMMISION, payload: arr } }

export const setStep = (step) => { return { type: formTypes.SET_STEP, payload: step } }

export const setStepUp = (step) => { return { type: formTypes.SET_STEP_UP, payload: step } }

export const setStepDown = (step) => { return { type: formTypes.SET_STEP_DOWN, payload: step } }

export const closeResults = () => { return { type: formTypes.CLOSE_RESULTS } }

export const setOption = (name, value) => { return { type: formTypes.SET_OPTION, payload: { name: name, value: value } } }

export const mailSent = () => { return { type: formTypes.MAIL_SENT } }

export const findAverage = (arr) => {
    const logoUrlObj = {
        "מקס": 'https://check-box.co.il/wp-content/uploads/2021/09/meta-business-2.jpg',
        "ישרכארט": 'https://check-box.co.il/wp-content/uploads/2021/09/98x57-business-logo-3.png',
        "UPAY": 'https://check-box.co.il/wp-content/uploads/2021/09/upay-3.png',
        "משולם": 'https://www.meshulam.biz/wp-content/uploads/2020/06/logo1.png',
        "משולם": 'https://www.meshulam.biz/wp-content/uploads/2020/06/logo1.png',
    }
    let companyMap = new Map()
    companyMap = mapByArr(arr)

    const finaleListArr = []
    companyMap.forEach((values, keys) => {

        finaleListArr.push({ avg: (values.comission / values.amountToSub), name: values.company, img: logoUrlObj[values.company], amountToSub: values.amountToSub })
    });

    return { type: formTypes.SET_AVERAGE_COMMISION, payload: finaleListArr }
}


const mapByArr = (arr) => {

    const companyMap = new Map()
    arr.forEach(element => {
        if (!companyMap.get(element.company)) {
            companyMap.set(element.company, { comission: element.comission, amountToSub: 1, company: element.company })
        } else {
            let tempCommision = parseInt(companyMap.get(element.company).comission) + parseInt(element.comission)
            let amountToSub = companyMap.get(element.company).amountToSub + 1
            companyMap.set(element.company, { comission: tempCommision, amountToSub: amountToSub, company: element.company })
        }
    });
    return companyMap
}