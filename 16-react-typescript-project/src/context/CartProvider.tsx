export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number
}

type CartStateType = {cart: CartItemType[]}
/*
const initCartState: CartStateType = {cart: []}

const REDUCER_ACTION_TYPE = {
    ADD
}
*/