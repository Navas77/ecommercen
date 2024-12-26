import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import './Collection.css'
import { assets } from '../assets/assets';
import Title from '../components/Title.js';
import ProductItem from '../components/ProductItem.js'


function Collection() {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])

    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))

    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }


  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // console.log("Selected Categories:", category);
    //  console.log("Selected Subcategories:", subCategory);

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    // console.log("Filtered Products:", productsCopy);
    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyFilter();
        break;
    }
  }


  //   useEffect(()=>{
  // setFilterProducts(products);
  //   },[])

   
    




  useEffect(() => {
    applyFilter();

  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])
  return (
    <div className='H1'>
      {/*filter options */}

      <div className='H2'>
        <p onClick={() => setShowFilter(!showFilter)}>FILTERS</p>
        <img src={assets.dropdown_icon} className={`H9 ${showFilter ? "rotate-90" : ""}`} alt="" />

        {/*Category filter */}
        <div className={` H3 ${showFilter ? "" : "hidden"}`}>
          <p className='H4'>CATEGORIES</p>
          <div className='H5'>
            <p className='H6'>
              <input className='H7' type='checkbox' value={"Men"} onChange={toggleCategory} />
              Men
            </p>
            <p className='H6'>
              <input className='H7' type='checkbox' value={"Women"} onChange={toggleCategory} />
              Women
            </p>
            <p className='H6'>
              <input className='H7' type='checkbox' value={"Kids"} onChange={toggleCategory} />
              Kids
            </p>

          </div>

        </div>

        {/* subCategory filter*/}
        <div className={` H321 ${showFilter ? "" : "hidden"}`}>
          <p className='H4'>TYPE</p>
          <div className='H5'>
            <p className='H6'>
              <input className='H7' type='checkbox' value={"Topwear"} onChange={toggleSubCategory} />
              Topwear
            </p>
            <p className='H6'>
              <input className='H7' type='checkbox' value={"Bottomwear"} onChange={toggleSubCategory} />
              Bottomwear
            </p>
            <p className='H6'>
              <input className='H7' type='checkbox' value={"Winterwear"} onChange={toggleSubCategory} />
              Winterwear
            </p>

          </div>

        </div>

      </div>


      {/*Right side */}
      <div className='H10'>
        <div className='H11'>
          <Title text1={'All'} text2={"COLLECTIONS"} />
          {/* Product  Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='H12'>
            <option value="relevent" >sort by:Relavent</option>
            <option value="low-high">sort by:low-high</option>
            <option value="high-low">sort by:high-low</option>
          </select>
        </div>
        {/*map products */}
        <div className='H13'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
          {/* <div className='H13'> 
          {filterProducts.map((item, index) => 
          { console.log("Product Image Path:", item.image);
            return (
             <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/> ); })} */}

        </div>
      </div>


    </div>
  )
}

export default Collection
