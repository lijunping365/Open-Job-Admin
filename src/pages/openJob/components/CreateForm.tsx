import React from 'react';
import {Divider, Form, Input, List, Modal, Typography} from 'antd';
import type { OpenJob } from "../data";
import CronComponent from "./CronComponent";
import { data } from './CronData';

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
  const [inputValue, setInputValue] = React.useState("* * * * * ? *");
  const [errMsg, setErrMsg] = React.useState("");

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

  const handlerInput = (index: number,value: string) => {
    console.log('onInputChange', value);
    const regs = inputValue.split(' ');
    regs[index] = value;
    const tempValue = regs.join(' ');
    setInputValue(tempValue);
    form.setFieldsValue({
      cronExpression: tempValue,
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
          <Input placeholder="请输入Cron 表达式" defaultValue={inputValue}/>
        </FormItem>
        <CronComponent
          onChange={handlerInput}
        />
        <Divider orientation="left">最近运行时间</Divider>
        {errMsg?.length !== 0 && (
          <Typography.Text>{errMsg}</Typography.Text>
        )}
        {errMsg?.length === 0 && (
          <List
            dataSource={data}
            size="small"
            renderItem={item => (
              <List.Item>
                <Typography.Text>{item}</Typography.Text>
              </List.Item>
            )}
          />
        )}

      </Form>
    </Modal>
  );
};

export default CreateForm;
