import { put, all, takeLatest, delay } from "redux-saga/effects";
import { responseGenerator } from './index'
import actionTypes from "../Actions/constants";
import Services from "../../Services"
import Action from "../Actions"

function* FindGenre() {
  console.log("find Genre");
  try {
    const response: responseGenerator = yield Services.book.findGenre();
    if (response?.statusCode === 200) {
      yield put(Action.book.findGenreSuccess(response.data))
    } else {
      yield put(Action.book.findGenreFailure(response.data))
    }
  } catch (error) {
    console.log(error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

function* FindManyAuthorMobile() {
  console.log("find Author");
  try {
    const response: responseGenerator = yield Services.book.findManyAuthorMobile();
    console.log('response', response)
    if (response?.statusCode === 200) {
      yield put(Action.book.findManyAuthorMobileSuccess(response?.data))
    } else {
      yield put(Action.book.findManyAuthorMobileFailure(response?.data))
    }
  } catch (error) {
    console.log(error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

function* FindManga(action: any) {
  try {
    const data = action.payload
    const response: responseGenerator = yield Services.book.findManga(data);
    console.log('response', response)
    if (response.statusCode === 200) {
      yield put(Action.book.findMangaSuccess(response))
    } else {
      yield put(Action.book.findMangaFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

function* FindMangaById(action: any) {
  const id = action.payload
  try {
    const response: responseGenerator = yield Services.book.findMangaById(id);
    console.log('response', response)
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      yield put(Action.book.findMangaByIdSuccess(response))
    } else {
      yield put(Action.book.findMangaByIdFailure(response))
    }
  } catch (error) {
    console.log('Error DetailSagas', error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

function* FindChapterByMangaId(action: any) {
  const data = action.payload
  try {
    const response: responseGenerator = yield Services.book.findChapterByMangaId(data);
    // console.log('response', response)
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      yield put(Action.book.findChapterByMangaIdSuccess(response))
    } else {
      yield put(Action.book.findChapterByMangaIdFailure(response))
    }
  } catch (error) {
    console.log('Error Detail-ChapterSagas', error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

function* FindChapterById(action: any) {
  const id = action.payload
  try {
    const response: responseGenerator = yield Services.book.findChapterById(id);
    console.log('response', response)
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      yield put(Action.book.findChapterByIdSuccess(response))
    } else {
      yield put(Action.book.findChapterByIdFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

//  MOBILE ----------------------------------------------------------------------------------------------

function* SearchBook(action: any) {
  try {
    const response: responseGenerator = yield Services.book.searchBook(action.payload);
    // yield put({type:actionTypes.setIsLoading, payload:true})

    if (response?.statusCode === 200 || response?.statusCode === 201) {
      // console.log("🚀 ~ file: book.tsx ~ line 113 ~ function*SearchBook ~ statusCode", "200")

      // yield put({type:actionTypes.setIsLoading, payload:false})

      yield put(Action.book.searchBookSuccess(response))
    } else {
      yield put(Action.book.searchBookFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }

}

function* FindHistoryReaded(action: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 137 ~ function*FindSubscribeBook ~ action", action.payload)

  try {
    const response: responseGenerator = yield Services.book.findHistoryReaded(action.payload);

    if (response?.statusCode === 200 || response?.statusCode === 304) {
      yield put(Action.book.findHistoryReadedSuccess(response))
    } else {
      yield put(Action.book.findHistoryReadedFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

function* FindSubscribeBook(action: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 137 ~ function*FindSubscribeBook ~ action", action.payload)

  try {
    const response: responseGenerator = yield Services.book.findSubscribeBook(action.payload);

    if (response?.statusCode === 200 || response?.statusCode === 304) {
      yield put(Action.book.findSubscribeBookSuccess(response))
    } else {
      yield put(Action.book.findSubscribeBookFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}
function* FindBookDownload(action: any) {
  console.log("🚀 ~ file: book.tsx ~ line 137 ~ function*FindBookDownload ~ action", action.payload)

  try {
    const response: responseGenerator = yield Services.book.findBookDownload(action.payload);

    if (response?.statusCode === 200 || response?.statusCode === 304) {
      yield put(Action.book.findBookDownloadSuccess(response))
    } else {
      yield put(Action.book.findBookDownloadFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {
    // yield ({ type: actionTypes.closeLoading })
  }
}

function* FindCompletedBook(action: any) {
  try {
    const response: responseGenerator = yield Services.book.findCompletedBook();


    if (response?.statusCode === 200 || response?.statusCode === 201) {
      yield put(Action.book.findCompletedBookSuccess(response))
    } else {
      yield put(Action.book.findCompletedBookFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}


function* FindNewBook(action: any) {
  try {
    const response: responseGenerator = yield Services.book.findNewBook();


    if (response?.statusCode === 200 || response?.statusCode === 201) {
      yield put(Action.book.findNewBookSuccess(response))
    } else {
      yield put(Action.book.findNewBookFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* FindHotBook() {
  // console.log("🚀 ~ file: book.tsx ~ line 202 ~ function*FindHotBook ~ FindHotBook middle", )
  try {
    const response: responseGenerator = yield Services.book.findHotBook();
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      yield put(Action.book.findHotBookSuccess(response))
    } else {
      yield put(Action.book.findHotBookFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}
function* FindBookGenre() {
  console.log("🚀 ~ file: book.tsx ~ line 217 ~ function*FindBookGenre ~ FindBookGenre",)
  // console.log("🚀 ~ file: book.tsx ~ line 202 ~ function*FindHotBook ~ FindHotBook middle", )
  try {
    const response: responseGenerator = yield Services.book.findBookGenre();
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      yield put(Action.book.findBookGenreSuccess(response))
    } else {
      yield put(Action.book.findBookGenreFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* SearchReview(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.searchReview(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.searchReviewSuccess(response))
    } else {
      yield put(Action.book.searchReviewFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}
function* SearchCommentChapter(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.searchCommentChapter(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.searchCommentChapterSuccess(response))
    } else {
      yield put(Action.book.searchCommentChapterFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}
function* SearchChapter(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.searchChapter(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.searchChapterSuccess(response))
    } else {
      yield put(Action.book.searchChapterFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}
function* FindOneChapter(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 298 ~ function*FindOneChapter ~ FindOneChapter", data)
  
  try {
    const response: responseGenerator = yield Services.book.findOneChapter(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.findOneChapterSuccess(response))
      yield put(Action.book.addViewChapter(data))
    } else {
      yield put(Action.book.findOneChapterFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* AddViewChapter(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*findReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.addViewChapter(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.addViewChapterSuccess(response))
    
    } else {
      yield put(Action.book.addViewChapterFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}


function* AddReview(data: any) {
  console.log("🚀 ~ file: book.tsx ~ line 334 ~ function*AddReview ~ AddReview", data)
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*findReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.addReview(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.addReviewSuccess(response))
      yield put(Action.book.searchReview(response.data.ebooks))
    } else {
      yield put(Action.book.addReviewFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* AddComment(data: any) {

let id =  data.payload.ebookId
let token = data.payload.token
let content = 'Đã trả lời bình luận của bạn!'
  try {
    const response: responseGenerator = yield Services.book.addComment(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.addCommentSuccess(response))
      // console.log("🚀 ~ file: book.tsx ~ line 321 ~ function*AddComment ~ data", data)
      yield put(Action.book.searchReview(id))
      yield put(Action.auth.UpdateNotify({id:data.payload.userIdComment, type:'push', token:token, content:content}))

    } else {
      yield put(Action.book.addCommentFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}
function* AddCommentChapter(data: any) {
// console.log("🚀 ~ file: book.tsx ~ line 335 ~ function*AddCommentChapter ~ data", data)

// let id =  data.payload.chapterId
  try {
    const response: responseGenerator = yield Services.book.addComment(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.addCommentChapterSuccess(response))
      // console.log("🚀 ~ file: book.tsx ~ line 321 ~ function*AddComment ~ data", id)
      // yield put(Action.book.searchReview(id))

    } else {
      yield put(Action.book.addCommentChapterFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* LikeComment(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    const ebookId =  data.payload.ebookId
    const chapId =  data?.payload?.chapId
    const token = data.payload.token
    const content = 'Đã thích bình luận của bạn'
    const userId = data.payload.userId
    const liked = data.payload.liked
    const idCommentOrReview = data.payload.commentId
    // console.log("🚀 ~ file: book.tsx ~ line 395 ~ function*LikeComment ~ chapId", chapId)
    const response: responseGenerator = yield Services.book.likeComment(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.likeCommentSuccess(response))
      if(!liked){
      yield put(Action.auth.UpdateNotify({id:userId, type:'push', token:token, content:content, idCommentOrReview:idCommentOrReview }))
      }

      if(ebookId){
        yield put(Action.book.searchReview(ebookId))
      }else{
       yield put(Action.book.searchCommentChapter(chapId)) 
      }

    } else {
      yield put(Action.book.likeCommentFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}
function* LikeChapter(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 415 ~ function*LikeChapter ~ data", data)
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    // console.log("🚀 ~ file: book.tsx ~ line 395 ~ function*LikeComment ~ chapId", chapId)
    const ebookId = data.payload.ebookId
    const response: responseGenerator = yield Services.book.likeChapter(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.likeChapterSuccess(response))
      yield put(Action.book.findOneChapter(data.payload.chapId))
     

    } else {
      yield put(Action.book.likeChapterFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* LikeReview(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 351 ~ function*LikeReview ~ LikeReview", data.payload)
  try {
    const ebookId =  data.payload.ebookId
    const userId = data.payload.userId
    const token = data.payload.token
    const content = "Đã thích review của bạn"
    const idCommentOrReview  =data.payload.reviewId
    const response: responseGenerator = yield Services.book.likeReview(data);
    const liked = data.payload.liked
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.likeReviewSuccess(response))
      yield put(Action.book.searchReview(ebookId))
      if(!liked){
        yield put(Action.auth.UpdateNotify({id:userId, type:'push', token:token, content:content, idCommentOrReview:idCommentOrReview }))

      }

    } else {
      yield put(Action.book.likeReviewFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}
function* AddBookReaded(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.addBookReaded(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.addBookReadedSuccess(response))
    } else {
      yield put(Action.book.addBookReadedFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* AddBookDownload(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.addBookDownload(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.addBookDownloadSuccess(response))
    } else {
      yield put(Action.book.addBookDownloadFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}


function* DeleteBookReaded(data: any) {
  // console.log("🚀 ~ file: book.tsx ~ line 233 ~ function*SearchReview ~ SearchReview",)
  try {
    const response: responseGenerator = yield Services.book.deleteBookReaded(data);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.deleteBookReadedSuccess(response))
    } else {
      yield put(Action.book.deleteBookReadedFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}

function* FilterEbookChannel(data: any) {
  console.log("🚀 ~ file: book.tsx ~ line 526 ~ function*FilterEbookChannel ~ FilterEbookChannel", )
  // console.log("🚀 ~ file: book.tsx ~ line 424 ~ function*FilterBook ~ FilterBook", data)
  try {
    
    const response: responseGenerator = yield Services.book.filterEbookChannel(data.payload);
    if (response?.statusCode === 200 || response?.statusCode === 201 || response?.statusCode === 304) {
      yield put(Action.book.filterEbookChannelSuccess(response.data))
    } else {
      yield put(Action.book.filterEbookChannelFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {

  }
}





export default function* bookSaga() {
  yield all([
    takeLatest(actionTypes.findManga, FindManga),
    takeLatest(actionTypes.findMangaById, FindMangaById),
    takeLatest(actionTypes.searchBook, SearchBook),

    takeLatest(actionTypes.findGenre, FindGenre),
    takeLatest(actionTypes.findManyAuthorMobile, FindManyAuthorMobile),

    takeLatest(actionTypes.findChapterByMangaId, FindChapterByMangaId),
    takeLatest(actionTypes.findChapterById, FindChapterById),

    // MOBILE -----------------
    takeLatest(actionTypes.findHistoryReaded, FindHistoryReaded),
    takeLatest(actionTypes.findSubscribeBook, FindSubscribeBook),
    takeLatest(actionTypes.findCompletedBook, FindCompletedBook),
    takeLatest(actionTypes.findNewBook, FindNewBook),
    takeLatest(actionTypes.findHotBook, FindHotBook),
    takeLatest(actionTypes.findBookGenre, FindBookGenre),
    takeLatest(actionTypes.searchReview, SearchReview),
    takeLatest(actionTypes.searchCommentChapter, SearchCommentChapter),
    takeLatest(actionTypes.searchChapter, SearchChapter),
    takeLatest(actionTypes.findOneChapter, FindOneChapter),
    takeLatest(actionTypes.findBookDownload, FindBookDownload),
    takeLatest(actionTypes.addReview, AddReview),
    takeLatest(actionTypes.addComment, AddComment),
    takeLatest(actionTypes.addCommentChapter, AddCommentChapter),
    takeLatest(actionTypes.likeComment, LikeComment),
    takeLatest(actionTypes.likeReview, LikeReview),
    takeLatest(actionTypes.addBookReaded, AddBookReaded),

    takeLatest(actionTypes.addBookDownload, AddBookDownload),
    takeLatest(actionTypes.deleteBookReaded, DeleteBookReaded),
  
    takeLatest(actionTypes.filterEbookChannel, FilterEbookChannel),
    takeLatest(actionTypes.addViewChapter, AddViewChapter),
    takeLatest(actionTypes.likeChapter, LikeChapter),

  ])
}