import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Alert, Typography, Tag, Statistic, Row, Col} from 'antd';
import styles from './Welcome.less';
import {
  AlertOutlined, ApiOutlined, ArrowUpOutlined, BarChartOutlined, BugOutlined,
  CoffeeOutlined, DashboardOutlined, DeploymentUnitOutlined,
} from "@ant-design/icons";

export default (): React.ReactNode => {

  return (
    <PageContainer>
      <Card>
        <Alert
          message='欢迎使用该分布式爬虫系统，你还可以把它当作一个分布式任务或定时调度系统。'
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <Tag icon={<BarChartOutlined />} color="#55acee">
            企业级
          </Tag>
          <Tag icon={<DeploymentUnitOutlined />} color="#cd201f">
            分布式
          </Tag>
          <Tag icon={<BugOutlined />} color="#3b5999">
            爬虫系统
          </Tag>
          <Tag icon={<CoffeeOutlined />} color="#55acee">
            调度系统
          </Tag>
          <Tag icon={<DashboardOutlined />} color="#55acee">
            监控
          </Tag>
          <Tag icon={<AlertOutlined />} color="#55acee">
            报警
          </Tag>
          <Tag icon={<ApiOutlined />} color="#55acee">
            可拓展性高
          </Tag>

          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎使用
          </a>
        </Typography.Text>


        <Row gutter={16} className={styles.statisticBlock}>
          <Col span={12}>
            <Card>
              <Statistic title="累计使用人数" value={112893} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="今日新增人数"
                value={20}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
        </Row>



      </Card>
    </PageContainer>
  );
};
