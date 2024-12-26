import React, { useState } from 'react'
import "./Add.css"
import { assets } from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'


function Add({token}) {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [Price,setPrice] = useState("");
  const [category,setCategory] = useState("Men");
  const [subCategory,setSubCategory] = useState("Topwear");
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
       const formdata = new FormData()
       
       formdata.append("name",name)
       formdata.append("description",description)
       formdata.append("price",Price)
       formdata.append("category",category)
       formdata.append("subCategory",subCategory)
       formdata.append("bestseller",bestseller)
       formdata.append("sizes",JSON.stringify(sizes))

      image1 && formdata.append("image1",image1)
      image2 && formdata.append("image2",image2)
      image3 && formdata.append("image3",image3)
      image4 && formdata.append("image4",image4)
      
      const response = await axios.post(`${backendUrl}/api/product/add`,formdata,{headers:{token}});

      if(response.data.success){
         toast.success(response.data.message)
         setName("")
         setDescription("")
         setImage1(false)
         setImage2(false)
         setImage3(false)
         setImage4(false)
         setPrice(" ")
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='DD4'>
      <div>
        <p className='DD3'>Upload Image</p>
        <div className='DDD'>
          <label htmlFor='image1'>
            <img className='DD1' src={ !image1 ?  assets.upload_area : URL.createObjectURL(image1)} alt='null' />
            <input onChange={(e)=>setImage1(e.target.files[0])} type='file' id="image1" hidden />
          </label>
          <label htmlFor='image2'>
            <img className='DD1' src={ !image2 ? assets.upload_area : URL.createObjectURL(image2)} alt='' />
            <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id="image2" hidden />
          </label>
          <label htmlFor='image3'>
            <img className='DD1' src={ !image3 ? assets.upload_area : URL.createObjectURL(image3)} alt='' />
            <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id="image3" hidden />
          </label>
          <label htmlFor='image4'>
            <img className='DD1' src={ !image4 ? assets.upload_area : URL.createObjectURL(image4)} alt='' />
            <input onChange={(e)=>setImage4(e.target.files[0])} type='file' id="image4" hidden />
          </label>
        </div>
      </div>


      <div className='DD7'>
        <p className='DD6'>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='DD5' type='text' placeholder='Type here' required />
      </div>
      <div className='DD7'>
        <p className='DD6'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='DD5' type='text' placeholder='Write content here' required />
      </div>
      <div className='DD10'>
        <div>
          <p className='DD9'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='DD8' required>
            <option value="" disabled>Select category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='DD9'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='DD8' required>
            <option value="" disabled>Select subcategory</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='DD9'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={Price} className='DD11' type='number' placeholder='25' required />
        </div>
      </div>
      <div  >
        <p className='DD9'>Product Sizes</p>
        <div className='DD13'>
        <div onClick={()=>setSizes(prev => prev.includes("s") ? prev.filter(item => item !== "s") : [...prev,"s"] )} >
          <p className={`DD12 ${sizes.includes("s") ? "bg-pink" : "bg-slate"}`}>S</p>
        </div>
        <div  onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"] )}  >
          <p className={`DD12 ${sizes.includes("M") ? "bg-pink" : "bg-slate"}`}>M</p>
        </div>
        <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"] )}>
          <p className={`DD12 ${sizes.includes("L") ? "bg-pink" : "bg-slate"}`}>L</p>
        </div>
        <div  onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"] )}>
          <p className={`DD12 ${sizes.includes("XL") ? "bg-pink" : "bg-slate"}`}>XL</p>
        </div>
        <div  onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"] )}>
          <p className={`DD12 ${sizes.includes("XXL") ? "bg-pink" : "bg-slate"}`}>XXL</p>
        </div>
      </div>
      </div>
      <div className='DD15'>
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id ="bestseller"/>
        <label className='DD14' htmlFor='bestseller'>Add to bestseller</label>
      </div>
      <button className='DD16' type='submit'>ADD</button>
    </form>
  )
}

export default Add