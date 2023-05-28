import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import { confirmModal } from '@/components/ConfirmModel';
import { fetchInstancePage, updateInstance, offline, online } from '@/services/open-job/api';
import type { RouteChildrenProps } from 'react-router';
import { Link } from '@umijs/preset-dumi/lib/theme';

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: Partial<API.Instance>) => {
  const hide = message.loading('正在配置');
  try {
    await updateInstance(fields);
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 实例下线
 */
const handlerOffline = async (clientId: string) => {
  const hide = message.loading('正在下线');
  if (!clientId) return true;
  try {
    await offline(clientId);
    hide();
    message.success('下线成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('下线失败，请重试');
    return false;
  }
};

/**
 * 实例上线
 */
const handlerChange = async (clientId: string) => {
  const hide = message.loading('正在上线');
  if (!clientId) return true;
  try {
    await online(clientId);
    hide();
    message.success('上线成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('上线失败，请重试');
    return false;
  }
};

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.id : 1);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Instance>();
  const columns: ProColumns<API.Instance>[] = [
    {
      title: '实例地址',
      dataIndex: 'serverId',
      tooltip: '唯一标识',
    },
    {
      title: '最近上线时间',
      dataIndex: 'onlineTime',
      valueType: 'dateTime',
    },
    {
      title: '运行时长',
      dataIndex: 'liveTime',
      valueType: 'text',
    },
    {
      title: 'CPU 占用',
      dataIndex: 'cpuInfo',
      valueType: 'text',
    },
    {
      title: '内存占用',
      dataIndex: 'memoryInfo',
      valueType: 'text',
    },
    {
      title: '磁盘占用',
      dataIndex: 'diskInfo',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        OFF_LINE: { text: '已下线', status: 'Error' },
        ON_LINE: { text: '已上线', status: 'Success' },
      },
    },
    {
      title: '权重',
      dataIndex: 'weight',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              if (record.status === 'OFF_LINE') {
                await handlerChange(record.serverId);
                actionRef.current?.reloadAndRest?.();
              } else {
                const confirm = await confirmModal('确定要下线吗？');
                if (confirm) {
                  await handlerOffline(record.serverId);
                  actionRef.current?.reloadAndRest?.();
                }
              }
            }}
          >
            {record.status === 'OFF_LINE' ? '上线' : '下线'}
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            修改权重
          </a>
          <Divider type="vertical" />
          <Link
            to={{
              pathname: '/executor/monitor',
              search: `?appId=${appId}&serverId=${record.serverId}`,
              hash: '#the-hash',
              state: { fromDashboard: true },
            }}
          >
            服务监控
          </Link>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Instance, API.PageParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={async (params) => {
          const response = await fetchInstancePage({ ...params, appId });
          return {
            data: response.records,
            total: response.total,
            success: true,
            pageSize: response.pages,
            current: response.current,
          };
        }}
        columns={columns}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default TableList;
