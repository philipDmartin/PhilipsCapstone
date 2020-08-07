import React, { useContext } from 'react'
import { Form, Input } from 'reactstrap'
import { FavoritePostContext } from '../providers/FavoritePostProvider'

const FavoritePostSearch = () => {
  const { searchFavoritePosts } = useContext(FavoritePostContext)
  const Search = e => {
    searchFavoritePosts(e.target.value)
  }

  return (
    <Form className="search">
      <Input placeholder='Search...' onChange={Search} />
    </Form>
  )
}

export default FavoritePostSearch
