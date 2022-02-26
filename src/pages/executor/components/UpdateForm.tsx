import React from 'react';
import {Form, Button, Input, Modal} from 'antd';
import type {Instance} from "../data";

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<Instance>) => void;
  onSubmit: (values: Partial<Instance>) => void;
  updateModalVisible: boolean;
  values: Partial<Instance>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue: any = await form.validateFields();
    handleUpdate({
      ...values,
      ...fieldsValue,
    });
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑实例"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          clientId: values.clientId,
          onlineTime: values.onlineTime,
          status: values.status,
          weight: values.weight,
        }}
      >
        <FormItem
          name="weight"
          label="权重"
          rules={[{ required: true, message: '请输入实例权重！' }]}
        >
          <Input placeholder="请输入实例权重" min={1} max={100}/>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
