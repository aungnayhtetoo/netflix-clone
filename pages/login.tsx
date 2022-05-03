import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

export default function Login() {
  const [login, setLogin] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-black md:items-center
       md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain
        md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        className="relative mt-24 space-y-8 bg-black/75 py-10 px-6 md:top-6 
      md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input className="loginInput" type="email" placeholder="Email" 
            {...register('email', {required: true})}/>
          </label>
          <label className="inline-block w-full">
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              {...register('password', {required: true})}
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?
          <button className="px-2 text-white hover:underline">
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}
