import { instance, responseBody } from './axiosInstance'

const Requests = {
    getcompanies : async (url : string) => await instance.get(url).then(responseBody),
    save : async (url : string, body : any) => await instance.post(url,body).then(responseBody),
    delete : async (url : string) => await instance.delete(url).then(responseBody),
    update : async (url: string, body : any) => await instance.put(url,body).then(responseBody)
}

export const CompaniesRequest =
{
    getcompanies : async () => await Requests.getcompanies(`companies`),
    save : async (body : any) => await Requests.save('companies',body),
    delete : async (id: number) => await Requests.delete(`companies/${id}`),
    update : async (id : number, body : any) => await Requests.update(`companies/${id}`,body)
}