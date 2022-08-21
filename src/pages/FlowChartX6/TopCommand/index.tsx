import {
  CopyOutlined,
  DeleteOutlined,
  RedoOutlined,
  SnippetsOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Toolbar } from '@antv/x6-react-components';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import { Button } from 'antd';
import { useContext } from 'react';
import { EditorContext } from '../EditorContext';

import styles from './index.less';

const Item = Toolbar.Item;
const Group = Toolbar.Group;

const TopCommand = () => {
  const { commandManager, graph, runStart, handleSave } =
    useContext(EditorContext);

  const onClick = (name) => {
    commandManager.execute(graph, name);
  };

  const renderExtra = () => {
    return (
      <>
        <Button
          type="primary"
          style={{ marginRight: '10px' }}
          onClick={() => runStart()}
        >
          运行
        </Button>
        <Button onClick={() => handleSave()}>保存</Button>
      </>
    );
  };

  return (
    <Toolbar
      onClick={onClick}
      size="big"
      extra={<span>{renderExtra()}</span>}
      className={styles.command}
    >
      <Group>
        <Item name="copy" tooltip="Copy (Cmd C)" icon={<CopyOutlined />} />
        <Item
          name="paste"
          tooltip="Paste (Cmd V)"
          icon={<SnippetsOutlined />}
        />
      </Group>
      <Group>
        <Item
          name="zoomIn"
          tooltip="Zoom In (Cmd 1)"
          icon={<ZoomInOutlined />}
        />
        <Item
          name="zoomOut"
          tooltip="Zoom Out (Cmd 2)"
          icon={<ZoomOutOutlined />}
        />
      </Group>
      <Group>
        <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<UndoOutlined />} />
        <Item
          name="redo"
          tooltip="Redo (Cmd + Shift + Z)"
          icon={<RedoOutlined />}
        />
      </Group>
      <Group>
        <Item
          name="remove"
          icon={<DeleteOutlined />}
          tooltip="Delete (Delete)"
        />
      </Group>
    </Toolbar>
  );
};

export default TopCommand;
