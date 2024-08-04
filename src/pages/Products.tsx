import React, { FC, useEffect, useMemo, useState } from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill, BsGlobe } from 'react-icons/bs';
import { IProduct } from '../components/Products/IProduct';
import './Products.css';
import http from '../components/http';
import ProductCards from '../components/Products/ProductCards';
import Search from '../components/Search';
import { useSearch } from '../hooks/useSearch';

const Products: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  const getProduct = async () => {
    try {
      const products = await http.get('products');
      setProducts(products.data.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const sortProducts = useMemo(() => {
    if (sort === 'title') {
      setProducts(products.sort((a, b) => (a.title > b.title ? 1 : -1)));
    } else if (sort === 'brand') {
      setProducts(products.sort((a, b) => (a.brand > b.brand ? 1 : -1)));
    } else if (sort === 'price') {
      setProducts(products.sort((a, b) => (a.price > b.price ? 1 : -1)));
    } else {
      setProducts(products.sort((a, b) => (a.id > b.id ? 1 : -1)));
    }
    return products;
  }, [sort, products]);

  const selectPageHandler = (selectedPage:any)=> {
    if(selectedPage >= 1 && selectedPage <= products.length/8 && selectedPage !== page )
    setPage(selectedPage)
}

  const searchedProduct = useSearch(products, search, 'title');

  return (
    <>
      <Search name={'Enter name'} setSearch={setSearch}></Search>
      <select
        className='form-select myShadow my-3'
        onChange={(event) => setSort(event.target.value)}
      >
        <option defaultValue=''>No sort</option>
        <option value='title'>Title</option>
        <option value='brand'>Brand</option>
        <option value='price'>Price</option>
      </select>
      <ProductCards products={searchedProduct.slice(page * 8 - 8, page * 8)}></ProductCards>
      {
            products.length > 0 && <div className='flex flex-row justify-center items-center space-x-2'>
                <span onClick={()=> selectPageHandler(page - 1)} className={` ${page > 1 ? "" : "hidden"}   text-2xl text-blue-400 hover:text-blue-500  cursor-pointer`}><BsFillArrowLeftSquareFill/></span>
                {
                    [...Array(products.length/10)].map((_,i)=> {
                        return <span onClick={()=> selectPageHandler(i+1)} key={i} className={` ${page === i+1 ? "bg-blue-400" : "bg-gray-200"} p-2 rounded-lg text-gray-800 hover:bg-gray-400 cursor-pointer`}>{i + 1}</span>
                    })
                }
                <span onClick={()=> selectPageHandler(page + 1)} className={` ${page < products.length/10 ? "" : "hidden"} text-2xl text-blue-400 hover:text-blue-500 cursor-pointer`}><BsFillArrowRightSquareFill/></span>
            </div>
        }
    </>
  );
};

export default Products;
