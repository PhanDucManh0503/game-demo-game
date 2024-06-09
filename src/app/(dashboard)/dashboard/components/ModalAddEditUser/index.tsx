import { useEffect } from 'react';
import { useFetchUser } from '@hooks/query-hooks/useUsers';
import { Form, Input, Modal } from 'antd';

type FieldType = {
  email?: string;
  username?: string;
};

interface ModalAddEditUserProps {
  open: boolean;
  editUserId: string;
  handleOk: (data: any) => void;
  handleCancel: () => void;
}
const ModalAddEditUser = ({
  open,
  editUserId,
  handleCancel,
  handleOk,
}: ModalAddEditUserProps) => {
  const [form] = Form.useForm();
  const { data } = useFetchUser(editUserId);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [form, data]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleOk({
      id: editUserId,
      data: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        centered
        open={!!open}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ ...data }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddEditUser;
