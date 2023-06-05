import React, { useEffect, useMemo, useState } from "react";
import { Table, Space, Button, message, Modal } from "antd";
import "antd/dist/antd.min.css";
import * as api from "../../service/app";
import AddAppDialog from "../../../components/AddAppDialog";

export interface App {
  id: string;
  name: string;
  path: string;
  entry: string;
  describe?: string;
}

const render = (v: any) => v || "-";

export default function () {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<App[]>([]);
  const selectedRowKeys = useMemo(() => {
    return selectedRows.map((x) => x.id);
  }, [selectedRows]);

  const [dataSource, setDataSource] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<App | undefined>(undefined);
  const [delVisible, setDelVisible] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
  }>({
    current: 1,
    pageSize: 10,
  });

  const columns: any[] = [
    { title: "子应用名称", dataIndex: "name", render },
    { title: "入口地址", dataIndex: "entry", render },
    { title: "应用类型", dataIndex: "type", render },
    { title: "描述", dataIndex: "describe", width: 250, render },
    {
      title: "操作",
      width: 150,
      render(item: any) {
        return (
          <Space>
            <a onClick={() => handleEdit(item)}>编辑</a>
            <a onClick={() => handleDel(item)}>删除</a>
          </Space>
        );
      },
    },
  ];

  function fetch() {
    setLoading(true);
    api.fetchApps().then((res) => {
      if (res?.success) {
        setLoading(false);
        setDataSource(res?.result || []);
        setPagination({ ...pagination, current: 1 });
      } else {
        message.error(res?.errorMsg);
      }
    });
  }

  function handleEdit(item: App) {
    setIsAdd(false);
    setAddVisible(true);
    setCurrentItem(item);
  }

  function handleAdd() {
    setIsAdd(true);
    setAddVisible(true);
    setCurrentItem(undefined);
  }

  function handleDel(item: App) {
    setCurrentItem(item);
    setDelVisible(true);
  }

  function handleDelSome() {
    if (!selectedRows?.length) {
      message.warn('请至少勾选一项')
      return
    }
    setCurrentItem(undefined);
    setDelVisible(true);
  }

  function del() {
    const isDeleteOne = !!currentItem;
    const ids = (isDeleteOne ? [currentItem?.id] : selectedRowKeys).join(",");
    api.delApp(ids).then((res: any) => {
      if (res.success) {
        message.success("删除成功");
        setDelVisible(false);
        setSelectedRows((selectedRows) =>
          isDeleteOne ? selectedRows.filter((x) => x.id !== currentItem.id) : []
        );
        fetch();
      } else {
        message.error(res.errorMsg);
      }
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div style={{ background: 'white' }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => handleAdd()}>
          新增
        </Button>
        <Button onClick={() => handleDelSome()}>批量删除</Button>
      </Space>
      <Table
        bordered
        rowSelection={{
          selectedRowKeys,
          onChange: (_, selectedRows: any[] = []) => {
            setSelectedRows(selectedRows);
          },
        }}
        rowKey={"id"}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: dataSource.length,
          current: pagination.current,
          pageSize: pagination.pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />

      <AddAppDialog
        isAdd={isAdd}
        data={currentItem}
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        onOk={() => {
          setAddVisible(false);
          fetch();
        }}
      />

      <Modal
        centered
        visible={delVisible}
        title="提醒"
        onCancel={() => setDelVisible(false)}
        onOk={del}
      >
        确定删除子应用“
        {currentItem?.name || selectedRows?.map((x) => x?.name)?.join(",")}”？
      </Modal>
    </div>
  );
}
