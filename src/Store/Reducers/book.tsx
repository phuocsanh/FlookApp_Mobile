import actionTypes from "../Actions/constants";
import ListFilterData from '../../constants/ListFilterData'


console.log("🚀 ~ file: book.tsx ~ line 3 ~ ListFilterData", ListFilterData.listAllowed)


interface ObjListFilter {
  author: Array<string>
  genre: Array<string>
  status: Array<string>
  allowedAge: Array<string>,
  chapter:Array<string>,
  sort: object
}
interface initialState{
  listHistoryReaded:Array<string>;
  listSubscribeBook:Array<string>;
  listCompletedBook:Array<string>;
  listNewBook:Array<string>;
  listHotBook:Array<string>;
  listReviewAndComment:Array<string>;
  listGenre: Array<string>;
  detailOneChapter:Array<string>;
  listBookGenre:Array<string>;
  arrayBookSearch:Array<string>;
  listBookDownload:Array<string>;
  listBookAfterFilter:Array<string>;

  listAuthor: Array<string>;
  listBook: Array<string>;
  listAllBook: Array<string>;
  listAllChapter: Array<string>;
  listChapter: Array<string>;
  listReview: Array<string>;
  listComment: Array<string>;
  listCommentChapter:Array<string>;
  insertOneEbook: object;
  oneBook: object;
  oneChapter: object;
  countBook: number;
  countChapter: number;
  listStatusFilter: Array<object>;
  listChapterFilter: Array<object>;
  listAllowedFilter: Array<object>;
  listSortFilter: Array<object>;
  listFilter: ObjListFilter;
  objFiterClear: object;
  sortObj: object;
  oneManga: object;

}
const initialState: initialState = {
  listHistoryReaded:[],
  listSubscribeBook:[],
  listCompletedBook:[],
  listReviewAndComment:[],
  listNewBook:[],
  listHotBook:[],
  listBookDownload:[],
  arrayBookSearch:[],
  listBookGenre:[],
  detailOneChapter:[],

  listBook: [],
  listAllBook: [],
  listBookAfterFilter:[],
  listGenre: [],
  listAuthor: [],
  listAllChapter: [],
  listChapter:[],
  listReview: [],
  listComment: [],
  insertOneEbook: {},
  oneBook: {},
  oneChapter: {},
  countBook: 0,
  countChapter: 0,

  listStatusFilter: ListFilterData.listStatus,
  listAllowedFilter: ListFilterData.listAllowed,
  listChapterFilter: ListFilterData.listChapter,
  listSortFilter: ListFilterData.listSort,
  listFilter: {
    author: [],
    genre: [],
    status: [],
    allowedAge: [],
    sort: [],
    chapter:[]
  },
  objFiterClear: {},
  sortObj: {
    name: '',
    type: ''
  },
  listCommentChapter:[],
  oneManga: {},
 
};

