'use client'
import { useState, useEffect } from 'react'
import { randomize, averageData } from './utils/helpers'

export default function Home() {

  const [coin, setCoin] = useState('CUP')
  const [modal, setModal] = useState(false)
  const [value, setValue] = useState(0)
  const [bgColor, setBgColor] = useState('bg-crimson')

  // fetch the value of CUP from DB and populate the value and the color based on the trending from the last 24 hours, cache this value for 5 mins
  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      getData()
    }, 1000)
    return () => { clearInterval(interval) };
  }, [coin])

  const getData = async () => {

    // fetch data from my own API endpoint
    const response = await fetch('/api')
    const data = await response.json()

    if (coin === 'CUP') {
      const { first, average } = averageData(data.cupHistory)
      const number = Number.parseFloat(randomize(first.value)).toFixed(2)
      setValue(number)
      number < average ? setBgColor('bg-malachite') : setBgColor('bg-crimson')
    } else {
      const { first, average } = averageData(data.mlcHistory)
      const number = Number.parseFloat(randomize(first.value, 0.01)).toFixed(4)
      setValue(number)
      number < average ? setBgColor('bg-malachite') : setBgColor('bg-crimson')
    }
  }

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <>
      <main className={bgColor + " flex min-h-screen flex-col justify-between p-12"}>

        <h1 className="text-center text-3xl">Tasas de Cambio en Cuba 🇨🇺</h1>

        <div className="flex-1 flex flex-col items-center justify-center">
          <p className='text-7xl  text-white font-black opacity-70 blur-sm'>
            <a href='#' onClick={() => setCoin(coin == "CUP" ? "MLC" : "CUP")}>{coin}</a>
          </p>
          <h2 className="text-[6rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-extrabold">${value}</h2>
        </div>

        <div className='flex w-100 items-center justify-around'>
          <a onClick={handleModal} className=''>¿Cómo funciona?</a>
        </div>

      </main>
    </>
  )
}
