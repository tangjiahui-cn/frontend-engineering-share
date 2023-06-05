import React from "react";
import { Outlet } from "react-router-dom";

export default function Page2() {
  return (
    <div>
      设置
      <Outlet />
    </div>
  );
}
