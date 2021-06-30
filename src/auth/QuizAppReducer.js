import { types } from "./types"

export const QuizAppReducer = (state = {}, action) => {
    switch (action?.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true,
            }
        case types.logout:
            return {
                logged: false,
                username: '',
                record: 0,
            };

        case types.updateRecord:
            return {
                ...state,
                record: action.payload
            }

        default:
            return state;
    }
}
