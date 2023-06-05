import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { App } from "../../src/pages/App";
import * as api from "../../src/service/app";

interface IProps {
  isAdd?: boolean;
  data?: App;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}
export default function (props: IProps) {
  const [form] = Form.useForm();

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        (props?.isAdd ? api.addApp : api.updateApp)?.({
          ...values,
          id: props?.data?.id
        }).then(
          (res: any) => {
            if (res?.success) {
              message.success("操作成功");
              props?.onOk?.();
            } else {
              message.error(res?.errorMsg);
            }
          }
        );
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (props?.visible) {
      if (props?.isAdd) {
        form.resetFields();
      } else {
        form.setFieldsValue(props?.data || { type: "React" });
      }
    } else {
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      title={`${props?.isAdd ? "新增" : "编辑"}子应用`}
      visible={props?.visible}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Form form={form} labelCol={{ sm: 5 }} initialValues={{ type: "React" }}>
        <Form.Item
          label="子应用名称"
          name="name"
          rules={[{ required: true, message: "请填写" }]}
        >
          <Input maxLength={250} placeholder="请填写" />
        </Form.Item>
        <Form.Item
          label="入口地址"
          name="entry"
          rules={[{ required: true, message: "请填写" }]}
        >
          <Input maxLength={250} placeholder="请填写" />
        </Form.Item>
        <Form.Item
          label="应用类型"
          name="type"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Select
            placeholder="请选择"
            options={[
              {
                label: "React",
                value: "React",
              },
              {
                label: "Vue2",
                value: "Vue2",
              },
              {
                label: "Vue3",
                value: "Vue3",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="描述" name="describe">
          <Input.TextArea
            maxLength={250}
            placeholder="请填写"
            autoSize={{ maxRows: 3, minRows: 3 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
