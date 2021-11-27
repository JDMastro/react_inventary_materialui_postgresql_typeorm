import { instance, responseBody } from './axiosInstance'

const Requests = {
    getAll : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    findNumberOrder : async (url : string) => await instance.get(url).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
}

export const MovementsRequest =
{
    getAll : async () => await Requests.getAll(`movements`),
    save : async (body : any) => await Requests.save('movements',body),
    delete : async (id: number) => await Requests.delete(`movements/${id}`),
    findNumberOrder : async (order : number) => await Requests.findNumberOrder(`movements/${order}`)
}