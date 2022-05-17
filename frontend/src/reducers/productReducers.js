export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS':
            return { loading: false, products: action.payLoad }
        case 'PRODUCT_LIST_FAIL':
            return { loading: true, error: action.payLoad }
        default:
            return state
    }
}