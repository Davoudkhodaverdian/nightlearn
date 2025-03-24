"use client";
import React from "react";
import { IPagePanelData } from "../models";


const PanelPage: React.FC<{ data: IPagePanelData }> = ({ data }) => {

  console.log(data);
  return (
    <div className="">
      <h2 className="p-3">{data?.title}</h2>
    </div>
  )

}

export default PanelPage
