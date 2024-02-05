import {Login} from './Interfaces';
// import { Customer } from './CartLogic';
import { DataRepository,DataFactory } from './DataRepositories';
import bcrypt, { compareSync } from "bcryptjs";

class CustomerLogin implements Login{
    private static instance: CustomerLogin;
    private constructor(){}

    public static getLogin(): CustomerLogin{
        if (!CustomerLogin.instance){
            CustomerLogin.instance = new CustomerLogin();}
            return CustomerLogin.instance;
        }
    
    // async login(email:string,password:string): Promise<any>{
    //     let dataFactory: DataFactory = DataFactory.getDataFactory();
    //     let customerDataRepository: DataRepository | null = dataFactory.getDataRepository("Customer");
    //     const result = await customerDataRepository?.getData(email);
    //     // console.log(result.Password);
    //     // console.log(result);
    //     if (compareSync(password, result.Password)){
    //         return result;
    //     }
    //     return null;
    // }

    async login(email:string,password:string): Promise<any>{
        let dataFactory: DataFactory = DataFactory.getDataFactory();
        let customerDataRepository: DataRepository | null = dataFactory.getDataRepository("Customer");
        const result = await customerDataRepository?.getData(email);
        if (result == null){
            return "Email error";
        }
        if (compareSync(password, result.Password)){
            return result;
        }
        return null;
    }
}

class SellerLogin implements Login{
    private constructor(){}
    private static instance: SellerLogin;

    public static getLogin(): SellerLogin{
        if (!SellerLogin.instance){
            SellerLogin.instance = new SellerLogin();}
            return SellerLogin.instance;
    }
    async login(email:string,password:string): Promise<any> {
        let dataFactory: DataFactory = DataFactory.getDataFactory();
        let sellerDatarepository: DataRepository|null = dataFactory.getDataRepository("Seller");
        const result = await sellerDatarepository?.getData(email);
        if (result == null){
            return "Email error";
        }
        if (compareSync(password, result.Password)){
            return result;
        }
        return null;
    }
    
}

export {CustomerLogin, SellerLogin};