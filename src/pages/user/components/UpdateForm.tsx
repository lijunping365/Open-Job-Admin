import React from 'react';
import { Form, Button, Input, Modal } from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.User>) => void;
  onSubmit: (values: Partial<API.User>) => void;
  updateModalVisible: boolean;
  values: Partial<API.User>;
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
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...values, ...fieldsValue});
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
      title="用户编辑"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          username: values.username,
          phone: values.phone,
        }}
      >
        <FormItem
          name="username"
          label="用户名称"
          rules={[{ required: true, message: '请输入用户名称！'}]}
        >
          <Input placeholder="请输入用户名称" />
        </FormItem>

        <FormItem
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '请输入手机号！' }]}
        >
          <Input placeholder="请输入手机号" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
