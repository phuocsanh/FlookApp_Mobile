import { requestAPI } from "../functions/globalFunc";
import { domain } from "../configs/api";
import apiString from '../configs/api'

interface login {
  userName: string, 
  password: string
}

interface register extends login {
  email: string,
  // phoneNumber: number, 
  // passwordComfirm: string
}

interface forgot {
  email: string, 
}

const Login = async (data: login) => {
// console.log("🚀 ~ file: auth.tsx ~ line 31 ~ Login ~ Logindata", data)
  
  const request = {
    method: 'POST',
    api: domain + apiString.login,
    body: {...data}
  };
  const response = await requestAPI(request);
  // console.log("🚀 ~ file: auth.tsx ~ line 30 ~ Login ~ response", response)
  return response;
};

const Register = async (data: any) => {
// console.log("🚀 ~ file: auth.tsx ~ line 32 ~ Register ~ data", data)
  const request = {
    method: 'POST',
    api: domain + apiString.register,
    body: {...data}
  };
  const response = await requestAPI(request);
  // console.log("🚀 ~ file: auth.tsx ~ line 39 ~ Register ~ response", response)
  return response;
};

const ForgotPass = async ( data: forgot) => {
console.log("🚀 ~ file: auth.tsx ~ line 46 ~ ForgotPass ~ data", data)
  console.log("🚀 ~ file: auth.tsx ~ line 46 ~ ForgotPass ~ ForgotPass", )

  const request = {
    method: 'PUT',
    api: domain + apiString.forgotPassword,
    body: data
  };
  const response = await requestAPI(request);
  // console.log("🚀 ~ file: auth.tsx ~ line 56 ~ ForgotPass ~ response", response)
  return response;
}

const ChangePass = async (data:any) => {
console.log("🚀 ~ file: auth.tsx ~ line 70 ~ ChangePass ~ ChangePass",data)

  const request = {
    method: 'PUT',
    api: domain + apiString.changePassword,
    body: data.data,
    token: data.token,
  };
  const response = await requestAPI(request);
  // console.log("🚀 ~ file: auth.tsx ~ line 70 ~ ChangePass ~ response", response)
  return response;
}

const FindOneUser = async (data:any) => {
// console.log("🚀 ~ file: auth.tsx ~ line 75 ~ GetCoinUser ~ data", data)  
  const request = {
    method: 'GET',
    api: `${domain}${apiString.findOneUser}`,  
    token:data.payload
  };
  const response = await requestAPI(request);
  // console.log("🚀 ~ file: auth.tsx ~ line 83 ~ GetCoinUser ~ response", response)
  return response;
}

const FindManyUser = async (data: any, token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findManyUser,
    body: data,
    token: token,
  };
  const response = await requestAPI(request);
  return response;
}

const FindManyRole = async (data: any, token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findManyRole,
    body: data,
    token: token,
  };
  const response = await requestAPI(request);
  return response;
}

const FindManyFeature = async (data: any, token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findManyFeature,
    body: data,
    token: token,
  };
  const response = await requestAPI(request);
  return response;
}

const FindManyFeatureGroup = async (data: any, token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findManyFeatureGroup,
    body: data,
    token: token,
  };
  const response = await requestAPI(request);
  return response;
}

const InsertOneUser = async (data: any, token: any) => {
  const request = {
    method: 'POST',
    api: domain + apiString.insertOneUser,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const UpdateOneUser = async (data: any) => {  
console.log("🚀 ~ file: auth.tsx ~ line 143 ~ UpdateOneUser ~ data", data.payload)
  const request = {
    method: 'PUT',
    api: `${domain}${apiString.updateOneUser}`,
    body: data.payload.data,
    token: data.payload.token
  };
  const response = await requestAPI(request);
  return response;
}
const updateNotify = async (data: any) => {  
  console.log("🚀 ~ file: auth.tsx ~ line 152 ~ updateNotify ~ data", data.payload)
  const {token,id,type, content,idCommentOrReview} = data.payload
  
   let request = {
    method: 'PUT',
    api: `${domain}${apiString.updateNotify}?type=${type}&id=${id}&device=${'mobile'}&content=${content}&idCommentOrReview=${idCommentOrReview}`,
    token: token
} 
  const response = await requestAPI(request);
  return response;
}

const getNotify = async (data: any) => {  
 console.log("🚀 ~ file: auth.tsx ~ line 165 ~ getNotify ~ data", data.payload)

   let request = {
    method: 'GET',
    api: `${domain}${apiString.getNotify}`,
    // api: 'http://192.168.43.174:8000/api/user-management/get-notify',
    token: data.payload
} 
  const response = await requestAPI(request);
  console.log("🚀 ~ file: auth.tsx ~ line 173 ~ getNotify ~ response", response)
  return response;
}


const UpdateOneUserMoblie = async (data:any) => {
// console.log("🚀 ~ file: auth.tsx ~ line 154 ~ UpdateOneUserMoblie ~ data", data.payload)
  
  const request = {
    method: 'PUT',
    api: `${domain}${apiString.updateOneUserMoblie}?type=${data.payload.type}`,
    body: data.payload.data,
    token: data.payload.accessToken
  };
  const response = await requestAPI(request);
  console.log("🚀 ~ file: auth.tsx ~ line 163 ~ UpdateOneUserMoblie ~ response", response)
  return response;
}

const RemoveOneRole = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeOneRole + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const RemoveOneUser = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeOneUser + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const RemoveManyRole = async (data: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyRole,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const RemoveManyUser = async (data: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyUsers,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}
const Payment = async (data: any, tokenUser:any) => {
  
  const request = {
    method: 'GET',
    api: `${domain}${apiString.payment}?coinPrice=${data.coinPrice}&coin=${data.coin}`,
    token: tokenUser,
  }
  const response = await requestAPI(request)
  return response
}




export default {
  Login, Register, ForgotPass, ChangePass,

  FindManyUser, RemoveOneUser, RemoveManyUser, InsertOneUser, UpdateOneUser,
  
  FindManyRole, RemoveOneRole, RemoveManyRole,

  FindManyFeature, FindManyFeatureGroup, FindOneUser,UpdateOneUserMoblie,Payment,updateNotify,getNotify
  
}