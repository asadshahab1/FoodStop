import express from 'express';
import {Login, Registration} from './Interfaces';
import {CustomerRegistration, SellerRegistration} from './RegistrationClasses';
import { CustomerLogin, SellerLogin } from './LoginClasses';
import * as jwt from 'jsonwebtoken';
const secretKey = 'your_secret_key';
const seller_secretKey = 'my_secret_key';
import { Request, Response, NextFunction } from 'express';
import { DataFactory, DataRepository } from './DataRepositories';
import { Product, ProductLogic } from './Products';
import { OrderLogic } from './Order';
import { SellerLogic } from './Seller';
import { HotProductsContext } from './HotProducts';
// import multer from 'multer';
const multer = require('multer');

const app = express();
// import cors from 'cors';
const cors = require('cors');
const port = 3000;

// Set up Multer to handle file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/');
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         cb(null, `image_${Date.now()}${ext}`);
//     }
// });

// const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.post('/register-customer',(req,res)=>{
    const {fName,lName,email,password,phone,address} = req.body;
    let customerRegistration: Registration = new CustomerRegistration(fName,lName,email,phone,address,password);
    customerRegistration.register().then((result)=>{return res.send(result)}).catch((error)=>{return res.send(error)});
    
});

interface CustomRequest extends Request{
    id: any;
    seller_id: any;
}

function authenticateJWT(req: Request ,res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    // console.log('token', token)

    if (!token) {
      return res.status(401).send
    }
  
    try{
        const decoded = jwt.verify(token,secretKey);
        (req as CustomRequest).id = decoded;
        next();}
    catch(error){
        res.status(401).send("Please authenticate");
    }}


    function authenticateSellerJWT(req: Request ,res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        // console.log(token)
      
        if (!token) {
          return res.status(401).send
        }
      
        try{
            const decoded = jwt.verify(token, seller_secretKey);
            (req as CustomRequest).seller_id = decoded;
            next();}
        catch(error){
            res.status(401).send("Please authenticate");
        }}

  

app.post('/register-seller',(req,res)=>{
    const {BusinessName, StoreName, email, password, phone, NTN} = req.body;
    let sellerRegistration: Registration = new SellerRegistration(BusinessName, StoreName, email, password, phone, NTN);
    sellerRegistration.register().then((result)=>{return res.send(result)}).catch((error)=>{return res.send(error)});
});


app.post('/customer-login',async (req,res)=>{
    const {email, password} = req.body;
    let customerLogin: Login = CustomerLogin.getLogin();
    const result = await customerLogin.login(email,password);
    if (result){
    if (result == "Email error"){
        return res.json({"token":null,"data":"No such email exists"});
    }
    const token = jwt.sign(result.CustomerID,secretKey);
    return res.json({"token":token,"data":result});
    }
    return res.json({"token":null,"data":"Incorrect Password"});
});



app.post('/seller-login', async (req, res) => {
    const { email, password } = req.body;
    let sellerLogin: Login = SellerLogin.getLogin();
    const result = await sellerLogin.login(email, password);
    if (result) {
        if (result == "Email error") {  
          return res.json({ "token": null, "data": "No such email exists" });
        }
        const token = jwt.sign(result.SellerID, seller_secretKey);
        return res.json({ "token": token, "data": result });
    }
    return res.json({ "token": null, "data": "Incorrect Password" });
});


app.get('/cart',authenticateJWT,async (req: Request ,res: Response)=>{
    // console.log('cart')
    // console.log((req as CustomRequest).id, 'here')
   let dataFactory: DataFactory = DataFactory.getDataFactory();
   let cartRepository: DataRepository|null = dataFactory.getDataRepository("Cart");
   const results = await cartRepository?.getData((req as CustomRequest).id);
//    console.log(results)
   return res.json({"data":results});
});


// Requires productID and token
app.post('/add-to-cart',authenticateJWT, async(req: Request, res:Response)=>{
    const custID = (req as any).id;
    const {productID} = req.body;
    // console.log(custID, productID)
    let dataFactory: DataFactory = DataFactory.getDataFactory();
    let cartRepository: DataRepository|null = dataFactory.getDataRepository("Cart");
    const results = await cartRepository?.writeData({"custID":custID,"productID":productID});
    return res.json({"message":results});
});

// Send product ids and updated quantity of only those products which are updated. Also send token. Send them in put request body.
/*Send this form {
  "items": [
    {
      "product_id": 456,
      "quantity": 3
    },
    {
      "product_id": 789,
      "quantity": 2
    }
  ]
}*/

app.post('/update-cart', authenticateJWT, async(req: Request, res: Response)=>{
    const custID = (req as any).id;
    const items = req.body;
    // console.log('kch nh', items)
    let dataFactory: DataFactory = DataFactory.getDataFactory();
    let cartRepository: DataRepository | null = dataFactory.getDataRepository("Cart");
    const message = await cartRepository?.updateData({"items":items,"cust_id":custID});
    // console.log(message)
    // console.log('here')
    return res.json({"message":message});
});

// Send token and payment_method in request body
app.post('/place-order',authenticateJWT,async(req:Request, res:Response)=>{
    const cust_id = (req as any).id;
    const {payment_method} = req.body;
    console.log(payment_method)
    let dataFactory: DataFactory = DataFactory.getDataFactory();
    let orderRepository: DataRepository | null = dataFactory.getDataRepository("Order");
    const message = await orderRepository?.writeData({"cust_id":cust_id,"payment_method":payment_method});
    return res.json({"message":message});
})


