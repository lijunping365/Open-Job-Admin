import { Chart, Interval, Tooltip } from 'bizcharts';
import { Card } from 'antd';
import React from 'react';
import styles from './index.less';

interface TopCardProps {
  title: string;
  data: API.TokChart[];
  loading: boolean;
  selectDate: API.TimeType;
  onChange: (type: API.TimeType) => void;
}

export const TopCard = ({ title, data, loading, selectDate, onChange }: TopCardProps) => {

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
            <a className={(selectDate === 'today' ? styles.currentDate : '')} onClick={() => onChange('today')}>
              今日
            </a>
            <a className={(selectDate === 'week' ? styles.currentDate : '')} onClick={() => onChange('week')}>
              本周
            </a>
            <a className={(selectDate === 'month' ? styles.currentDate : '')} onClick={() => onChange('month')}>
              本月
            </a>
            <a className={(selectDate === 'year' ? styles.currentDate : '')} onClick={() => onChange('year')}>
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
