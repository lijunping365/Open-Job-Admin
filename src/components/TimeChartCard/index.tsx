import { Chart, Geom, Axis, Tooltip, Guide } from 'bizcharts';
import { Card } from 'antd';
import React from 'react';
import styles from "@/components/TopCard/index.less";

const { Line } = Guide;

interface ChartCardProps {
  loading: boolean;
  chartData?: API.JobTimeChart;
  selectDate: API.TimeType;
  onChange: (type: API.TimeType) => void;
}

export const TimeChartCard = ({ loading, chartData, selectDate, onChange }: ChartCardProps) => {
  const colors = ['#1890ff', '#2fc25b'];

  return (
    <Card
      loading={loading}
      bordered={false}
      title="任务耗时统计"
      style={{
        height: '100%',
        marginTop: '20px',
        marginBottom: '20px',
      }}
      extra={
        <div className={styles.salesExtraWrap}>
          <div className={styles.salesExtra}>
            <a className={(selectDate === 'today' ? styles.currentDate : '')} onClick={() => onChange('today')}>
              最近一分钟
            </a>
            <a className={(selectDate === 'week' ? styles.currentDate : '')} onClick={() => onChange('week')}>
              最近30分钟
            </a>
            <a className={(selectDate === 'month' ? styles.currentDate : '')} onClick={() => onChange('month')}>
              最近1小时
            </a>
            <a className={(selectDate === 'year' ? styles.currentDate : '')} onClick={() => onChange('year')}>
              今天
            </a>
          </div>
        </div>
      }
    >
      <Chart height={400} data={chartData?.charts} padding={[10, 20, 50, 40]} autoFit>
        <Tooltip shared={true} showCrosshairs />
        <Axis name="date" />
        <Axis name="value" />
        {/*shape="smooth" 可配置为曲线，不设置为折线*/}
        <Geom type="line" position="date*value" size={2} color={['key', colors[1]]} />
        <Geom type="point" position="date*value" size={2} color={['key', colors[1]]} />
        {/*<Geom/> 和 <Guide/> 是独立控制的，可以通过chart filter来建立交互联动*/}
        {chartData && (
          <Guide>
            <Line
              top
              start={{ date: chartData.startDate, value: chartData.value }}
              end={{ date: chartData.endDate, value: chartData.value }}
              style={{
                lineWidth: 3,
                // 手动维护颜色
                stroke: colors[0],
              }}
              /** 调整位置 */
              text={{
                position: 'center',
                style: {
                  fill: colors[0],
                },
                offsetY: -10,
                content: `任务平均耗时: ${chartData.value}ms`,
              }}
            />
          </Guide>
        )}
      </Chart>
    </Card>
  );
};
