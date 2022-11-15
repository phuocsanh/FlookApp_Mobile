import { domain } from '../configs/api';
import apiString from '../configs/api'
import { requestAPI } from '../functions/globalFunc';

//===================================|| Genre ||===============================//

const findManyGenre = async (token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findManyGenre,
    token: token
  };
  const response = await requestAPI(request);
  return response;
};

const insertOneGenre = async (data: any, token: any) => {
  const request = {
    method: 'POST',
    api: domain + apiString.insertOneGenre,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const updateOneGenre = async (id: any, data: any, token: any) => {
  const request = {
    method: 'PUT',
    api: domain + apiString.updateOneGenre + `?id=${id}`,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const deleteGenre = async (id: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.deleteOneGenre + `?id=${id}`,
  }
  const response = await requestAPI(request)
  return response
}

const removeOneGenre = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeOneGenre + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const removeManyGenre = async (data: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyGenre,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}


//===================================|| Author ||===============================//

const findManyAuthor = async (token: any) => {
  console.log('sevice')
  const request = {
    method: 'GET',
    api: domain + apiString.findManyAuthor,
    token: token
  };
  const response = await requestAPI(request);
  return response;
};

const insertOneAuthor = async (data: any, token: any) => {
  const request = {
    method: 'POST',
    api: domain + apiString.insertOneAuthor,
    body: data,
    token: token,
  };
  const response = await requestAPI(request);
  return response;
}

const updateOneAuthor = async (id: any, data: any, token: any) => {
  const request = {
    method: 'PUT',
    api: domain + apiString.updateOneAuthor + `?id=${id}`,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const deleteAuthor = async (id: any) => {
  const request = {
    method: 'DELETE',
    api: `${domain}/delete-one?id=${id}`,
  }
  const response = await requestAPI(request)
  return response
}

const removeOneAuthor = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: `${domain + apiString.removeOneAuthor}?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const removeManyAuthor = async (data: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyAuthor,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}


//===================================|| Books ||================================//

const searchEbook = async (data: any, token: any) => {
  console.log('sevice')
  const request = {
    method: 'POST',
    api: domain + apiString.searchEbook + `?page=${data.page}&sort=${data.sort}`,
    body: data,
    token: token
  }
  const response = await requestAPI(request)
  return response
}

export const findOneEbook = async (id: string, token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findOneEbook + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

export const findManyEbook = async (token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findManyEbook + `?deleted=false`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}


const insertOneEbook = async (data: any, token: any) => {
  const request = {
    method: 'POST',
    api: domain + apiString.insertOneEbook,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const updateOneEbook = async (data: any) => {

}

const deleteEbook = async (id: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.deleteOneEbook + `?id=${id}`,
  }
  const response = await requestAPI(request)
  return response
}

const removeOneEbook = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeOneEbook + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const removeManyEbook = async (data: any, token: any) => {
  console.log('service', data)
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyEbook,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}


//==================================|| Chapters ||===============================//

const findManyChapter = async (token: any) => {
  console.log('sevice')
  const request = {
    method: 'GET',
    api: domain + apiString.findManyChapter,
    token: token
  }
  const response = await requestAPI(request)
  return response
}

export const findOneChapter = async (id: string, token: any) => {
  const request = {
    method: 'GET',
    api: domain + apiString.findOneChapter + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const searchChapter = async (data: any, token: any) => {
  console.log('sevice')
  const request = {
    method: 'POST',
    api: domain + apiString.searchChapter + `?id=${data.id}&page=${data.page}&sort=${data.sort}`,
    body: data,
    token: token
  }
  const response = await requestAPI(request)
  return response
}

const removeOneChapter = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeOneChapter + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const removeManyChapter = async (data: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyChapter,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

//==================================|| Comment ||===============================//

const findManyComment = async (token: any) => {
  console.log('sevice')
  const request = {
    method: 'GET',
    api: domain + apiString.findManyComment,
    token: token
  }
  const response = await requestAPI(request)
  return response
}

const insertOneComment = async (data: any, token: any) => {
  const request = {
    method: 'POST',
    api: domain + apiString.insertOneComment,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const updateOneComment = async (id: any, data: any, token: any) => {
  const request = {
    method: 'PUT',
    api: domain + apiString.updateOneComment + `?id=${id}`,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const removeOneComment = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeOneComment + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const removeManyComment = async (data: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyComment,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

//==================================|| Review ||===============================//

const findManyReview = async (token: any) => {
  console.log('sevice')
  const request = {
    method: 'GET',
    api: domain + apiString.findManyReview,
    token: token
  }
  const response = await requestAPI(request)
  return response
}

const insertOneReview = async (data: any, token: any) => {
  const request = {
    method: 'POST',
    api: domain + apiString.insertOneReview,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const updateOneReview = async (id: any, data: any, token: any) => {
  const request = {
    method: 'PUT',
    api: domain + apiString.updateOneReview + `?id=${id}`,
    body: data,
    token: token
  };
  const response = await requestAPI(request);
  return response;
}

const removeOneReview = async (id: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeOneReview + `?id=${id}`,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

const removeManyReview = async (data: any, token: any) => {
  const request = {
    method: 'DELETE',
    api: domain + apiString.removeManyReview,
    body: data,
    token: token,
  }
  const response = await requestAPI(request)
  return response
}

export default {
  searchEbook, findOneEbook, findManyEbook, insertOneEbook, updateOneEbook, deleteEbook, removeOneEbook, removeManyEbook,

  findManyGenre, insertOneGenre, updateOneGenre, deleteGenre, removeOneGenre, removeManyGenre,

  findManyAuthor, insertOneAuthor, updateOneAuthor, deleteAuthor, removeOneAuthor, removeManyAuthor,

  findManyChapter, findOneChapter, searchChapter, removeOneChapter, removeManyChapter,

  findManyComment, insertOneComment, updateOneComment, removeOneComment, removeManyComment,

  findManyReview, insertOneReview, updateOneReview, removeOneReview, removeManyReview,

}