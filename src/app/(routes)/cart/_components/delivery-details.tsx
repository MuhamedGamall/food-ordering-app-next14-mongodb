import React from 'react'

export default function DeliveryDetails({order}:any) {
  return (
    <ul className="bg-slate-100 py-4 px-2  rounded-md text-[20px]">
    <h4 className="mb-3 text-[25px] md:text-[30px] w-full  bg-white text-slate-900 shadow-sm rounded-md text-center">
      Delivery details
    </h4>
    <li className="  border-b text-slate-600 border-slate-200  py-2">
      Email
      <p className="ml-3  text-slate-950  text-[25px]">{order?.email}</p>
    </li>
    <li className="  border-b text-slate-600  border-slate-200 py-2 ">
      Phone
      <p className=" ml-3 text-slate-950  text-[25px]">{order?.phone}</p>
    </li>
    <div className="flex items-center gap-2 flex-row md:flex-col w-full">
      <li className=" w-full  border-b text-slate-600  border-slate-200 py-2">
        Street Address
        <p className="ml-3 text-slate-950  text-[25px]">
          {order?.street_address}
        </p>
      </li>
      <li className="w-full  border-b text-slate-600  border-slate-200 py-2">
        City
        <p className= "ml-3 text-slate-950  text-[25px]">{order?.city}</p>
      </li>
    </div>
    <li className="border-b  text-slate-600 border-slate-200 py-2">
      Country
      <p className=" ml-3 text-slate-950 text-[25px]">{order?.country}</p>
    </li>
  </ul>
  )
}