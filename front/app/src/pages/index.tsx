import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <h1 style={{padding: 16}}>
      <div>一个子应用 App - React </div>
      <button onClick={() => navigate("./page1")}>首页</button>
      <button onClick={() => navigate("./page2")}>设置</button>
      <button onClick={() => navigate("./page2/page1")}>设置-人员列表</button>
      <Outlet />
    </h1>
  );
}
