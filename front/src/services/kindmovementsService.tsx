import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody)
}

export const KindMovementsRequest =
{
    getAll : async () => await Requests.getAll(`KindMovements`),
    save : async (body : any) => await Requests.save('KindMovements',body),
    delete : async (id: number) => await Requests.delete(`KindMovements/${id}`),
    update : async (id : number, body : any) => await Requests.update(`KindMovements/${id}`,body)
}