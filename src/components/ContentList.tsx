import React from 'react'
import useContentList from '../hooks/useContentList'
import Loading from './Loading'
import Error from './Error'
import ContentCard from './ContentCard'

const ContentList = () => {
  const {
    status: { loading, error, ready },
    data,
  } = useContentList()

  if (!ready || loading) {
    if (!error) {
      return <Loading />
    } else {
      return <Error />
    }
  }

  return (
    <div className="flex flex-wrap gap-10 justify-center px-10 pt-0 pb-10  ">
      {data!.map((content) => (
        <ContentCard key={content.id} {...content} />
      ))}
    </div>
  )
}

export default ContentList
