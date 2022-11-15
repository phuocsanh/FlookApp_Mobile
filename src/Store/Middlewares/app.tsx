import { put, all, takeLatest } from "redux-saga/effects";
import { responseGenerator } from './index'
// import { toastConfig } from '../../Functions/toast'
import actionTypes from "../Actions/constants";
import Services from "../../Services"
import Action from "../Actions"
// import { toast } from "react-toastify";
// import Cookie from "../../hooks/Cookie";

// GENRE
function* InsertOneGenre(action: any) {
  try {
    // const readCookie = ''
    const readCookie = ''
    const response: responseGenerator = yield Services.app.insertOneGenre(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.insertOneGenreSuccess(response))
      yield put(Action.app.findManyGenre())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.insertOneGenreFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('InsertOneGenre')
  }
}

function* UpdateOneGenre(action: any) {
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.updateOneGenre(action.payload.id, action.payload.data, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.updateOneGenreSuccess(response))
      yield put(Action.app.findManyGenre())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.updateOneGenreFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('UpdateOneGenre')
  }
}

function* FindManyGenre(){
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.findManyGenre(readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findManyGenreSuccess(response.data))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findManyGenreFailure(response.message))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveOneGenre(action: any){
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeOneGenre(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeOneGenreSuccess(response))
      yield put(Action.app.findManyGenre())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeOneGenreFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyGenre(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeManyGenre(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeManyGenreSuccess(response))
      yield put(Action.app.findManyGenre())
    }else {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeManyGenreFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

// AUTHOR
function* InsertOneAuthor(action: any) {
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.insertOneAuthor(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.insertOneAuthorSuccess(response))
      yield put(Action.app.findManyAuthor())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.insertOneAuthorFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('InsertOneAuthor')
  }
}

function* UpdateOneAuthor(action: any) {
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.updateOneAuthor(action.payload.id, action.payload.data, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.updateOneAuthorSuccess(response))
      yield put(Action.app.findManyAuthor())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.updateOneAuthorFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('UpdateOneAuthor')
  }
}

function* FindManyAuthor(){
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.findManyAuthor(readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findManyAuthorSuccess(response.data))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findManyAuthorFailure(response.message))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveOneAuthor(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeOneAuthor(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeOneAuthorSuccess(response))
      yield put(Action.app.findManyAuthor())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeOneAuthorFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyAuthor(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeManyAuthor(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeManyAuthorSuccess(response))
      yield put(Action.app.findManyAuthor())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeManyAuthorFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

// EBOOK
function* InsertOneEbook(action: any) {
  const readCookie = ''
  try {
    const response: responseGenerator = yield Services.app.insertOneEbook(action.payload, readCookie)
    console.log('saga',response)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.insertOneEbookSuccess(response))
      yield put(Action.app.findManyEbook())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.insertOneEbookFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('InsertOneEbook')
  }
}

function* SearchEbook(action: any){
  const readCookie = ''
  try {
    const data = action.payload
    console.log(data)
    const response: responseGenerator = yield Services.app.searchEbook(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.searchEbookSuccess(response))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.searchEbookFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* FindOneEbook(action: any){
  const id = action.payload
  const readCookie = ''
  try {
    const response: responseGenerator = yield Services.app.findOneEbook(id, readCookie);
    console.log('response', response)
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findOneEbookSuccess(response.data))
    }else{
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findOneEbookFailure(response))
    }
  } catch (error) {
    console.log('Error DetailSagas', error)
  } finally {
    console.log('DetailSagas')
  }
}

function* FindManyEbook(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.findManyEbook(readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findManyEbookSuccess(response))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findManyEbookFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveOneEbook(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeOneEbook(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeOneEbookSuccess(response))
      yield put(Action.app.findManyEbook())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeOneEbookFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyEbook(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeManyEbook(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeManyEbookSuccess(response))
      yield put(Action.app.findManyEbook())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeManyEbookFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

// CHAPTERS
function* FindManyChapter(){
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.findManyChapter(readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findManyChapterSuccess(response.data))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findManyChapterFailure(response.message))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* SearchChapter(action: any){
  const data = action.payload
  const readCookie = ''

  try {
    const response: responseGenerator = yield Services.app.searchChapter(action.payload, readCookie);
    console.log('response', response)
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.searchChapterSuccess(response))
    }else{
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.searchChapterFailure(response))
    }
  } catch (error) {
    console.log('Error Detail-ChapterSagas', error)
  } finally {
    console.log('Detail-ChapterSagas')
  }
}

function* FindOneChapter(action: any){
  const id = action.payload
  const readCookie = ''
  try {
    const response: responseGenerator = yield Services.app.findOneChapter(id, readCookie);
    console.log('response', response)
    if (response?.statusCode === 200 || response?.statusCode === 201) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findOneChapterSuccess(response))
    }else{
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findOneChapterFailure(response))
    }
  } catch (error) {
    console.log('Error ChapterSagas', error)
  } finally {
    console.log('ChapterSagas')
  }
}

