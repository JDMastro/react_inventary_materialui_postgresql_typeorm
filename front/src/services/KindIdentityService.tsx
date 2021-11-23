import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody)
}

export const KindIdRequest =
{
    getAll : async () => await Requests.getAll(`kindidentity`),
    save : async (body : any) => await Requests.save('kindidentity',body),
    delete : async (id: number) => await Requests.delete(`kindidentity/${id}`),
    update : async (id : number, body : any) => await Requests.update(`kindidentity/${id}`,body)
}