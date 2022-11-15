import  apiString ,{domain}from "../configs/api";
import { requestAPI } from '../functions/globalFunc';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
//===================================|| Genre ||===============================//

const findGenre = async () => {
  const request = {
    method: 'GET',
    api: `${domain}${apiString.findManyGenre}`,
  };
  const response = await requestAPI(request);
  return response;
};

const createGenre = async (data: any) => {
  
}

const updateGenre = async (data: any) => {
  
}

const removeGenre = async (data: any) => {
  
}

const deleteGenre = async (data: any) => {
  
}


//===================================|| Author ||===============================//

const findManyAuthorMobile = async () => {

  // console.log("🚀 ~ file: book.tsx ~ line 45 ~ findAuthor ~ findAuthor")

  const request = {
    method: 'GET',
    api:`${domain}${apiString.findManyAuthorMobile}`,
  };
  const response = await requestAPI(request);
  // console.log("🚀 ~ file: book.tsx ~ line 44 ~ findManyAuthorMobile ~ response", response)
  return response;
};

const createAuthor = async (data: any) => {

}

const updateAuthor = async (data: any) => {

}

const removeAuthor = async (data: any) => {

}

const deleteAuthor = async (data: any) => {

}


//===================================|| Books ||================================//

const findManga = async (data: any) => {
  console.log('sevice')
  const request = {
    method: 'POST',
    // api: `${API_MANGA}/filterManga?page=${data.page}&sort=${data.sort}`,
    body: data
  }
  const response = await requestAPI(request)
  return response
}

export const findMangaById = async (id: string)  => {
  const request = {
    method: 'GET',
    // api: `${API_MANGA}/getMangaById/${id}`,
  }
  const response = await requestAPI(request)
  return response
}

export const findHistoryReaded = async(userToken:any)=>{
// console.log("🚀 ~ file: book.tsx ~ line 86 ~ findHistoryReaded ~ userToken", userToken)
  

  //  const userToken = await AsyncStorage.getItem('userToken')
  //  console.log("🚀 ~ file: book.tsx ~ line 86 ~ findHistoryReaded ~ token", userToken)
  
    const request = {
        method: 'GET',
        api:`${domain}${apiString.findHistoryReaded}?type=readed`,
        token:userToken
      }
      const response = await requestAPI(request)
      // console.log("🚀 ~ file: book.tsx ~ line 98 ~ findHistoryReaded ~ response", response)
      return response
}
export const findSubscribeBook = async(userToken:any)=>{
  

  // console.log("🚀 ~ file: book.tsx ~ line 86 ~ findHistoryReaded ~ token", userToken)
    const request = {
        method: 'GET',
        api:`${domain}${apiString.findSubscribeBook}?type=subscribe`,
        token:userToken
      }
      const response = await requestAPI(request)
      return response
}
export const findBookDownload = async(userToken:any)=>{
  // console.log("🚀 ~ file: book.tsx ~ line 86 ~ findBookDownload ~ token", userToken)
    const request = {
        method: 'GET',
        api:`${domain}${apiString.findBookDownload}?type=download`,
        token:userToken
      }
      const response = await requestAPI(request)
      return response
}

export const findCompletedBook = async()=>{
    const request = {
        method: 'POST',
        api:`${domain}${apiString.searchEbook}?page=1`,
       
        body:{   
          "status":["Đã hoàn tất"],        
        }
      }
      const response = await requestAPI(request)
      return response
}

export const findNewBook = async()=>{
// console.log("🚀 ~ file: book.tsx ~ line 138 ~ findNewBook ~ findNewBook", findNewBook)
  
    const request = {
        method: 'POST',
        api:`${domain}${apiString.searchEbook}?page=1`,
       
        body:{
          "newDay": true,  
        }
      }
      const response = await requestAPI(request)
      // console.log("🚀 ~ file: book.tsx ~ line 137 ~ findNewBook ~ response", response)
      return response
}
export const findHotBook = async()=>{
  // console.log("🚀 ~ file: book.tsx ~ line 152 ~ findHotBook ~ findHotBook", ) 
      const request = {
        method: 'POST',
        api:`${domain}${apiString.searchEbook}?sort=hot&page=1`,
        }
        const response = await requestAPI(request)
        // console.log("🚀 ~ file: book.tsx ~ line 137 ~ findNewBook ~ response", response)
        return response
  }

