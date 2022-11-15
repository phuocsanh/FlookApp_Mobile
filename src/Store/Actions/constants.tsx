const actionTypes = {
  // APP
  openDialog: 'OPEN_DIALOG',
  closeDialog: 'CLOSE_DIALOG',
  onOffCart: "ON_OFF_CART",
  onOffSearch: "ON_OFF_MODEL",
  onOffDrawer: "ON_OFF_DRAWER",
  onOffNotify: "ON_OFF_NOTIFY",
  openAccetp: "OPEN_ACCETP",
  closeAccetp: "CLOSE_ACCETP",
  submitSearch: "SUBMIT_SEARCH",
  setIsLoading:"SET_IS_LOADING",
  setLoginNull: "SET_LOGIN_NULL",
  setRegisterNull:"SET_REGISTER_NULL",
  setForgotNull:"SET_FORGOT_NULL",
  setDetailBook:"SET_DETAIL_BOOK",
  setCoinUser:"SET_COIN_USER",
  setIsUpdateUser:"SET_IS_UPDATE_USER",
  setFilterFunctions:"SET_FILTER_FUNTIONS",
  


  SET_MENU: '@customization/SET_MENU',
  MENU_TOGGLE: '@customization/MENU_TOGGLE',
  MENU_OPEN: '@customization/MENU_OPEN',
  SET_FONT_FAMILY: '@customization/SET_FONT_FAMILY',
  SET_BORDER_RADIUS: '@customization/SET_BORDER_RADIUS',


  // DATA LOCAL

  clearToken: "CLEAR_TOKEN",
  storeToken: "STORE_TOKEN",
  clearUserIsLogin:"CLEAR_USER_Is_LOGIN",
  clearBookReduder:"CLEAR_BOOK_REDUCER",

  // REVIEW -- COMMENT
 
  addReview:"ADD_REVIEW",
  addReviewSuccess:"ADD_REVIEW_SUCCESS",
  addReviewFailure:"ADD_REVIEW_FAILURE",

  addComment:"ADD_COMMENT",
  addCommentSuccess:"ADD_REVIEW_SUCCESS",
  addCommentFailure:"ADD_REVIEW_FAILURE",

  addCommentChapter:"ADD_COMMENT_CHAPTER",
  addCommentChapterSuccess:"ADD_REVIEW_SUCCESS_CHAPTER",
  addCommentChapterFailure:"ADD_REVIEW_FAILURE_CHAPTER",

  likeComment:"LIKE_COMMENT",
  likeCommentSuccess:"LIKE_COMMENT_SUCCESS",
  likeCommentFailure:"LIKE_COMMENT_FAILURE",

  likeChapter:"LIKE_CHAPTER",
  likeChapterSuccess:"LIKE_CHAPTER_SUCCESS",
  likeChapterFailure:"LIKE_CHAPTER_FAILURE",

  likeReview:"LIKE_REVIEW",
  likeReviewSuccess:"LIKE_REVIEW_SUCCESS",
  likeReviewFailure:"LIKE_REVIEW_FAILURE",

  searchReview:"SEARCH_REVIEW",
  searchReviewFailure:"SEARCH_REVIEW_SUCCESS",
  searchReviewSuccess:"SEARCH_REVIEW_FAILURE",

  searchCommentChapter:"SEARCH_COMMENT_CHAPTER",
  searchCommentChapterFailure:"SEARCH_COMMENT_CHAPTER_SUCCESS",
  searchCommentChapterSuccess:"SEARCH_COMMENT_CHAPTER_FAILURE",
  // AUTH
  setDeviceToken:"SET_DEVICE_TOKEN",
  login: "LOGIN",
  loginFailure: "LOGIN_FAILURE",
  loginSuccess: "LOGIN_SUCCESS",

  register: "REGISTER",
  registerFailure: "REGISTER_FAILURE",
  registerSuccess: "REGISTER_SUCCESS",

  forgotPass: "FORGOT_PASS",
  forgotPassFailure: "FORGOT_PASS_FAILURE",
  forgotPassSuccess: "FORGOT_PASS_SUCCESS",

  changePass: "CHANGE_PASS",
  changePassFailure: "CHANGE_PASS_FAILURE",
  changePassSuccess: "CHANGE_PASS_SUCCESS",

  findOneUser: "FIND_ONE_USER",
  findOneUserFailure: "FIND_ONE_USER_FAILURE",
  findOneUserSuccess: "FIND_ONE_USER_SUCCESS",

  payment:"PAYMENT",
  paymentFailure:"PAYMENT_FAILURE",
  paymentSuccess:"PAYMENT_SUCCESS",




  getProfile: "GET_PROFILE",
  getProfileFailure: "GET_PROFILE_FAILURE",
  getProfileSuccess: "GET_PROFILE_SUCCESS",
  
  



  putLikeMovie: "PUT_LIKE_MOVIE",
  putLikeMovieFail: "PUT_LIKE_MOVIE_FAIL",
  putLikeMovieSuccess: "PUT_LIKE_MOVIE_SUCCESS",

  findManyRole: 'FIND_MANY_ROLE',
  findManyRoleFailure: 'FIND_MANY_ROLE_FAILURE',
  findManyRoleSuccess: 'FIND_MANY_ROLE_SUCCESS',

  findManyUser: "FIND-MANY_USER",
  findManyUserFailure: "FIND_MANY_USER_FAILURE",
  findManyUserSuccess: "FIND_MANY_USER_SUCCESS",

  findManyFeature: "FIND_MANY_FEATURE",
  findManyFeatureFailure: "FIND_MANY_FEATURE_FAILURE",
  findManyFeatureSuccess: "FIND_MANY_FEATURE_SUCCESS",

  findManyFeatureGroup: "FIND_MANY_FEATURE_GROUP",
  findManyFeatureGroupFailure: "FIND_MANY_FEATURE_GROUP_FAILURE",
  findManyFeatureGroupSuccess: "FIND_MANY_FEATURE_GROUP_SUCCESS",

  deleteOneRole: 'DELETE_ONE_ROLE',
  deleteOneRoleFailure: 'DELETE_ONE_ROLE_FAILURE',
  deleteOneRoleSuccess: 'DELETE_ONE_ROLE_SUCCESS',

  removeOneRole: 'REMOVE_ONE_ROLE',
  removeOneRoleFailure: 'REMOVE_ONE_ROLE_FAILURE',
  removeOneRoleSuccess: 'REMOVE_ONE_ROLE_SUCCESS',

  removeManyRole: 'REMOVE_MANY_ROLE',
  removeManyRoleFailure: 'REMOVE_MANY_ROLE_FAILURE',
  removeManyRoleSuccess: 'REMOVE_MANY_ROLE_SUCCESS',

  updateOneRole: 'UPDATE_ONE_ROLE',
  updateOneRoleFailure: 'UPDATE_ONE_ROLE_FAILURE',
  updateOneRoleSuccess: 'UPDATE_ONE_ROLE_SUCCESS',

  deleteOneUser: 'DELETE_ONE_USER',
  deleteOneUserFailure: 'DELETE_ONE_USER_FAILURE',
  deleteOneUserSuccess: 'DELETE_ONE_USER_SUCCESS',

  removeOneUser: 'REMOVE_ONE_USER',
  removeOneUserFailure: 'REMOVE_ONE_USER_FAILURE',
  removeOneUserSuccess: 'REMOVE_ONE_USER_SUCCESS',

  removeManyUser: 'REMOVE_MANY_USER',
  removeManyUserFailure: 'REMOVE_MANY_USER_FAILURE',
  removeManyUserSuccess: 'REMOVE_MANY_USER_SUCCESS',

  insertOneUser: 'INSERT_ONE_USER',
  insertOneUserFailure: 'INSERT_ONE_USER_FAILURE',
  insertOneUserSuccess: 'INSERT_ONE_USER_SUCCESS',

  updateOneUser: 'UPDATE_ONE_USER',
  updateOneUserFailure: 'UPDATE_ONE_USER_FAILURE',
  updateOneUserSuccess: 'UPDATE_ONE_USER_SUCCESS',

  updateNotify: 'UPDATE_NOTIFY',
  updateNotifyFailure: 'UPDATE_NOTIFY_FAILURE',
  updateNotifySuccess: 'UPDATE_NOTIFY_SUCCESS',

  getNotify: 'GET_NOTIFY',
  getNotifyFailure: 'GET_NOTIFY_FAILURE',
  getNotifySuccess: 'GET_NOTIFY_SUCCESS',

  updateOneUserMoblie: 'UPDATE_ONE_USER_MOBILE',
  updateOneUserMobileFailure: 'UPDATE_ONE_USER_FAILURE_MOBILE',
  updateOneUserMobileSuccess: 'UPDATE_ONE_USER_SUCCESS_MOBILE',





  // EBOOK

  addBookReaded:'ADD_BOOK_READED',
  addBookReadedFailure:'ADD_BOOK_READED_FAILURE',
  addBookReadedSuccess:'ADD_BOOK_READED_SUCCESS',

  deleteBookReaded:'DELETE_BOOK_READED',
  deleteBookReadedFailure:'DELETE_BOOK_READED_FAILURE',
  deleteBookReadedSuccess:'DELETE_BOOK_READED_SUCCESS',

  addBookSubscribe:'ADD_BOOK_SUBSCRIBE',
  addBookSubscribeFailure:'ADD_BOOK_SUBSCRIBE_FAILURE',
  addBookSubscribeSuccess:'ADD_BOOK_SUBSCRIBE_SUCCESS',
  
  deleteBookSubscribe:'DELETE_BOOK_SUBSCRIBE',
  deleteBookSubscribeFailure:'DELETE_BOOK_SUBSCRIBE_FAILURE',
  deleteBookSubscribeSuccess:'DELETE_BOOK_SUBSCRIBE_SUCCESS',

  addBookDownload:'ADD_BOOK_DOWNLOAD',
  addBookDownloadFailure:'ADD_BOOK_DOWNLOAD_FAILURE',
  addBookDownloadSuccess:'ADD_BOOK_DOWNLOAD_SUCCESS',

  findHistoryReaded:'FIND_HISTORY_READED',
  findHistoryReadedFailure:'FIND_HISTORY_READED_FAILURE',
  findHistoryReadedSuccess:'FIND_HISTORY_READED_SUCCESS',

  findSubscribeBook:'FIND_SUBSCRIBE_BOOK',
  findSubscribeBookFailure:'FIND_SUBSCRIBE_BOOK_FAILURE',
  findSubscribeBookSuccess:'FIND_SUBSCRIBE_BOOK_SUCCESS',

  findCompletedBook:'FIND_COMLETED_BOOK',
  findCompletedBookFailure:'FIND_COMLETED_BOOK_FAILURE',
  findCompletedBookSuccess:'FIND_COMLETED_BOOK_SUCCESS',

  findNewBook:'FIND_NEW_BOOK',
  findNewBookSuccess:'FIND_NEW_BOOK_SUCCESS',
  findNewBookFailure:'FIND_NEW_BOOK_FAILURE',

  findHotBook:'FIND_HOT_BOOK',
  findHotBookSuccess:'FIND_HOT_BOOK_SUCCESS',
  findHotBookFailure:'FIND_HOT_BOOK_FAILURE',

  findBookGenre:'FIND_BOOK_GENRE',
  findBookGenreSuccess:'FIND_BOOK_GENRE_SUCCESS',
  findBookGenreFailure:'FIND_BOOK_GENRE_FAILURE',

  findBookDownload: 'FIND_BOOK_DOWNLOAD',
  findBookDownloadFailure: 'FIND_BOOK_DOWNLOAD_FAILURE',
  findBookDownloadSuccess: 'FIND_BOOK_DOWNLOAD_SUCCESS',

  searchEbook: 'SEARCH_EBOOK',
  searchEbookFailure: 'SEARCH_EBOOK_FAILURE',
  searchEbookSuccess: 'SEARCH_EBOOK_SUCCESS',

  filterEbookChannel: 'FILTER_EBOOK_CHANNEL',
  filterEbookChannelFailure: 'FILTER_EBOOK_CHANNEL_FAILURE',
  filterEbookChannelSuccess: 'FILTER_EBOOK_CHANNEL_SUCCESS',



  findOneEbook: "FIND_ONE_EBOOK",
  findOneEbookFailure: "FIND_ONE_EBOOK_FAILURE",
  findOneEbookSuccess: "FIND_ONE_EBOOK_SUCCESS",



  findManyEbook: 'FIND_MANY_EBOOK',
  findManyEbookFailure: 'FIND_MANY_EBOOK_FAILURE',
  findManyEbookSuccess: 'FIND_MANY_EBOOK_SUCCESS',

  insertOneEbook: 'INSERT_ONE_EBOOK',
  insertOneEbookFailure: 'INSERT_ONE_EBOOK_FAILURE',
  insertOneEbookSuccess: 'INSERT_ONE_EBOOK_SUCCESS',

  updateOneEbook: 'UPDATE_ONE_EBOOK',
  updateOneEbookFailure: 'UPDATE_ONE_EBOOK_FAILURE',
  updateOneEbookSuccess: 'UPDATE_ONE_EBOOK_SUCCESS',

  deleteOneEbook: 'DELETE_ONE_EBOOK',
  deleteOneEbookFailure: 'DELETE_ONE_EBOOK_FAILURE',
  deleteOneEbookSuccess: 'DELETE_ONE_EBOOK_SUCCESS',

  removeOneEbook: 'REMOVE_ONE_EBOOK',
  removeOneEbookFailure: 'REMOVE_ONE_EBOOK_FAILURE',
  removeOneEbookSuccess: 'REMOVE_ONE_EBOOK_SUCCESS',

  removeManyEbook: 'REMOVE_MANY_EBOOK',
  removeManyEbookFailure: 'REMOVE_MANY_EBOOK_FAILURE',
  removeManyEbookSuccess: 'REMOVE_MANY_EBOOK_SUCCESS',

  // AUTHOR
  findManyAuthorMobile: "FIND_MANY_AUTHOR_MOBILE",
  findManyAuthorMobileFailure: "FIND_MANY_AUTHOR_MOBILE_FAILURE",
  findManyAuthorMobileSuccess: "FIND_MANY_AUTHOR_MOBILE_SUCCESS",

  findManyAuthor: "FIND_MANY_AUTHOR_MOBILE",
  findManyAuthorFailure: "FIND_MANY_AUTHOR_MOBILE_FAILURE",
  findManyAuthorSuccess: "FIND_MANY_AUTHOR_MOBILE_SUCCESS",

  insertOneAuthor: 'INSERT_ONE_AUTHOR',
  insertOneAuthorFailure: 'INSERT_ONE_AUTHOR_FAILURE',
  insertOneAuthorSuccess: 'INSERT_ONE_AUTHOR_SUCCESS',

  updateOneAuthor: 'UPDATE_ONE_AUTHOR',
  updateOneAuthorFailure: 'UPDATE_ONE_AUTHOR_FAILURE',
  updateOneAuthorSuccess: 'UPDATE_ONE_AUTHOR_SUCCESS',

  deleteOneAuthor: 'DELETE_ONE_AUTHOR',
  deleteOneAuthorFailure: 'DELETE_ONE_AUTHOR_FAILURE',
  deleteOneAuthorSuccess: 'DELETE_ONE_AUTHOR_SUCCESS',

  removeOneAuthor: 'REMOVE_ONE_AUTHOR',
  removeOneAuthorFailure: 'REMOVE_ONE_AUTHOR_FAILURE',
  removeOneAuthorSuccess: 'REMOVE_ONE_AUTHOR_SUCCESS',

  removeManyAuthor: 'REMOVE_MANY_AUTHOR',
  removeManyAuthorFailure: 'REMOVE_MANY_AUTHOR_FAILURE',
  removeManyAuthorSuccess: 'REMOVE_MANY_AUTHOR_SUCCESS',

  //GENRE
  findManyGenre: 'FIND_MANY_GENRE',
  findManyGenreFailure: 'FIND_MANY_GENRE_FAILURE',
  findManyGenreSuccess: 'FIND_MANY_GENRE_SUCCESS',

  insertOneGenre: 'INSERT_ONE_GENRE',
  insertOneGenreFailure: 'INSERT_ONE_GENRE_FAILURE',
  insertOneGenreSuccess: 'INSERT_ONE_GENRE_SUCCESS',

  updateOneGenre: 'UPDATE_ONE_GENRE',
  updateOneGenreFailure: 'UPDATE_ONE_GENRE_FAILURE',
  updateOneGenreSuccess: 'UPDATE_ONE_GENRE_SUCCESS',

  deleteOneGenre: 'DELETE_ONE_GENRE',
  deleteOneGenreFailure: 'DELETE_ONE_GENRE_FAILURE',
  deleteOneGenreSuccess: 'DELETE_ONE_GENRE_SUCCESS',

  removeOneGenre: 'REMOVE_ONE_GENRE',
  removeOneGenreFailure: 'REMOVE_ONE_GENRE_FAILURE',
  removeOneGenreSuccess: 'REMOVE_ONE_GENRE_SUCCESS',

  removeManyGenre: 'REMOVE_MANY_GENRE',
  removeManyGenreFailure: 'REMOVE_MANY_GENRE_FAILURE',
  removeManyGenreSuccess: 'REMOVE_MANY_GENRE_SUCCESS',


  // CHAPTERS
  
//MOBILE
  searchChapter: "SEARCH_CHAPTER",
  searchChapterFailure: "SEARCH_CHAPTER_FAILURE",
  searchChapterSuccess: "SEARCH_CHAPTER_SUCCESS",

  addViewChapter: "ADD_VIEW_CHAPTER",
  addViewChapterFailure: "ADD_VIEW_CHAPTER_FAILURE",
  addViewChapterSuccess: "ADD_VIEW_CHAPTER_SUCCESS",

  searchOneChapter:"SEARCH_ONE_CHAPTER",
  searchOneChapterFailure:"SEARCH_ONE_CHAPTER_FAILURE",
  searchOneChapterSuccess:"SEARCH_ONE_CHAPTER_SUCCESS",
// END MOBILE


  findManyChapter: "FIND_MANY_CHAPTER",
  findManyChapterFailure: "FIND_MANY_CHAPTER_FAILURE",
  findManyChapterSuccess: "FIND_MANY_CHAPTER_SUCCESS",

  

  findOneChapter: "FIND_ONE_CHAPTER",
  findOneChapterFailure: "FIND_ONE_CHAPTER_FAILURE",
  findOneChapterSuccess: "FIND_ONE_CHAPTER_SUCCESS",

  insertOneChapter: "INSERT_ONE_CHAPTER",
  insertOneChapterFailure: 'INSERT_ONE_CHAPTER_FAILURE',
  insertOneChapterSuccess: 'INSERT_ONE_CHAPTER_SUCCESS',

  updateOneChapter: 'UPDATE_ONE_CHAPTER',
  updateOneChapterFailure: 'UPDATE_ONE_CHAPTER_FAILURE',
  updateOneChapterSuccess: 'UPDATE_ONE_CHAPTER_SUCCESS',

  deleteOneChapter: 'DELETE_ONE_CHAPTER',
  deleteOneChapterFailure: 'DELETE_ONE_CHAPTER_FAILURE',
  deleteOneChapterSuccess: 'DELETE_ONE_CHAPTER_SUCCESS',

  removeOneChapter: 'REMOVE_ONE_CHAPTER',
  removeOneChapterFailure: 'REMOVE_ONE_CHAPTER_FAILURE',
  removeOneChapterSuccess: 'REMOVE_ONE_CHAPTER_SUCCESS',

  removeManyChapter: 'REMOVE_MANY_CHAPTER',
  removeManyChapterFailure: 'REMOVE_MANY_CHAPTER_FAILURE',
  removeManyChapterSuccess: 'REMOVE_MANY_CHAPTER_SUCCESS',

  // REVIEW
  findManyReview: 'FIND_MANY_REVIEW',
  findManyReviewFailure: 'FIND_MANY_REVIEW_FAILURE',
  findManyReviewSuccess: 'FIND_MANY_REVIEW_SUCCESS',

  insertOneReview: 'INSERT_ONE_REVIEW',
  insertOneReviewFailure: 'INSERT_ONE_REVIEW_FAILURE',
  insertOneReviewSuccess: 'INSERT_ONE_REVIEW_SUCCESS',

  updateOneReview: 'UPDATE_ONE_REVIEW',
  updateOneReviewFailure: 'UPDATE_ONE_REVIEW_FAILURE',
  updateOneReviewSuccess: 'UPDATE_ONE_REVIEW_SUCCESS',

  removeOneReview: 'REMOVE_ONE_REVIEW',
  removeOneReviewFailure: 'REMOVE_ONE_REVIEW_FAILURE',
  removeOneReviewSuccess: 'REMOVE_ONE_REVIEW_SUCCESS',

  removeManyReview: 'REMOVE_MANY_REVIEW',
  removeManyReviewFailure: 'REMOVE_MANY_REVIEW_FAILURE',
  removeManyReviewSuccess: 'REMOVE_MANY_REVIEW_SUCCESS',

  // Review
  findManyComment: 'FIND_MANY_COMMENT',
  findManyCommentFailure: 'FIND_MANY_COMMENT_FAILURE',
  findManyCommentSuccess: 'FIND_MANY_COMMENT_SUCCESS',

  insertOneComment: 'INSERT_ONE_COMMENT',
  insertOneCommentFailure: 'INSERT_ONE_COMMENT_FAILURE',
  insertOneCommentSuccess: 'INSERT_ONE_COMMENT_SUCCESS',

  updateOneComment: 'UPDATE_ONE_COMMENT',
  updateOneCommentFailure: 'UPDATE_ONE_COMMENT_FAILURE',
  updateOneCommentSuccess: 'UPDATE_ONE_COMMENT_SUCCESS',

  removeOneComment: 'REMOVE_ONE_COMMENT',
  removeOneCommentFailure: 'REMOVE_ONE_COMMENT_FAILURE',
  removeOneCommentSuccess: 'REMOVE_ONE_COMMENT_SUCCESS',

  removeManyComment: 'REMOVE_MANY_COMMENT',
  removeManyCommentFailure: 'REMOVE_MANY_COMMENT_FAILURE',
  removeManyCommentSuccess: 'REMOVE_MANY_COMMENT_SUCCESS',

  getAllCommentFail: "GET_ALL_COMMENT_FAIL",
  getAllCommentSuccess: "GET_ALL_COMMENT_SUCCESS",
  addCommentFail: "ADD_COMMENT_FAIL",
  addCommentSuccses: "ADD_COMMENT_SUCCSESS",
  likeCommentFail: "LIKE_COMMENT_FAIL",
  likeCommentSuccsess: "LIKE_COMMENT_SUCCESS",
  dislikeCommentFail: "DISLIKE_COMMENT_FAIL",
  dislikeCommentSuccsess: "DISLIKE_COMMENT_SUCCESS",


  findUser: "FIND_USER",
  findUserFailure: "FIND_USER_FAILURE",
  findUserSuccess: "FIND_USER_SUCCESS",


    // MOVIE
    getListMovie: "GET_LIST_MOVIE_",
    getListMovieFail: "GET_LIST_MOVIE_FAIL",
    getListMovieSuccess: "GET_LIST_MOVIE_SUCCESS",
  
    getAllListMovie: "GET_ALL_LIST_MOVIE_",
    getAllListMovieFail: "GET_ALL_LIST_MOVIE_FAIL",
    getAllListMovieSuccess: "GET_ALL_LIST_MOVIE_SUCCESS",
  
    getListMovieCommingSoon: "GET_LIST_MOVIE_COMMING_SOON",
    getListMovieCommingSoonFail: "GET_LIST_MOVIE_COMMING_SOON_FAIL",
    getListMovieCommingSoonSuccess: "GET_LIST_MOVIE_COMMING_SOON_SUCCESS",
  
    getListMovieIsPlaying: "GET_LIST_MOVIE_ISPALYING",
    getListMovieIsPlayingFail: "GET_LIST_MOVIE_ISPALYING_FAIL",
    getListMovieIsPlayingSuccess: "GET_LIST_MOVIE_ISPALYING_SUCCESS",
  
    getListMovieNew: "GET_LIST_MOVIE_NEW_",
    getListMovieNewFail: "GET_LIST_MOVIE_NEW_FAIL",
    getListMovieNewSuccess: "GET_LIST_MOVIE_NEW_SUCCESS",
  
    getMovieById: "Get_Movie_By_Id_Contain",
    getMovieByIdFail: "GET_MOVIE_BY_ID_FAIL",
    getMovieByIdSuccess: "Get_MOVIE_By_ID_SUCCESS",
  
    getListFavorite: "GET_LIST_FAVORITE_BY_ID",
    getListFavoriteFail: "GET_LIST_FAVORITE_BY_ID_FAIL",
    getListFavoriteSuccess: "GET_LIST_FAVORITE_BY_ID_SUCCESS",
////// -----------------------------------------------------------------------------------------

  // MANGA
  findManga: 'FIND_MANGA',
  findMangaFailure: 'FIND_MANGA_FAILURE',
  findMangaSuccess: 'FIND_MANGA_SUCCESS',

  findMangaById: "FIND_MANGA_BY_ID",
  findMangaByIdFailure: "FIND_MANGA_BY_ID_FAILURE",
  findMangaByIdSuccess: "FIND_MANGA_BY_ID_SUCCESS",

  setListFilter: "SET_LIST_FILTER",
  setSortObj: "SET_SORT_OBJ",

  searchBook: "SEARCH_BOOK",
  searchBookFailure: "SEARCH_BOOK_FAILURE",
  searchBookSuccess: "SEARCH_BOOK_SUCCESS",


  // AUTHOR
  findAuthor: "GET_AUTHOR",
  findAuthorFailure: "GET_AUTHOR_FAILURE",
  findAuthorSuccess: "GET_AUTHOR_SUCCESS",

  findGenre: 'FIND_GENRE',
  findGenreFailure: 'FIND_GENRE_FAILURE',
  findGenreSuccess: 'FIND_GENRE_SUCCESS',


  // CHAPTERS
  findChapterByMangaId: "FIND_CHAPTERS_BY_MANGA_ID",
  findChapterByMangaIdFailure: "FIND_CHAPTER_BY_MANGA_ID_FAILURE",
  findChapterByMangaIdSuccess: "FIND_CHAPTER_BY_MANGA_ID_SUCCESS",

  findChapterById: "FIND_CHAPTER_BY_ID",
  findChapterByIdFailure: "FIND_CHAPTER_BY_ID_FAILURE",
  findChapterByIdSuccess: "FIND_CHAPTER_BY_ID_SUCCESS",




};

export default actionTypes