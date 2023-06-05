import { Space, Button, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { App } from "../App";
import AddMenuDialog from "./AddMenuDialog";
import * as api from "../../service/menuItem";

export default function () {
  const id = useRef(0);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any>(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const columns: any[] = [
    { title: "菜单名称", dataIndex: "title" },
    { title: "路由地址", dataIndex: "path" },
    { title: "子应用", dataIndex: "appName" },
    {
      title: "操作",
      width: 300,
      render(x: any, _: any, index: number) {
        return (
          <Space>
            <a onClick={() => handleClick("edit", x, index)}>编辑</a>
            <a onClick={() => handleClick("delete", x, index)}>删除</a>
            <a onClick={() => handleClick("up", x, index)}>上移</a>
            <a onClick={() => handleClick("down", x, index)}>下移</a>
            <a onClick={() => handleClick("top", x, index)}>置顶</a>
            <a onClick={() => handleClick("bottom", x, index)}>置底</a>
          </Space>
        );
      },
    },
  ];

  function handleClick(
    type: string,
    app: App & { key: string },
    index: number
  ) {
    switch (type) {
      case "edit":
        setCurrentItem(app);
        setIsAdd(false);
        setAddVisible(true);
        break;
      case "delete":
        setDataSource((list) => {
          const dataSource = list.filter((x) => x.id !== app.id);
          handleSave(dataSource);
          return dataSource;
        });
        break;
      case "up":
        setDataSource((list) => {
          if (index > 0) {
            let temp = list[index - 1];
            list[index - 1] = list[index];
            list[index] = temp;
          }
          const dataSource = [...list];
          handleSave(dataSource);
          return dataSource;
        });
        break;
      case "down":
        setDataSource((list) => {
          if (index < list.length - 1) {
            let temp = list[index + 1];
            list[index + 1] = list[index];
            list[index] = temp;
          }
          const dataSource = [...list];
          handleSave(dataSource);
          return dataSource;
        });
        break;
      case "top":
        setDataSource((list) => {
          const pre = list.slice(0, index);
          const last = list.slice(index + 1);
          const dataSource = [list[index], ...pre, ...last];
          handleSave(dataSource);
          return dataSource;
        });
        break;

      case "bottom":
        setDataSource((list) => {
          const pre = list.slice(0, index);
          const last = list.slice(index + 1);
          const dataSource = [...pre, ...last, list[index]];
          handleSave(dataSource);
          return dataSource;
        });
        break;
    }
  }

  function handleSave(dataSource: any[]) {
    api
      .saveMenu(
        dataSource.map((x) => {
          return {
            title: x?.title,
            appId: x?.appId,
            path: x?.path,
          };
        })
      )
      .then((res: any) => {
        if (res?.success) {
          message.success("操作成功");
          handleFetch();
        } else {
          message.error(res?.errorMsg);
        }
      });
  }

  function handleFetch() {
    setLoading(true);
    api.getMenu().then((res: any) => {
      if (res?.success) {
        setLoading(false);
        setDataSource(
          res?.result?.map((x: any) => {
            return {
              ...x,
              id: id.current++,
              appName: x?.app?.name,
            };
          }) || []
        );
      } else {
        message.error(res?.errorMsg);
      }
    });
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setAddVisible(true);
            setCurrentItem(null);
            setIsAdd(true);
          }}
        >
          新增菜单
        </Button>
      </Space>

      <Table
        loading={loading}
        style={{ padding: "16px 0" }}
        pagination={false}
        columns={columns}
        rowKey={"id"}
        dataSource={dataSource}
      />

      <AddMenuDialog
        isAdd={isAdd}
        data={currentItem}
        dataSource={dataSource}
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        onOk={() => {
          setAddVisible(false);
          handleFetch();
        }}
      />
    </div>
  );
}
