
import { ReactElement, createContext, useEffect, useState } from "react"

// declaring the ProductType type
export type ProductType = {
    sku: string,
    name: string,
    price: number
}

// declaring initState as the product type initial data
// empty array
const initState: ProductType[] = []
/*
// array with objects
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

// setting the UseProductsContextType as a json object of product with an array of ProductType
export type UseProductsContextType = { products: ProductType[]}

// initializing UseProductsContextType as an empty product json object
const initContextState: UseProductsContextType = {products: []}

// decalring a variable of ProductsContext - 
// which is a react createContext of type UseProductsContextType (a json object of product with an array of ProductType) 
// with an intial state of initContextState (empty product json)
const ProductsContext = createContext<UseProductsContextType>(initContextState)

// declaring type ChildrenType which is children of a single or array of ReactElement
type ChildrenType = {children?: ReactElement | ReactElement[]}

// setting the ProductProvider with children elements, which has:
// 1. useState of products useState with type of ProductType[] and initial state of initState (empty json products)
// 2. useEffect which fetches the products 
// 3. sets the setProducts use state with the fetched data
// 4. returns the productcontext provider elements with the prodcuts use state as value
// 5. the childred can be any kind of text inside when the ProductsContext is being implemented
export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch("http://localhost:3500/")
            .then(res => {
                return res.json()
            }).catch(err => {
                if (err instanceof Error) {
                    console.log(err.message)
                }
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