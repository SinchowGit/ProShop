export const  cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const item = action.payLoad
            const existingItem = state.cartItems.find( x => x.product === item.product)

            if(existingItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existingItem.product ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

            return {...state}
        case 'CART_REMOVE_ITEM':
            return state
        default:
            return state
    }
}