import React from 'react';
import {Input, Tabs, Radio, Space, Checkbox} from 'antd';
import {
  dayOptions,
  hourOptions,
  monthOptions,
  plainOptions,
  weekOptions
} from "./CronData";

const { TabPane } = Tabs;

export interface CronProps {
  onChange: (index: number,value: any) => void;
}

const CronComponent: React.FC<CronProps> = (props) => {
  const { onChange } = props;

  // tab group
  const [secondRadioValue, setSecondRadioValue] = React.useState();
  const [minutesRadioValue, setMinutesRadioValue] = React.useState();
  const [hourRadioValue, setHourRadioValue] = React.useState();
  const [dayRadioValue, setDayRadioValue] = React.useState();
  const [monthRadioValue, setMonthRadioValue] = React.useState();
  const [weekRadioValue, setWeekRadioValue] = React.useState();
  const [yearRadioValue, setYearRadioValue] = React.useState();

  // second tab
  const [secondCheckboxValue, setSecondCheckboxValue] = React.useState<string[]>([]);
  const [second_cycle_1_value, setSecond_cycle_1_value] = React.useState<number>(1);
  const [second_cycle_2_value, setSecond_cycle_2_value] = React.useState<number>(2);
  const [second_from_value, setSecond_from_value] = React.useState<number>(0);
  const [second_to_value, setSecond_to_value] = React.useState<number>(1);

  // minutes tab
  const [minutesCheckboxValue, setMinutesCheckboxValue] = React.useState<string[]>([]);
  const [minutes_cycle_1_value, setMinutes_cycle_1_value] = React.useState<number>(1);
  const [minutes_cycle_2_value, setMinutes_cycle_2_value] = React.useState<number>(2);
  const [minutes_from_value, setMinutes_from_value] = React.useState<number>(0);
  const [minutes_to_value, setMinutes_to_value] = React.useState<number>(1);

  // hour tab
  const [hourCheckboxValue, setHourCheckboxValue] = React.useState<string[]>([]);
  const [hour_cycle_1_value, setHour_cycle_1_value] = React.useState<number>(1);
  const [hour_cycle_2_value, setHour_cycle_2_value] = React.useState<number>(2);
  const [hour_from_value, setHour_from_value] = React.useState<number>(0);
  const [hour_to_value, setHour_to_value] = React.useState<number>(1);

  // day tab
  const [dayCheckboxValue, setDayCheckboxValue] = React.useState<string[]>([]);
  const [day_cycle_1_value, setDay_cycle_1_value] = React.useState<number>(1);
  const [day_cycle_2_value, setDay_cycle_2_value] = React.useState<number>(2);
  const [day_from_value, setDay_from_value] = React.useState<number>(0);
  const [day_to_value, setDay_to_value] = React.useState<number>(1);
  const [day_last_value, setDay_last_value] = React.useState<number>(0);

  // month tab
  const [monthCheckboxValue, setMonthCheckboxValue] = React.useState<string[]>([]);
  const [month_cycle_1_value, setMonth_cycle_1_value] = React.useState<number>(1);
  const [month_cycle_2_value, setMonth_cycle_2_value] = React.useState<number>(2);
  const [month_from_value, setMonth_from_value] = React.useState<number>(0);
  const [month_to_value, setMonth_to_value] = React.useState<number>(1);

  // week tab
  const [weekCheckboxValue, setWeekCheckboxValue] = React.useState<string[]>([]);
  const [week_cycle_1_value, setWeek_cycle_1_value] = React.useState<number>(1);
  const [week_cycle_2_value, setWeek_cycle_2_value] = React.useState<number>(2);
  const [week_from_value, setWeek_from_value] = React.useState<number>(0);
  const [week_to_value, setWeek_to_value] = React.useState<number>(1);
  const [week_last_value, setWeek_last_value] = React.useState<number>(0);

  // year tab
  const [year_cycle_1_value, setYear_cycle_1_value] = React.useState<number>(2021);
  const [year_cycle_2_value, setYear_cycle_2_value] = React.useState<number>(2022);

  const setInputValue = (index: number,value: string) => {
    onChange(index, value);
  }

  const onSecondChange = (e: any) => {
    const v = e.target.value;
    setSecondRadioValue(v);
    let secondValue = "";
    switch (v) {
      case 1:
        secondValue = "*";
        break;
      case 2:
        secondValue = `${second_cycle_1_value}-${second_cycle_2_value}`;
        break;
      case 3:
        secondValue = `${second_from_value}/${second_to_value}`;
        break;
      case 4:
        secondValue = secondCheckboxValue.length !== 0 ? secondCheckboxValue.join(",") : "*";
        break;
      default:
        break;
    }
    setInputValue(0, secondValue);
  }

  const onMinutesChange = (e: any) => {
    const v = e.target.value;
    setMinutesRadioValue(v);
    let minutesValue = "";
    switch (v) {
      case 1:
        minutesValue = "*";
        break;
      case 2:
        minutesValue = `${minutes_cycle_1_value}-${minutes_cycle_2_value}`;
        break;
      case 3:
        minutesValue = `${minutes_from_value}/${minutes_to_value}`;
        break;
      case 4:
        minutesValue = minutesCheckboxValue.length !== 0 ? minutesCheckboxValue.join(",") : "*";
        break;
      default:
        break;
    }
    setInputValue(1, minutesValue);
  }

  const onHourChange = (e: any) => {
    const v = e.target.value;
    setHourRadioValue(v);
    let hourValue = "";
    switch (v) {
      case 1:
        hourValue = "*";
        break;
      case 2:
        hourValue = `${hour_cycle_1_value}-${hour_cycle_2_value}`;
        break;
      case 3:
        hourValue = `${hour_from_value}/${hour_to_value}`;
        break;
      case 4:
        hourValue = hourCheckboxValue.length !== 0 ? hourCheckboxValue.join(",") : "*";
        break;
      default: break;
    }
    setInputValue(2, hourValue);
  };

  const onDayChange = (e: any) => {
    const v = e.target.value;
    setDayRadioValue(v);
    let dayValue = "";
    switch (v) {
      case 1:
        dayValue = "*";
        break;
      case 2:
        dayValue = "?";
        break;
      case 3:
        dayValue = `${day_cycle_1_value}-${day_cycle_2_value}`;
        break;
      case 4:
        dayValue = `${day_from_value}/${day_to_value}`;
        break;
      case 5:
        dayValue = `${day_last_value}`;
        break;
      case 6:
        dayValue = "L";
        break;
      case 7:
        dayValue = dayCheckboxValue.length !== 0 ? dayCheckboxValue.join(",") : "*";
        break;
      default: break;
    }
    setInputValue(3, dayValue);
  };

  const onMonthChange = (e: any) => {
    const v = e.target.value;
    setMonthRadioValue(v);
    let monthValue = "";
    switch (v) {
      case 1:
        monthValue = "*";
        break;
      case 2:
        monthValue = "?";
        break;
      case 3:
        monthValue = `${month_cycle_1_value}-${month_cycle_2_value}`;
        break;
      case 4:
        monthValue = `${month_from_value}/${month_to_value}`;
        break;
      case 5:
        monthValue = monthCheckboxValue.length !== 0 ? monthCheckboxValue.join(",") : "*";
        break;
      default: break;
    }
    setInputValue(4, monthValue);
  };

  const onWeekChange = (e: any) => {
    const v = e.target.value;
    setWeekRadioValue(v);
    let weekValue = "";
    switch (v) {
      case 1:
        weekValue = "*";
        break;
      case 2:
        weekValue = "?"
        break;
      case 3:
        weekValue = `${week_cycle_1_value}-${week_cycle_2_value}`;
        break;
      case 4:
        weekValue = `${week_from_value}/${week_to_value}`;
        break;
      case 5:
        weekValue = `${week_last_value}`;
        break;
      case 6:
        weekValue = weekCheckboxValue.length !== 0 ? weekCheckboxValue.join(",") : "*";
        break;
      default: break;
    }
    setInputValue(5, weekValue);
  };

  const onYearChange = (e: any) => {
    const v = e.target.value;
    setYearRadioValue(v);
    let yearValue = "";
    switch (v) {
      case 1:
        yearValue = "*";
        break;
      case 2:
        yearValue = "?";
        break;
      case 3:
        yearValue = `${year_cycle_1_value}-${year_cycle_2_value}`;
        break;
      default: break;
    }
    setInputValue(6, yearValue);
  };

  // second begin
  const onSecond_cycle_1_value_change = (value: any) =>{
    setSecond_cycle_1_value(value);
    if(secondRadioValue === 2){
      setInputValue(0, `${value}-${second_cycle_2_value}`);
    }
  }

  const onSecond_cycle_2_value_change = (value: any) =>{
    setSecond_cycle_2_value(value);
    if(secondRadioValue === 2){
      setInputValue(0, `${second_cycle_1_value}-${value}`);
    }
  }

  const onSecond_from_value_change = (value: any) =>{
    setSecond_from_value(value);
    if(secondRadioValue === 3){
      setInputValue(0, `${value}/${second_to_value}`);
    }
  }

  const onSecond_to_value_change = (value: any) =>{
    setSecond_to_value(value);
    if(secondRadioValue === 3){
      setInputValue(0, `${second_from_value}/${value}`);
    }
  }
  // second end

  // minutes begin
  const onMinutes_cycle_1_value_change = (value: any) =>{
    setMinutes_cycle_1_value(value);
    if(minutesRadioValue === 2){
      setInputValue(1, `${value}-${minutes_cycle_2_value}`);
    }
  }

  const onMinutes_cycle_2_value_change = (value: any) =>{
    setMinutes_cycle_2_value(value);
    if(minutesRadioValue === 2){
      setInputValue(1, `${minutes_cycle_1_value}-${value}`);
    }
  }

  const onMinutes_from_value_change = (value: any) =>{
    setMinutes_from_value(value);
    if(minutesRadioValue === 3){
      setInputValue(1, `${value}/${minutes_to_value}`);
    }
  }

  const onMinutes_to_value_change = (value: any) =>{
    setMinutes_to_value(value);
    if(minutesRadioValue === 3){
      setInputValue(1, `${minutes_from_value}/${value}`);
    }
  }
  // minutes end

  // hour begin
  const onHour_cycle_1_value_change = (value: any) =>{
    setHour_cycle_1_value(value);
    if(hourRadioValue === 2){
      setInputValue(2, `${value}-${hour_cycle_2_value}`);
    }
  }

  const onHour_cycle_2_value_change = (value: any) =>{
    setHour_cycle_2_value(value);
    if(hourRadioValue === 2){
      setInputValue(2, `${hour_cycle_1_value}-${value}`);
    }
  }

  const onHour_from_value_change = (value: any) =>{
    setHour_from_value(value);
    if(hourRadioValue === 3){
      setInputValue(2, `${value}/${hour_to_value}`);
    }
  }

  const onHour_to_value_change = (value: any) =>{
    setHour_to_value(value);
    if(hourRadioValue === 3){
      setInputValue(2, `${hour_from_value}/${value}`);
    }
  }
  // hour end

  // day begin
  const onDay_cycle_1_value_change = (value: any) =>{
    setDay_cycle_1_value(value);
    if(dayRadioValue === 2){
      setInputValue(3, `${value}-${day_cycle_2_value}`);
    }
  }

  const onDay_cycle_2_value_change = (value: any) =>{
    setDay_cycle_2_value(value);
    if(dayRadioValue === 2){
      setInputValue(3, `${day_cycle_1_value}-${value}`);
    }
  }

  const onDay_from_value_change = (value: any) =>{
    setDay_from_value(value);
    if(dayRadioValue === 3){
      setInputValue(3, `${value}/${day_to_value}`);
    }
  }

  const onDay_to_value_change = (value: any) =>{
    setDay_to_value(value);
    if(dayRadioValue === 3){
      setInputValue(3, `${day_from_value}/${value}`);
    }
  }

  const onDay_last_value_change = (value: any) =>{
    setDay_last_value(value);
    if(dayRadioValue === 3){
      setInputValue(3, value);
    }
  }
  // day end

  // month begin
  const onMonth_cycle_1_value_change = (value: any) =>{
    setMonth_cycle_1_value(value);
    if(monthRadioValue === 2){
      setInputValue(4, `${value}-${month_cycle_2_value}`);
    }
  }

  const onMonth_cycle_2_value_change = (value: any) =>{
    setMonth_cycle_2_value(value);
    if(monthRadioValue === 2){
      setInputValue(4, `${month_cycle_1_value}-${value}`);
    }
  }

  const onMonth_from_value_change = (value: any) =>{
    setMonth_from_value(value);
    if(monthRadioValue === 3){
      setInputValue(4, `${value}/${month_to_value}`);
    }
  }

  const onMonth_to_value_change = (value: any) =>{
    setMonth_to_value(value);
    if(monthRadioValue === 3){
      setInputValue(4, `${month_from_value}/${value}`);
    }
  }
  // month end

  // week begin
  const onWeek_cycle_1_value_change = (value: any) =>{
    setWeek_cycle_1_value(value);
    if(weekRadioValue === 2){
      setInputValue(5, `${value}-${week_cycle_2_value}`);
    }
  }

  const onWeek_cycle_2_value_change = (value: any) =>{
    setWeek_cycle_2_value(value);
    if(weekRadioValue === 2){
      setInputValue(5, `${week_cycle_1_value}-${value}`);
    }
  }

  const onWeek_from_value_change = (value: any) =>{
    setWeek_from_value(value);
    if(weekRadioValue === 3){
      setInputValue(5, `${value}/${week_to_value}`);
    }
  }

  const onWeek_to_value_change = (value: any) =>{
    setWeek_to_value(value);
    if(weekRadioValue === 3){
      setInputValue(5, `${week_from_value}/${value}`);
    }
  }

  const onWeek_last_value_change = (value: any) =>{
    setWeek_last_value(value);
    if(weekRadioValue === 3){
      setInputValue(5, value);
    }
  }
  // week end

  // year begin
  const onYear_cycle_1_value_change = (value: any) =>{
    setYear_cycle_1_value(value);
    if(yearRadioValue === 3){
      setInputValue(5, `${value}-${year_cycle_2_value}`);
    }
  }

  const onYear_cycle_2_value_change = (value: any) =>{
    setYear_cycle_2_value(value);
    if(yearRadioValue === 3){
      setInputValue(5, `${year_cycle_1_value}-${value}`);
    }
  }
  // year end


  const onSecondCheckboxChange = (checkedValues: any[]) => {
    setSecondCheckboxValue(checkedValues);
    if(secondRadioValue !== 4){
      return;
    }
    if(checkedValues.length !== 0){
      setInputValue(0, checkedValues.join(","));
    }else {
      setInputValue(0, "*");
    }
  };

  const onMinutesCheckboxChange = (checkedValues: any) => {
    setMinutesCheckboxValue(checkedValues);
    if(minutesRadioValue !== 4){
      return;
    }
    if (checkedValues.length !== 0){
      setInputValue(1, checkedValues.join(","));
    }else {
      setInputValue(1, "*");
    }
  };

  const onHourCheckboxChange = (checkedValues: any) => {
    setHourCheckboxValue(checkedValues);
    if(hourRadioValue !== 4){
      return;
    }
    if (checkedValues.length !== 0){
      setInputValue(2, checkedValues.join(","));
    }else {
      setInputValue(2, "*");
    }
  };

  const onDayCheckboxChange = (checkedValues: any) => {
    setDayCheckboxValue(checkedValues);
    if(dayRadioValue !== 7){
      return;
    }
    if (checkedValues.length !== 0){
      setInputValue(3, checkedValues.join(","));
    }else {
      setInputValue(3, "*");
    }
  };

  const onMonthCheckboxChange = (checkedValues: any) => {
    setMonthCheckboxValue(checkedValues);
    if(monthRadioValue !== 5){
      return;
    }
    if (checkedValues.length !== 0){
      setInputValue(4, checkedValues.join(","));
    }else {
      setInputValue(4, "*");
    }
  };

  const onWeekCheckboxChange = (checkedValues: any) => {
    setWeekCheckboxValue(checkedValues);
    if(weekRadioValue !== 6){
      return;
    }
    if (checkedValues.length !== 0){
      setInputValue(5, checkedValues.join(","));
    }else {
      setInputValue(5, "*");
    }
  };

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="秒" key="1">
          <Radio.Group onChange={onSecondChange} value={secondRadioValue} defaultValue={1}>
            <Space direction="vertical">
              <Radio value={1}>每秒 允许的通配符[, - * /]</Radio>
              <Radio value={2}>周期 从<Input value={second_cycle_1_value} onChange={(e: any)=>onSecond_cycle_1_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={second_cycle_2_value} onChange={(e: any)=>onSecond_cycle_2_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒</Radio>
              <Radio value={3}>从<Input value={second_from_value} onChange={(e: any)=>onSecond_from_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒开始,每<Input value={second_to_value} onChange={(e: any)=>onSecond_to_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>秒执行一次</Radio>
              <Radio value={4}>
                指定
                <Checkbox.Group options={plainOptions} onChange={onSecondCheckboxChange} value={secondCheckboxValue} />
              </Radio>
            </Space>
          </Radio.Group>
        </TabPane>
        <TabPane tab="分钟" key="2">
          <Radio.Group onChange={onMinutesChange} value={minutesRadioValue} defaultValue={1}>
            <Space direction="vertical">
              <Radio value={1}>每分钟 允许的通配符[, - * /]</Radio>
              <Radio value={2}>周期 从<Input value={minutes_cycle_1_value} onChange={(e: any)=>onMinutes_cycle_1_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={minutes_cycle_2_value} onChange={(e: any)=>onMinutes_cycle_2_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟</Radio>
              <Radio value={3}>从<Input value={minutes_from_value} onChange={(e: any)=>onMinutes_from_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟开始,每<Input value={minutes_to_value} onChange={(e: any)=>onMinutes_to_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>分钟执行一次</Radio>
              <Radio value={4}>
                指定
                <Checkbox.Group options={plainOptions} onChange={onMinutesCheckboxChange} value={minutesCheckboxValue} />
              </Radio>
            </Space>
          </Radio.Group>
        </TabPane>
        <TabPane tab="小时" key="3">
          <Radio.Group onChange={onHourChange} value={hourRadioValue} defaultValue={1}>
            <Space direction="vertical">
              <Radio value={1}>每小时 允许的通配符[, - * /]</Radio>
              <Radio value={2}>周期 从<Input value={hour_cycle_1_value} onChange={(e: any)=>onHour_cycle_1_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={hour_cycle_2_value} onChange={(e: any)=>onHour_cycle_2_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时</Radio>
              <Radio value={3}>从<Input value={hour_from_value} onChange={(e: any)=>onHour_from_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时开始,每<Input value={hour_to_value} onChange={(e: any)=>onHour_to_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>小时执行一次</Radio>
              <Radio value={4}>
                指定
                <Checkbox.Group options={hourOptions} onChange={onHourCheckboxChange} value={hourCheckboxValue} />
              </Radio>
            </Space>
          </Radio.Group>
        </TabPane>
        <TabPane tab="日" key="4">
          <Radio.Group onChange={onDayChange} value={dayRadioValue} defaultValue={1}>
            <Space direction="vertical">
              <Radio value={1}>每天 允许的通配符[, - * / L W]</Radio>
              <Radio value={2}>不指定</Radio>
              <Radio value={3}>周期 从<Input value={day_cycle_1_value} onChange={(e: any)=>onDay_cycle_1_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={day_cycle_2_value} onChange={(e: any)=>onDay_cycle_2_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天</Radio>
              <Radio value={4}>从<Input value={day_from_value} onChange={(e: any)=>onDay_from_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>日开始,每<Input value={day_to_value} onChange={(e: any)=>onDay_to_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>天执行一次</Radio>
              <Radio value={5}>每月<Input value={day_last_value} onChange={(e: any)=>onDay_last_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>号最近的那个工作日</Radio>
              <Radio value={6}>本月最后一天</Radio>
              <Radio value={7}>
                指定
                <Checkbox.Group options={dayOptions} onChange={onDayCheckboxChange} value={dayCheckboxValue} />
              </Radio>
            </Space>
          </Radio.Group>
        </TabPane>
        <TabPane tab="月" key="5">
          <Radio.Group onChange={onMonthChange} value={monthRadioValue} defaultValue={1}>
            <Space direction="vertical">
              <Radio value={1}>每月 允许的通配符[, - * /]</Radio>
              <Radio value={2}>不指定</Radio>
              <Radio value={3}>周期 从<Input value={month_cycle_1_value} onChange={(e: any)=>onMonth_cycle_1_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={month_cycle_2_value} onChange={(e: any)=>onMonth_cycle_2_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月</Radio>
              <Radio value={4}>从<Input value={month_from_value} onChange={(e: any)=>onMonth_from_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月开始,每<Input value={month_to_value} onChange={(e: any)=>onMonth_to_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>月执行一次</Radio>
              <Radio value={5}>
                指定
                <Checkbox.Group options={monthOptions} onChange={onMonthCheckboxChange} value={monthCheckboxValue} />
              </Radio>
            </Space>
          </Radio.Group>
        </TabPane>
        <TabPane tab="周" key="6">
          <Radio.Group onChange={onWeekChange} value={weekRadioValue} defaultValue={2}>
            <Space direction="vertical">
              <Radio value={1}>每周 允许的通配符[, - * / L #]</Radio>
              <Radio value={2}>不指定</Radio>
              <Radio value={3}>周期 从星期<Input value={week_cycle_1_value} onChange={(e: any)=>onWeek_cycle_1_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={week_cycle_2_value} onChange={(e: any)=>onWeek_cycle_2_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
              <Radio value={4}>第<Input value={week_from_value} onChange={(e: any)=>onWeek_from_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>周的星期<Input value={week_to_value} onChange={(e: any)=>onWeek_to_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
              <Radio value={5}>本月最后一个星期<Input value={week_last_value} onChange={(e: any)=>onWeek_last_value_change(e.target.value)} style={{width:'40px', height:'20px', textAlign: 'center', margin: '0 3px'}}/></Radio>
              <Radio value={6}>
                指定
                <Checkbox.Group options={weekOptions} onChange={onWeekCheckboxChange} value={weekCheckboxValue} />
              </Radio>
            </Space>
          </Radio.Group>
        </TabPane>
        <TabPane tab="年" key="7">
          <Radio.Group onChange={onYearChange} value={yearRadioValue} defaultValue={1}>
            <Space direction="vertical">
              <Radio value={1}>每年 允许的通配符[, - * /] 非必填</Radio>
              <Radio value={2}>不指定</Radio>
              <Radio value={3}>周期 从<Input value={year_cycle_1_value} onChange={(e: any)=>onYear_cycle_1_value_change(e.target.value)} style={{width:'60px', height:'20px', textAlign: 'center', margin: '0 3px'}}/> - <Input value={year_cycle_2_value} onChange={(e: any)=>onYear_cycle_2_value_change(e.target.value)} style={{width:'60px', height:'20px', textAlign: 'center', margin: '0 3px'}}/>年</Radio>
            </Space>
          </Radio.Group>
        </TabPane>
      </Tabs>
    </>
  );
};

export default CronComponent;
