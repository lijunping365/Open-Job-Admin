import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, message, Row, Statistic } from 'antd';
import { fetchAnalysisNumber, fetchInstanceTok, fetchJobTok } from '@/services/open-job/api';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { ChartCard } from '@/components/ChartCard';
import { TopCard } from '@/components/TopCard';
import { handlerTokData } from '@/utils/utils';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.id : 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.StatisticNumber>();
  const [jobTok, setJobTok] = useState<API.TokChart[]>([]);
  const [instanceTok, setInstanceTok] = useState<API.TokChart[]>([]);

  const onFetchJobTokData = useCallback(async () => {
    setLoading(true);
    fetchJobTok({ appId })
      .then((res) => {
        if (res) setJobTok(handlerTokData(res));
      })
      .catch((reason) => message.error(reason))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onFetchJobTokData().then();
  }, []);

  const onFetchInstanceTokData = useCallback(async () => {
    fetchInstanceTok({ appId })
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
      fetchAnalysisNumber(appId)
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
              title="任务数量"
              value={statisticNumber?.taskRunningNum}
              prefix={<DashboardOutlined />}
              suffix={`/ ${statisticNumber?.taskTotalNum}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="执行器数量"
              value={statisticNumber?.executorOnlineNum}
              prefix={<BarChartOutlined />}
              suffix={`/ ${statisticNumber?.executorTotalNum}`}
            />
          </Card>
        </Col>
      </Row>

      <ChartCard appId={appId} />
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <TopCard loading={loading} title={'任务调度次数排行榜TOP10'} data={jobTok} />
        </Col>
        <Col span={12}>
          <TopCard loading={loading} title={'节点执行任务次数排行榜TOP10'} data={instanceTok} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TableList;
