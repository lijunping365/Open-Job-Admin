import React, {useState} from 'react';
import {AutoComplete, Button, Col, Form, Input, Modal, Row, Select, Space} from 'antd';
import type {Spider} from "../data";
import {Headers, ContentTypes, Methods, Targets} from "../common"
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (values: Partial<Spider>) => void;
  onCancel: (flag?: boolean, formVals?: Partial<Spider>) => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16},
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14},
};

const FormItem = Form.Item;
const { Option } = Select;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [targetType, setTargetType] = useState(Targets[0]);
  const [method, setMethod] = useState(Methods[0]);
  const {
    modalVisible,
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
  } = props;

  const handleFinish = async () => {
    const fieldsValue: any = await form.validateFields();
    const formData = {
      ...fieldsValue,
      targetType,
      method
    }

    const {params} = fieldsValue;
    const {headers} = fieldsValue;
    if(params && params.length !== 0){
      formData.params = JSON.stringify(params);
    }
    if(headers && headers.length !== 0){
      formData.headers = JSON.stringify(headers);
    }

    console.log(formData);
    handleCreate(formData);
  };

  const handleSelectMethod = (op: number) => {
    setMethod(Methods[op]);
  };

  const handleSelectSpider = (op: number) => {
    setTargetType(Targets[op]);
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
      title="新建爬虫"
      visible={modalVisible}
      onCancel={() => handleCreateModalVisible()}
      footer={renderFooter()}
      width={900}
    >
      <Form
        {...formLayout}
        form={form}
      >
        <Row>
          <Col span={12}>
            <FormItem
              name="name"
              label="爬虫名称"
              rules={[{ required: true, message: '请输入爬虫名称！' }]}
            >
              <Input placeholder="请输入爬虫名称" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="url"
              label="目标url"
              rules={[{ required: true, message: '请输入爬虫url！' }]}
            >
              <Input placeholder="请输入爬虫url" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="method"
              label="请求方式"
            >
              <Select defaultValue={0} onChange={handleSelectMethod}>
                <Option value={0}>GET</Option>
                <Option value={1}>POST</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="targetType"
              label="爬取目标"
            >
              <Select defaultValue={1} onChange={handleSelectSpider}>
                <Option value={1}>JSON</Option>
                <Option value={0}>PAGE</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="rootPath"
              label="设根节点"
            >
              <Input placeholder="请输入数据根节点" />
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="params"
              label="请求参数"
            >
              <Form.List name="params">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'name']}
                        >
                          <Input placeholder="name" style={{'width':130}}/>
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <Input placeholder="value" style={{'width':260}}/>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem
              name="headers"
              label="设请求头"
            >
              <Form.List name="headers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'name']}
                        >
                          <AutoComplete
                            style={{ width: 130 }}
                            options={Headers}
                            placeholder="name"
                            filterOption={(inputValue, option) =>
                              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          name={[name, 'value']}
                        >
                          <AutoComplete
                            style={{ width: 260 }}
                            options={ContentTypes}
                            placeholder="value"
                            filterOption={(inputValue, option) =>
                              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加一行
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Modal>
  );
};

export default CreateForm;
