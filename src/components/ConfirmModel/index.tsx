import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from "react";

const { confirm } = Modal;

export const deleteConfirm = () => {
  return new Promise((resolve) => {
    confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      },
    });
  });
};

export const updateConfirm = () => {
  return new Promise((resolve) => {
    confirm({
      title: 'Do you Want to update these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      },
    });
  });
};
