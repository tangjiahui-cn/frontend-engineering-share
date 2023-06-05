import { createContext, useContext } from "react";
import { MenuType } from "./service/app";

/**
 * 主应用全局状态管理
 *
 * At 2023/05/16
 */
const GlobalContext = createContext<{ menus: MenuType[] }>({ menus: [] });
export const GlobalProvider = GlobalContext.Provider;
export const useGlobalContext = () => useContext(GlobalContext);
