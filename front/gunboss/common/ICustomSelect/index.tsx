import React, { useMemo, useState } from "react";
import { Select } from "antd";
import { useDebounce, useEffectOnce, useUpdateEffect } from "react-use";
import { IOption, localSearchFn } from "./type";
import { useStateWithRef } from "../../hooks/useStateWithRef";

export interface ICustomSelectProps {
  defaultFirst?: boolean; // 默认选中第一个  // 会在onChange里回调
  disabled?: boolean;
  all?: boolean; // 是否可选 全部
  allName?: string; // 全部名称
  value?: string; // 外部控制值
  placeholder?: string; // 提示符
  style?: React.CSSProperties; // 样式
  debounceTime?: number; // 防抖延时
  showSearch?: boolean; // 是否启用模糊搜索
  isLocalSearch?: boolean; // 是否本地搜索。true：是。false：防抖调用 searchFn || requestFn
  filterOption?: (inputV: string, option: any, dataMap: any) => boolean; // 本地搜索过滤项，在antd基础上加了新的参数
  effectParams?: any[]; // 用于触发请求方法。可在下拉框联动时使用此参数
  requestFn?: (keyword?: string) => PromiseLike<IOption[]>; // 初次请求的方法
  searchFn?: (keyword?: string) => PromiseLike<IOption[]>; // 备用模糊搜索的方法
  onChange?: (key?: string, value?: string, dataMap?: any) => void;
}
/**
 * 通用下拉框模板
 *
 * At 2022.05.11
 * By TangJiaHui
 */
export default function ICustomSelect(props: ICustomSelectProps) {
  const {
    defaultFirst,
    disabled,
    all,
    allName = "全部",
    value = undefined,
    placeholder = "请选择",
    style = {},
    debounceTime = 500,
    showSearch = true,
    isLocalSearch = true,
    effectParams = [],
    searchFn = undefined,
    filterOption = undefined,
    requestFn = () => Promise.resolve([]),
    onChange,
  } = props;

  const [keyword, setKeyword] = useState<string>("");
  const [optionList, setOptionList] = useState<IOption[]>([]);
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    undefined
  );
  const [dataMap, setDataMap] = useState<any>({});

  const [_, setIsFirstSet, isFirstSetRef] = useStateWithRef<boolean>(false); // 是否设置过第一次值了

  function query(keyword: string = "") {
    requestFn?.(keyword).then((list = []) => {
      const dataMap: any = {};
      list.forEach((x: any) => {
        dataMap[x?.key] = x;
      });
      setDataMap(dataMap);
      setOptionList(list?.map((x: any) => ({ ...x, key: `${x?.key || ""}` })));

      if (!isFirstSetRef.current && defaultFirst) {
        onChange?.(list?.[0]?.key, list?.[0]?.value, dataMap);
        setIsFirstSet(true);
      }
    });
  }

  useDebounce(
    () => {
      (searchFn || requestFn)?.(keyword)?.then((list = []) => {
        const dataMap: any = {};
        list.forEach((x: any) => {
          dataMap[x?.key] = x;
        });
        setDataMap(dataMap);
        setOptionList(
          list?.map((x: any) => ({ ...x, key: `${x?.key || ""}` }))
        );
      });
    },
    debounceTime,
    [keyword]
  );

  function getFilterOption(inputV: string, option: any) {
    return filterOption?.(inputV, option, dataMap);
  }

  useEffectOnce(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }

    query("");
  });

  useUpdateEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useUpdateEffect(() => {
    query("");
  }, [useMemo(() => effectParams, effectParams)]);

  return (
    <Select
      disabled={disabled}
      style={style}
      value={currentValue}
      placeholder={placeholder}
      showSearch={showSearch}
      filterOption={
        showSearch && isLocalSearch
          ? filterOption
            ? getFilterOption
            : localSearchFn
          : false
      }
      onBlur={() => keyword !== "" && query("")}
      onSearch={showSearch && !isLocalSearch ? (k) => setKeyword(k) : undefined}
      onChange={(k, options?: any) => {
        onChange?.(k, options.children, dataMap);
        if (value !== undefined) return;
        setCurrentValue(k);
      }}
      onSelect={() => {
        query(""); // 选中一项后重置为初始列表
      }}
    >
      {all && (
        <Select.Option key={""} value={""}>
          {allName}
        </Select.Option>
      )}
      {optionList?.map((x: IOption) => {
        return (
          <Select.Option key={`${x.key || ""}`} value={`${x.key || ""}`}>
            {x.value}
          </Select.Option>
        );
      })}
    </Select>
  );
}
