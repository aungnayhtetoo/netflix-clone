import {
  getProducts,
  Product,
  Subscription,
} from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import moment from 'moment'
import { GetStaticProps } from 'next'
import payments, { goToBillingPortal } from '../lib/stripe'
import { Quality } from '../typing'
import Membership from '../components/Membership'
import Loader from '../components/Loader'

interface Props {
  products: Product[]
  qualities: Quality[]
}

function Account({ products, qualities }: Props) {
  const { user, logout, loading } = useAuth()
  const subscription = useSubscription(user)

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />

            <p className="text-xs font-semibold text-[#555]">
              Member since{' '}
              {moment(subscription?.created).format(
                'MMMM Do YYYY, h:mm:ss A z'
              )}
            </p>
          </div>
        </div>

        <Membership />
        <div
          className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4
        md:grid-cols-4 md:border-x-0 md:border-t md:px-0 md:pb-0 md:border-b-0"
        >
          <h4 className='text-lg text-[gray]'>Plan Details</h4>
          {/* current plan */}
          <div className="col-span-2 flex space-x-1.5 text-left">
            {loading ? (
              <Loader color="dark:fill-[gray]" />
            ) : (
              <>
                <p>
                  {
                    products.find(
                      (product) => product.id == subscription?.product
                    )?.name
                  }
                </p>

                <div className="flex max-w-fit space-x-0.5 rounded-sm border-2 border-white py-0 px-1 text-sm font-light tracking-wider">
                  <p className="py-0">
                    {
                      qualities.find((quality, i) => {
                        // console.log(quality, i)
                        return quality.id == subscription?.product
                      })?.text
                    }
                  </p>
                  <p className="py-0 font-bold">
                    {
                      qualities.find((quality, i) => {
                        // console.log(quality, i)
                        return quality.id == subscription?.product
                      })?.def
                    }
                  </p>
                </div>
              </>
            )}
          </div>
          <p className="membershipLink"
          onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>
        <div
          className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 
        md:grid-cols-4 md:border-x-0 md:border-b-0 md:border-t md:pb-0 md:px-0"
        >
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            onClick={() => logout()}
            className="membershipLink md:text-left"
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export default Account

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  const arr = [
    ['SD', ' '],
    ['ULTRA', 'HD'],
    ['4K', 'HDR'],
  ]

  const qualities = products?.map((product, i) => {
    return {
      id: product.id,
      text: arr[i][0],
      def: arr[i][1],
    }
  })

  return {
    props: {
      products,
      qualities,
    },
  }
}
