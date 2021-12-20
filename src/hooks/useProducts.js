import { useEffect, useState } from "react"

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(() => {
        fetch('https://assessment-edvora.herokuapp.com/')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilterProducts(data);
            })
    }, []);

    // Product filter Function
    const filterProduct = (e) => {
        const filterText = e.target.value;
        console.log(filterText)
        const matchProducts = products.filter(product => product.product_name.includes(filterText) || product.address.state.includes(filterText) || product.address.city.includes(filterText));
        setFilterProducts(matchProducts);
    }
    return { products, setProducts, filterProducts, setFilterProducts, filterProduct };
}
export default useProducts;