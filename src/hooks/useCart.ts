import { useState, useEffect, useMemo } from "react"
import {db} from '../data/db'
import type { Guitar, cartItem } from "../types"

const useCart = () => {
    
    const initialCart = () : cartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : Guitar) {

        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if(itemExist >= 0){//esto significa que existe en el carrito el item
            if(cart[itemExist].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        } else{
            const newItem : cartItem = {...item, quantity : 1}
            setCart([...cart, newItem])
        }

    }

    function removeFromCart(id : Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseCuantity(id : Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function decrementCuantity(id : Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return{
                    ...item,
                    quantity : item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function clearCart(){
        setCart([])
    }

    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const carTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart, 
        addToCart, 
        removeFromCart, 
        decrementCuantity, 
        increaseCuantity, 
        clearCart, 
        isEmpty, 
        carTotal
    }
}
export default useCart