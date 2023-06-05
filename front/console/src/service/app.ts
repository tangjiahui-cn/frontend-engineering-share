import { App } from "../RouterWrapper";
import axios from "axios";

export type MenuType = {
  title: string;
  path: string;
  appId: string;
  app: App;
};

export async function getMenu() {
  return new Promise((resolve) => {
    try {
      axios.get(`/home/api/menuItem/get`).then((res) => {
        return resolve(res.data);
      });
    } catch {
      return resolve([]);
    }
  });
}

export async function fetchApps(): Promise<App[]> {
  return new Promise((resolve) => {
    try {
      axios.get(`/home/api/apps`).then((res) => {
        return resolve(res.data);
      });
    } catch {
      return resolve([]);
    }
  });
}
