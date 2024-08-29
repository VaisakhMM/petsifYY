import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseURL";

//1) register user
export const registerAPi = async(user)=>{
    return await commonAPI("post",`${BASE_URL}/user/register`,user,"")
}

//2) login user
export const loginAPi = async(reqBody)=>{
    return await commonAPI("post",`${BASE_URL}/user/login`,reqBody,"")
}

//3) add donate

export const addDonateAPi = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//4) get donation info
export const MainProjectApi = async(searchKey)=>{
    return await commonAPI("GET",`${BASE_URL}/project/main-project?search=${searchKey}`,'','')
}

export const addDeliveryAPi = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${BASE_URL}/user/user-delivery`,reqBody,reqHeader)
}

//6) get Donor project

export const userProjectApi = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/project/user-project`,'',reqHeader)
}

//7) Delete Project

export const deleteProjectApi = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${id}`,{},reqHeader)
}