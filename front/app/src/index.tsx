import React from "react";
import ReactDOM from "react-dom/client";
import "../public-path";
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function getRouter(basePath) {
  // @ts-ignore
  const basename = window.__POWERED_BY_QIANKUN__ ? basePath : "/";
  return createBrowserRouter(routes, { basename });
}

let root: any;          // 应用react实例
let basePath: string;   // 从主应用获取匹配路由的basePath

export function render(props) {
  const dom = (props?.container || document).querySelector("#root");
  root = ReactDOM.createRoot(dom);
  root.render(<RouterProvider router={getRouter(basePath)} />);
}

// 如果是单独起的项目，直接渲染。
// （如果是微前端调用的，则在mount生命周期里调用渲染函数）
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function mount(props) {
  console.log("app mount");
  props.onGlobalStateChange((state) => {
    basePath = state.path;
  }, true);
  render(props);
}

export async function unmount(props) {
  console.log("app unmount");
  root?.unmount?.();
}

export async function bootstrap() {
  console.log("app bootstraped");
}
