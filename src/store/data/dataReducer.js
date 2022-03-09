// import { formTypes } from './formTypes.js'
import data from "../../mock/data.json"
import revRange from "../../mock/rev_range.json"
import company from "../../mock/company.json"
import industry from "../../mock/industry.json"
import referral from "../../mock/referral-new.json"
const initState = {
    data: data,
    range: revRange,
    referralLinks: referral,
    company: company,
    industry: industry,
    type: {
        1: 'סליקה מהנייד',
        2: 'אתר מסחר',
        3: 'קופה'
    },

    // vendor1: {
    //     id: 1,
    //     name: 'vendor',
    //     title: 'vendor',
    //     options: [
    //         { name: 'יש לי מספר ספק מחברת אשראי', value: 'יש לי מספר ספק מחברת אשראי' },
    //         { name: 'אין לי מספר ספק ואני רוצה להתחיל', value: 'אין לי מספר ספק ואני רוצה להתחיל' }
    //     ],
    // },
    // industry1: {
    //     id: 2,
    //     name: 'industry',
    //     title: 'industry',
    //     options: [
    //         { name: 'אוכל ומסעדות', value: 'אוכל ומסעדות' },
    //         { name: 'אוכל ומסעדות', value: 'אוכל ומסעדות' }
    //     ],
    // },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initState, action) {

    const { type, payload } = action
    switch (action.type) {
        default:
            return state;
    }
}