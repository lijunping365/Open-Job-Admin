import React from 'react';
import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '酱子生鲜团队研发出品',
  });

  return (
    <DefaultFooter
      copyright={`2022 ${defaultMessage}`}
      links={[
        {
          key: 'Open-Job-Admin',
          title: 'Open-Job-Admin',
          href: 'https://github.com/lijunping365/Open-Job-Admin',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/lijunping365/Open-Job-Admin',
          blankTarget: true,
        },
        {
          key: 'Open Job',
          title: 'Open Job',
          href: 'https://github.com/lijunping365/Open-Job',
          blankTarget: true,
        },
      ]}
    />
  );
};
