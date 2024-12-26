import React, { useContext, useEffect ,useState} from 'react'
import './Product.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext);
  const[productData,setProductData] = useState(false);
  const[image,setImage] = useState("");
  const [size,setSize] = useState("")
  const navigate = useNavigate()
  // console.log(productId);

  const fetchProductData = async () => {  
    products.map((item)=>{
        if(item._id === productId){
          setProductData(item)
         setImage(item.image[0])
          
          return null
        }
    })
  }

  useEffect(()=>{
    fetchProductData()
  },[productId,products])
  
  return productData ? (
    <div className="K2">
      {/*--------- product data--------- */}
      <div className='K3'>
        {/*--------product images ---------*/}
        <div className='K4'>
          <div className='K5'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='K6' alt=""/>
              ))
            }

          </div>
          <div className='K7'>
            <img className='K8' src={image} alt=''/>

          </div>
        </div>
        {/*------product info------- */}
        <div className='K9'>
          <h1 className='K10'>{productData.name}</h1>
          <div className='K11'>
            <img src={assets.star_icon} className='' alt=""/>
            <img src={assets.star_icon} className='' alt=""/>
            <img src={assets.star_icon} className='' alt=""/>
            <img src={assets.star_icon} className='' alt=""/>
            <img src={assets.star_dull_icon} className='' alt=""/>
            <p className='K12'>(122)</p>

          </div>
          <p className='K13'>{currency}{productData.price}</p>
          <p className='K14'>{productData.description}</p>
          <div className='K15'>
            <p>Select Size</p>
            <div className='K16'>
            {productData.sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} className={`K17 ${item === size ? "orange" : ""}`} key={index}>{item}</button>
            ))}
            </div>

          </div>
            <button onClick={()=>addToCart(productData._id,size)} className='K19'>ADD TO CART</button>

            {/* <button onClick={()=>navigate("/cart",productData._id,size)} className='K55'>Buy Now</button> */}
            <hr className='K20'/>
            <div className='K21'>
              <p>100% Original Product</p>
              <p>Cash on Delivery is available</p>
              <p>Easy Return and Exchange Policy in 7 days</p>

            </div>
        </div>
      </div>
      {/*---------- Description & Review Section ----------*/}
      <div className='K22'>
        <div className='K23'>
          <b className='K24'>Description</b>
          <p className='K25'>Reviews (122)</p>
        </div>
        <div className='K26'>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in som</p>
       
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in som</p>
        </div>

      </div>
      {/*-------display related products---------------- */}
        

        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>



    </div>
  ) : <div className='K1'>

  </div> 
}

export default Product