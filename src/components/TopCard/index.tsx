import { Chart, Interval, Tooltip } from 'bizcharts';
import { Card } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

interface TopCardProps {
  title: string;
  data: API.TokChart[];
  loading: boolean;
}

export const TopCard = ({ title, data, loading }: TopCardProps) => {
  const [selectDate, setSelectDate] = useState<API.TimeType>('today');

  const isActive = (type: API.TimeType) => {
    if (selectDate !== type) {
      return '';
    }
    return styles.currentDate;
  };

  return (
    <Card
      loading={loading}
      bordered={false}
      title={title}
      style={{
        height: '100%',
      }}
      extra={
        <div className={styles.salesExtraWrap}>
          <div className={styles.salesExtra}>
            <a className={isActive('today')} onClick={() => setSelectDate('today')}>
              今日
            </a>
            <a className={isActive('week')} onClick={() => setSelectDate('week')}>
              本周
            </a>
            <a className={isActive('month')} onClick={() => setSelectDate('month')}>
              本月
            </a>
            <a className={isActive('year')} onClick={() => setSelectDate('year')}>
              本年
            </a>
          </div>
        </div>
      }
    >
      <Chart height={400} padding="auto" data={data} autoFit>
        <Interval
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
            },
          ]}
          color="name"
          position="key*value"
        />
        <Tooltip shared />
      </Chart>
    </Card>
  );
};
