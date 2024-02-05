interface Registration{
    register (): Promise<string>;
}

interface Login{
    login(email: string,password:string): Promise<any>;
}

interface DataRepository{
    getData(data: any): any;
    writeData(data: any): Promise<unknown>;
    updateData(data:any): Promise<unknown>;
}

interface ProductProceduresRepository{
    getSevenDayProductsBySeller(seller_id:number): Promise<any>;

    searchProductByKeyWord(keyword: string): Promise<any>;

    deleteProduct(seller_id: number, product_id: number): Promise<unknown>;

    getProductCountBySeller(seller_id:number): Promise<any>;

    getProductsBySeller(seller_id: number): Promise<any>;

    EditProductPrice(product_id:number, product_price:number): Promise<unknown>;
}


interface OrderProceduresRepository{
    getSevenDayOrdersBySeller(seller_id: number): Promise<any>

    getOrderCountBySeller(seller_id : number): Promise<any>

    getAllSellerOrders(seller_id:number): Promise<any>;
}

interface SellerProceduresRepository{
    getSellerRevenue(seller_id: number): Promise<any>;
}
export {Registration, Login,DataRepository, ProductProceduresRepository, OrderProceduresRepository, SellerProceduresRepository};



