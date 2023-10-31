'use client'
import { useState, useEffect } from 'react'


export default function Home() {

  // Two coins, CUP and MLC
  const [coin, setCoin] = useState('CUP')
  const [modal, setModal] = useState(false)
  const [value, setValue] = useState(0)
  const [bgColor, setBgColor] = useState('bg-crimson')

  // fetch the value of CUP from DB and populate the value and the color based on the trending from the last 24 hours, cache this value for 5 mins
  useEffect(() => {
    // Get from DB the following values:
    // - value of CUP
    // - value of MLC
    // - last 48 values of CUP to create the trending graph
    // - last 48 values of MLC to create the trending graph
    if (coin === 'CUP') {
      setBgColor('bg-crimson')
      setValue(261.89)
    } else {
      setBgColor('bg-malachite')
      setValue(1.0907)
    }
  }, [coin])

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <>
      <main className={bgColor + " flex min-h-screen flex-col justify-between p-12"}>

        <div className='flex w-100 items-center justify-between'>
          <div className='font-bold text-2xl items-center'>
            CUPUSD
          </div>

          <div className=''>
            <a href='#'>Menu</a>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <p className='text-7xl text-white font-black opacity-70 blur-sm'>
            <a href='#' onClick={() => setCoin(coin == "CUP" ? "MLC" : "CUP")}>{coin}</a>
          </p>
          <h1 className="text-[9rem] font-extrabold">${value}</h1>
        </div>

        <div className='flex w-100 items-center justify-around'>
          <a onClick={handleModal} className=''>¿Cómo funciona?</a>
        </div>

      </main>
    </>
  )
}
