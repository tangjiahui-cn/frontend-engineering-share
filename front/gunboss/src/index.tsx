import React from "react";
import ReactDOM from "react-dom/client";
import "../public-path";
import { ConfigProvider } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./pages";
import zh_CN from "antd/lib/locale/zh_CN";
import Menu from "./pages/Menu";
import App from "./pages/App";

// @ts-ignore
const background = window.__POWERED_BY_QIANKUN__ ? "transparent" : "whitesmoke";

function getRouter(basePath: string) {
  // @ts-ignore
  const basename = window.__POWERED_BY_QIANKUN__ ? basePath : "/gunboss";
  return createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <ConfigProvider locale={zh_CN}>
            <div
              style={{
                padding: 16,
                background,
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                minHeight: "100%",
              }}
            >
              <Page />
            </div>
          </ConfigProvider>
        ),
        children: [
          {
            path: "menu",
            element: <Menu />,
          },
          {
            path: "app",
            element: <App />,
          },
        ],
      },
    ],
    {
      basename 
    }
  );
}

let root: any;          // 应用react实例
let basePath: string;   // 从主应用获取匹配路由的basePath

export function render(props: any) {
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

export async function mount(props: any) {
  console.log("app mount");
  props.onGlobalStateChange((state: any) => {
    basePath = state.path;
  }, true);
  render(props);
}

export async function unmount(props: any) {
  console.log("app unmount");
  root?.unmount?.();
}

export async function bootstrap() {
  console.log("app bootstraped");
}