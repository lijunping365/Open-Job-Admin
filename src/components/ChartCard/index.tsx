import { Chart, LineAdvance } from 'bizcharts';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchAnalysisChart } from '@/services/open-job/api';
import { handlerChartData } from '@/utils/utils';

interface ChartCardProps {
  appId: number;
  jobId?: number;
  serverId?: string;
  count?: number;
}

export const ChartCard = ({ appId, jobId, serverId, count }: ChartCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<API.AnalysisChart[]>([]);

  useEffect(() => {
    const getAnalysisChart = () => {
      setLoading(true);
      fetchAnalysisChart({ appId, jobId, serverId, count })
        .then((res: any) => {
          if (res) {
            setChartData(handlerChartData(res));
          }
        })
        .catch((reason) => message.error(reason))
        .finally(() => setLoading(false));
    };
    getAnalysisChart();
  }, []);

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
      <Chart padding={[10, 20, 50, 40]} autoFit height={400} data={chartData}>
        <LineAdvance shape="smooth" point area position="date*value" color="name" />
      </Chart>
    </Card>
  );
};
