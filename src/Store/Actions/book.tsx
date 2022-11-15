import actionTypes from "./constants"
//===================================|| REVIEW - COMMENT ||===============================//
const searchReview = (data:any) => ({ type: actionTypes.searchReview ,payload:data})
const searchReviewFailure = (data:any) => ({type: actionTypes.searchReviewFailure, payload: data});
const searchReviewSuccess = (data:any) => ({type: actionTypes.searchReviewSuccess, payload: data});

const searchCommentChapter = (data:any) => ({ type: actionTypes.searchCommentChapter ,payload:data})
const searchCommentChapterFailure = (data:any) => ({type: actionTypes.searchCommentChapterFailure, payload: data});
const searchCommentChapterSuccess = (data:any) => ({type: actionTypes.searchCommentChapterSuccess, payload: data});

const addReview = (data:any) => ({ type: actionTypes.addReview ,payload:data})
const addReviewFailure = (data:any) => ({type: actionTypes.addReviewFailure, payload: data});
const addReviewSuccess = (data:any) => ({type: actionTypes.addReviewSuccess, payload: data});

const addComment = (data:any) => ({ type: actionTypes.addComment ,payload:data})
const addCommentFailure = (data:any) => ({type: actionTypes.addCommentFailure, payload: data});
const addCommentSuccess = (data:any) => ({type: actionTypes.addCommentSuccess, payload: data});

const addCommentChapter = (data:any) => ({ type: actionTypes.addCommentChapter ,payload:data})
const addCommentChapterFailure = (data:any) => ({type: actionTypes.addCommentChapterFailure, payload: data});
const addCommentChapterSuccess = (data:any) => ({type: actionTypes.addCommentChapterSuccess, payload: data});

const likeComment = (data:any) => ({ type: actionTypes.likeComment ,payload:data})
const likeCommentFailure = (data:any) => ({type: actionTypes.likeCommentFailure, payload: data});
const likeCommentSuccess = (data:any) => ({type: actionTypes.likeCommentSuccess, payload: data});

const likeChapter = (data:any) => ({ type: actionTypes.likeChapter ,payload:data})
const likeChapterFailure = (data:any) => ({type: actionTypes.likeChapterFailure, payload: data});
const likeChapterSuccess = (data:any) => ({type: actionTypes.likeChapterSuccess, payload: data});

const likeReview = (data:any) => ({ type: actionTypes.likeReview ,payload:data})
const likeReviewFailure = (data:any) => ({type: actionTypes.likeReviewFailure, payload: data});
const likeReviewSuccess = (data:any) => ({type: actionTypes.likeReviewSuccess, payload: data});



//===================================|| Genre ||===============================//
const findGenre = () => ({ type: actionTypes.findGenre })
const findGenreFailure = (data:any) => ({type: actionTypes.findGenreFailure, payload: data});
const findGenreSuccess = (data:any) => ({type: actionTypes.findGenreSuccess, payload: data});


//===================================|| Author ||===============================//
const findManyAuthorMobile = () => ({type: actionTypes.findManyAuthorMobile})
const findManyAuthorMobileFailure = (data:any) => ({type: actionTypes.findManyAuthorMobileFailure, payload: data});
const findManyAuthorMobileSuccess = (data:any) => ({type: actionTypes.findManyAuthorMobileSuccess, payload: data});

//===================================|| Ebook ||================================//
const addBookReaded = (data:any) => ({type: actionTypes.addBookReaded, payload:data})
const addBookReadedFailure = (data:any) => ({type: actionTypes.addBookReadedFailure, payload: data});
const addBookReadedSuccess = (data:any) => ({type: actionTypes.addBookReadedSuccess, payload: data});

const deleteBookReaded = (data:any) => ({type: actionTypes.deleteBookReaded, payload:data})
const deleteBookReadedFailure = (data:any) => ({type: actionTypes.deleteBookReadedFailure, payload: data});
const deleteBookReadedSuccess = (data:any) => ({type: actionTypes.deleteBookReadedSuccess, payload: data});




