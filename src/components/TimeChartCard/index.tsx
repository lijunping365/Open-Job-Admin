import { Chart, Geom, Axis, Tooltip, Guide } from 'bizcharts';
import { Card } from 'antd';
import React from 'react';

const { Line } = Guide;

interface ChartCardProps {
  loading: boolean;
  chartData: API.AnalysisChart[];
}

const data = {
  keywordTrend: [
    { a: '白超', dates: '00:39:29', first: 2647 },
    { a: '白超', dates: '13:57:24', first: 2156 },
    { a: '白超', dates: '19:40:08', first: 2166 },
    { a: '白超', dates: '20:59:11', first: 2956 },
    { a: '白超', dates: '18:06:55', first: 2771 },
  ],
  avgSpreadScore: [
    {
      key: '白超',
      value: 2500,
      startDate: '00:39:29',
      endDate: '18:06:55',
    },
  ],
};

export const TimeChartCard = ({ loading, chartData }: ChartCardProps) => {
  const { keywordTrend, avgSpreadScore } = data;

  const colors = ['#1890ff', '#2fc25b'];

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
      <Chart height={400} data={keywordTrend} padding={[10, 20, 50, 40]} autoFit>
        <Tooltip shared={true} showCrosshairs />
        <Axis name="dates" />
        <Axis name="first" />
        {/*shape="smooth" 可配置为曲线，不设置为折线*/}
        <Geom type="line" shape="smooth" position="dates*first" size={1} color={['a', colors]} />
        <Geom type="point" position="dates*first" size={2} color={['a', colors]} />
        {/*<Geom/> 和 <Guide/> 是独立控制的，可以通过chart filter来建立交互联动*/}
        <Guide>
          {avgSpreadScore.map((item, index) => {
            return (
              <Line
                top
                start={{ dates: item.startDate, first: item.value }}
                end={{ dates: item.endDate, first: item.value }}
                style={{
                  lineWidth: 2,
                  // 手动维护颜色
                  stroke: colors[index],
                }}
                /** 调整位置 */
                text={{
                  position: 'end',
                  style: {
                    fill: colors[index],
                  },
                  offsetX: -420,
                  content: `均值${item.key}`,
                }}
              />
            );
          })}
        </Guide>
      </Chart>
    </Card>
  );
};
