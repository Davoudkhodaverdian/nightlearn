import Panel from "@/components/panel";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'admin Panel',
  description: 'admin Panel',
}
export default function PanelPage() {

  return (
    <Panel />
  )
}
