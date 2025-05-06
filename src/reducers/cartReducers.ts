import { db } from "../data/db"
import { cartItem, Guitar } from "../types"

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export type CartActions = 
    {type: 'add-to-cart', payload: {item:Guitar}} |
    {type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    {type: 'decrease-cuantity', payload: {id: Guitar['id']}} |
    {type: 'increase-cuantity', payload: {id: Guitar['id']}} |
    {type: 'remove-cart'}

export type CartState = {
    data: Guitar[],
    cart: cartItem[]
}

const initialCart = () : cartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
) => {
    if (action.type === 'add-to-cart') {
        const itemExist = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updateCart: cartItem[] = []
        if(itemExist){
            updateCart = state.cart.map(item => {
                if (item.id === action.payload.item.id){
                    if (item.quantity < MAX_ITEMS) {
                        return {...item, quantity: item.quantity + 1}
                    }else {
                        return item
                    }
                }else {
                    return item
                }
            })
        } else {
            const newItem : cartItem = {...action.payload.item, quantity : 1}
            updateCart = [...state.cart, newItem]
        }
        return {
            ...state,
            cart: updateCart
        }
    }
    if (action.type === 'remove-from-cart') {
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        
        return {
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'decrease-cuantity') {
        const updatedCart = state.cart.map( item => {
            if (item.id === action.payload.id && item.quantity >= MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        return {
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'increase-cuantity') {
        const updatedCart = state.cart.map( item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS){
                return {
                    ...item, 
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return {
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'remove-cart') {
        return {
            ...state,
            cart: []
        }       
    }

    return state //siempre debe tener este return
}