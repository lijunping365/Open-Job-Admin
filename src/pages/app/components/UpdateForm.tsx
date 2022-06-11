import React from 'react';
import {Form, Button, Input, Modal} from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.OpenJob>) => void;
  onSubmit: (values: Partial<API.OpenJob>) => void;
  updateModalVisible: boolean;
  values: Partial<API.OpenJobApp>;
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

  const handleSave = async () => {
    const fieldsValue: any = await form.validateFields();
    handleUpdate({
      ...values,
      ...fieldsValue
    });
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleSave()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={600}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑应用"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          appName: values.appName,
          appDesc: values.appDesc
        }}
      >
        <FormItem
          name="appName"
          label="应用名称"
          rules={[{ required: true, message: '请输入应用名称！' }]}
        >
          <Input placeholder="请输入应用名称" />
        </FormItem>
        <FormItem
          name="appDesc"
          label="应用描述"
          rules={[{ required: true, message: '请输入应用描述！' }]}
        >
          <Input placeholder="请输入应用描述" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
