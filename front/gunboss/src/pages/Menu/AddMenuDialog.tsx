import { Modal, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import ICustomSelect from "../../../common/ICustomSelect";
import * as api from "../../service/app";
import { App } from "../App";
import * as menuApi from "../../service/menuItem";
import cloneDeep from "lodash/cloneDeep";

interface IProps {
  data?: any;
  isAdd?: boolean;
  dataSource: any[];
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}
export default function AddMenuDialog(props: IProps) {
  const [form] = Form.useForm();

  function getDataSource(values: any) {
    if (props?.isAdd) return props?.dataSource || [];
    const dataSourceCopy = cloneDeep(props?.dataSource || []);
    const target = dataSourceCopy.find((x) => x?.id === props?.data?.id);
    if (target) {
      target.title = values.title;
      target.path = values.path;
      target.appId = values.appId;
    }
    return dataSourceCopy;
  }

  function handleAdd() {
    form
      .validateFields()
      .then((values) => {
        const saveDataSource = getDataSource(values).map((x) => {
          return {
            title: x?.title,
            path: x?.path,
            appId: x?.appId,
          };
        });
        if (props?.isAdd) saveDataSource.unshift(values);
        menuApi.saveMenu(saveDataSource).then((res: any) => {
          if (res?.success) {
            message.success("新增成功");
            props?.onOk?.();
          } else {
            message.error(res?.errorMsg);
          }
        });
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (props?.visible) {
      if (!props?.isAdd) {
        form.setFieldsValue({
          title: props?.data?.title,
          path: props?.data?.path,
          appId: props?.data?.appId,
        });
      }
    } else {
      form.resetFields();
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      visible={props?.visible}
      title={`${props.isAdd ? "新增" : "编辑"}菜单`}
      bodyStyle={{
        height: 200,
      }}
      onCancel={props?.onCancel}
      onOk={handleAdd}
    >
      <Form form={form} labelCol={{ span: 5 }}>
        <Form.Item
          label="菜单名称"
          required
          name="title"
          rules={[{ required: true, message: "请输入" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="路由地址"
          required
          name="path"
          rules={[{ required: true, message: "请输入" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="子应用"
          required
          name="appId"
          rules={[{ required: true, message: "请选择" }]}
        >
          <ICustomSelect
            requestFn={() =>
              api.fetchApps().then((res) => {
                return res?.result?.map((app: App) => {
                  return {
                    key: app.id,
                    value: app.name,
                  };
                });
              })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