app.get('/products/:category',async(req,res)=>{
    const category = req.params.category;
    console.log(category)
    let productLogic: ProductLogic = ProductLogic.getProductLogic();
    const results = await productLogic.displayProductsByCategory(category);
    // console.log(results)
    if (results == null){
        return res.json({"items":"No items for this category"});
}
    return res.json({"items":results});
});

// app.post('/upload-product', authenticateSellerJWT, upload.single('image'),async(req,res)=>{
//     if (!req.file){
//         return res.json({"message":"Please upload product image"});
//     }
//     const productImagePath = req.file?.path;
//     const seller_id = (req as any).seller_id;
//     const {product_title, productDescription, category,productPrice} = req.body;
//     const data = {"seller_id":seller_id,"product_title":product_title,"product_description":productDescription, "image_path":productImagePath,
//                     "category":category,"price":productPrice};
//     let productLogic: ProductLogic = ProductLogic.getProductLogic();
//     const message = productLogic.insertProducts(data);
//     return res.json({"messaage":message});
// });



// ye ha asal 

app.post('/upload-product', authenticateSellerJWT,async(req,res)=>{
    const seller_id = (req as any).seller_id;
    // console.log(seller_id)
    const {product_title, productDescription, productImagePath, category,productPrice} = req.body;
    const data = {"seller_id":seller_id,"product_title":product_title,"product_description":productDescription, "image_path":productImagePath,
                    "category":category,"price":productPrice};
    // console.log('ee', data)
    let productLogic: ProductLogic = ProductLogic.getProductLogic();
    const message = await productLogic.insertProducts(data);
    return res.json({"messaage":message});
});

// app.post('/upload-product', authenticateSellerJWT,async(req,res)=>{
//     const seller_id = (req as any).seller_id;
//     const {product_title, productDescription, productImagePath, category,productPrice} = req.body;
//     const data = {"seller_id":seller_id,"product_title":product_title,"product_description":productDescription, "image_path":productImagePath,
//                     "category":category,"price":productPrice};
//     let productLogic: ProductLogic = ProductLogic.getProductLogic();
//     const message = productLogic.insertProducts(data);
// });

app.post('/delete-product',authenticateSellerJWT, async(req,res)=>{
    const seller_id = (req as any).seller_id;
    const {product_id} = req.body;
    const productLogic : ProductLogic = ProductLogic.getProductLogic();
    const result = await productLogic.deleteProductBySeller(seller_id,product_id);
    return res.json({"result":result})
});

app.post('/search',async (req,res)=>{
    const {keyword} = req.body;
    const productLogic: ProductLogic = ProductLogic.getProductLogic();
    const result = await productLogic.searchProductsByKeyword(keyword);
    if (!result){
        return res.json({"result":`No product found for this ${keyword}`});
    }
    return res.json({"result":result});
})



// Send seller_id in headers
app.get('/get-product-count', authenticateSellerJWT,async (req,res)=>{
    const seller_id = (req as any).seller_id;
    const productLogic: ProductLogic = ProductLogic.getProductLogic();
    const result = await productLogic.getProductCountFromRepository(seller_id);
    if (result == null){
        return res.json({"result":"Error getting product count"});
    }
    return res.json({"result":result});
});

app.get('/get-order-count', authenticateSellerJWT, async (req,res)=>{
    const seller_id = (req as any).seller_id;
    const orderLogic: OrderLogic = OrderLogic.getOrderLogic();
    const result = await orderLogic.getOrderCountFromRepository(seller_id);
    if (result == null){
        return res.json({"result":"Error loading order count"});
    }
    return res.json({"result":result})
});

// Send seller_id in header
app.get('/get-revenue',authenticateSellerJWT, async (req,res)=>{
    const seller_id = (req as any).seller_id;
    // console.log(seller_id)
    const sellerLogic: SellerLogic = SellerLogic.getSellerLogic();
    const result = await sellerLogic.getSellerRevenueFromRepository(seller_id);
    // console.log(result)
    if (result == null){
        return res.json({"result":"NaN"});
    }
    return res.json({"result":result});
});

// Send Seller_id in header
app.get('/view-products',authenticateSellerJWT, async (req,res)=>{
    const seller_id = (req as any).seller_id;
    const productLogic: ProductLogic = ProductLogic.getProductLogic();
    const result = await productLogic.getSellerProductsFromRepository(seller_id);
    if (result == null){
        return res.json({"message":"Error loading products"});
    }
    return res.json({"result":result});
});

app.post('/edit-price',authenticateSellerJWT, async (req,res)=>{
    const seller_id = (req as any).seller_id;
    const {product_id, product_price} = req.body;
    const productLogic: ProductLogic = ProductLogic.getProductLogic();
    const result = await productLogic.EditProductPrice(product_id ,product_price);
    return res.json({"result":result})
})

app.get('/seller-orders',authenticateSellerJWT, async(req,res)=>{
    const seller_id = (req as any).seller_id;
    const orderLogic: OrderLogic = OrderLogic.getOrderLogic();
    const result = await orderLogic.getSellerOrdersFromRepository(seller_id);
    if (result == null){
        return res.json({"result":"Error loading orders"});
    }
    return res.json({"result":result})
});

app.get('/hot-products',async (req,res)=>{
    const context: HotProductsContext = new HotProductsContext();
    const result = await context.determineHotProducts();
    if (result == null){
        return res.json({"result":"Error getting hot products"});
    }
    return res.json({"result":result});
})



app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
});