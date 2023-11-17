import React from 'react'
import CategoryItems from './categorry-item';
const categorys: { title: string; href: string }[] = [
  {
    title: "chease",
    href: "",
  },
  {
    title: "chease",
    href: "",
  },
  {
    title: "Contact",
    href: "",
  },
  {
    title: "chease",
    href: "",
  },
  {
    title: "About",
    href: "",
  },
  {
    title: "About",
    href: "",
  },
  {
    title: "About",
    href: "",
  },
  {
    title: "Contact",
    href: "",
  },
];
export default function Categorys() {
  return (
   <CategoryItems items={categorys}/>
  )
}
