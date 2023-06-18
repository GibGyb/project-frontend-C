import * as React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import useContent from '../hooks/useContent'
import Error from '../components/Error'
import ReactPlayer from 'react-player'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

const Content = () => {
  const { id: postId } = useParams()
  const {
    status: { loading, error, ready },
    data,
  } = useContent(postId || '')

  const { id, isOwnPost } = useAuth()

  if (!ready || loading) {
    if (!error) {
      return <Loading />
    } else {
      alert(error)
      return <Error />
    }
  }

  console.log(isOwnPost(data!))

  const { videoTitle, comment, rating, postedBy, videoUrl, createdAt } = data!

  const formatted = DateTime.fromISO(createdAt).toLocaleString(DateTime.DATETIME_MED)

  return (
    <div className="flex flex-col items-center justify-center rounded-xl w-2/3 h-auto bg-emerald-950 overflow-hidden my-20 flex-wrap mx-auto ">
      {data! && (
        <div className="flex flex-col">
          <div>
            <h4 className="text-2xl font-bold text-amber-100 p-5 text-center w-11/12 mx-auto">{videoTitle}</h4>
          </div>
          <div className="flex justify-center w-full ">
            <ReactPlayer url={videoUrl} />
          </div>

          <div className="flex flex-col w-11/12 bg-amber-100 rounded-2xl my-5 mx-auto p-5 ">
            <p className="text-xl italic bg-gray-200 rounded-lg h-40 p-5 font-semibold mb-5 ">Comment: {comment}</p>

            <div className="flex flex-col items-end gap-3 text-xl  ">
              <p className="flex">
                {[...Array(rating).keys()].map((star) => (
                  <img key={star} className="w-10 h-10" src="/star.svg" alt="Rating Star" />
                ))}
              </p>
              <p>
                <span className="mr-2">&mdash;</span> {postedBy.name}
              </p>
              <Link to={`/content/${data.id}/edit`}>
                <p>{formatted}</p>
                <div className="flex gap-5 items-center justify-end ">
                  {isOwnPost(data!) && (
                    <>
                      <img className="w-10 h-10 " src="https://learnhub.thanayut.in.th/edit.svg" alt="edit" />
                      <span className="font-bold text-2xl text-orange-500 py-5">Edit</span>
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Content

// {
//   /*
//   TODO: update the conditional rendering here, if you chosen to work with isOwnPost function, please continue to work on AuthProvider.tsx, otherwise you can use `id` from useAuth()
//    */ isOwnPost && isOwnPost(data!) && (
//     <Link to={`/content/${postId}/edit`}>
//       <img className={classes.icon} src="/edit.svg" alt="Edit" />
//       Edit
//     </Link>
//   )
// }
