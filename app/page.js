'use client'
import { useState, useEffect } from 'react'
import { getCoinData } from './utils/db'
import { randomize } from './utils/helpers'

export default function Home() {

  // Two coins, CUP and MLC
  const [coin, setCoin] = useState('MLC')
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
    // const data = getCoinData()

    const interval = setInterval(() => {
      if (coin === 'CUP') {
        // If last 24 hours trending is negative, set the color to crimson else set the color to malachite
        setBgColor('bg-crimson')
        // format the value to 2 decimals only
        const number = Number.parseFloat(randomize(261)).toFixed(2)
        setValue(number)
      } else {
        setBgColor('bg-malachite')
        // format the value to 2 decimals only
        const number = Number.parseFloat(randomize(1.09, 0.001)).toFixed(4)
        setValue(number)
      }
    }, 1000)

    return () => { clearInterval(interval) };

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
