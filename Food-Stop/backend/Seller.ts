import { ProceduresFactory } from "./DataRepositories";
import { SellerProceduresRepository } from "./Interfaces";

class SellerLogic{
    private static instance: SellerLogic;
    private constructor(){}

    public static getSellerLogic(): SellerLogic{
        if (!SellerLogic.instance){
            SellerLogic.instance = new SellerLogic();
        }
        return SellerLogic.instance;
    }

    public async getSellerRevenueFromRepository(seller_id:number): Promise<any>{
        let proceduresFactory: ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let sellerRepository: SellerProceduresRepository = proceduresFactory.getSellerProceduresRepository();
        const revenue = await sellerRepository.getSellerRevenue(seller_id);
        return revenue;
    }
    
}

export{SellerLogic};