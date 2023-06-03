import { Chart, Geom, Axis, Tooltip, Guide } from 'bizcharts';
import { Card } from 'antd';
import React from 'react';

const { Line } = Guide;

interface ChartCardProps {
  loading: boolean;
  chartData?: API.JobTimeChart;
}

export const TimeChartCard = ({ loading, chartData }: ChartCardProps) => {
  const colors = '#1890ff';

  return (
    <Card
      loading={loading}
      bordered={false}
      title="任务调度次数"
      style={{
        height: '100%',
        marginTop: '20px',
      }}
    >
      <Chart height={400} data={chartData?.charts} padding={[10, 20, 50, 40]} autoFit>
        <Tooltip shared={true} showCrosshairs />
        <Axis name="date" />
        <Axis name="value" />
        {/*shape="smooth" 可配置为曲线，不设置为折线*/}
        <Geom type="line" shape="smooth" position="date*value" size={1} color={['key', colors]} />
        <Geom type="point" position="date*value" size={2} color={['key', colors]} />
        {/*<Geom/> 和 <Guide/> 是独立控制的，可以通过chart filter来建立交互联动*/}
        {chartData && (
          <Guide>
            <Line
              top
              start={{ date: chartData.startDate, value: chartData.value }}
              end={{ date: chartData.endDate, value: chartData.value }}
              style={{
                lineWidth: 2,
                // 手动维护颜色
                stroke: colors,
              }}
              /** 调整位置 */
              text={{
                position: 'end',
                style: {
                  fill: colors,
                },
                offsetX: -420,
                content: `任务平均耗时`,
              }}
            />
          </Guide>
        )}
      </Chart>
    </Card>
  );
};
