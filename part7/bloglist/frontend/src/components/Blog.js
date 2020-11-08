import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove, addComment } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Card, CardContent, Button } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import WebAssetIcon from '@material-ui/icons/WebAsset'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, TextField } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import CancelIcon from '@material-ui/icons/Cancel'
import AddIcon from '@material-ui/icons/Add';

const Blog = () => {

  const id = useParams()?.id

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(blog => blog.id === id)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  if (!blog.length) {
    return null
  }

  const addCommentToBlog = (event) => {
    event.preventDefault()

    dispatch(addComment(id, comment))
    setComment('')
  }

  const blogToDisplay = blog[0]


  return (
    <>
      <br />
      <Card className='outer-blog-details' key={blogToDisplay.id}>

        <CardContent>
          <List>
            <Button className='delete-button' size="small" style={{ float: 'right', color: 'red' }} onClick={() => dispatch(remove(blogToDisplay.id))}>
              <CancelIcon />
            </Button>
            <ListItem className='title-value' component='a' href={blogToDisplay.url}>
              <ListItemAvatar>
                <Avatar>
                  <WebAssetIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={blogToDisplay.title} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className='likes-value' primary={`${blogToDisplay.likes} likes`} />
              <Button className='like-button' size="small" color="primary" onClick={() => dispatch(like(blogToDisplay))}>
                <ThumbUpIcon />
              </Button>
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={blogToDisplay.user.name} />
            </ListItem>
          </List>

          <Typography variant="h6">
            Comments
          </Typography>

          <form onSubmit={addCommentToBlog}>
            <TextField type='text' onChange={(e) => setComment(e.target.value)} />
            <br />
            <Button size="small" variant="contained" type="submit">
              Add
              <AddIcon />
            </Button>
          </form>
          <ul>
            {blogToDisplay.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
        </CardContent>
      </Card>
    </>)
}

export default Blog