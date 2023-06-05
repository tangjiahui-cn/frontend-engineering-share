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
      // @ts-ignore
      basename: window.__POWERED_BY_QIANKUN__ ? basePath : "/",
    }
  );
}

let root: any;     // React应用实例
let basePath: string; // 从主应用获取匹配路由前缀 (/console/xxx)

export function render(props: any) {
  const dom = (props?.container || document).querySelector("#root");
  root = ReactDOM.createRoot(dom);
  root.render(<RouterProvider router={getRouter(basePath)} />);
}
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function mount(props: any) {
  console.log("index app mount");
  props.onGlobalStateChange((state: any) => {
    basePath = state.path;
  }, true);
  render(props);
}

export async function unmount(props: any) {
  console.log("index app unmount");
  root?.unmount?.();
}

export async function bootstrap() {
  console.log("index app bootstraped");
}
