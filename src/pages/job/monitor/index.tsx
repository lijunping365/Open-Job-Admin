import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import { fetchJobAnalysisNumber, fetchInstanceTok } from '@/services/open-job/api';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { ChartCard } from '@/components/ChartCard';
import { TopCard } from '@/components/TopCard';
import { handlerTokData } from '@/utils/utils';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.appId : 1);
  const [jobId] = useState<number>(query ? query.jobId : 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.StatisticNumber>();
  const [instanceTok, setInstanceTok] = useState<API.TokChart[]>([]);

  const onFetchInstanceTokData = useCallback(async () => {
    fetchInstanceTok({ appId, jobId })
      .then((res) => {
        if (res) setInstanceTok(handlerTokData(res));
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onFetchInstanceTokData().then();
  }, []);

  useEffect(() => {
    const getAnalysisNumber = () => {
      fetchJobAnalysisNumber(appId, jobId)
        .then((res) => {
          if (res) setStatisticNumber(res);
        })
        .catch()
        .finally(() => setLoading(false));
    };
    getAnalysisNumber();
  }, [appId]);

  return (
    <PageContainer loading={loading}>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="最近一次执行时间"
              value={statisticNumber?.lastRunTime || ''}
              prefix={<DashboardOutlined />}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="任务最近启动时间"
              value={statisticNumber?.stateChangeTime || ''}
              prefix={<BarChartOutlined />}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="任务状态"
              value={statisticNumber?.status === '1'? "运行中" : "已停止" || ''}
              prefix={<BarChartOutlined />}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
      </Row>

      <ChartCard appId={appId} jobId={jobId} />

      <TopCard title={'节点执行任务次数排行榜TOP10'} data={instanceTok} loading={loading} />
    </PageContainer>
  );
};

export default TableList;
