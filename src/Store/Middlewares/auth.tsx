import { all, put, delay, takeLatest } from "redux-saga/effects";
// import { toastConfig } from '../../Functions/toast'
import { responseGenerator } from './index'
import actionTypes from '../Actions/constants';
import { setPersisAuth,getPersistAuth } from "../../functions/globalFunc";
import Services from '../../Services'
import Action from '../Actions'
import { handleToast } from "../../functions/globalFunc";





function* Login(action: any) {
// console.log("🚀 ~ file: auth.tsx ~ line 15 ~ function*Login ~ action", action.payload)
  
  try {
  
    const response: responseGenerator = yield Services.auth.Login(action.payload.data)
   
    // yield put({type:actionTypes.setIsLoading, payload:true})
    if (response?.statusCode === 200 || response?.statusCode === 201 ) {

      yield setPersisAuth(response?.data?.accessToken.toString())
      yield put(Action.auth.LoginSuccess(response?.data?.accessToken.toString()))
      yield handleToast(response.message, 'success')
      yield put(Action.auth.UpdateOneUserMoblie(action?.payload?.data?.deviceToken,response?.data?.accessToken.toString(),'deviceToken'))
      yield put(Action.auth.FindOneUser(response?.data?.accessToken.toString()))
  
    } else {
      yield put(Action.auth.LoginFailure(response.message))
      yield handleToast(response.message,'error')

    }
  } catch (error) {
    console.log('Error LoginSagas', error)
  } finally {
    console.log('LoginSagas')
  }
}

function* Register(action: any) {
  try {
    // yield put({type:actionTypes.setIsLoading, payload:true})

    const response: responseGenerator = yield Services.auth.Register(action.payload)
    if (response.statusCode === 200) {

      yield put(Action.auth.RegisterSuccess(response))
      yield handleToast('Đăng kí thành công', 'success')
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.RegisterFailure(response))
      yield handleToast(response.message,'error')

    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    // yield put({type:actionTypes.setIsLoading, payload:false})

    console.log('Register')
  }
}

function* ForgotPass(action: any) {
// console.log("🚀 ~ file: auth.tsx ~ line 55 ~ function*ForgotPass ~ action", action.payload)
  
  try {
    const response: responseGenerator = yield Services.auth.ForgotPass( action.payload)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.ForgotPassSuccess(response))
      yield handleToast(response.message, 'success')

    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.ForgotPassFailure(response))
      yield handleToast(response.message, 'error')

    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ForgotPass')
  }
}

function* ChangePass(action: any) {
  try {
    const response: responseGenerator = yield Services.auth.ChangePass(action.payload)
    if (response?.statusCode === 200 ) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.ChangePassSuccess(response))
      yield handleToast(response.message, 'success')

      // yield delay(2000)
      // yield put({ type: actionTypes.closeDialog })
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.ChangePassFailure(response))
      yield handleToast('Mật khẩu cũ không đúng', 'error')

    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ChangePass')
  }
}

function* FindOneUser(action: any) {
console.log("🚀 ~ file: auth.tsx ~ line 108 ~ function*FindOneUser ~ FindOneUser", FindOneUser)
  
  try {
    const response: responseGenerator = yield Services.auth.FindOneUser(action)
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {

      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.FindOneUserSuccess(response))
      // yield delay(2000)
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.FindOneUserFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ChangePass')
  }
}

function* FindManyUser(action: any){
  const readCookie =""
  try {
    const response: responseGenerator = yield Services.auth.FindManyUser(action.payload, readCookie)
    if (response.statusCode === 200 ) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.FindManyUserSuccess(response.data))
    }else{
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.FindManyUserFailure(response.message))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ChangePass')
  }
}

function* InsertOneUser(action: any) {
  try {
    const readCookie =""
    const response: responseGenerator = yield Services.auth.InsertOneUser(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.InsertOneUserSuccess(response))
      yield put(Action.auth.FindManyUser(readCookie))
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.InsertOneUserFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('InsertOneUser')
  }
}

