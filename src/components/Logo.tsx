import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return <Image src={'/logo.svg'} alt='logo' height={20} width={110}/>
}
