import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import Row from './Row'

interface Props {
  withMessage?: boolean
}

function MyList({withMessage = false} : Props) {
  const { user } = useAuth()
  const list = useList(user?.uid)

  return <>{
    (withMessage) ? (
      (list.length > 0) ? <Row title="My List" movies={list} /> : (
        <div className='flex items-center justify-center'>
          <h2 className='text-[gray] font-medium text-center pt-4'>You don't have any shows added to your list.</h2>
        </div>
      )
    ) :
    (
      list.length > 0 && <Row title="My List" movies={list} />
    )
    }
    </>
}

export default MyList
