import { request } from "./index";

export async function getMenu() {
  return request.get(`/home/api/menuItem/get`)
}

export async function saveMenu(data: {
  title: string;
  appId: string;
}[]) {
  return request.post(`/home/api/menuItem/save`, data)
}