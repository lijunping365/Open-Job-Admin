import {Button, message, Divider} from 'antd';
import React, {useState, useRef} from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchTaskLogPage, removeTaskLog} from './service';
import {confirmModal} from "@/components/ConfirmModel";
import {Link} from "@umijs/preset-dumi/lib/theme";
import type {RouteChildrenProps} from "react-router";



/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: any[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeTaskLog({ids: selectedRows});
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.OpenJobLog[]>([]);
  const { query }: any = location;
  const [jobId] = useState<number>(query? query.id : 0);

  const columns: ProColumns<API.OpenJobLog>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'text',
      search: false
    },
    {
      title: '任务编号',
      dataIndex: 'jobId',
      valueType: 'text',
      search: false
    },
    {
      title: '调度结果',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '执行失败', status: 'Error' },
        1: { text: '执行成功', status: 'Success' },
      },
    },
    {
      title: '调度时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      valueType: 'dateTime',
      hideInTable: true
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/util/ip',
              search: `?id=${record.id}`,
              hash: '#the-hash',
              state: { fromDashboard: true },
            }}
          >
            查看详情
          </Link>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              const confirm = await confirmModal();
              if (confirm){
                await handleRemove([record.id]);
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.OpenJobLog>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={async (params) => {
          const response = await fetchTaskLogPage({ ...params, jobId });
          return {
            data: response.records,
            total: response.total,
            success: true,
            pageSize: response.pages,
            current: response.current,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState ? selectedRowsState.map((e) => e.id):[]);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default TableList;
