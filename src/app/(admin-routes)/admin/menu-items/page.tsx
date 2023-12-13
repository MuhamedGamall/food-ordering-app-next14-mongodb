'use client'
import AdminMenuBar from '@/components/admin/admin-menu-bar'
import { useProfile } from '@/hooks/user-profile';
import { redirect } from 'next/navigation';

import React from 'react'

export default function MenuItemsPage() {
  const { data } = useProfile();


  if (data && !data?.admin) {
    redirect("/");
  }

  return (
    <section className="sm:w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
    <AdminMenuBar path={'menu-items' }/>
  </section>
  )
}
