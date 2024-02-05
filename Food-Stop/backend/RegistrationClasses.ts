import {Registration} from './Interfaces'
import {DataFactory, DataRepository} from './DataRepositories'
import bcrypt from "bcryptjs";
const saltRounds = 10;
class CustomerRegistration implements Registration{
    public constructor(protected readonly fName: string, protected readonly lName: string, protected readonly email: string,
      protected readonly phone: string, protected readonly address: string, protected password: string){}
    async register(): Promise<string> {
        try{
        if (this.password === undefined) {
            throw new Error("Password is undefined");
        }
        this.password = bcrypt.hashSync(this.password,10);
        let dataFactory: DataFactory = DataFactory.getDataFactory();
        let customerRepository: DataRepository | null = dataFactory.getDataRepository("Customer");
        if (!customerRepository) {
            throw new Error("Customer repository is not available");
        }
        const result = await customerRepository?.writeData( {
                "fName":this.fName, "lName":this.lName,"phone":this.phone,"email":this.email,"address":this.address,
                "password":this.password
            });
        console.log(result);  
        return "Successfully Registered";}
        catch (error: any) {
            console.error(error);
            return Promise.reject(error || "An error occurred during registration");
        }
        }
    
}

class SellerRegistration implements Registration{
    public constructor(protected readonly BusinessName: string, protected readonly StoreName: string, protected readonly email:string,protected password: string,protected readonly phone:string,protected readonly NTN:string){}
    async register(): Promise<string> {
    try{
        if (this.password == undefined)
        throw new Error("Password is undefined");
    this.password = bcrypt.hashSync(this.password,10);
    let dataFactory: DataFactory = DataFactory.getDataFactory();
    let sellerRepository: DataRepository | null = dataFactory.getDataRepository("Seller");
    const result = await sellerRepository?.writeData({
        "BusinessName":this.BusinessName,"StoreName": this.StoreName, "email":this.email,"password":this.password,
        "phone":this.phone, "NTN":this.NTN
    });
    console.log(result, 'ne');
    return "Successfully Registered";}
    catch(error: any){
        console.error(error);
        return Promise.reject(error || "An error occured during registration");
    }
}
}

// class RiderRegistration implements Registration{
//     public constructor(protected readonly fName: string, protected readonly lName: string, protected readonly bikeNo: string, protected readonly phoneNo: string, protected readonly email:string, protected readonly password: string, protected readonly CNIC: string){}
//     register(): Promise<string> {
//         throw new Error('Method not implemented.');
//     }
// }

export {CustomerRegistration, SellerRegistration}