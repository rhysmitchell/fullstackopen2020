import blogService from '../services/blogs'

export const initialise = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INITIALISE',
      data: blogs,
    })
  }
}


export const like = blog => {
  return async (dispatch) => {
    const newBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })

    dispatch({
      type: 'LIKE',
      data: newBlog,
    })
  }
}

export const remove = id => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'REMOVE',
      data: { id },
    })
  }
}

export const create = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({
      title,
      author,
      url,
    })
    dispatch({
      type: 'CREATE',
      data: newBlog,
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(id, { comment })
    dispatch({
      type: 'ADD_COMMENT',
      data: newComment,
    })
  }
}


const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
  {
    const id = action.data.id
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }

    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }

  case 'CREATE':
    return [...state, action.data]

  case 'REMOVE':
    return state.filter((blog) => blog.id !== action.data.id)

  case 'ADD_COMMENT':
    return state.map((item) =>
      item.id !== action.data.id ? item : action.data
    )

  case 'INITIALISE':
    return action.data

  default:
    return state
  }
}

export default blogReducer