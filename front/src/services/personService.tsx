import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody)
}

export const personRequest =
{
    getAll : async () => await Requests.getAll(`person`),
    save : async (body : any) => await Requests.save('person',body),
    delete : async (id: number) => await Requests.delete(`person/${id}`),
    update : async (id : number, body : any) => await Requests.update(`person/${id}`,body)
}