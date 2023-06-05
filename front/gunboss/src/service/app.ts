import { App } from "../pages/App";
import { request } from "./index";

// 查询所有的apps
export async function fetchApps(): Promise<any> {
  return request.get(`home/api/apps`);
}

// 新增一个app
export async function addApp(data: App) {
  return request.post(`home/api/add`, data)
}

// 编辑一个app
export async function updateApp(data: App) {
  return request.post(`home/api/update`, data);
}

// 删除一个app
export async function delApp(ids: string) {
  const data: any = {ids}
  return request.post<any>(`home/api/delete`, data);
}

// 更新一个app的修改时间
export async function updateAppModifyGmt(id: any) {
  return request.post<any>('home/api/updateModifyGmt', {
    id
  })
}