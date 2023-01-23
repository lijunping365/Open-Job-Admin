import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message} from 'antd';
import React, {useRef, useState} from 'react';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import {
  addScheduleTask,
  fetchOpenJobAppList,
  fetchScheduleTaskPage,
  removeScheduleTask,
  startScheduleTask,
  stopScheduleTask,
  updateScheduleTask
} from '@/services/open-job/api';
import {confirmModal} from "@/components/ConfirmModel";
import CreateForm from "./components/CreateForm";
import {Link} from "@umijs/preset-dumi/lib/theme";

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: Partial<API.OpenJob>) => {
  const hide = message.loading('正在添加');
  try {
    await addScheduleTask(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: Partial<API.OpenJob>) => {
  const hide = message.loading('正在配置');
  try {
    await updateScheduleTask(fields);
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
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: any[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeScheduleTask({ids: selectedRows});
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 启动任务
 *
 * @param jobId
 */
const handleStart = async (jobId: number) => {
  const hide = message.loading('正在启动');
  if (!jobId) return true;
  try {
    await startScheduleTask(jobId);
    hide();
    message.success('启动成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('启动失败，请重试');
    return false;
  }
};

/**
 * 停止任务
 *
 * @param jobId
 */
const handleStop = async (jobId: number) => {
  const hide = message.loading('正在停止');
  if (!jobId) return true;
  try {
    await stopScheduleTask(jobId);
    hide();
    message.success('停止成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('停止失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.OpenJob[]>([]);

  const columns: ProColumns<API.OpenJob>[] = [
    {
      title: '任务编号',
      dataIndex: 'id',
      valueType: 'text',
      search: false,
    },
    {
      title: '应用名称',
      dataIndex: 'appId',
      valueType: 'select',
      hideInTable: true,
      request: async () => {
        const res = await fetchOpenJobAppList();
        if (res){
          return res.map((item: any) => {
            return {"label": item.appName, "value": item.id}
          });
        }
        return null;
      },
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
      valueType: 'text',
    },
    {
      title: 'Cron 表达式',
      dataIndex: 'cronExpression',
      valueType: 'text',
      search: false,
    },
    {
      title: 'Handler 名称',
      dataIndex: 'handlerName',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '停止', status: 'Error' },
        1: { text: '启动', status: 'Success' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      valueType: 'text',
      hideInForm: true,
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
              if (record.status === 0) {
                await handleStart(record.id);
              }else {
                await handleStop(record.id);
              }
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {record.status === 0 ? '启动': '停止'}
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setUpdateFormValues(record);
            }}
          >
            修改
          </a>
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
          <Divider type="vertical" />
            <Link
              to={{
                pathname: '/logger',
                search: `?id=${record.id}`,
                hash: '#the-hash',
                state: { fromDashboard: true },
              }}
            >
              查看日志
            </Link>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.OpenJob>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}

        request={async (params) => {
          const response = await fetchScheduleTaskPage({ ...params });
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

      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleCreateModalVisible(false)}
        modalVisible={createModalVisible}>
      </CreateForm>

      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateFormValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
