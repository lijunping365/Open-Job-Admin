import React from 'react';
import {Form, Input, Modal} from 'antd';
import type {OpenJob} from "../data";
import CronComponent from "@/pages/openJob/components/CronComponent";

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: Partial<OpenJob>) => void;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleNext = async () => {
    const fieldsValue: any = await form.validateFields();
    handleCreate({
      ...fieldsValue,
    });
  };

  const setInputValue = (value: string) => {
    console.log('onInputChange', value);
    form.setFieldsValue({
      cronExpression: value,
    });
  }

  return (
    <Modal
      destroyOnClose
      title="新建任务"
      width={640}
      visible={modalVisible}
      onCancel={() => handleCreateModalVisible(false)}
      onOk={() => handleNext()}
    >
      <Form
        {...formLayout}
        form={form}
      >
        <FormItem
          name="cronExpression"
          label="Cron 表达式"
          rules={[{ required: true, message: '请输入Cron 表达式！' }]}
        >
          <Input placeholder="请输入Cron 表达式" defaultValue={"* * * * * * ?"}/>
        </FormItem>
        <CronComponent/>
      </Form>
    </Modal>
  );
};

export default CreateForm;
