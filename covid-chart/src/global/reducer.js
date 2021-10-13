import { SET_TOTAL_DATA, SET_TOTAL_DATA_BY_STATES } from './action';

const initialState = {
    totalData: {},
    totalDataByState: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOTAL_DATA:
            state.totalData = { ...action.country };
            state.presentedData = { ...action.country };
            return state
        case SET_TOTAL_DATA_BY_STATES:
            state.totalDataByState = { ...action.byStates };
            return state
        default:
            return state
    }
}

export default reducer;