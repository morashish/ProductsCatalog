import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { IProduct } from './IProduct';

const ProductCards = ({ products }: { products: IProduct[] }) => {
  return (
    <div className='row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4'>
      {products.length ? (
        products.map((product) => (
          <div className='col' key={product.id}>
            <div className='card mt-3 mb-3 pb-3 myShadow'>
              <div className='card-img d-flex justify-content-center align-items-center overflow-hidden'>
                <div
                  className='showImg'
                  style={{
                    backgroundImage: `url(${product.thumbnail})`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </div>
              <div className='card-body'>
                <h5 className='card-title'>
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </h5>
                <p className='my-3'>Brand: {product.brand}</p>
                <p className='my-3'>Category: {product.category}</p>
                <p className='desc d-inline-block overflow-hidden'>
                  {product.description}
                </p>
              </div>
              <p className='card-text m-3 text-danger fs-20'>
                Price: {product.price}$
              </p>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProductCards;
