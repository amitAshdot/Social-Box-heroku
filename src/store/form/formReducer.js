import { formTypes } from './formTypes.js'

const initState = {
    loading: false,
    vendor: null,
    industry: null,
    revRange: null,
    type: null,

    avgArr: [],
    referralLinks: [],
    step: 1,
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
            // debugger
            return { ...state, step: payload }
        case formTypes.SET_STEP_DOWN:
            return { ...state, step: payload }



        case formTypes.SET_VENDOR:
            if (!payload)
                return { ...state, vendor: null, step: 1 }
            else
                return { ...state, vendor: payload }


        case formTypes.SET_TYPE:

            if (!payload)
                return { ...state, type: null, step: 2 }
            else
                return { ...state, type: payload }

        case formTypes.SET_INDUSTRY:
            if (!payload)
                return { ...state, industry: null, step: 3 }
            else
                return { ...state, industry: payload }

        case formTypes.SET_REV_RANGE:
            if (!payload)
                return { ...state, revRange: null, step: 4 }
            else
                return { ...state, revRange: payload }


        case formTypes.SET_AVERAGE_COMMISION:
            debugger
            if (!payload)
                return { ...state, avgArr: null, step: 5 }
            else
                return { ...state, avgArr: payload }

        case formTypes.SET_OPTION:
            const { name, value } = payload
            if (!value)
                return { ...state, name: null, step: 5 }
            else
                return { ...state, name: value }

        case formTypes.CLOSE_RESULTS:
            debugger
            return { ...state, step: 8 }

        default:
            return state;
    }
}