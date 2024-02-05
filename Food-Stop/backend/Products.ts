import { DataFactory, DataRepository, ProceduresFactory, ProductProceduresRepository } from "./DataRepositories";

class Product{
    public constructor(protected productTitle: string, protected productDescription: string, protected productCategory: string,
        protected productImagePath: string, protected productPrice: number){}

    public getPrice(){
        return this.productPrice;
    }

    public setPrice(newPrice: number){
        this.productPrice = newPrice;
    }
}

class ProductLogic{
    private constructor(){}
    private static instance: ProductLogic;

    public static getProductLogic():ProductLogic{
        if (!ProductLogic.instance){
            ProductLogic.instance = new ProductLogic();
        }
        return ProductLogic.instance;
    }
    public async EditProductPrice(product_id:number, product_price:number): Promise<any>{

        let proceduresFactory: ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let productProcedureRepository : ProductProceduresRepository = proceduresFactory.getProductProceduresRepository();
        const result = await productProcedureRepository.EditProductPrice(product_id, product_price);
        return result;
    }

    public async displayProductsByCategory(category:string): Promise<any>{
        let dataFactory: DataFactory = DataFactory.getDataFactory();
        let productRepository: DataRepository | null = dataFactory.getDataRepository("Product");
        const results = await productRepository?.getData(category);
        return results;
    }

    public async insertProducts(data: any): Promise<any>{
        let dataFactory: DataFactory = DataFactory.getDataFactory();
        let productRepository : DataRepository | null = dataFactory.getDataRepository("Product");
        const message = await productRepository?.writeData(data);
        return message;
    }

    public async searchProductsByKeyword(keyword: string): Promise<any>{
        let proceduresFactory: ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let productsProcedureRepository : ProductProceduresRepository = proceduresFactory.getProductProceduresRepository();
        const results = productsProcedureRepository.searchProductByKeyWord(keyword);
        return results;
    }

    public async deleteProductBySeller(seller_id: number, product_id:number): Promise<unknown>{
        let proceduresFactory : ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let productsProcedureRepository : ProductProceduresRepository = proceduresFactory.getProductProceduresRepository();
        const result = await productsProcedureRepository.deleteProduct(seller_id,product_id);
        return result;
    }

    public async getProductCountFromRepository(seller_id:number): Promise<unknown>{
        let proceduresFactory: ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let productProcedureRepository: ProductProceduresRepository = proceduresFactory.getProductProceduresRepository();
        const productCount = await productProcedureRepository.getProductCountBySeller(seller_id);
        if (productCount == null){
            return null;
        }
        return productCount;
    }

    public async getSellerProductsFromRepository (seller_id:number){
        let proceduresFactory: ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let productProcedureRepository: ProductProceduresRepository = proceduresFactory.getProductProceduresRepository();
        const products = await productProcedureRepository.getProductsBySeller(seller_id);
        return products;
    }
}

export {ProductLogic, Product};