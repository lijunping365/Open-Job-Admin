import React, {useCallback, useEffect, useState} from 'react';
import {Form, Button, Input, Modal, Row, Col, message, Select} from 'antd';
import CronModal from "@/components/CronModel";
import {fetchOpenJobAppList, validateCronExpress} from "@/services/open-job/api";

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<API.OpenJob>) => void;
  onSubmit: (values: Partial<API.OpenJob>) => void;
  updateModalVisible: boolean;
  values: Partial<API.OpenJob>;
}

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const [form] = Form.useForm();
  const [cronModalVisible, handleCronModalVisible] = useState<boolean>(false);
  const [cronExpressValue, setCronExpressValue] = useState<any>(values.cronExpression);
  const [openJobAppOptions, setOpenJobAppOptions] = useState<React.ReactNode[]>([]);

  const onFetchOpenJobAppList = useCallback(async () => {
    const result: API.OpenJobApp[] = await fetchOpenJobAppList();
    if (result){
      const options = result.map(app=>{
        return <Option value={app.id}>{app.appName}</Option>
      });
      setOpenJobAppOptions(options);
    }
  }, []);

  useEffect(()=>{
    onFetchOpenJobAppList().then();
  },[]);

  const handleSave = async () => {
    const fieldsValue: any = await form.validateFields();
    if(!cronExpressValue || cronExpressValue.length === 0){
      message.error("cron 表达式不能为空");
      return;
    }
    const result = await validateCronExpress(cronExpressValue);
    if(!result || result !== 'success'){
      message.error("cron 校验失败，请重新输入");
      return;
    }
    handleUpdate({
      ...values,
      ...fieldsValue,
      cronExpression: cronExpressValue
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
      width={900}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑调度任务"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          appId: values.appId,
          jobName: values.jobName,
          handlerName: values.handlerName,
          params: values.params,
        }}
      >
        <Row>
          <Col span={12}>
            <FormItem
              name="jobName"
              label="任务名称"
              rules={[{ required: true, message: '请输入任务名称！' }]}
            >
              <Input placeholder="请输入任务名称" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="handlerName"
              label="handlerName"
              rules={[{ required: true, message: '请输入handlerName！' }]}
            >
              <Input placeholder="请输入handlerName" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="appId"
              label="选择应用"
              hasFeedback
              rules={[{ required: true, message: '请选择应用!' }]}
            >
              <Select
                showSearch
                filterOption={(inputValue, option) =>
                  option!.children.indexOf(inputValue) !== -1
                }
              >
                {openJobAppOptions}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="cronExpression"
              rules={[{ required: true, message: '请输入Cron 表达式！' }]}
              label="Cron 表达式"
            >
              <Input.Group compact style={{display: 'flex'}}>
                <Input placeholder="请输入Cron 表达式"  value={cronExpressValue} onChange={(e)=>setCronExpressValue(e.target.value)}/>
                <Button
                  type="primary"
                  onClick={() => {
                    handleCronModalVisible(true);
                  }}
                >
                  Cron 工具
                </Button>
              </Input.Group>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="params"
              label="任务参数"
            >
              <TextArea rows={4}  placeholder="请输入任务参数（json 格式）" />
            </FormItem>
          </Col>
        </Row>

        <CronModal
          cronExpressValue={cronExpressValue && cronExpressValue.length !== 0 ? cronExpressValue : "* * * * * ? *"}
          modalVisible={cronModalVisible}
          onCancel={() => handleCronModalVisible(false)}
          onSubmit={(value)=>{
            setCronExpressValue(value);
            handleCronModalVisible(false);
          }}
        />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