function* RemoveOneChapter(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeOneChapter(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeOneChapterSuccess(response))
      yield put(Action.app.findManyChapter())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeOneChapterFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyChapter(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeManyChapter(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeManyChapterSuccess(response))
      yield put(Action.app.findManyChapter())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeManyChapterFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

// REVIEW
function* FindManyReview(){
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.findManyReview(readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findManyReviewSuccess(response.data))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findManyReviewFailure(response.message))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* InsertOneReview(action: any) {
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.insertOneReview(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.insertOneReviewSuccess(response))
      yield put(Action.app.findManyReview())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.insertOneReviewFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('InsertOneReview')
  }
}

function* UpdateOneReview(action: any) {
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.updateOneReview(action.payload.id, action.payload.data, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.updateOneReviewSuccess(response))
      yield put(Action.app.findManyReview())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.updateOneReviewFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('UpdateOneReview')
  }
}

function* RemoveOneReview(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeOneReview(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeOneReviewSuccess(response))
      yield put(Action.app.findManyReview())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeOneReviewFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyReview(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeManyReview(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeManyReviewSuccess(response))
      yield put(Action.app.findManyReview())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeManyReviewFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

// COMMENT
function* FindManyComment(){
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.findManyComment(readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.findManyCommentSuccess(response.data))
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.findManyCommentFailure(response.message))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* InsertOneComment(action: any) {
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.insertOneComment(action.payload, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.insertOneCommentSuccess(response))
      yield put(Action.app.findManyComment())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.insertOneCommentFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('InsertOneComment')
  }
}

function* UpdateOneComment(action: any) {
  try {
    const readCookie = ''
    const response: responseGenerator = yield Services.app.updateOneComment(action.payload.id, action.payload.data, readCookie)
    if (response.statusCode === 200) {
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.updateOneCommentSuccess(response))
      yield put(Action.app.findManyComment())
    } else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.updateOneCommentFailure(response))
    }
  } catch (error) {
    console.log('Error', error)
  } finally {
    console.log('UpdateOneComment')
  }
}

function* RemoveOneComment(action: any){
  try {
    // const data = action.payload
    // console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeOneComment(action.payload, readCookie);
    console.log('response', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeOneCommentSuccess(response))
      yield put(Action.app.findManyComment())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeOneCommentFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

function* RemoveManyComment(action: any){
  try {
    const data = action.payload
    console.log(data)
    const readCookie = ''
    const response: responseGenerator = yield Services.app.removeManyComment(action.payload, readCookie);
    console.log('response comic', response)
    if(response.statusCode === 200){
      // yield toast.success(response.message, toastConfig )
      yield put(Action.app.removeManyCommentSuccess(response))
      yield put(Action.app.findManyComment())
    }else {
      // yield toast.error(response.message, toastConfig )
      yield put(Action.app.removeManyCommentFailure(response))
    }
  } catch (error) {
    console.log(error)
  } finally {
    console.log('saga')
  }
}

export default function* appSaga() {
  yield all([
    takeLatest(actionTypes.insertOneEbook, InsertOneEbook),
    takeLatest(actionTypes.searchEbook, SearchEbook),
    takeLatest(actionTypes.findOneEbook, FindOneEbook),
    takeLatest(actionTypes.findManyEbook, FindManyEbook),
    takeLatest(actionTypes.removeOneEbook, RemoveOneEbook),
    takeLatest(actionTypes.removeManyEbook, RemoveManyEbook),
    
    takeLatest(actionTypes.insertOneGenre, InsertOneGenre),
    takeLatest(actionTypes.updateOneGenre, UpdateOneGenre),
    takeLatest(actionTypes.findManyGenre, FindManyGenre),
    takeLatest(actionTypes.removeOneGenre, RemoveOneGenre),
    takeLatest(actionTypes.removeManyGenre, RemoveManyGenre),

    takeLatest(actionTypes.insertOneAuthor, InsertOneAuthor),
    takeLatest(actionTypes.updateOneAuthor, UpdateOneAuthor),
    takeLatest(actionTypes.findManyAuthor, FindManyAuthor),
    takeLatest(actionTypes.removeOneAuthor, RemoveOneAuthor),
    takeLatest(actionTypes.removeManyAuthor, RemoveManyAuthor),

    takeLatest(actionTypes.findManyChapter, FindManyChapter),
    takeLatest(actionTypes.searchChapter, SearchChapter),
    takeLatest(actionTypes.findOneChapter, FindOneChapter),
    takeLatest(actionTypes.removeOneChapter, RemoveOneChapter),
    takeLatest(actionTypes.removeManyChapter, RemoveManyChapter),

    takeLatest(actionTypes.insertOneReview, InsertOneReview),
    takeLatest(actionTypes.updateOneReview, UpdateOneReview),
    takeLatest(actionTypes.findManyReview, FindManyReview),
    takeLatest(actionTypes.removeOneReview, RemoveOneReview),
    takeLatest(actionTypes.removeManyReview, RemoveManyReview),

    takeLatest(actionTypes.insertOneComment, InsertOneComment),
    takeLatest(actionTypes.updateOneComment, UpdateOneComment),
    takeLatest(actionTypes.findManyComment, FindManyComment),
    takeLatest(actionTypes.removeOneComment, RemoveOneComment),
    takeLatest(actionTypes.removeManyComment, RemoveManyComment),
  ]) 
}