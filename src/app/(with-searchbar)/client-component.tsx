"use client"

import ServerComponent from "@/app/(with-searchbar)/server-component";

export default function ClientComponent() {
  console.log("클라이언트 컴포넌트!")
  return <ServerComponent/>
}