export const BookReducer = (state = initialState, action: any) => {
  switch (action.type) {

     //----------------------------- MOBILE
     case actionTypes.clearBookReduder: {
      return {...state,listHistoryReaded: [], listSubscribeBook:[]}
    }
     case actionTypes.findHistoryReadedSuccess: {
      return {...state,listHistoryReaded: [...action.payload.data]}
    }
    case actionTypes.findSubscribeBookSuccess: {
      return {...state,listSubscribeBook: [...action.payload.data]}
    }
    case actionTypes.findBookDownloadSuccess: {
      return {...state,listBookDownload: [...action.payload.data]}
    }
    case actionTypes.findCompletedBookSuccess: {
      return {...state,listCompletedBook: [...action.payload.data]}
    }
    case actionTypes.findNewBookSuccess: {
      return {...state,listNewBook: [...action.payload.data]}
    }
    case actionTypes.findHotBookSuccess: {
      return {...state,listHotBook: [...action.payload.data]}
    }
    case actionTypes.findBookGenreSuccess: {
      return {...state,  listBookGenre: [...action.payload.data]}
    }
    case actionTypes.searchReviewSuccess: {
      // console.log("🚀 ~ file: book.tsx ~ line 132 ~ BookReducer ~ listReviewAndComment", [...action.payload.data])
      
      return {...state,  listReviewAndComment: [...action.payload.data]}
    }
    case actionTypes.searchCommentChapterSuccess: {
    console.log("🚀 ~ file: book.tsx ~ line 136 ~ BookReducer ~ searchCommentChapterSuccess", )
    
      return {...state,  listCommentChapter: [...action.payload.data]}
    }
    case actionTypes.searchChapterSuccess: {
      return {
        ...state,
        countChapter: action.payload.count,
        listChapter: [...action.payload.data]
      }
    }
    case actionTypes.findOneChapterSuccess: {
      return {
        ...state,
        detailOneChapter: [...action.payload.data]
      }
    }
    case actionTypes.searchEbookSuccess: {
      // console.log("🚀 ~ file: book.tsx ~ line 86 ~ BookReducer ~ searchEbookSuccess",[...action.payload.data])
        return {
          ...state, 
          arrayBookSearch: [...action.payload.data], 
        }
      }

      case actionTypes.filterEbookChannelSuccess: {
        // console.log("🚀 ~ file: book.tsx ~ line 86 ~ BookReducer ~ searchEbookSuccess",[...action.payload.data])
          return {
            ...state, 
            listBookAfterFilter: [...action.payload.data], 
          }
        }
      //---
    //----------------------------- MOBILE END
    

    case actionTypes.insertOneEbookSuccess: {
      return {...state, insertOneEbook: action.payload}
    }
    case actionTypes.findOneEbookSuccess: {
      return {...state, oneBook: action.payload}
    }
    case actionTypes.findManyEbookSuccess: {
      return {...state, listAllBook: [...action.payload.data],}
    }
    case actionTypes.findManyGenreSuccess:{
      return {...state, listGenre: [...action.payload]}
    }
    case actionTypes.findManyAuthorMobileSuccess: {
    // console.log("🚀 ~ file: book.tsx ~ line 177 ~ BookReducer ~ findManyAuthorMobileSuccess", [[...action.payload]])
      return {...state, listAuthor: [...action.payload]}
    }
    case actionTypes.findManyChapterSuccess: {
      return {...state, listAllChapter: [...action.payload]}
    }
   
    case actionTypes.findOneChapterSuccess: {
      return {...state, oneChapter: action.payload}
    }
    case actionTypes.findManyReviewSuccess: {
      return {...state, listReview: [...action.payload]}
    }
    case actionTypes.findManyCommentSuccess: {
      return {...state, listComment: [...action.payload]}
    }

   

/////////////////////////////////////////////////// 


    case actionTypes.findMangaSuccess: {
      return {
        ...state,
        countBook: action.payload.count,
        listBook: [...action.payload.data],
      }
    }
    case actionTypes.setListFilter: {
      // console.log("🚀 ~ file: book.tsx ~ line 63 ~ BookReducer ~ action.payload", action.payload)
      return { ...state, listFilter: action.payload }

    }
    case actionTypes.setSortObj: {
      return { ...state, sortObj: action.payload }
    }
    
    case actionTypes.findMangaByIdSuccess: {
      return { ...state, oneManga: action.payload }
    }
    case actionTypes.findGenreSuccess: {
      return { ...state, listGenre: [...action.payload] }
    }
    case actionTypes.findAuthorSuccess: {
      return { ...state, listAuthor: [...action.payload] }
    }
    case actionTypes.findChapterByMangaIdSuccess: {
      return {
        ...state,
        countChapter: action.payload.count,
        listChapter: [...action.payload.data]
      }
    }
    case actionTypes.findChapterByIdSuccess: {
      return { ...state, oneChapter: action.payload }
    }

    default: return {...state}
  }
}