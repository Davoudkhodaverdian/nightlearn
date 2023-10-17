import { ReactNode } from "react";

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex  flex-col  justify-between">
      <div className="flex  flex-col  justify-between">
        <div className="p-3">Panel layout</div>
      </div>
      <div>{children}</div>
    </div>
  )
}
