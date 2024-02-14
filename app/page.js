'use client'
import { useState, useEffect } from 'react'
import { randomize, averageData } from './utils/helpers'
import OneSignal from 'react-onesignal';

export default function Home() {

  const [coin, setCoin] = useState('CUP')
  const [value, setValue] = useState(0)
  const [bgColor, setBgColor] = useState('bg-crimson')

  const getData = async () => {
    const response = await fetch('/api', {
      headers: {
        'Cache-Control': 'no-cache'
      },
      next: { revalidate: 60 * 60 }
    })
    const data = await response.json()

    if (coin === 'CUP') {
      const { first, average } = averageData(data.cupHistory)
      const number = Number.parseFloat(randomize(first.value, 0.5)).toFixed(2)
      setValue(number)
      number < average ? setBgColor('bg-malachite') : setBgColor('bg-crimson')
    } else {
      const { first, average } = averageData(data.mlcHistory)
      const number = Number.parseFloat(randomize(first.value, 0.01)).toFixed(4)
      setValue(number)
      number < average ? setBgColor('bg-malachite') : setBgColor('bg-crimson')
    }
  }

  // fetch the value of CUP from DB and populate the value and the color based on the trending from the last 24 hours, cache this value for 5 mins
  useEffect(() => {
    getData()
    OneSignal.init({ appId: '04dffeef-fbcd-4c21-95fc-eb358400eff2' });
    const interval = setInterval(() => {
      getData()
    }, 5000)
    return () => { clearInterval(interval) }
  }, [coin])

  return (
    <>
      <main className={bgColor + " flex min-h-screen flex-col justify-between p-12"}>
        <div className='flex flex-row justify-between items-center'>
          <h1 className="text-center text-2xl">Tasas de Cambio en Cuba</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center">
            <p className='text-7xl text-white font-black'>
              <a href="javascript:void(0)" onClick={() => setCoin("CUP")} className={`${coin === "CUP" ? "" : "opacity-40 blur-sm"} mr-4 "text-white"}`}>CUP</a>
              <a href="javascript:void(0)" onClick={() => setCoin("MLC")} className={`${coin === "MLC" ? "" : "opacity-40 blur-sm"} "text-white"}`}>MLC</a>
            </p>
          </div>
          <h2 className="text-[6rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-extrabold">${value}</h2>
        </div>

        <div className='flex flex-col sm:flex-row justify-between'>
          <div className='text-center sm:text-left'>
            <p>{new Date().getFullYear()} - Todos los derechos reservados</p>
          </div>
          <div className='text-center sm:text-right'>
            <p>Cambio CUP - Un servicio gratuito de <a href='https://qvapay.com'>QvaPay</a></p>
          </div>
        </div>
      </main>
    </>
  )
}
