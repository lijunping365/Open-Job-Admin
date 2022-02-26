import React, {useState} from 'react';
import {Form, Button, Input, Modal, Select, Col, Row, Space, AutoComplete} from 'antd';
import type {Spider} from "../data";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Headers, ContentTypes, Methods, Targets} from "../common"

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: Partial<Spider>) => void;
  onSubmit: (values: Partial<Spider>) => void;
  updateModalVisible: boolean;
  values: Partial<Spider>;
}
const FormItem = Form.Item;
const { Option } = Select;

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [method, setMethod] = useState(Methods[0]);
  const [targetType, setTargetType] = useState(Targets[0]);


  const {
    onSubmit: handleSubmit,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleUpdate = async () => {
    const fieldsValue: any = await form.validateFields();
    const {headers} = fieldsValue;
    const {params} = fieldsValue;
    handleSubmit({
      ...values,
      ...fieldsValue,
      method,
      targetType,
      headers: headers ? JSON.stringify(headers): "",
      params: params ? JSON.stringify(params): ""
    });
  };

  const handleSpiderTypeSelect = (op: string) => {
    setTargetType(op);
  };

  const handleMethodSelect = (op: string) => {
    setMethod(op);
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleUpdate()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={900}
      destroyOnClose
      title="编辑爬虫"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: values.id,
          name: values.name,
          url: values.url,
          method: values.method,
          params: values.params ? JSON.parse(values.params) : [],
          headers: values.headers ? JSON.parse(values.headers) : [],
          rootPath: values.rootPath,
          targetType: values.targetType,
        }}
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
              rules={[{ required: true, message: '请选择请求方式！' }]}
            >
              <Select defaultValue={values.method} onChange={handleMethodSelect}>
                {Methods.map(m => (
                  <Option value={m}>{m}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="targetType"
              label="爬取目标"
            >
              <Select defaultValue={values.targetType} onChange={handleSpiderTypeSelect}>
                {Targets.map(m => (
                  <Option value={m}>{m}</Option>
                ))}
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

export default UpdateForm;
