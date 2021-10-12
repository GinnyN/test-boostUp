const SET_TOTAL_DATA = "SET_TOTAL_DATA";
const SET_TOTAL_DATA_BY_STATES = "SET_TOTAL_DATA_BY_STATES";

export const setTotalData = (country) => ({
    type: SET_TOTAL_DATA,
    country
})

export const setTotalDataByStates = (byStates) => ({
    type: SET_TOTAL_DATA_BY_STATES,
    byStates
})

export {
    SET_TOTAL_DATA, SET_TOTAL_DATA_BY_STATES
}