const addBookDownload = (data:any) => ({type: actionTypes.addBookDownload, payload:data})
const addBookDownloadFailure = (data:any) => ({type: actionTypes.addBookDownloadFailure, payload: data});
const addBookDownloadSuccess = (data:any) => ({type: actionTypes.addBookDownloadSuccess, payload: data});

const findHistoryReaded = (data:any) => ({type: actionTypes.findHistoryReaded, payload:data})
const findHistoryReadedFailure = (data:any) => ({type: actionTypes.findHistoryReadedFailure, payload: data});
const findHistoryReadedSuccess = (data:any) => ({type: actionTypes.findHistoryReadedSuccess, payload: data});

const findSubscribeBook = (data:any) => ({type: actionTypes.findSubscribeBook, payload:data})
const findSubscribeBookFailure = (data:any) => ({type: actionTypes.findSubscribeBookFailure, payload: data});
const findSubscribeBookSuccess = (data:any) => ({type: actionTypes.findSubscribeBookSuccess, payload: data});

const findCompletedBook = () => ({type: actionTypes.findCompletedBook})
const findCompletedBookFailure = (data:any) => ({type: actionTypes.findCompletedBookFailure, payload: data});
const findCompletedBookSuccess = (data:any) => ({type: actionTypes.findCompletedBookSuccess, payload: data});

const findNewBook = () => ({type: actionTypes.findNewBook})
const findNewBookFailure = (data:any) => ({type: actionTypes.findNewBookFailure, payload: data});
const findNewBookSuccess = (data:any) => ({type: actionTypes.findNewBookSuccess, payload: data});

const findHotBook = () => ({type: actionTypes.findHotBook})
const findHotBookFailure = (data:any) => ({type: actionTypes.findHotBookFailure, payload: data});
const findHotBookSuccess = (data:any) => ({type: actionTypes.findHotBookSuccess, payload: data});

const findBookGenre = () => ({type: actionTypes.findBookGenre})
const findBookGenreFailure = (data:any) => ({type: actionTypes.findBookGenreFailure, payload: data});
const findBookGenreSuccess = (data:any) => ({type: actionTypes.findBookGenreSuccess, payload: data});

const findBookDownload = (data:any) => ({type: actionTypes.findBookDownload, payload:data})
const findBookDownloadFailure = (data:any) => ({type: actionTypes.findBookDownloadFailure, payload: data});
const findBookDownloadSuccess = (data:any) => ({type: actionTypes.findBookDownloadSuccess, payload: data});

const searchBook = (data:any) =>({type:actionTypes.searchBook, payload: data})
const searchBookFailure = (data:any) =>({type:actionTypes.searchBookFailure, payload: data})
const searchBookSuccess = (data:any) =>({type:actionTypes.searchEbookSuccess, payload: data})

const filterEbookChannel = (data:any) =>({type:actionTypes.filterEbookChannel, payload: data})
const filterEbookChannelFailure = (data:any) =>({type:actionTypes.filterEbookChannelFailure, payload: data})
const filterEbookChannelSuccess = (data:any) =>({type:actionTypes.filterEbookChannelSuccess, payload: data})




//===================================|| Manga ||================================//
const findManga = (data:any) => ({type: actionTypes.findManga, payload: data})
const findMangaFailure = (data:any) => ({type: actionTypes.findMangaFailure, payload: data});
const findMangaSuccess = (data:any) => ({type: actionTypes.findMangaSuccess, payload: data});

const findMangaById = (id:any) => ({type: actionTypes.findMangaById, payload: id})
const findMangaByIdFailure = (data:any) => ({type: actionTypes.findMangaByIdFailure, payload: data});
const findMangaByIdSuccess = (data:any) => ({type: actionTypes.findMangaByIdSuccess, payload: data});


