import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslations } from '@hooks/locales.hook';
import { useFetchUsersList } from '@hooks/query-hooks/useUsers';
import { Skeleton, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { DataType } from './types';

interface TaskTableProps {
  showModalAddEditUser: (id: string) => void;
  deleteUser: (id: string) => void;
}
function TaskTable({ showModalAddEditUser, deleteUser }: TaskTableProps) {
  const { t } = useTranslations();

  const { data, isLoading } = useFetchUsersList();

  const columns = (t: any): ColumnsType<DataType> => [
    {
      title: t(`module_1.label.task`),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t(`module_1.label.title`),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t(`module_1.label.title`),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t(`module_1.label.action`),
      key: 'action',
      render: (_, record) => (
        <Space size={'small'}>
          <EditOutlined onClick={() => showModalAddEditUser(record.id)} />
          <DeleteOutlined onClick={() => deleteUser(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Skeleton loading={isLoading} active paragraph={{ rows: 20 }}>
      <Table
        columns={columns(t)}
        dataSource={data}
        rowKey={'id'}
        pagination={{
          defaultPageSize: 5,
        }}
      />
    </Skeleton>
  );
}

export default TaskTable;
