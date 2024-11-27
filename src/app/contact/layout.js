"use client";
import LayoutWrapper from "@/components/LayoutWrapper";
import { SWRConfig } from "swr";

export default function Page(props) {
  return <LayoutWrapper>{props.children}</LayoutWrapper>;
}
