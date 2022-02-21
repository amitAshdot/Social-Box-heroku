import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import formReducer from "./form/formReducer";
import dataReducer from "./data/dataReducer";

//middleware array - we got only thunk
const middleWare = [thunk];


const rootReducer = combineReducers({
    dataReducer: dataReducer,
    formReducer: formReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWare))
);

