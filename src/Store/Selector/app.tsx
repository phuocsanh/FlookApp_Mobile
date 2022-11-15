import { useSelector, RootStateOrAny } from "react-redux";

const DataAllAuthor = () => useSelector((state: RootStateOrAny) => state.BookReducer.listAuthor);
const DataAllGenre = () => useSelector((state: RootStateOrAny) => state.BookReducer.listGenre);
const DataAllCategory = () => useSelector((state: RootStateOrAny) => state.BookReducer.listCategory);
const DataAllStatus = () => useSelector((state: RootStateOrAny) => state.BookReducer.listStatus);
const DataAllReview = () => useSelector((state: RootStateOrAny) => state.BookReducer.listReview);
const DataAllComment = () => useSelector((state: RootStateOrAny) => state.BookReducer.listComment);
const DataAllManga = () => useSelector((state: RootStateOrAny) => state.BookReducer.listAllBook);

const DataManyManga = () => useSelector((state: RootStateOrAny) => state.BookReducer.listBook);
const DataOneManga = () => useSelector((state: RootStateOrAny) => state.BookReducer.oneManga);

const DataAllChapter = () => useSelector((state: RootStateOrAny) => state.BookReducer.listAllChapter);
const DataManyChapter = () => useSelector((state: RootStateOrAny) => state.BookReducer.listChapter);
const DataOneChapter = () => useSelector((state: RootStateOrAny) => state.BookReducer.oneChapter);

const QuantityManga = () => useSelector((state: RootStateOrAny) => state.BookReducer.countBook);
const QuantityChapter = () => useSelector((state: RootStateOrAny) => state.BookReducer.countChapter);

const InsertOneEbook = () => useSelector((state: RootStateOrAny) => state.BookReducer.insertOneEbook);

export default {
  DataAllAuthor, DataAllGenre, DataAllManga, DataAllCategory, DataAllStatus,
  DataManyManga, DataOneManga, DataAllReview, DataAllComment,
  DataAllChapter, DataManyChapter, DataOneChapter,
  QuantityManga, QuantityChapter,

  InsertOneEbook,
}
