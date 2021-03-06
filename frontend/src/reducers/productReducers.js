export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS':
            return {
                loading: false,
                products: action.payLoad.products, 
                page: action.payLoad.page, 
                pages: action.payLoad.pages 
            }
        case 'PRODUCT_LIST_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: { reviews: [] }}, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state }
        case 'PRODUCT_DETAILS_SUCCESS':
            return { loading: false, product: action.payLoad }
        case 'PRODUCT_DETAILS_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PRODUCT_DELETE_REQUEST':
            return { loading: true, success: false }
        case 'PRODUCT_DELETE_SUCCESS':
            return { loading: false, success: true }
        case 'PRODUCT_DELETE_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PRODUCT_CREATE_REQUEST':
            return { loading: true }
        case 'PRODUCT_CREATE_SUCCESS':
            return { loading: false, success: true, product: action.payLoad }
        case 'PRODUCT_CREATE_FAIL':
            return { loading: false, error: action.payLoad }
        case 'PRODUCT_CREATE_RESET':
            return { }
        default:
            return state
    }
}

export const ProductUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'PRODUCT_UPDATE_REQUEST':
            return { loading: true }
        case 'PRODUCT_UPDATE_SUCCESS':
            return { loading: false, success: true }
        case 'PRODUCT_UPDATE_FAIL':
            return { loading: false, error: action.payLoad }
        case 'PRODUCT_UPDATE_RESET':
            return { product: {} }
        default:
            return state
    }
}

export const ProductReviewReducer = (state = { }, action) => {
    switch (action.type) {
        case 'PRODUCT_REVIEW_REQUEST':
            return { loading: true }
        case 'PRODUCT_REVIEW_SUCCESS':
            return { loading: false, success: true }
        case 'PRODUCT_REVIEW_FAIL':
            return { loading: false, error: action.payLoad }
        case 'PRODUCT_REVIEW_RESET':
            return { }
        default:
            return state
    }
}

export const ProductTopReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_TOP_REQUEST':
            return { loading: true }
        case 'PRODUCT_TOP_SUCCESS':
            return { loading: false, products: action.payLoad }
        case 'PRODUCT_TOP_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}