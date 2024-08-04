import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../components/http';
import { IProduct } from '../components/Products/IProduct';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({} as IProduct);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const getProduct = async () => {
    try {
      const product = await http.get(`products/${id}`);
      setProduct(product.data);
      setImage(product.data.thumbnail);
      setImages(product.data.images);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className='card m-5 p-3 myShadow'>
      <div
        className='showImg'
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className='slide-img d-flex align-items-center justify-content-center w-100 mt-3'>
        {images.map((img, ind) => (
          <img
            className=''
            key={ind}
            src={img}
            alt={product.title}
            onClick={() => setImage(img)}
          />
        ))}
      </div>
      <h1 className='card-title text-danger mt-3'>{product.title}</h1>
      <h3 className='card-title'>Brand: {product.brand}</h3>
      <h5 className='card-title'>Category: {product.category}</h5>
      <p className='card-text'>Description: {product.description}</p>
      <div>
        <span className='mx-5'>Rating: {product.rating}</span>
        <span className='mx-5'>Stock: {product.stock}</span>
      </div>
      <h5 className='card-title mt-3 fs-20'>Price: {product.price}$</h5>
      <h3 className='text-danger card-title'>
        Discount price:{' '}
        {Math.trunc(
          product.price - (product.price / 100) * product.discountPercentage
        )}
        $
      </h3>
    </div>
  );
};

export default Product;
