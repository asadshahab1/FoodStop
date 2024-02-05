import * as mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'alics21103ned$',
    database: 'foodstop'
});

import { DataRepository, ProductProceduresRepository, OrderProceduresRepository, SellerProceduresRepository } from './Interfaces';


class DataFactory{
    private static instance: DataFactory;
    private constructor(){}

    public static getDataFactory(): DataFactory{
        if (!DataFactory.instance){
            DataFactory.instance = new DataFactory();
        }
        return DataFactory.instance;
    }
    public getDataRepository(repository: string, data:any = null): DataRepository | null{
        if (repository.toUpperCase() == "CUSTOMER"){
            return new CustomerRepository();
        }
        else if (repository.toUpperCase() == "SELLER"){
            return new SellerRepository();
        }
        else if (repository.toUpperCase() == "RIDER"){
            return new RiderRepository();
        }
        else if (repository.toUpperCase() == "ORDER"){
            return new OrderRepository();
        }
        else if (repository.toUpperCase() == "CART"){
            return new CartRepository();
        }
        else if (repository.toUpperCase() == "PRODUCT"){
            return new ProductRepository();
        }
        else
        return null;
    }
}



class ProceduresFactory{
    private static instance: ProceduresFactory;
    private constructor(){}

    public static getProceduresFactory(): ProceduresFactory{
        if (!ProceduresFactory.instance){
            ProceduresFactory.instance = new ProceduresFactory();
        }
        return ProceduresFactory.instance;
    }

    public getProductProceduresRepository(): ProductProceduresRepository{
        return new ProductRepository();
    }

    public getOrderProceduresRepository(): OrderProceduresRepository{
        return new OrderRepository();
    }

    public getSellerProceduresRepository(): SellerProceduresRepository{
        return new SellerRepository();
    }
}


class CustomerRepository implements DataRepository{
    public constructor(){}

    async getData(email: string): Promise<unknown> {
        const connection = await pool.getConnection();
        const [results] = await connection.query<mysql.RowDataPacket[]>(` CALL GetCustomerByEmail(?)`,[email]);
        if (results[0].length === 0){
            return null;
        }
        return results[0][0];
    }

    
    async writeData(data: any): Promise<unknown> {
        const connection = await pool.getConnection();
        try{
            const result = await connection.query('CALL RegisterCustomer(?, ?, ?, ?, ?, ?)', [
                data.fName,
                data.lName,
                data.email,
                data.phone,
                data.address,
                data.password,
            ]);
            return "Successfully Registered";
                }
            catch(error: any){
                
                if (error.code === 'ER_DUP_ENTRY') {
                    let errorMessage = error.sqlMessage
                    let phoneStringIndex = errorMessage.indexOf("customer.Phoneno");
                    let emailStringIndex = errorMessage.indexOf("customer.Email");

                    if (phoneStringIndex!==-1)
                    return Promise.reject("Phone number already registered");
                    else if (emailStringIndex!==-1)
                    return Promise.reject("Email already registered");
                } else {
                    // Handle other errors
                    return Promise.reject(error);
                }
            }
            finally{
                connection.release();
            }
    }
  
    updateData(data:any): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
}

class SellerRepository implements DataRepository, SellerProceduresRepository{
    public constructor(){}

    async getSellerRevenue(seller_id: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
        const revenue = await connection.query<mysql.RowDataPacket[]>(`CALL ShowSellerRevenue(?)`,[seller_id]);
        // console.log(revenue)
        return revenue[0];
    }catch(err){
        console.log(err);
        return null;
    }finally{connection.release();}
    }

    async getData(email: string): Promise<unknown> {
        const connection = await pool.getConnection();
        const [results] = await connection.query<mysql.RowDataPacket[]>(` CALL GetSellerByEmail(?)`,[email]);
        if (results[0].length === 0){
            return null;
        }
        connection.release();
        return results[0][0];
    }

    async writeData(data: any): Promise<unknown> {
        const connection = await pool.getConnection();
        try{
            const result = await connection.query('CALL RegisterSeller(?, ?, ?, ?, ?, ?)', [
                data.BusinessName,
                data.StoreName,
                data.email,
                data.phone,
                data.NTN,
                data.password,
            ]);
            return "Successfully Registered";
                }
            catch(error: any){
                
                if (error.code === 'ER_DUP_ENTRY') {
                    let errorMessage = error.sqlMessage
                    let phoneStringIndex = errorMessage.indexOf("seller.Phone");
                    let emailStringIndex = errorMessage.indexOf("seller.Email");

                    if (phoneStringIndex!==-1)
                    return Promise.reject("Phone number already registered");
                    else if (emailStringIndex!==-1)
                    return Promise.reject("Email already registered");
                } else {
                    // Handle other errors
                    return Promise.reject(error);
                }
            }
            finally{
                connection.release();
            }
    }
    updateData(data:any): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
}


class RiderRepository implements DataRepository{
    public constructor(){}

