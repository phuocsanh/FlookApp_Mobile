const role = '/api/role-management'

const user = '/api/user-management'
const author = '/api/author-management'
const genre = '/api/genre-management'
const ebook = '/api/ebook-management'
const chapter = '/api/chapter-management'
const review = '/api/review-management'
const comment = '/api/comment-management'
const feature = '/api/feature-management'
const payment = '/api/payment-management'
const featureGroup = '/api/feature-group-management'


// export const domain:string = "http://192.168.43.174:8000";
export const domain:string = "https://flook-app.herokuapp.com";


const apiString = {
  login: `${user}/login`,
  register: `${user}/register`,
  forgotPassword: `${user}/forgot-password`,
  changePassword: `${user}/change-password`,
  setActiveUser: `${user}/set-active-user`,
  findManyUser: `${user}/find-many-user`,
  findOneUser: `${user}/find-one-user`,
  insertOneUser: `${user}/insert-one-user`,
  updateOneUser: `${user}/update-one-user`,
  updateOneUserMoblie: `${user}/update-one-user-mobile`,
  deleteOneUser: `${user}/delete-one-user`,
  deleteManyUsers: `${user}/delete-many-user`,
  removeOneUser: `${user}/remove-one-user`,
  removeManyUsers: `${user}/remove-many-user`,
  updateNotify: `${user}/update-notify`,
  getNotify: `${user}/get-notify`,

  // author
  findOneAuthor: `${author}/find-one-author`,
  findManyAuthorMobile: `${author}/find-many-author-mobile`,
  insertOneAuthor: `${author}/insert-one-author`,
  insertManyAuthor: `${author}/insert-many-author`,
  updateOneAuthor: `${author}/update-one-author`,
  deleteOneAuthor: `${author}/delete-one-author`,
  deleteManyAuthor: `${author}/delete-many-author`,
  removeOneAuthor: `${author}/remove-one-author`,
  removeManyAuthor: `${author}/remove-many-author`,
  payment: `${payment}/payment`,
 
  addLike:`${author}/add-like`,
  addBookReaded:`${author}/add-book-readed`,
  addBookSubsricbe:`${author}/add-book-subscribe`,
  addBookDownload:`${author}/add-book-download`,
  deleteBookReaded:`${author}/delete-book-readed`,



  //role
  findOneRole: `${role}/find-one-role`,
  findManyRole: `${role}/find-many-role`,
  insertOneRole: `${role}/insert-one-role`,
  insertManyRole: `${role}/insert-many-role`,
  updateOneRole: `${role}/update-one-role`,
  deleteOneRole: `${role}/delete-one-role`,
  deleteManyRole: `${role}/delete-many-role`,
  removeOneRole: `${role}/remove-one-role`,
  removeManyRole: `${role}/remove-many-role`,

  // genre
  findOneGenre: `${genre}/find-one-genre`,
  findManyGenre: `${genre}/find-many-genre`,
  insertOneGenre: `${genre}/insert-one-genre`,
  insertManyGenre: `${genre}/insert-many-genre`,
  updateOneGenre: `${genre}/update-one-genre`,
  deleteOneGenre: `${genre}/delete-one-genre`,
  deleteManyGenre: `${genre}/delete-many-genre`,
  removeOneGenre: `${genre}/remove-one-genre`,
  removeManyGenre: `${genre}/remove-many-genre`,

  // ebook


  
  searchEbook: `${ebook}/search-ebook`,
  filterEbookChannel: `${ebook}/filter-ebook-channel`,
  findOneEbook: `${ebook}/find-one-ebook`,
  findManyEbook: `${ebook}/find-many-ebook`,
  findHistoryReaded: `${ebook}/find-many-by-user`,
  findBookDownload: `${ebook}/find-many-by-user`,

  findSubscribeBook: `${ebook}/find-many-by-user`,
  insertOneEbook: `${ebook}/insert-one-ebook`,
  insertManyEbook: `${ebook}/insert-many-ebook`,
  updateOneEbook: `${ebook}/update-one-ebook`,
  deleteOneEbook: `${ebook}/delete-one-ebook`,
  deleteManyEbook: `${ebook}/delete-many-ebook`,
  removeOneEbook: `${ebook}/remove-one-ebook`,
  removeManyEbook: `${ebook}/remove-many-ebook`,

  // chapter
  likeChapter: `${chapter}/like-chapter`,
  addViewChapter: `${chapter}/add-view-chapter`,
  searchChapter: `${chapter}/search-chapter`,
  searchOneChapter: `${chapter}/search-one-chapter`,
  findOneChapter: `${chapter}/find-one-chapter`,
  findManyChapter: `${chapter}/find-many-chapter`,
  insertOneChapter: `${chapter}/insert-one-chapter`,
  insertManyChapter: `${chapter}/insert-many-chapter`,
  updateOneChapter: `${chapter}/update-one-chapter`,
  deleteOneChapter: `${chapter}/delete-one-chapter`,
  deleteManyChapter: `${chapter}/delete-many-chapter`,
  removeOneChapter: `${chapter}/remove-one-chapter`,
  removeManyChapter: `${chapter}/remove-many-chapter`,

  // review
  searchReview:`${review}/search-review`,
  likeReview:`${review}/like-review`,
  findOneReview: `${review}/find-one-review`,
  findManyReview: `${review}/find-many-review`,
  insertOneReview: `${review}/insert-one-review`,
  insertManyReview: `${review}/insert-many-review`,
  updateOneReview: `${review}/update-one-review`,
  deleteOneReview: `${review}/delete-one-review`,
  deleteManyReview: `${review}/delete-many-review`,
  removeOneReview: `${review}/remove-one-review`,
  removeManyReview: `${review}/remove-many-review`,
  addReview:`${review}/add-review`,
  updateReview:`${review}/update-review`,

  // comment
  
  addComment:`${comment}/add-comment`,
  likeComment:`${comment}/like-comment`,
  searchCommentChapter:`${comment}/search-comment-chapter`,
  findOneComment: `${comment}/find-one-comment`,
  findManyComment: `${comment}/find-many-comment`,
  insertOneComment: `${comment}/insert-one-comment`,
  insertManyComment: `${comment}/insert-many-comment`,
  updateOneComment: `${comment}/update-one-comment`,
  deleteOneComment: `${comment}/delete-one-comment`,
  deleteManyComment: `${comment}/delete-many-comment`,
  removeOneComment: `${comment}/remove-one-comment`,
  removeManyComment: `${comment}/remove-many-comment`,

  // feature
  findOneFeature: `${feature}/find-one-feature`,
  findManyFeature: `${feature}/find-many-feature`,
  insertOneFeature: `${feature}/insert-one-feature`,
  insertManyFeature: `${feature}/insert-many-feature`,
  updateOneFeature: `${feature}/update-one-feature`,
  deleteOneFeature: `${feature}/delete-one-feature`,
  deleteManyFeature: `${feature}/delete-many-feature`,
  removeOneFeature: `${feature}/remove-one-feature`,
  removeManyFeature: `${feature}/remove-many-feature`,

  // featuresGroup
  findOneFeatureGroup: `${featureGroup}/find-one-feature-group`,
  findManyFeatureGroup: `${featureGroup}/find-many-feature-group`,
  insertOneFeatureGroup: `${featureGroup}/insert-one-feature-group`,
  insertManyFeatureGroup: `${featureGroup}/insert-many-feature-group`,
  updateOneFeatureGroup: `${featureGroup}/update-one-feature-group`,
  deleteOneFeatureGroup: `${featureGroup}/delete-one-feature-group`,
  deleteManyFeatureGroup: `${featureGroup}/delete-many-feature-group`,
  removeOneFeatureGroup: `${featureGroup}/remove-one-feature-group`,
  removeManyFeatureGroup: `${featureGroup}/remove-many-feature-group`
}


export default apiString