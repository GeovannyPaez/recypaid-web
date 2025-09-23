"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useEffect, useState } from "react"
import { APP_STORE_URLS } from "@/constants/app-urls"

export default function DownloadButton() {
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop')

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType('ios')
    } else if (/android/.test(userAgent)) {
      setDeviceType('android')
    } else {
      setDeviceType('desktop')
    }
  }, [])

  const handleDownload = () => {
    if (deviceType === 'android') {
      window.open(APP_STORE_URLS.ANDROID, '_blank')
    } else if (deviceType === 'ios') {
      alert('La aplicación para iOS estará disponible próximamente en la App Store')
    } else {
      window.open(APP_STORE_URLS.ANDROID, '_blank')
    }
  }

  return (
    <Button
      onClick={handleDownload}
      size="lg"
      className="text-lg px-8 py-6 rounded-full font-semibold bg-app-primary text-app-tint hover:opacity-90 border-none"
    >
      <Download className="mr-2 h-5 w-5" />
      {deviceType === 'ios' ? 'Descargar para iOS' : 
       deviceType === 'android' ? 'Descargar para Android' : 
       'Descárgala ahora'}
    </Button>
  )
}