    getData() {
        throw new Error("Method not implemented.");
    }
    writeData(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    updateData(): Promise<unknown>{
        throw new Error("Method not implemented.");
    }
}


class ProductRepository implements DataRepository, ProductProceduresRepository{
    async getProductsBySeller(seller_id: number): Promise<any> {
        const connection = await pool.getConnection();
        try {
            // console.log(seller_id)
            const products = await connection.query<mysql.RowDataPacket[]>(`CALL GetProductsBySeller(?)`,[seller_id]);
            // console.log(products)
            return products[0];
        }catch(err){
            console.log('hehe')
            return null;
        }finally{
            connection.release();
        }
    }

    async EditProductPrice(product_id: number, product_price: number): Promise<unknown> {
        const connection = await pool.getConnection();
        try{
        connection.query(`CALL EditPrice(?,?)`,[product_id, product_price]);
        return "Price edited successfully"}
        catch(err){
            return "Error editing price";
        }finally{connection.release();}
    }

    async getProductCountBySeller(seller_id: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
        const productCount = await connection.query<mysql.RowDataPacket[]>(`CALL ShowSellerProduct(?)`,[seller_id]);
        // console.log(productCount)
        return productCount[0];}
        catch(err){
            console.log(err);
            return null;
        }finally {connection.release();}
    }

    async deleteProduct(seller_id: number, product_id: number): Promise<unknown> {
        const connection = await pool.getConnection();
        try{
            await connection.query(`CALL DeleteProduct(?,?)`,[seller_id,product_id]);
            return "Product deleted successfully";
        }catch(err){
            return `Error deleting product`;
        }finally{connection.release();}
    }
    async searchProductByKeyWord(keyword: string): Promise<any> {
        const connection = await pool.getConnection();
        const results = await connection.query<mysql.RowDataPacket[]>(`CALL SearchProductsByKeyword(?)`,[keyword]);
        if(results[0].length == 0){
            return null;
        }
        connection.release();
        return results[0];
    }
    getSevenDayProductsBySeller(seller_id: number): Promise<any> {
        throw new Error("method not implemented");
    }

    async getData(category:string): Promise<any> {
        const connection = await pool.getConnection();
        const results = await connection.query<mysql.RowDataPacket[]>(`CALL GetProductByCategory(?)`,[category]);
        if (results[0].length == 0){
            return "No products for this category";
        }
        connection.release();
        return results[0];
    }


    async writeData(data: any): Promise<unknown> {
        const connection = await pool.getConnection();
        try{
        await connection.query(`CALL InsertProducts(?,?,?,?,?,?)`,[data.seller_id, data.product_title,data.product_description,data.image_path,data.category,data.price]);
        return "Product uploaded successfully";
    }catch(err){
        return "Error uploading product";
    }finally{connection.release();}
    }


    updateData(): Promise<unknown>{
        throw new Error("Method not implemented.");
    }

}


class OrderRepository implements DataRepository, OrderProceduresRepository{
    public constructor(){}
    async getOrderCountBySeller(seller_id: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const orderCount = await connection.query<mysql.RowDataPacket[]>(`CALL ShowSellerOrder(?)`,[seller_id]);
            return orderCount[0];
        }catch(err){
            console.log(err);
            return null;
        }finally{connection.release();}
    }
    getSevenDayOrdersBySeller(seller_id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    getData() {
        throw new Error("Method not implemented.");
    }
    async writeData(data:any): Promise<unknown> {
        const connection = pool.getConnection();
        try{
            (await connection).query(`CALL PlaceOrder(?,?)`,[data.cust_id,data.payment_method]);
            return "Order Placed Successfully";
        }catch(err){
            return "Error placing order";
        }finally{(await connection).release();}
    }
    updateData(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    async getAllSellerOrders(seller_id: number): Promise<any> {
        const connection = await pool.getConnection();
        try {
        const results = await connection.query<mysql.RowDataPacket[]>(`CALL GetAllSellerOrders(?)`,[seller_id]);
        return results[0];}
        catch(err){
            return null;
        }
    }

}


class CartRepository implements DataRepository{
    public constructor(){}

    async getData(customerID: number): Promise<any> {
        const connection = await pool.getConnection();
        const results = await connection.query<mysql.RowDataPacket[]>(`CALL GetCartByCustomerID(?)`,[customerID]);
        return results[0];
    }
    async writeData(data: any): Promise<unknown> {
        const connection = await pool.getConnection();
        try{
        const results = await connection.query(`CALL AddToCart(?,?)`,[data.custID, data.productID]);
        return "Added to cart successfully";
    }catch(error:any){
        if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.code === 'ER_NO_REFERENCED_ROW') {
            return "Product not available";
        }
    
    }
        finally{
            connection.release();
        }}


    async updateData(data: any): Promise<unknown> {
        const connection = await pool.getConnection();
        const items = data.items
        // console.log('fucn',data.cust_id, items[0].ProductID)
        for(let i= 0;i<items.length;i++){
            try{
                const rr = await connection.query(`CALL UpdateCart(?,?,?)`,[items[i].Quantity, items[i].ProductID, data.cust_id]);
            }catch(err){
                console.log('eer')
                return `Some products not updated`;
            }finally{
                connection.release();
            }
        }
       
    }
}

export {DataFactory, DataRepository, ProductProceduresRepository, ProceduresFactory, OrderProceduresRepository, pool};
