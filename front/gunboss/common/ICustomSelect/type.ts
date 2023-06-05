export interface IOption {
  key?: string;
  value?: string
}

export const localSearchFn = (key: string, options?: any) => (options?.children || '')
  .toLowerCase().includes(key.toLowerCase())
