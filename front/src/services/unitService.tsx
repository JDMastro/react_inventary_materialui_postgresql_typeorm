import { instance, responseBody } from './axiosInstance'

const Requests = {
    getUnits : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody)
}

export const UnitsRequest =
{
    getUnits : async () => await Requests.getUnits(`unitscontroller`),
    save : async (body : any) => await Requests.save('unitscontroller',body),
    delete : async (id: number) => await Requests.delete(`unitscontroller/${id}`),
    update : async (id : number, body : any) => await Requests.update(`unitscontroller/${id}`,body)
}