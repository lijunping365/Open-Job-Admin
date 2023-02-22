import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Alert, Typography, Tag, Statistic, Row, Col} from 'antd';
import styles from './Welcome.less';
import {
  AlertOutlined, ApiOutlined, ArrowUpOutlined, BarChartOutlined, BugOutlined,
  CoffeeOutlined, DashboardOutlined, DeploymentUnitOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";

export default (): React.ReactNode => {

  return (
    <PageContainer>
      <Card>
        <Alert
          message='欢迎使用 Open-Job，一款简单易用且轻量级易拓展的分布式任务调度系统。'
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
            轻量级
          </Tag>
          <Tag icon={<DeploymentUnitOutlined />} color="#55acee">
            简单易用
          </Tag>
          <Tag icon={<BugOutlined />} color="#55acee">
            分布式
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
            href="https://github.com/lijunping365/Open-Job"
            rel="noopener noreferrer"
            target="__blank"
          >
            源码地址
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

        <Typography.Paragraph strong style={{margin: "20px 0"}}>
          <Paragraph>
            功能概览:
          </Paragraph>

          <Paragraph>
              1. 定时任务基于 redis 实现，支持动态修改任务状态，同时支持拓展其他实现方式
          </Paragraph>

          <Paragraph>
              2. 客户端与服务端通信采用 Grpc，同时支持 Netty
          </Paragraph>

          <Paragraph>
              3. 注册中心支持 Nacos、Zookeeper，同时支持拓展其他注册中心，而且支持节点动态上线下线
          </Paragraph>

          <Paragraph>
              4. 客户端集群部署支持负载均衡，默认提供了一致性hash、随机权重算法，支持多种容错机制，默认提供了失败重试、故障转移等机制，负载均衡和容错都支持拓展
          </Paragraph>

          <Paragraph>
              5. 任务监控报警能力支持
          </Paragraph>

          <Paragraph>
              6. 前后端分离，管理后台基于 antd-pro 搭建
          </Paragraph>

          <Paragraph>
              7. 支持多应用任务调度
          </Paragraph>
        </Typography.Paragraph>
      </Card>
    </PageContainer>
  );
};
