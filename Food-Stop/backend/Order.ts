import { OrderProceduresRepository, ProceduresFactory } from "./DataRepositories";

class OrderLogic{
    private constructor(){}
    private static instance: OrderLogic;

    public static getOrderLogic():OrderLogic{
        if (!OrderLogic.instance){
            OrderLogic.instance = new OrderLogic();
        }
        return OrderLogic.instance;
    }

    public async getOrderCountFromRepository(seller_id:number): Promise<any>{
        let proceduresFactory: ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let orderProceduresRepository: OrderProceduresRepository = proceduresFactory.getOrderProceduresRepository();
        const orderCount = await orderProceduresRepository.getOrderCountBySeller(seller_id);
        return orderCount;
    }
    public async getSellerOrdersFromRepository(seller_id: number): Promise<any>{
        let proceduresFactory: ProceduresFactory = ProceduresFactory.getProceduresFactory();
        let orderProceduresRepository: OrderProceduresRepository = proceduresFactory.getOrderProceduresRepository();
        const results = await orderProceduresRepository.getAllSellerOrders(seller_id);
        return results;
    }

}

export {OrderLogic};