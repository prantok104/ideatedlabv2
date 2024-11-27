'use client'


import LayoutWrapper from "@/components/LayoutWrapper"

export default function Page(props) {
  return (
    <LayoutWrapper>
        {props.children}
    </LayoutWrapper>
  )
}