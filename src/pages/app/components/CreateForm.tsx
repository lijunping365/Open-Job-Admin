import React from 'react';
import {Button, Form, Input, Modal} from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: Partial<API.OpenJob>) => void;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  /** 新建窗口的弹窗 */
  const [form] = Form.useForm();

  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleFinish = async () => {
    const fieldsValue: any = await form.validateFields();
    handleCreate({
      ...fieldsValue,
    });
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleCreateModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleFinish()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="新建应用"
      width={600}
      visible={modalVisible}
      footer={renderFooter()}
      onCancel={() => handleCreateModalVisible(false)}
      onOk={() => handleFinish()}
    >
      <Form
        {...formLayout}
        form={form}
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

export default CreateForm;
