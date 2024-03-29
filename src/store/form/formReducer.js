import { formTypes } from './formTypes.js'

const initState = {
    loading: false,
    vendor: null,
    industry: null,
    revRange: null,
    type: null,

    error: null,

    avgArr: [],
    referralLinks: [],
    step: 1,
    mailForm: false,
    mailSent: false,
    currentCompany: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initState, action) {
    const { type, payload } = action
    switch (type) {
        // case formTypes.FETCH_FAVORITE:
        //     return [...state, action.payload]

        // case formTypes.FETCH_FAVORITE_SUCCESS:
        //     return { ...state, loading: false }

        // case formTypes.FETCH_FAVORITE_START:
        //     return { ...state, loading: true }

        // case formTypes.FETCH_FAVORITE_FAIL:
        //     return { ...state, loading: false }

        case formTypes.SET_STEP_UP:
            return { ...state, step: payload }
        case formTypes.SET_STEP_DOWN:
            return { ...state, step: payload }
        case formTypes.SET_STEP:
            return { ...state, step: payload }



        case formTypes.SET_VENDOR:
            if (!payload)
                return { ...state, step: 1 }
            else
                return { ...state, vendor: payload }


        case formTypes.SET_TYPE:

            if (!payload)
                return { ...state, step: 2 }
            else
                return { ...state, type: payload }

        case formTypes.SET_INDUSTRY:
            if (!payload)
                return { ...state, step: 3 }
            else
                return { ...state, industry: payload }

        case formTypes.SET_REV_RANGE:
            if (!payload)
                return { ...state, step: 4 }
            else
                return { ...state, revRange: payload }


        case formTypes.SET_AVERAGE_COMMISION:
            if (!payload)
                return { ...state, step: 5 }
            else
                return { ...state, avgArr: payload }


        case formTypes.SET_CURRENT_COMPANY:
            return { ...state, currentCompany: payload }

        case formTypes.SET_OPTION:
            const { name, value } = payload
            if (!value)
                return { ...state, step: 5 }
            else
                return { ...state, name: value }

        case formTypes.SET_ERROR:
            return { ...state, error: payload }

        case formTypes.CLOSE_RESULTS:
            return { ...state, step: 8 }

        case formTypes.TOGGLE_MAIL_FORM:
            return { ...state, mailForm: payload, mailSent: false }

        case formTypes.MAIL_SENT:
            return { ...state, mailSent: true }

        default:
            return state;
    }
}