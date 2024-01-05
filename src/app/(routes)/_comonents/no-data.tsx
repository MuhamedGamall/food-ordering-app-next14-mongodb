import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NoData({pageName}:{pageName:string}) {
  return (
    <div className="flex items-center justify-center sm:justify-between sm:flex-row flex-col ">
    <h2 className="text-[45px] my-5">{pageName.toUpperCase()}</h2>
    <p className="text-slate-600 text-[20] sm:m-0 my-4">
      There are no items in {pageName}
    </p>
    <Link
      href={"/menu/category/_"}
      className=" text-[25px] px-2 text-white bg-[#DF2241] hover:bg-red-700 rounded-full flex items-center gap-3 "
    >
      VIEW THE MENU
      <MoveRight/>
    </Link>
  </div>
  )
}