export const findBookGenre = async()=>{
  // console.log("🚀 ~ file: book.tsx ~ line 152 ~ findBookCategory ~ findBookCategory", )
      const request = {
        method: 'GET',
        api:`${domain}${apiString.findManyGenre}`,
        }
        const response = await requestAPI(request)
        // console.log("🚀 ~ file: book.tsx ~ line 162 ~ findBookGenre ~ response", response) 
        return response
  }

export const searchReview = async(data:any)=>{  
// console.log("🚀 ~ file: book.tsx ~ line 177 ~ searchReview ~ data", data.payload)
  // console.log("🚀 ~ file: book.tsx ~ line 179 ~ searchReview ~ searchReview")
      const request = {
        method: 'GET',
        api:`${domain}${apiString.searchReview}?ebookId=${data.payload}`,
        }
        const response = await requestAPI(request)
        // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
        return response
  }
export const searchCommentChapter = async(data:any)=>{  
// console.log("🚀 ~ file: book.tsx ~ line 177 ~ searchCommentChapter ~ data", data.payload)
  // console.log("🚀 ~ file: book.tsx ~ line 179 ~ searchReview ~ searchReview")
      const request = {
        method: 'GET',
        api:`${domain}${apiString.searchCommentChapter}?chapterId=${data.payload}`,
        }
        const response = await requestAPI(request)
        // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
        return response
  }

export const searchBook = async(data:any)=>{
// console.log("🚀 ~ file: book.tsx ~ line 143 ~ searchBook ~ data", data)
let request = {};
    if(data.type === "search"){
      request = { 
        method: 'POST',
        api:`${domain}${apiString.searchEbook}?sort=${data.sort}&page=1`,
      }
    }else{
      request = { 
        method: 'POST',
        api:`${domain}${apiString.searchEbook}?page=1`,
        body:{}

        
      }
    }
      
        const response = await requestAPI(request)
        // console.log("🚀 ~ file: book.tsx ~ line 161 ~ searchBook ~ response", response)
     
        return response
  }
  





const createBook = async (data: any) => {

}

const updateBook = async (data: any) => {
  
}

const removeBook = async (data: any) => {
  
}

const deleteBook = async (data: any) => {
  
}


//==================================|| Chapters ||===============================//

export const findChapterById = async (id: string)  => {
  const request = {
    method: 'GET',
    // api: `${API_CHAPTER}/getChapterById/${id}`,
  }
  const response = await requestAPI(request)
  return response
}
const findChapterByMangaId = async (data: any) => {
  console.log('sevice')
  const request = {
    method: 'POST',
    // api: `${API_CHAPTER}/getChapterByMangaId/${data.id}?page=${data.page}&sort=${data.sort}`,
    body: data
  }
  const response = await requestAPI(request)
  return response
}


// MObile
const searchChapter = async (data: any) => {
console.log("🚀 ~ file: book.tsx ~ line 243 ~ searchChapter ~ searchChapter",data )

  const request = {
    method: 'GET',
    api: `${domain}${apiString.searchChapter}?ebookId=${data.payload.ebookId}&orderby=${data.payload.orderby}&page=1`,
  
  }
  const response = await requestAPI(request)
  // console.log("🚀 ~ file: book.tsx ~ line 254 ~ searchChapter ~ response", response)
  return response
}

const findOneChapter = async (data: any) => {

// console.log("🚀 ~ file: book.tsx ~ line 243 ~ searchChapter ~ searchOneChapter",data )

  const request = {
    method: 'GET',
    api: `${domain}${apiString.findOneChapter}?chapId=${data.payload}`
  
  }
  const response = await requestAPI(request)
  // console.log("🚀 ~ file: book.tsx ~ line 265 ~ searchOneChapter ~ response", response)
  return response
}

