import actionTypes from '../Actions/constants';


const stateDefault = {
  userIsLogin:{},
  accessToken: '',
  register: {},
  // isUpdateUser:true,
  forgot: {},
  change: {},
  arrayRole: [],
  arrayUser: [],
  arrayFeatures: [],
  arrayFeatureGroups: [],
  linkPayment:'',
  listNotify:[]
}


export const AuthReducer = (state = stateDefault, action:any) => {
  switch (action.type) {
        
    case actionTypes.paymentSuccess: {
    // console.log("🚀 ~ file: auth.tsx ~ line 22 ~ AuthReducer ~ paymentSuccess", )
 
      return {...state,  linkPayment:action.payload  }
    }  
    case actionTypes.findOneUserSuccess: {
      // console.log("🚀 ~ file: auth.tsx ~ line 23 ~ AuthReducer ~ action.payload", action.payload)
      return {...state,  userIsLogin:action.payload  }
    }  
    case actionTypes.updateOneUserMobileSuccess: {
      // console.log("🚀 ~ file: auth.tsx ~ line 23 ~ AuthReducer ~ action.payload", action.payload)
      return {...state,  userIsLogin:action.payload  }
    }  
    case actionTypes.updateOneUserSuccess: {
      // console.log("🚀 ~ file: auth.tsx ~ line 23 ~ AuthReducer ~ action.payload", action.payload)
      return {...state,  updateF:action.payload  }
    }  
    case actionTypes.getNotifySuccess: {
    //  console.log("🚀 ~ file: auth.tsx ~ line 41 ~ AuthReducer ~ getNotifySuccess", action.payload)
     
      return {...state,  listNotify:action.payload  }
    }  
    
    // case actionTypes.setIsUpdateUser: {
    //   // console.log("🚀 ~ file: auth.tsx ~ line 23 ~ AuthReducer ~ action.payload", action.payload)
    //   return {...state,  isUpdateUser:action.payload  }
    // }  
    
    case actionTypes.loginSuccess: {
    // console.log("🚀 ~ file: auth.tsx ~ line 30 ~ AuthReducer ~ loginSuccess", action.payload)
            
      return {...state, accessToken: action.payload }
    }        
    case actionTypes.loginFailure: {
    // console.log("🚀 ~ file: auth.tsx ~ line 30 ~ AuthReducer ~ loginSuccess", action.payload)
            
      return {...state, userIsLogin: action.payload }
    }        
    case actionTypes.clearUserIsLogin: {
            // console.log('clear user is login');
      return {...state, userIsLogin: {}}
    } 
    case actionTypes.clearToken: {
            // console.log("clear token")
      return {...state, accessToken: ''}
    }         
    case actionTypes.registerSuccess: {
      return {...state, register: action.payload}
    } 
     
    case actionTypes.forgotPassSuccess: {
      return {...state, forgot: action.payload }
    } 
     
    case actionTypes.changePassSuccess: {
      return {...state, change: action.payload }
    }
    
    case actionTypes.findManyRoleSuccess: {
      return {...state, arrayRole: [...action.payload] }
    }        
    case actionTypes.findManyUserSuccess: {
      return {...state, arrayUser: [...action.payload] }
    }  
    case actionTypes.findManyFeatureSuccess: {
      return {...state, arrayFeature: [...action.payload]}
    }
    case actionTypes.findManyFeatureGroupSuccess: {
      console.log('action.payload', action.payload)
      return {...state, arrayFeatureGroups: [...action.payload]}
    }  

    default: return {...state} 
  }
}