import React, { useContext } from 'react'
import { Form, Input } from 'reactstrap'
import { ReviewContext } from '../providers/ReviewProvider'

const ReviewSearch = () => {
  const { searchReviews } = useContext(ReviewContext)
  const Search = e => {
    searchReviews(e.target.value)
  }

  return (
    <Form className="search">
      <Input placeholder='Search...' onChange={Search} />
    </Form>
  )
}

export default ReviewSearch
