
export type Guitar = {
    id : number
    name : string
    image : string
    description : string
    price : number
}

export type cartItem = Pick<Guitar, 'id' | 'name' | 'price' | 'image'> &  { 
    quantity : number
}

///export type cartItem2 = Omit<Guitar, 'image' | 'description'> & {
///    quantity : number
///}

/**  --- ejemplo de como podemos crear otro type y heredar
export type cartItem = Guitar & {
    quantity : number
} 

export interface cartItem extends Guitar  { //una interface puede heredar de type en typescript y esta es la forma
    quantity : number
}
 */

