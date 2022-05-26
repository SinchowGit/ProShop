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

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true }
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, userInfo: action.payLoad }
        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case 'USER_DETAILS_REQUEST':
            return { ...state, loading: true }
        case 'USER_DETAILS_SUCCESS':
            return { loading: false, user: action.payLoad }
        case 'USER_DETAILS_FAIL':
            return { loading: false, error: action.payLoad }
        case 'USER_DETAILS_RESET':
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case 'USER_UPDATE_PROFILE_REQUEST':
            return { ...state, loading: true }
        case 'USER_UPDATE_PROFILE_SUCCESS':
            return { loading: false, success: true, userInfo: action.payLoad }
        case 'USER_UPDATE_PROFILE_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'USER_LIST_REQUEST':
            return { loading: true }
        case 'USER_LIST_SUCCESS':
            return { loading: false, users: action.payLoad }
        case 'USER_LIST_FAIL':
            return { loading: false, error: action.payLoad }
        case 'USER_LIST_RESET':
            return { users: [] }
        default:
            return state
    }
}