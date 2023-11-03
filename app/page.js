'use client'
import { useState, useEffect } from 'react'
import { randomize, averageData } from './utils/helpers'
import OneSignal from 'react-onesignal';

export default function Home() {

  const [coin, setCoin] = useState('CUP')
  const [value, setValue] = useState(0)
  const [bgColor, setBgColor] = useState('bg-crimson')
  const [initialized, setInitialized] = useState(false);

  // fetch the value of CUP from DB and populate the value and the color based on the trending from the last 24 hours, cache this value for 5 mins
  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      getData()
    }, 5000)
    return () => { clearInterval(interval) };
  }, [coin])

  const getData = async () => {
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

  // Handle the Onesignal clic
  const handleBellClick = () => {
    OneSignal.init({ appId: '04dffeef-fbcd-4c21-95fc-eb358400eff2', allowLocalhostAsSecureOrigin: true }).then(() => {
      setInitialized(true);
      OneSignal.Slidedown.promptPush();
    })
  }

  return (
    <>
      <main className={bgColor + " flex min-h-screen flex-col justify-between p-12"}>

        <div className='flex flex-row justify-between'>
          <h1 className="text-center text-3xl">Tasas de Cambio en Cuba 🇨🇺</h1>
          <a href="#!" onClick={handleBellClick} title='Notificaciones a diario'>🔔</a>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <p className='text-7xl  text-white font-black opacity-70 blur-sm'>
            <a href="#!" onClick={() => setCoin(coin == "CUP" ? "MLC" : "CUP")}>{coin}</a>
          </p>
          <h2 className="text-[6rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-extrabold">${value}</h2>
        </div>

        <div className='flex flex-row justify-between'>
          <p>{new Date().getFullYear()} - Todos los derechos reservados</p>
          <p>Cambio CUP - Un servicio gratuito de <a href='https://qvapay.com'>QvaPay</a></p>
        </div>
      </main>
    </>
  )
}
