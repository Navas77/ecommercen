import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/ProductModel.js"


//function for add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)


    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
        return result.secure_url
      })
    )

    //  console.log(name,description,price,category,subCategory,sizes,bestseller);
    //  console.log(imagesUrl);

    const productData = {
      name,
      description,
      category,
      
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now()
    }
    console.log(productData);

    const product = new productModel(productData);
    await product.save()

    res.json({ success: true, message: "product Added" })

  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message })
  }
}
//function for list product
const listProducts = async (req, res) => {

  try {

    const products = await productModel.find({});
    res.json({ success: true, products })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//function for edit product

// const editProduct = async (req,res)=> {
//   try {
//     const {id} = req.params;
//     const { name,description,price,category,subCategory,sizes,bestseller}= req.body
//     const findProduct = await product.findById(id)

//     if(!findProduct) return res.status(404).json({
//       success:false,
//       message : "product not found"
//     })

//     findProduct.name = name || findProduct.name
//     findProduct.description = description|| findProduct.description
//     findProduct.price = price || findProduct.price
//     findProduct.category= category || findProduct.category
//     findProduct.subCategory = subCategory || findProduct.subCategory
//     findProduct.sizes = sizes|| findProduct.sizes
//     findProduct.bestseller = bestseller || findProduct.bestseller

//     await findProduct.save()
//     console.log(error);
//     res.json ({success:false,data:findProduct})


//   } catch (error) {
//     console.log(error);
//         res.json ({success:false,message:error.message})
//   }
// }
// update product by id
// const updateProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
//     const imageFile = req.files?.image;

//     const product = await productModel.findById(id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     if (imageFile) {
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path,
//         { resource_type: "image" });
//       product.image = imageUpload.secure_url;
//     }


//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = Number(price) || product.price;
//     product.category = category || product.category;
//     product.subCategory = subCategory || product.subCategory;
//     product.sizes = JSON.parse(sizes) || product.sizes;
//     product.bestseller = bestseller === "true" ? true : product.bestseller;
//     await product.save();
//     res.json({ success: true, message: "Product has been updated", product });
//   } catch (error) {
//     console.log(error); res.status(500).json({ success: false, message: error.message });
//   }
// }


const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }


    product.name = name || product.name;
    product.description = description || product.description;
    product.price = Number(price) || product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.sizes = JSON.parse(sizes) || product.sizes; // Ensure sizes is parsed as JSON
    product.bestseller = bestseller === "true" ? true : product.bestseller;
   


    await product.save();

    res.json({ success: true, message: "Product has been updated", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//function for remove product
const removeProduct = async (req, res) => {

  try {

    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "product Removed" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }
}



//function for single product
const singleProduct = async (req, res) => {

  try {

    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



export { listProducts, addProduct, removeProduct, singleProduct,updateProductById }