function* UpdateOneUser(action: any) {
  try {
  
    const response: responseGenerator = yield Services.auth.UpdateOneUser(action)
   
    if (response?.statusCode === 200 || response?.statusCode === 304 )  {
      // console.log("🚀 ~ file: auth.tsx ~ line 171 ~ function*UpdateOneUser ~ response", response)
      // yield toast.success(response.message, toastConfig )
  
      yield put(Action.auth.UpdateOneUserSuccess(response))
      yield put(Action.auth.FindOneUser(action.payload.token.toString()))
      yield handleToast(response.message, 'success')
      
    } else {
      // yield toast.error(response.message, toastConfig )
     
      yield handleToast(response.message, )
    }
  } catch (error) {
    console.log('Error', error)
    yield handleToast("Vui lòng thử lại sau" )
   

  } finally {
    console.log('UpdateOneUser')
  }
}
// MOBILE -----------------------------------------------------
function* UpdateNotify(data: any) {
// console.log("🚀 ~ file: auth.tsx ~ line 199 ~ function*UpdateNotify ~ UpdateNotify", )
const type = data.payload.type
const token = data.payload.token
  try {
    
    const response: responseGenerator = yield Services.auth.updateNotify(data)
    if (response?.statusCode === 200 || response?.statusCode === 304) {
    // console.log("🚀 ~ file: auth.tsx ~ line 182 ~ function*UpdateOneUserMobile ~ response", response)
      
      yield put(Action.auth.UpdateNotifySuccess(response))
      if(type == 'pull' || type == 'seen'){
        yield put(Action.auth.GetNotify(token))
      }
      
      
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.UpdateNotifyFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('UpdateOneUser')
  }
}
function* GetNotify(data: any) {
console.log("🚀 ~ file: auth.tsx ~ line 199 ~ function*UpdateNotify ~ UpdateNotify",data )
  try {   
    const response: responseGenerator = yield Services.auth.getNotify(data)
    if (response?.statusCode === 200 || response?.statusCode === 304) {
    console.log("🚀 ~ file: auth.tsx ~ line 225 ~ function*GetNotify ~ response?.statusCode === 200", )
    
      yield put(Action.auth.GetNotifySuccess(response))
    
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.GetNotifyFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('UpdateOneUser')
  }
}
function* UpdateOneUserMobile(data: any) {
  console.log("🚀 ~ file: auth.tsx ~ line 177 ~ function*UpdateOneUserMobile ~ data", data)
  const token = data?.payload?.accessToken
  const type = data?.payload?.type
  try {
    
    const response: responseGenerator = yield Services.auth.UpdateOneUserMoblie(data)
    if (response?.statusCode === 200 || response?.statusCode === 304) {
    // console.log("🚀 ~ file: auth.tsx ~ line 182 ~ function*UpdateOneUserMobile ~ response", response)
      
      yield put(Action.auth.UpdateOneUserMobileSuccess(response))
      yield put(Action.auth.FindOneUser(token))
      if(type == 'subscribe-ebooks'){
        yield put(Action.book.findSubscribeBook(token))
      }
      if(type == 'subscribe-ebooks'){
        
      }
      
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.UpdateOneUserMobileFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('UpdateOneUser')
  }
}

function* RemoveOneUser(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie =""
    const response: responseGenerator = yield Services.auth.RemoveOneUser(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.RemoveOneUserSuccess(response))
      yield put(Action.auth.FindManyUser(''))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.RemoveOneUserFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyUser(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie =""
    const response: responseGenerator = yield Services.auth.RemoveManyUser(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.RemoveManyUserSuccess(response))
      yield put(Action.auth.FindManyUser(''))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.RemoveManyUserFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* FindManyRole(action: any){
  try {
    const readCookie =""
    const response: responseGenerator = yield Services.auth.FindManyRole(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.FindManyRoleSuccess(response.data))
    }else{
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.FindManyRoleFailure(response.message))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ChangePass')
  }
}

function* RemoveOneRole(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie =""
    const response: responseGenerator = yield Services.auth.RemoveOneRole(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.RemoveOneRoleSuccess(response))
      yield put(Action.auth.FindManyRole(''))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.RemoveOneRoleFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyRole(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie =""
    const response: responseGenerator = yield Services.auth.RemoveManyRole(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.RemoveManyRoleSuccess(response))
      yield put(Action.auth.FindManyRole(''))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.RemoveManyRoleFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* FindManyFeature(action: any){
  try {
    const readCookie =""
    const response: responseGenerator = yield Services.auth.FindManyFeature(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.FindManyFeatureSuccess(response.data))
    }else{
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.FindManyFeatureFailure(response.message))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ChangePass')
  }
}

function* FindManyFeatureGroup(action: any){
  try {
    const readCookie =""
    const response: responseGenerator = yield Services.auth.FindManyFeatureGroup(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.FindManyFeatureGroupSuccess(response.data))
    }else{
      // yield toast.error(response.message, toastConfig )
      yield put(Action.auth.FindManyFeatureGroupFailure(response.message))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ChangePass')
  }
}
function* Payment(action: any){
  try {
    const body = action.payload
  // console.log("🚀 ~ file: auth.tsx ~ line 210 ~ Payment ~ body", body)

  let tokenUser =  yield getPersistAuth()
  // console.log("🚀 ~ file: auth.tsx ~ line 213 ~ Payment ~ tokenUser", tokenUser)
    
    const response: responseGenerator = yield Services.auth.Payment(action.payload, tokenUser)
    if (response.statusCode === 200  || response.statusCode ===  304 ) {
      console.log("🚀 ~ file: auth.tsx ~ line 356 ~ function*Payment ~ response", response)
      // yield toast.success(response.message, toastConfig )
      yield put(Action.auth.PaymentSuccess(response.data))
    }else{
      // yield toast.error(response.message, toastConfig )
      
      yield put(Action.auth.PaymentFailure(response.data))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('ChangePass')
  }
}


export default function* authSaga() {
  yield all([
    takeLatest(actionTypes.login, Login),
    takeLatest(actionTypes.register, Register),
    takeLatest(actionTypes.forgotPass, ForgotPass),
    takeLatest(actionTypes.changePass, ChangePass),
    takeLatest(actionTypes.findOneUser, FindOneUser),


    takeLatest(actionTypes.findManyUser, FindManyUser),
    takeLatest(actionTypes.insertOneUser, InsertOneUser),
    takeLatest(actionTypes.updateOneUser, UpdateOneUser),
    takeLatest(actionTypes.removeOneUser, RemoveOneUser),
    takeLatest(actionTypes.removeManyUser, RemoveManyUser),

    takeLatest(actionTypes.findManyRole, FindManyRole),
    takeLatest(actionTypes.removeOneRole, RemoveOneRole),
    takeLatest(actionTypes.removeManyRole, RemoveManyRole),

    takeLatest(actionTypes.findManyFeature, FindManyFeature),
    takeLatest(actionTypes.findManyFeatureGroup, FindManyFeatureGroup),

    //Moblie
    takeLatest(actionTypes.updateOneUserMoblie, UpdateOneUserMobile),
    takeLatest(actionTypes.updateNotify, UpdateNotify),
    takeLatest(actionTypes.getNotify, GetNotify),
    takeLatest(actionTypes.payment, Payment),


  ])
}