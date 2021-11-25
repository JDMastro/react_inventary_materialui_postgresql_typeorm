import { instance, responseBody } from './axiosInstance'

const Requests = {
    getproducts : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody),
    findByKindMovement : async (url : string) => await instance.get(url).then(responseBody)
}

export const ProductsRequest =
{
    getproducts : async () => await Requests.getproducts(`productcontroller`),
    save : async (body : any) => await Requests.save('productcontroller',body),
    delete : async (id: number) => await Requests.delete(`productcontroller/${id}`),
    update : async (id : number, body : any) => await Requests.update(`productcontroller/${id}`,body),
    findByKindMovement : async (provider: boolean) => Requests.findByKindMovement(`productcontroller/${provider}`)
}