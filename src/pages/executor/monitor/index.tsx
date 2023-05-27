import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Col, message, Row, Statistic} from 'antd';
import {fetchAnalysisChart, fetchInstanceAnalysisNumber, fetchJobTok} from '@/services/open-job/api';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { ChartCard } from '@/components/ChartCard';
import { TopCard } from '@/components/TopCard';
import {getTopCount, handlerChartData, handlerTokData} from '@/utils/utils';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.appId : 1);
  const [serverId] = useState<string>(query ? query.serverId : '');
  const [loading, setLoading] = useState<boolean>(true);
  const [tokLoading, setTokLoading] = useState<boolean>(true);
  const [statisticLoading, setStatisticLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.StatisticNumber>();
  const [jobTok, setJobTok] = useState<API.TokChart[]>([]);
  const [chartData, setChartData] = useState<API.AnalysisChart[]>([]);
  const [selectDate, setSelectDate] = useState<API.TimeType>('today');

  const onFetchJobTokData = useCallback(async () => {
    const count = getTopCount(selectDate);
    fetchJobTok({ appId, serverId, count })
      .then((res) => {
        if (res) setJobTok(handlerTokData(res));
      })
      .catch()
      .finally(() => setTokLoading(false));
  }, [appId, serverId]);

  useEffect(() => {
    onFetchJobTokData().then();
  }, [appId, serverId]);

  useEffect(() => {
    const getAnalysisNumber = () => {
      fetchInstanceAnalysisNumber(appId, serverId)
        .then((res) => {
          if (res) setStatisticNumber(res);
        })
        .catch()
        .finally(() => setStatisticLoading(false));
    };
    getAnalysisNumber();
  }, [appId, serverId]);

  useEffect(() => {
    const getAnalysisChart = () => {
      fetchAnalysisChart({ appId, serverId })
        .then((res: any) => {
          if (res) {
            setChartData(handlerChartData(res));
          }
        })
        .catch((reason) => message.error(reason))
        .finally(() => setLoading(false));
    };
    getAnalysisChart();
  }, [appId, serverId]);

  return (
    <PageContainer>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title="CPU信息"
              value={statisticNumber?.cpuInfo  || '-'}
              prefix={<DashboardOutlined />}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title="内存信息"
              value={statisticNumber?.memoryInfo || '-'}
              prefix={<BarChartOutlined />}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title="磁盘信息"
              value={statisticNumber?.diskInfo || '-'}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title="运行时长"
              value={statisticNumber?.liveTime || '-'}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title="运行状态"
              prefix={<BarChartOutlined />}
              value={statisticNumber?.status === 'ON_LINE' ? '运行中' : '已下线'}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
      </Row>

      <ChartCard loading={tokLoading} chartData={chartData} />

      <TopCard
        title={'任务调度次数排行榜TOP10'}
        data={jobTok}
        loading={loading}
        selectDate={selectDate}
        onChange={(value) => setSelectDate(value)}
      />
    </PageContainer>
  );
};

export default TableList;
