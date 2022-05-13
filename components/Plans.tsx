import { CheckIcon } from '@heroicons/react/outline'
import { Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { loadCheckout } from '../lib/stripe'
import Loader from './Loader'
import Table from './Table'
interface Props {
  products: Product[]
}

function Plans({ products }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<Product>(products[2])
  const [isBillingLoading, setIsBillingLoading] = useState(false)
  const { logout, user } = useAuth()

  const subscribeToPlan = ()  => {
    if(!user) return

    loadCheckout(selectedPlan?.prices[0].id)
    setIsBillingLoading(true)
  }
  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          onClick={logout}
          className="text-lg font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#e50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#e50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#e50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex scroll-py-4 flex-col">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox cursor-pointer ${
                  selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-70'
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px]
            ${isBillingLoading && 'opacity-60'}`}

            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-100"/>
            ): ("Subscribe")}
            </button>
        </div>
      </main>
    </>
  )
}

export default Plans
