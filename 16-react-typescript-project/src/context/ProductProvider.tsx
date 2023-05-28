import { ReactElement, createContext, useEffect, useState } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

const initState: ProductType[] = []
/*
const initState: ProductType[] = [
            {
                "sku": "item0001.jpg",
                "name": "Keyboard A1",
                "price": 9.99
            },{
                "sku": "item0002.jpg",
                "name": "Keyboard K2",
                "price": 10.99
            },{
                "sku": "item0003.jpg",
                "name": "Keyboard F3",
                "price": 30.99
            }
        ]
*/

export type UseProductsContextType = { products: ProductType[]}

const initContextState: UseProductsContextType = {products: []}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch("http://localhost:3500/")
            .then(res => {
                return res.json()
            }).catch(err => {
                if (err instanceof Error) console.log(err.message)
            })
            return data
        }

        fetchProducts().then(products => setProducts(products))
    },[])

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext