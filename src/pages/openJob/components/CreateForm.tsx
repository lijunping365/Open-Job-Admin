import React, {useEffect} from 'react';
import {Form, Input, Modal, Tabs, Radio, Space, Checkbox, Divider, List, Typography} from 'antd';
import type {OpenJob} from "../data";

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: Partial<OpenJob>) => void;
}

const FormItem = Form.Item;
const { TabPane } = Tabs;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const plainOptions = [
  '00', '01', '02', '03','04','05','06','07','08','09',
  '10', '11', '12', '13','14','15','16','17','18','19',
  '20', '21', '22', '23','24','25','26','27','28','29',
  '30', '31', '32', '33','34','35','36','37','38','39',
  '40', '41', '42', '43','44','45','46','47','48','49',
  '50', '51', '52', '53','54','55','56','57','58','59',
];

const hourOptions = [
  '00', '01', '02', '03','04','05','06','07','08','09',
  '10', '11', '12', '13','14','15','16','17','18','19',
  '20', '21', '22', '23',
];

const dayOptions = [
  '01', '02', '03','04','05','06','07','08','09', '10',
  '11', '12', '13','14','15','16','17','18','19', '20',
  '21', '22', '23','24','25','26','27','28','29', '30',
  '31',
];

const monthOptions = [
  '01', '02', '03','04','05','06','07','08','09', '10',
  '11', '12',
];

const weekOptions = [
  '1', '2', '3','4','5','6','7'
];


const data = [
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
  '2021-09-21 07:20:00',
];

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

  const [secondRadioValue, setSecondRadioValue] = React.useState();
  const [minutesRadioValue, setMinutesRadioValue] = React.useState();
  const [hourRadioValue, setHourRadioValue] = React.useState();
  const [dayRadioValue, setDayRadioValue] = React.useState();
  const [monthRadioValue, setMonthRadioValue] = React.useState();
  const [weekRadioValue, setWeekRadioValue] = React.useState();
  const [yearRadioValue, setYearRadioValue] = React.useState();

  const [secondCheckboxValue, setSecondCheckboxValue] = React.useState<string[]>([]);
  const [minutesCheckboxValue, setMinutesCheckboxValue] = React.useState<string[]>([]);
  const [hourCheckboxValue, setHourCheckboxValue] = React.useState<string[]>([]);
  const [dayCheckboxValue, setDayCheckboxValue] = React.useState<string[]>([]);
  const [monthCheckboxValue, setMonthCheckboxValue] = React.useState<string[]>([]);
  const [weekCheckboxValue, setWeekCheckboxValue] = React.useState<string[]>([]);

  const [secondCheckboxDisabled, setSecondCheckboxDisabled] = React.useState(true);
  const [minutesCheckboxDisabled, setMinutesCheckboxDisabled] = React.useState(true);
  const [hourCheckboxDisabled, setHourCheckboxDisabled] = React.useState(true);
  const [dayCheckboxDisabled, setDayCheckboxDisabled] = React.useState(true);
  const [monthCheckboxDisabled, setMonthCheckboxDisabled] = React.useState(true);
  const [weekCheckboxDisabled, setWeekCheckboxDisabled] = React.useState(true);


  const [second_cycle_1_value, setSecond_cycle_1_value] = React.useState<number>(1);
  const [second_cycle_2_value, setSecond_cycle_2_value] = React.useState<number>(2);
  const [second_from_value, setSecond_from_value] = React.useState<number>(0);
  const [second_to_value, setSecond_to_value] = React.useState<number>(1);

  const [minutes_cycle_1_value, setMinutes_cycle_1_value] = React.useState<number>(1);
  const [minutes_cycle_2_value, setMinutes_cycle_2_value] = React.useState<number>(2);
  const [minutes_from_value, setMinutes_from_value] = React.useState<number>(0);
  const [minutes_to_value, setMinutes_to_value] = React.useState<number>(1);

  const [hour_cycle_1_value, setHour_cycle_1_value] = React.useState<number>(1);
  const [hour_cycle_2_value, setHour_cycle_2_value] = React.useState<number>(2);
  const [hour_from_value, setHour_from_value] = React.useState<number>(0);
  const [hour_to_value, setHour_to_value] = React.useState<number>(1);

  const [day_cycle_1_value, setDay_cycle_1_value] = React.useState<number>(1);
  const [day_cycle_2_value, setDay_cycle_2_value] = React.useState<number>(2);
  const [day_from_value, setDay_from_value] = React.useState<number>(0);
  const [day_to_value, setDay_to_value] = React.useState<number>(1);
  const [day_last_value, setDay_last_value] = React.useState<number>(0);

  const [month_cycle_1_value, setMonth_cycle_1_value] = React.useState<number>(1);
  const [month_cycle_2_value, setMonth_cycle_2_value] = React.useState<number>(2);
  const [month_from_value, setMonth_from_value] = React.useState<number>(0);
  const [month_to_value, setMonth_to_value] = React.useState<number>(1);

  const [week_cycle_1_value, setWeek_cycle_1_value] = React.useState<number>(1);
  const [week_cycle_2_value, setWeek_cycle_2_value] = React.useState<number>(2);
  const [week_from_value, setWeek_from_value] = React.useState<number>(0);
  const [week_to_value, setWeek_to_value] = React.useState<number>(1);
  const [week_last_value, setWeek_last_value] = React.useState<number>(0);

  const [year_cycle_1_value, setYear_cycle_1_value] = React.useState<number>(1);
  const [year_cycle_2_value, setYear_cycle_2_value] = React.useState<number>(2);

  const [secondValue, setSecondValue] = React.useState('');
  const [minutesValue, setMinutesValue] = React.useState('');
  const [hourValue, setHourValue] = React.useState('');
  const [dayValue, setDayValue] = React.useState('');
  const [monthValue, setMonthValue] = React.useState('');
  const [weekValue, setWeekValue] = React.useState('');
  const [yearValue, setYearValue] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const cronParse = (cronExpress: string) =>{
    const regs = cronExpress.split(' ');
    setSecondValue(regs[0]);
    setMinutesValue(regs[1]);
    setHourValue(regs[2]);
    setDayValue(regs[3]);
    setMonthValue(regs[4]);
    setWeekValue(regs[5]);
  }

  const setInputValue = (value: string) => {
    console.log('onInputChange', value);
    form.setFieldsValue({
      cronExpression: value,
    });
  }

  useEffect(() => {
    if (!open) return;
    let result;
    const second = secondValue === "" ? "*" : secondValue;
    const minute = minutesValue === "" ? "*" : minutesValue;
    const hour = hourValue === "" ? "*" : hourValue;
    const day = dayValue === "" ? "*" : dayValue;
    const month = monthValue === "" ? "*" : monthValue;
    const week = weekValue === "" ? "?" : weekValue;
    if(yearValue!=="")
    {
      result = `${second} ${minute} ${hour} ${day} ${month} ${week} ${yearValue}`;
    }else {
      result = `${second} ${minute} ${hour} ${day} ${month} ${week}`;
    }
    setInputValue(result);
  }, [open, secondValue, minutesValue, hourValue, dayValue, monthValue, weekValue, yearValue]);


  const clearAndDisabledSecondCheckbox = () =>{
    setSecondCheckboxValue([]);
    setSecondCheckboxDisabled(true);
  }

  const clearAndDisabledMinutesCheckbox = () =>{
    setMinutesCheckboxValue([]);
    setMinutesCheckboxDisabled(true);
  }

  const clearAndDisabledHourCheckbox = () =>{
    setHourCheckboxValue([]);
    setHourCheckboxDisabled(true);
  }

  const clearAndDisabledDayCheckbox = () =>{
    setDayCheckboxValue([]);
    setDayCheckboxDisabled(true);
  }

  const clearAndDisabledMonthCheckbox = () =>{
    setMonthCheckboxValue([]);
    setMonthCheckboxDisabled(true);
  }

  const clearAndDisabledWeekCheckbox = () =>{
    setWeekCheckboxValue([]);
    setWeekCheckboxDisabled(true);
  }

  const onSecondChange = (e: any) => {
    const v = e.target.value;
    setSecondRadioValue(v);
    setOpen(true);
    switch (v) {
      case 1:
        clearAndDisabledSecondCheckbox();
        setSecondValue("*");
        break;
      case 2:
        clearAndDisabledSecondCheckbox();
        setSecondValue(`${second_cycle_1_value}-${second_cycle_2_value}`);
        break;
      case 3:
        clearAndDisabledSecondCheckbox();
        setSecondValue(`${second_from_value}/${second_to_value}`);
        break;
      case 4:
        setSecondCheckboxDisabled(false);
        break;
      default:
        break;
    }
  }

  const onMinutesChange = (e: any) => {
    const v = e.target.value;
    setMinutesRadioValue(v);
    setOpen(true);
    switch (v) {
      case 1:
        clearAndDisabledMinutesCheckbox();
        setMinutesValue("*");
        break;
      case 2:
        clearAndDisabledMinutesCheckbox();
        setMinutesValue(`${minutes_cycle_1_value}-${minutes_cycle_2_value}`);
        break;
      case 3:
        clearAndDisabledMinutesCheckbox();
        setMinutesValue(`${minutes_from_value}/${minutes_to_value}`);
        break;
      case 4:
        setMinutesCheckboxDisabled(false);
        break;
      default:
        break;
    }
  }

  const onHourChange = (e: any) => {
    const v = e.target.value;
    setHourRadioValue(v);
    setOpen(true);
    switch (v) {
      case 1:
        clearAndDisabledHourCheckbox();
        setHourValue("*");
        break;
      case 2:
        clearAndDisabledHourCheckbox();
        setHourValue(`${hour_cycle_1_value}-${hour_cycle_2_value}`);
        break;
      case 3:
        clearAndDisabledHourCheckbox();
        setHourValue(`${hour_from_value}/${hour_to_value}`);
        break;
      case 4:
        setHourCheckboxDisabled(false);
        break;
      default: break;
    }
  };

  const onDayChange = (e: any) => {
    const v = e.target.value;
    setDayRadioValue(v);
    setOpen(true);
    switch (v) {
      case 1:
        clearAndDisabledDayCheckbox();
        setDayValue("*");
        break;
      case 2:
        clearAndDisabledDayCheckbox();
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 3:
        clearAndDisabledDayCheckbox();
        setDayValue(`${day_cycle_1_value}-${day_cycle_2_value}`);
        break;
      case 4:
        clearAndDisabledDayCheckbox();
        setDayValue(`${day_from_value}/${day_to_value}`);
        break;
      case 5:
        clearAndDisabledDayCheckbox();
        setDayValue(`${day_last_value}`);
        break;
      case 6:
        clearAndDisabledDayCheckbox();
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 7:
        setDayCheckboxDisabled(false);
        break;
      default: break;
    }
  };

  const onMonthChange = (e: any) => {
    const v = e.target.value;
    setMonthRadioValue(v);
    setOpen(true);
    switch (v) {
      case 1:
        clearAndDisabledMonthCheckbox();
        setMonthValue("*");
        break;
      case 2:
        clearAndDisabledMonthCheckbox();
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 3:
        clearAndDisabledMonthCheckbox();
        setMonthValue(`${month_cycle_1_value}-${month_cycle_2_value}`);
        break;
      case 4:
        clearAndDisabledMonthCheckbox();
        setMonthValue(`${month_from_value}/${month_to_value}`);
        break;
      case 5:
        setMonthCheckboxDisabled(false);
        break;
      default: break;
    }
  };

  const onWeekChange = (e: any) => {
    const v = e.target.value;
    setWeekRadioValue(v);
    setOpen(true);
    switch (v) {
      case 1:
        clearAndDisabledWeekCheckbox();
        setWeekValue("*");
        break;
      case 2:
        clearAndDisabledWeekCheckbox();
        // $.fn.cronGen.tools.cycle("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 3:
        clearAndDisabledWeekCheckbox();
        setWeekValue(`${week_cycle_1_value}-${week_cycle_2_value}`);
        break;
      case 4:
        clearAndDisabledWeekCheckbox();
        setWeekValue(`${week_from_value}/${week_to_value}`);
        break;
      case 5:
        clearAndDisabledWeekCheckbox();
        setWeekValue(`${week_last_value}`);
        break;
      case 6:
        setWeekCheckboxDisabled(false);
        break;
      default: break;
    }
  };

  const onYearChange = (e: any) => {
    const v = e.target.value;
    setYearRadioValue(v);
    setOpen(true);
    switch (v) {
      case 1:
        setYearValue("*");
        break;
      case 2:
        // $.fn.cronGen.tools.startOn("second");
        // results = $.fn.cronGen.tools.cronResult();
        break;
      case 3:
        setYearValue(`${year_cycle_1_value} ${year_cycle_2_value}`);
        break;
      default: break;
    }
  };

  const onSecondCheckboxChange = (checkedValues: any[]) => {
    console.log("dddddddddddddd" + checkedValues);
    setSecondCheckboxValue(checkedValues);
  };

  const onMinutesCheckboxChange = (checkedValues: any) => {
    setMinutesCheckboxValue(checkedValues);
  };

  const onHourCheckboxChange = (checkedValues: any) => {
    setHourCheckboxValue(checkedValues);
  };

  const onDayCheckboxChange = (checkedValues: any) => {
    setDayCheckboxValue(checkedValues);
  };

  const onMonthCheckboxChange = (checkedValues: any) => {
    setMonthCheckboxValue(checkedValues);
  };

  const onWeekCheckboxChange = (checkedValues: any) => {
    setWeekCheckboxValue(checkedValues);
  };

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
        initialValues={{
          // id: values.id,
        }}
      >
        <FormItem
          name="cronExpression"
          label="Cron 表达式"
          rules={[{ required: true, message: '请输入Cron 表达式！' }]}
        >
          <Input placeholder="请输入Cron 表达式" />
        </FormItem>

        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="秒" key="1">
            <Radio.Group onChange={onSecondChange} value={secondRadioValue}>
              <Space direction="vertical">
                <Radio value={1}>每秒 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input value={second_cycle_1_value} onChange={(e: any)=>setSecond_cycle_1_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={second_cycle_2_value} onChange={(e: any)=>setSecond_cycle_2_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒</Radio>
                <Radio value={3}>从<Input value={second_from_value} onChange={(e: any)=>setSecond_from_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒开始,每<Input value={second_to_value} onChange={(e: any)=>setSecond_to_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={plainOptions} onChange={onSecondCheckboxChange} value={secondCheckboxValue} disabled={secondCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="分钟" key="2">
            <Radio.Group onChange={onMinutesChange} value={minutesRadioValue}>
              <Space direction="vertical">
                <Radio value={1}>每分钟 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input value={minutes_cycle_1_value} onChange={(e: any)=>setMinutes_cycle_1_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={minutes_cycle_2_value} onChange={(e: any)=>setMinutes_cycle_2_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟</Radio>
                <Radio value={3}>从<Input value={minutes_from_value} onChange={(e: any)=>setMinutes_from_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟开始,每<Input value={minutes_to_value} onChange={(e: any)=>setMinutes_to_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={plainOptions} onChange={onMinutesCheckboxChange} value={minutesCheckboxValue} disabled={minutesCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="小时" key="3">
            <Radio.Group onChange={onHourChange} value={hourRadioValue}>
              <Space direction="vertical">
                <Radio value={1}>每小时 允许的通配符[, - * /]</Radio>
                <Radio value={2}>周期 从<Input value={hour_cycle_1_value} onChange={(e: any)=>setHour_cycle_1_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={hour_cycle_2_value} onChange={(e: any)=>setHour_cycle_2_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时</Radio>
                <Radio value={3}>从<Input value={hour_from_value} onChange={(e: any)=>setHour_from_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时开始,每<Input value={hour_to_value} onChange={(e: any)=>setHour_to_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时执行一次</Radio>
                <Radio value={4}>
                  指定
                  <Checkbox.Group options={hourOptions} onChange={onHourCheckboxChange} value={hourCheckboxValue} disabled={hourCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="日" key="4">
            <Radio.Group onChange={onDayChange} value={dayRadioValue}>
              <Space direction="vertical">
                <Radio value={1}>每天 允许的通配符[, - * / L W]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从<Input value={day_cycle_1_value} onChange={(e: any)=>setDay_cycle_1_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={day_cycle_2_value} onChange={(e: any)=>setDay_cycle_2_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天</Radio>
                <Radio value={4}>从<Input value={day_from_value} onChange={(e: any)=>setDay_from_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>日开始,每<Input value={day_to_value} onChange={(e: any)=>setDay_to_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天执行一次</Radio>
                <Radio value={5}>每月<Input value={day_last_value} onChange={(e: any)=>setDay_last_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>号最近的那个工作日</Radio>
                <Radio value={6}>本月最后一天</Radio>
                <Radio value={7}>
                  指定
                  <Checkbox.Group options={dayOptions} onChange={onDayCheckboxChange} value={dayCheckboxValue} disabled={dayCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="月" key="5">
            <Radio.Group onChange={onMonthChange} value={monthRadioValue}>
              <Space direction="vertical">
                <Radio value={1}>每月 允许的通配符[, - * /]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从<Input value={month_cycle_1_value} onChange={(e: any)=>setMonth_cycle_1_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={month_cycle_2_value} onChange={(e: any)=>setMonth_cycle_2_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月</Radio>
                <Radio value={4}>从<Input value={month_from_value} onChange={(e: any)=>setMonth_from_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月开始,每<Input value={month_to_value} onChange={(e: any)=>setMonth_to_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月执行一次</Radio>
                <Radio value={5}>
                  指定
                  <Checkbox.Group options={monthOptions} onChange={onMonthCheckboxChange} value={monthCheckboxValue} disabled={monthCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="周" key="6">
            <Radio.Group onChange={onWeekChange} value={weekRadioValue}>
              <Space direction="vertical">
                <Radio value={1}>每周 允许的通配符[, - * / L #]</Radio>
                <Radio value={2}>不指定</Radio>
                <Radio value={3}>周期 从星期<Input value={week_cycle_1_value} onChange={(e: any)=>setWeek_cycle_1_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={week_cycle_2_value} onChange={(e: any)=>setWeek_cycle_2_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={4}>第<Input value={week_from_value} onChange={(e: any)=>setWeek_from_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>周的星期<Input value={week_to_value} onChange={(e: any)=>setWeek_to_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={5}>本月最后一个星期<Input value={week_last_value} onChange={(e: any)=>setWeek_last_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
                <Radio value={6}>
                  指定
                  <Checkbox.Group options={weekOptions} onChange={onWeekCheckboxChange} value={weekCheckboxValue} disabled={weekCheckboxDisabled}/>
                </Radio>
              </Space>
            </Radio.Group>
          </TabPane>
          <TabPane tab="年" key="7">
            <Radio.Group onChange={onYearChange} value={yearRadioValue}>
              <Space direction="vertical">
                <Radio value={1}>不指定 允许的通配符[, - * /] 非必填</Radio>
                <Radio value={2}>每年</Radio>
                <Radio value={3}>周期 从<Input value={year_cycle_1_value} onChange={(e: any)=>setYear_cycle_1_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={year_cycle_2_value} onChange={(e: any)=>setYear_cycle_2_value(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>年</Radio>
              </Space>
            </Radio.Group>
          </TabPane>
        </Tabs>

        <Divider orientation="left">最近运行时间</Divider>
        <List
          dataSource={data}
          size="small"
          renderItem={item => (
            <List.Item>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          )}
        />
      </Form>
    </Modal>
  );
};

export default CreateForm;
