import { ContextMenu, Menu } from '@antv/x6-react-components';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { useRef, useState } from 'react';

const ContextMenuComponent = (props) => {
  const { children, graph } = props;
  const [menuDisabled, setMenuDisabled] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const currentNode = useRef(null);
  const [form] = Form.useForm();

  graph?.on('node:contextmenu', (e) => {
    console.log('node.contextmenu', e);
    setMenuDisabled(false);
    currentNode.current = e.node;
  });

  const handleEditNode = () => {
    const currentNodeData = currentNode.current.getData();
    setDrawerVisible(true);
    if (currentNodeData) {
      const { label, status } = currentNodeData || {};
      form.setFieldsValue({ label, status });
    }
    setMenuDisabled(true);
  };

  const handleDeleteNode = () => {
    currentNode.current && graph.removeCells([currentNode.current]);
    setMenuDisabled(true);
  };

  const handleVisibleChange = (visible) => {
    !visible && setMenuDisabled(true);
  };

  const handleSaveClick = () => {
    form.validateFields().then((values) => {
      const { label, status } = values;
      currentNode.current.setData({ label, status });
      onClose();
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={handleEditNode}>
        编辑
      </Menu.Item>
      <Menu.Item key="delete" onClick={handleDeleteNode}>
        删除
      </Menu.Item>
    </Menu>
  );

  const onClose = () => {
    setDrawerVisible(false);
  };
  return (
    <>
      <ContextMenu
        menu={menu}
        disabled={menuDisabled}
        onVisibleChange={handleVisibleChange}
      >
        {children}
      </ContextMenu>
      <Drawer
        title="节点信息"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={handleSaveClick}>
              确定
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
        >
          <Form.Item label="Label" name="label" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="状态" name="status" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ContextMenuComponent;
