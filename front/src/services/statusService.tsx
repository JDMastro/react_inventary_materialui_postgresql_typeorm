import { instance, responseBody } from './axiosInstance'

const Requests = {
    getStatus : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody)
}

export const StatusRequest =
{
    getStatus : async () => await Requests.getStatus(`status`),
    save : async (body : any) => await Requests.save('status',body),
    delete : async (id: number) => await Requests.delete(`status/${id}`),
    update : async (id : number, body : any) => await Requests.update(`status/${id}`,body)
}