//===================================|| Chapter ||================================//
const findChapterById = (id:any) => ({type: actionTypes.findChapterById, payload: id})
const findChapterByIdFailure = (data:any) => ({type: actionTypes.findChapterByIdFailure, payload: data});
const findChapterByIdSuccess = (data:any) => ({type: actionTypes.findChapterByIdSuccess, payload: data})

const findChapterByMangaId = (data:any) => ({type: actionTypes.findChapterByMangaId, payload: data})
const findChapterByMangaIdFailure = (data:any) => ({type: actionTypes.findChapterByMangaIdFailure, payload: data})
const findChapterByMangaIdSuccess = (data:any) => ({type: actionTypes.findChapterByMangaIdSuccess, payload: data})



const searchChapter = (data:any) => ({type: actionTypes.searchChapter, payload: data})
const searchChapterFailure = (data:any) => ({type: actionTypes.searchChapterFailure, payload: data})
const searchChapterSuccess = (data:any) => ({type: actionTypes.searchChapterSuccess, payload: data})

const addViewChapter = (data:any) => ({type: actionTypes.addViewChapter, payload: data})
const addViewChapterFailure = (data:any) => ({type: actionTypes.addViewChapterFailure, payload: data})
const addViewChapterSuccess = (data:any) => ({type: actionTypes.addViewChapterSuccess, payload: data})

const findOneChapter = (data:any) => ({type: actionTypes.findOneChapter, payload: data})
const findOneChapterFailure = (data:any) => ({type: actionTypes.findOneChapterFailure, payload: data})
const findOneChapterSuccess = (data:any) => ({type: actionTypes.findOneChapterSuccess, payload: data})





export default {
  findGenre, findGenreFailure, findGenreSuccess,
  findManyAuthorMobile, findManyAuthorMobileFailure, findManyAuthorMobileSuccess,
  findManga, findMangaFailure, findMangaSuccess,
  findMangaById, findMangaByIdFailure, findMangaByIdSuccess,
  searchBook, searchBookFailure, searchBookSuccess,
  findChapterById, findChapterByIdFailure, findChapterByIdSuccess,
  findChapterByMangaId, findChapterByMangaIdFailure, findChapterByMangaIdSuccess,

  //Mobile
  findHistoryReaded,findHistoryReadedFailure,findHistoryReadedSuccess,
  findSubscribeBook,findSubscribeBookFailure,findSubscribeBookSuccess,
  findCompletedBook,findCompletedBookFailure,findCompletedBookSuccess,
  findNewBook,findNewBookFailure,findNewBookSuccess,
  findHotBook,findHotBookFailure,findHotBookSuccess,
  findBookGenre,findBookGenreFailure,findBookGenreSuccess,
  searchReview,searchReviewFailure,searchReviewSuccess,
  searchChapter,searchChapterFailure,searchChapterSuccess,
  searchCommentChapter, searchCommentChapterFailure, searchCommentChapterSuccess,
  findOneChapter,findOneChapterFailure,findOneChapterSuccess,
  findBookDownload,findBookDownloadFailure,findBookDownloadSuccess,
  addReview, addReviewFailure,addReviewSuccess,
  addComment,addCommentFailure,addCommentSuccess,
  addCommentChapter, addCommentChapterFailure, addCommentChapterSuccess,
  likeComment, likeCommentFailure, likeCommentSuccess,
  likeReview, likeReviewFailure, likeReviewSuccess,
  addBookReaded, addBookReadedFailure, addBookReadedSuccess,

  addBookDownload, addBookDownloadFailure, addBookDownloadSuccess,
  deleteBookReaded,deleteBookReadedFailure, deleteBookReadedSuccess,
  filterEbookChannel,filterEbookChannelFailure,filterEbookChannelSuccess,
  addViewChapter, addViewChapterFailure, addViewChapterSuccess,
  likeChapter, likeChapterFailure, likeChapterSuccess
}