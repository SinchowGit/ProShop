export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true }
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, userInfo: action.payLoad }
        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payLoad }
        case 'USER_LOGOUT':
            return {  }
        default:
            return state
    }
}