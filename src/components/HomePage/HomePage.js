import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useProducts from '../../hooks/useProducts';
import './HomePage.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    const { products, filterProduct, filterProducts } = useProducts();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };
    return (
        <div className="home-section">
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <div className="filter-section">
                            <h3 className='filter-title'>Filter</h3>
                            <select onChange={filterProduct} name="products" className='select-input' defaultValue="products">
                                {
                                    products.map(product => <>
                                        <option value={product.product_name}>{product.product_name}</option>
                                    </>)
                                }
                            </select>
                            <select onChange={filterProduct} name="state" className='select-input' id="state">
                                {
                                    products.map(product => <>
                                        <option value={product.address.state}>{product.address.state}</option>
                                    </>
                                    )
                                }
                            </select>
                            <select onChange={filterProduct} name="city" className='select-input' id="city">
                                {
                                    products.map(product => <>
                                        <option value={product.address.city}>{product.address.city}</option>
                                    </>)
                                }
                            </select>
                        </div>

                    </Col>
                    <Col md={10}>
                        <h2 className='title'>Edvora</h2>
                        <h2 className='products-title'>Products</h2>
                        <Slider {...settings} className='row-bg'>
                            {filterProducts.map(product =>
                                <Col md={4} >
                                    <div className='p-2 col-bg'>
                                        <div className='d-flex justify-content-start'>
                                            <img width="80px" className='img-fluid' src={product.image} alt="" />
                                            <div className='ms-3'>
                                                <h5 className='product_name'>{product.product_name}</h5>
                                                <h6 className='brand_name color'>{product.brand_name}</h6>
                                                <h6 className='price'><span className='usd-sign'>$ </span>{product.price}</h6>

                                            </div>
                                        </div>
                                        <Row className='mt-3'>
                                            <Col md={5}>
                                                <h6 className='location color me-3'>{product.address.state}</h6>
                                                <h6 className='location color me-3'>{product.address.city}</h6>
                                            </Col>
                                            <Col md={7}>
                                                <h6 className='date date-position'><span className='date-heading'>Date: </span> {product.time.split("T")[0]}</h6>
                                            </Col>
                                        </Row>
                                        <p className='product-description'>{product.discription}</p>
                                    </div>
                                </Col>

                            )
                            }
                        </Slider>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;