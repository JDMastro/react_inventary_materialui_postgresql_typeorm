import { instance, responseBody } from './axiosInstance'

const Requests = {
    getproductsDeri : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody)
}

export const ProductsDerivateRequest =
{
    getproductsDeri : async () => await Requests.getproductsDeri(`product-derivates`),
    save : async (body : any) => await Requests.save('product-derivates',body),
    delete : async (id: number) => await Requests.delete(`product-derivates/${id}`),
    update : async (id : number, body : any) => await Requests.update(`product-derivates/${id}`,body)
}