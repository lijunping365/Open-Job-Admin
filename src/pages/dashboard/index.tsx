import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Col, Row, Select, Statistic} from 'antd';
import { Chart, LineAdvance } from 'bizcharts';
import {fetchAnalysisNumber, fetchAnalysisChart, fetchOpenJobAppList} from '@/services/open-job/api';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import {handlerChartData} from "@/utils/utils";

const TableList: React.FC<RouteChildrenProps> = () => {
  const [appId, setAppId] = useState<number>();
  const [appSet, setAppSet] = useState<API.OpenJobApp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.StatisticNumber>();
  const [chartData, setChartData] = useState<API.AnalysisChart[]>([]);

  useEffect(() => {
    const getAnalysisNumber = () => {
      fetchAnalysisNumber()
        .then((res) => {
          if (res) setStatisticNumber(res);
        })
        .catch()
        .finally(() => setLoading(false));
    };
    getAnalysisNumber();
  }, []);

  useEffect(() => {
    const getAppSet = () => {
      fetchOpenJobAppList()
        .then((res: any) => {
          if (res) {
            setAppSet(res);
            setAppId(res[0].id)
          }
        })
        .catch();
    }
    getAppSet();
  }, []);

  useEffect(() => {
    const getAnalysisChart = () => {
      if (!appId){
        return;
      }
      fetchAnalysisChart({ appId })
        .then((res: any) => {
          if (res) {
            setChartData(handlerChartData(res));
          }
        })
        .catch();
    };
    getAnalysisChart();
  }, [appId]);

  return (
    <PageContainer loading={loading}>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="应用数量"
              value={statisticNumber?.appNum}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="任务总数"
              value={statisticNumber?.taskRunningNum}
              prefix={<DashboardOutlined />}
              suffix={`/ ${statisticNumber?.taskTotalNum}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="执行器总数"
              value={statisticNumber?.executorOnlineNum}
              prefix={<BarChartOutlined />}
              suffix={`/ ${statisticNumber?.executorTotalNum}`}
            />
          </Card>
        </Col>
      </Row>

      <Card
        loading={loading}
        bordered={false}
        title="任务调度次数"
        style={{
          height: '100%',
          marginTop: '20px',
        }}
        extra={
          <div>
            <Select
              defaultValue={appId}
              onChange={(id:any)=> setAppId(id)}
              options={(appSet || []).map((d) => ({
                value: d.id,
                label: d.appName,
              }))}
            />
          </div>
        }
      >
        <Chart padding={[10, 20, 50, 40]} autoFit height={400} data={chartData}>
          <LineAdvance shape="smooth" point area position="date*value" color="name" />
        </Chart>
      </Card>
    </PageContainer>
  );
};

export default TableList;
