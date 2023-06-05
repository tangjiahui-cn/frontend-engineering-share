import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { registerMicroApps } from "qiankun";
import "antd/dist/antd.min.css";
import App from "./pages";
import * as api from "./service/app";
import type { MenuType } from "./service/app";
import { GlobalProvider } from "./GlobalContext";

export interface App {
  path: string; // 激活路径（唯一值）
  name: string; // 子应用展示名称
  entry: string; // 子应用地址
}

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/console");
  }, []);

  return <></>;
}

/**
 * 动态路由加载组件
 *
 * At 2023/05/16
 * Tips: 查询所有的子应用信息并生成路由、左侧菜单
 */
export default function RouterWrapper() {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [router, setRouter] = useState<any>(null);

  // 生成子应用路由表
  function genRouter(menus: MenuType[]) {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/console",
        element: <App />,
        children: menus.map((menu) => {
          return {
            path: menu.path + "/*",
          };
        }),
      },
    ]);
    return router;
  }

  // 注册子应用
  function registerApps(menus: MenuType[]) {
    const registerAppsInfo = menus.map((menu: MenuType) => ({
      name: menu.title,
      entry: menu.app.entry,
      // 测试本地子应用
      // entry: menu.app.entry === '/app' ? 'http://localhost:10001': menu.app.entry,
      // entry: menu.app.entry === '/gunboss' ? 'http://localhost:10000/' : menu.app.entry,
      container: "#child",
      activeRule: menu.path,
    }));
    console.log("->", registerAppsInfo);
    registerMicroApps(registerAppsInfo);
  }

  useEffect(() => {
    api.getMenu().then((res: any) => {
      const menus: api.MenuType[] = res?.result || [];
      const router = genRouter(menus);
      setRouter(router);
      registerApps(menus);
      setMenus(menus);
    });
  }, []);

  return (
    <GlobalProvider value={{ menus }}>
      {router && <RouterProvider router={router} />}
    </GlobalProvider>
  );
}
