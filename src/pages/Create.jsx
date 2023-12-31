import React, { useState } from 'react'
import classes from './Create.module.css'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-stars'
import { useAuth } from '../providers/AuthProviders'

const Create = () => {
  const [rating, setRating] = useState(0)
  const [isSubmitDone, setSubmitDone] = useState(false)
  const [url, setUrl] = useState('')
  const [comment, setComment] = useState('')
  const navigate = useNavigate()
  const { token } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:8000/content', {
        method: 'POST',
        body: JSON.stringify({
          videoUrl: url,
          comment: comment,
          rating: rating,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      return data
    } catch (err) {
      console.log(err)
    } finally {
      navigate('/')
    }
  }

  const setStarValue = (newrating) => {
    setRating(newrating)
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>Create new content</div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="video-url">Video URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <div className={classes.ratingContainer}>
            <label>Rating</label>
            <ReactStars count={5} value={rating} size={42} half={false} onChange={setStarValue} color2="#ff731d" />
          </div>
        </div>
        <div className={classes.formGroup}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create
