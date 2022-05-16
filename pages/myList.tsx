import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import MyList from '../components/MyList'

function myList() {
    const showModal = useRecoilValue(modalState)

  return (
    <div>
      <Head>
        <title>My List - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='relative pl-4 lg:space-y-24 lg:pl-16 pt-24'>
        <section className="md:space-y-24">
            {<MyList withMessage={true} />}
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default myList
