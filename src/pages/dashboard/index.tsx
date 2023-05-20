import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import { Chart, Interval, LineAdvance, Tooltip } from 'bizcharts';
import {
  fetchAnalysisNumber,
  fetchAnalysisChart,
  fetchJobTok,
  fetchInstanceTok,
} from '@/services/open-job/api';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import styles from './index.less';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.id : 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.StatisticNumber>();
  const [chartData, setChartData] = useState<API.AnalysisChart[]>([]);
  const [jobTok, setJobTok] = useState<API.TokChart[]>([]);
  const [instanceTok, setInstanceTok] = useState<API.TokChart[]>([]);
  const [selectDate, setSelectDate] = useState<API.TimeType>('today');

  const isActive = (type: API.TimeType) => {
    if (selectDate === type) {
      return '';
    }
    return styles.currentDate;
  };

  const onFetchJobTokData = useCallback(async () => {
    fetchJobTok({ appId })
      .then((res) => {
        if (res) {
          const data1 = res.map((item: any) => {
            return { key: item.key, value: item.totalCount, name: '执行总次数' };
          });
          const data2 = res.map((item: any) => {
            return { key: item.key, value: item.successCount, name: '执行成功次数' };
          });
          setJobTok(data1.concat(data2));
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const onFetchInstanceTokData = useCallback(async () => {
    fetchInstanceTok({ appId })
      .then((res) => {
        if (res) {
          const data1 = res.map((item: any) => {
            return { key: item.key, value: item.totalCount, name: '执行总次数' };
          });
          const data2 = res.map((item: any) => {
            return { key: item.key, value: item.successCount, name: '执行成功次数' };
          });
          setInstanceTok(data1.concat(data2));
        }
      })
      .catch()
      .finally(() => setLoading(false));
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

  useEffect(() => {
    const getAnalysisChart = () => {
      fetchAnalysisChart({ appId })
        .then((res: any) => {
          if (res) {
            const data1 = res.map((item: any) => {
              return { date: item.date, value: item.totalCount, name: '执行总次数' };
            });
            const data2 = res.map((item: any) => {
              return { date: item.date, value: item.successCount, name: '执行成功次数' };
            });
            setChartData(data1.concat(data2));
          }
        })
        .catch();
    };
    getAnalysisChart();
  }, [appId]);

  useEffect(() => {
    onFetchJobTokData().then();
  }, []);

  useEffect(() => {
    onFetchInstanceTokData().then();
  }, []);

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

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card
            loading={loading}
            bordered={false}
            title="任务调度次数排行榜TOP10"
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
            <Chart height={400} padding="auto" data={jobTok} autoFit>
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
        </Col>
        <Col span={12}>
          <Card
            loading={loading}
            bordered={false}
            title="节点执行任务次数排行榜TOP10"
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
            <Chart height={400} padding="auto" data={instanceTok} autoFit>
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
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TableList;
