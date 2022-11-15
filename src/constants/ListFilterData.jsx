const listAllowed = [
    { _id: '1', name: 'Nhỏ hơn 12 tuổi', allowed: 11, isSelected: false },
    { _id: '2', name: '12 - 17 tuổi', allowed: 17, isSelected: false },
    { _id: '3', name: 'Đủ 18 tuổi', allowed: 18, isSelected: false },
   
  ];
  
  const listChapter = [
    { _id: '1', name: '0 - 50 chương', chapter: 50, isSelected: false },
    { _id: '2', name: '50 - 200 chương', chapter: 200, isSelected: false },
    { _id: '3', name: '200 - 500 chương', chapter: 500, isSelected: false },
    { _id: '4', name: 'Lớn hơn 500 chương', chapter: 501, isSelected: false },
   
  ];
  
  const listStatus = [
    { _id: '1', name: 'Đang cập nhật', status: 'Đang cập nhật', isSelected: false },
    { _id: '2', name: 'Đã hoàn tất', status: 'Đã hoàn tất', isSelected: false },
  ];
  const listSort = [
    { _id: '1',  type: 1, isSelected: false , name:"Tên", title:'name' },
    { _id: '2', type: 1, isSelected: false, name:"Ngày", title:'date' },
    { _id: '3',  type: 1, isSelected: false ,  name:"Lượt xem", title:'view'},
    
  ];
  
  const listFilterByDate = [
    { _id: '1', name: 'This Week', value: "This Week", isSelected: false },
    { _id: '2', name: 'This Month', value: 'This Month', isSelected: false },
  ];
  
  const listFilterAuthor = [
    { _id: '1', name: 'All', isSelected: true },
    { _id: '2', name: 'Hot', isSelected: false },
    { _id: '3', name: 'New', isSelected: false },
    { _id: '4', name: 'Favourite', isSelected: false },
  ];
  
  const ListFilterData = {
    listAllowed,
    listChapter,
    listStatus,
    listSort,
    listFilterByDate,
    listFilterAuthor
  };
  export default ListFilterData;
  