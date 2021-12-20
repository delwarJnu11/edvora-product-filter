import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useProducts from '../../hooks/useProducts';
import './HomePage.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const HomePage = () => {
    const { productFilter, filterProducts } = useProducts();
    //Slider setting
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2
    };

    // Unique Named Product
    let productName = [...new Map(filterProducts.map(item => [item['product_name'], item])).values()];
    // Unique State Product
    let productState = [...new Map(filterProducts.map(item => [item['address']['state'], item])).values()];
    // Unique City Product
    let productCity = [...new Map(filterProducts.map(item => [item['address']['city'], item])).values()];

    let uniqueProduct = (products, productName) => {
        let uniqueProductArr = [];
        products.map((product) => {

            if (productName === product.product_name) {
                uniqueProductArr.push(product)
            }

        })
        return uniqueProductArr;
    }



    return (
        <div className="home-section">
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <div className="filter-section">
                            <h3 className='filter-title'>Filter</h3>
                            <select onChange={productFilter} name="products" className='select-input'>
                                {
                                    productName.map((product, index) =>
                                        <option value={product.product_name} key={index}>{product.product_name}</option>
                                    )
                                }
                            </select>
                            <select onChange={productFilter} name="state" className='select-input' id="state">
                                {
                                    productState.map((product, index) =>
                                        <option value={product.address.state} key={index}>{product.address.state}</option>

                                    )
                                }
                            </select>
                            <select onChange={productFilter} name="city" className='select-input' id="city">
                                {
                                    productCity.map((product, index) =>
                                        <option value={product.address.city} key={index}>{product.address.city}</option>
                                    )
                                }
                            </select>
                        </div>

                    </Col>
                    <Col md={10}>
                        <h2 className='title'>Edvora</h2>
                        <h2 className='products-title'>Products</h2>
                        {productName.map((productHeader, index) => {

                            return (<div key={index}>
                                <h2 className='product-name'>{productHeader.product_name}</h2>
                                <Slider {...settings} className='row-bg'>

                                    {uniqueProduct(filterProducts, productHeader.product_name).map((product, index) =>
                                        <Col key={index}>
                                            <div className='col-bg'>
                                                <div className='d-flex justify-content-start'>
                                                    <img width="80px" className='img-fluid' src={product.image} alt="" />
                                                    <div className='ms-3'>
                                                        <h5 className='product_name'>{product.product_name}</h5>
                                                        <h6 className='brand_name color'>{product.brand_name}</h6>
                                                        <h6 className='price'><span className='usd-sign'>$ </span>{product.price}</h6>
                                                    </div>
                                                </div>
                                                <Row className='mt-3'>
                                                    <Col md={4}>
                                                        <h6 className='location color me-3'>{product.address.state}</h6>
                                                        <h6 className='location color me-3'>{product.address.city}</h6>
                                                    </Col>
                                                    <Col md={8}>
                                                        <h6 className='date date-position'><span className='date-heading'>Date: </span> {product.time.split("T")[0]}</h6>
                                                    </Col>
                                                </Row>
                                                <p className='product-description'>{product.discription}</p>
                                            </div>
                                        </Col>
                                    )
                                    }
                                </Slider>
                            </div>
                            )
                        })}

                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default HomePage;