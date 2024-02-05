import { Product } from "./Products";
import { pool } from "./DataRepositories";
import * as mysql from 'mysql2/promise';

interface HotProductStrategy{
    getHotProducts(): Promise<any>;
}

class HighestRevenue implements HotProductStrategy{
    async getHotProducts(): Promise<any> {
        const connection = await pool.getConnection();
        try{
        const products = await connection.query<mysql.RowDataPacket[]>(`CALL HighestRevenueHotProducts()`);
        return products[0];
        }catch(err){
            console.log(err);
            return "Error loading products";
        }
    }
}

class SimpleStrategy implements HotProductStrategy{
    async getHotProducts(): Promise<any> {
        const connection = await pool.getConnection();
        try{
        const products = await connection.query<mysql.RowDataPacket[]>(`CALL SimpleHotProducts()`);
        return products[0];
        }catch(err){
            console.log(err);
            return "Error loading products";
        }
    }
}

class HotProductsContext{
    public constructor(){};

    async determineHotProducts(): Promise<any>{
        const products = await new HighestRevenue().getHotProducts();
        return products;
    }
}

export {HotProductsContext};