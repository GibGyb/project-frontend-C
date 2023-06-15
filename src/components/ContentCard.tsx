import * as React from 'react'
import { Link } from 'react-router-dom'
import { ContentDto } from '../types/dto'

const ContentCard = ({ id, videoTitle, comment, rating, thumbnailUrl, creatorName, postedBy }: ContentDto) => (
  <Link
    to={`/content/${id}`}
    className="flex flex-col rounded-xl w-1/4 h-auto bg-gray-100 text-gray-500 overflow-hidden "
  >
    <img className="w-full object-cover aspect-video " src={thumbnailUrl} alt={`${videoTitle} video thumbnail`} />

    <div className="p-5 flex flex-col h-full justify-between">
      <div>
        <div>
          <h4 className="text-xl font-semibold ">{videoTitle}</h4>
          <h5 className="text-lg font-normal ">{creatorName}</h5>
        </div>

        <h5 className="text-lg font-normal italic">{comment}</h5>
      </div>

      <div className="flex justify-between ">
        <p>{postedBy.name}</p>
        <div className="flex items-center">
          {[...Array(rating).keys()].map((star) => (
            <img key={star} className="w-5 h-5 " src="/star.svg" alt="Rating Star" />
          ))}
        </div>
      </div>
    </div>
  </Link>
)

export default ContentCard