export const addReview = async(data:any)=>{  
// console.log("🚀 ~ file: book.tsx ~ line 315 ~ addReview ~ addReview",data)

  // console.log("🚀 ~ file: book.tsx ~ line 164 ~ addReview ~ data", data.payload.token)
  const token = data.payload.token
  // console.log("🚀 ~ file: book.tsx ~ line 287 ~ addReview ~ token", token)

  var review = data.payload
  delete review.token
  // console.log("🚀 ~ file: book.tsx ~ line 290 ~ addReview ~ token", data.payload.token)
  
    // console.log("🚀 ~ file: book.tsx ~ line 179 ~ searchReview ~ searchReview")
        const request = {
          method: 'POST',
          api:`${domain}${apiString.addReview}`,
          body:review,
          token:token
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
    }

export const addComment = async(data:any)=>{  
  // console.log("🚀 ~ file: book.tsx ~ line 306 ~ addComment ~ data", data)
  const token = data.payload.token
  var comment = data.payload
  delete comment.token
  delete comment.ebookId
        const request = {
          method: 'POST',
          api:`${domain}${apiString.insertOneComment}`,
          body:comment,
          token:token
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
    }

export const likeReview = async(data:any)=>{  
// console.log("🚀 ~ file: book.tsx ~ line 334 ~ likeReview ~ likeReview", data)

 
        const request = {
          method: 'PUT',
          api:`${domain}${apiString.likeReview}?reviewId=${data.payload.reviewId}`,
          token:data.payload.token
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
}

export const likeComment = async(data:any)=>{  

  // console.log("🚀 ~ file: book.tsx ~ line 348 ~ likeComment ~ likeComment", data) 
        const request = {
          method: 'PUT',
          api:`${domain}${apiString.likeComment}?commentId=${data.payload.commentId}`,
          token:data.payload.token
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
}
  export const likeChapter = async(data:any)=>{  
  // console.log("🚀 ~ file: book.tsx ~ line 371 ~ likeChapter ~ likeChapter",data)

  // console.log("🚀 ~ file: book.tsx ~ line 348 ~ likeComment ~ likeComment", data) 
        const request = {
          method: 'PUT',
          api:`${domain}${apiString.likeChapter}?chapId=${data.payload.chapId}`,
          token:data.payload.token
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
}
export const addBookReaded = async(data:any)=>{  
  // console.log("🚀 ~ file: book.tsx ~ line 164 ~ searchReview ~ data", data)
    // console.log("🚀 ~ file: book.tsx ~ line 179 ~ searchReview ~ searchReview")
        const request = {
          method: 'PUT',
          api:`${domain}${apiString.addBookReaded}?ebookId=${data.payload}`,
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
    }

export const addBookDownload = async(data:any)=>{  
  // console.log("🚀 ~ file: book.tsx ~ line 164 ~ searchReview ~ data", data)
    // console.log("🚀 ~ file: book.tsx ~ line 179 ~ searchReview ~ searchReview")
        const request = {
          method: 'PUT',
          api:`${domain}${apiString.addBookDownload}?ebookId=${data.payload}`,
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
    }
export const deleteBookReaded = async(data:any)=>{  
  // console.log("🚀 ~ file: book.tsx ~ line 164 ~ searchReview ~ data", data)
    // console.log("🚀 ~ file: book.tsx ~ line 179 ~ searchReview ~ searchReview")
        const request = {
          method: 'PUT',
          api:`${domain}${apiString.deleteBookReaded}?ebookId=${data.payload}`,
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
    }
export const addViewChapter = async(data:any)=>{  
  // console.log("data ", data);
  // console.log("🚀 ~ file: book.tsx ~ line 164 ~ searchReview ~ data", data)
    // console.log("🚀 ~ file: book.tsx ~ line 179 ~ searchReview ~ searchReview")
    const chapId = data.payload.payload
        const request = {
          method: 'PUT',
          api:`${domain}${apiString.addViewChapter}?chapId=${chapId}`,
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 173 ~ searchReview ~ response", response)  
          return response
    }


    export const filterEbookChannel = async(data:any)=>{  
    console.log("🚀 ~ file: book.tsx ~ line 435 ~ filterEbookChannel ~ filterEbookChannel",data)

      // console.log("🚀 ~ file: book.tsx ~ line 374 ~ filterBook ~ data", data)
        const request = {
          method: 'POST',
          api:`${domain}${apiString.filterEbookChannel}?page=1`,
          body:data
          }
          const response = await requestAPI(request)
          // console.log("🚀 ~ file: book.tsx ~ line 382 ~ filterBook ~ response", response)
          
          return response
    }








export default {
  findManga, findMangaById, createBook, updateBook, removeBook, deleteBook, 
  findGenre, createGenre, updateGenre, removeGenre, deleteGenre,
  findManyAuthorMobile, createAuthor, updateAuthor, removeAuthor, deleteAuthor,
  findChapterByMangaId, findChapterById,searchCommentChapter,
  // MOBILE------------------------------------
  findHistoryReaded,findSubscribeBook,
  findCompletedBook,findNewBook,searchBook,findHotBook,findBookGenre,searchReview,searchChapter,
  findOneChapter,findBookDownload, addReview, addComment, likeReview, likeComment, addBookReaded, addBookDownload,
   deleteBookReaded, filterEbookChannel,addViewChapter,likeChapter
}