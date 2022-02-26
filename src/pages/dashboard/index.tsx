import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Col, Row, Statistic} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import { Chart, Axis, Geom, Legend, Tooltip } from 'bizcharts';



const TableList: React.FC = () => {

  // 数据源
  const data = [
    { genre: 'Sports', sold: 275, income: 2300 },
    { genre: 'Strategy', sold: 115, income: 667 },
    { genre: 'Action', sold: 120, income: 982 },
    { genre: 'Shooter', sold: 350, income: 5271 },
    { genre: 'Other', sold: 150, income: 3710 }
  ];

  // 定义度量
  const cols = {  sold: { alias: '销售量' },  genre: { alias: '游戏种类' }};

  return (
    <PageContainer>
      <Row gutter={16} style={{marginTop:'20px'}}>
        <Col span={6}>
          <Card>
            <Statistic title="任务数量" value={112893} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="调度次数"
              value={20}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日新增人数"
              value={20}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
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

      <Card style={{marginTop: '20px'}}>

        <Row gutter={16} style={{marginTop:'20px'}}>
          <Col span={12}>
            <Card>
              <Chart width={600} height={400} data={data} scale={cols}>
                <Axis name="genre" />
                <Axis name="sold" />
                <Legend position="top" dy={-20} />
                <Tooltip />
                <Geom type="interval" position="genre*sold" color="genre" />
              </Chart>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Chart width={600} height={400} data={data} scale={cols}>
                <Axis name="genre" />
                <Axis name="sold" />
                <Legend position="top" dy={-20} />
                <Tooltip />
                <Geom type="interval" position="genre*sold" color="genre" />
              </Chart>
            </Card>
          </Col>
        </Row>



      </Card>

    </PageContainer>
  );
};

export default TableList;
