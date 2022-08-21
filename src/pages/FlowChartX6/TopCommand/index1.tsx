import { EditorCommand } from '@/constants';
import {
  CopyOutlined,
  DeleteOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SnippetsOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Divider, Tooltip } from 'antd';
import { pick, upperFirst } from 'lodash';
import Command from './command';
import styles from './index.less';

const FLOW_COMMAND_LIST = [
  EditorCommand.Undo,
  EditorCommand.Redo,
  '|',
  EditorCommand.Copy,
  EditorCommand.Paste,
  EditorCommand.Remove,
  '|',
  EditorCommand.ZoomIn,
  EditorCommand.ZoomOut,
];

const MAP_ICON = {
  undo: <RotateLeftOutlined />,
  redo: <RotateRightOutlined />,
  copy: <CopyOutlined />,
  paste: <SnippetsOutlined />,
  remove: <DeleteOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
};

const MIND_COMMAND_LIST = [
  EditorCommand.Undo,
  EditorCommand.Redo,
  '|',
  EditorCommand.Copy,
  EditorCommand.Paste,
  EditorCommand.Remove,
  '|',
  EditorCommand.Topic,
  EditorCommand.Subtopic,
  '|',
  EditorCommand.Fold,
  EditorCommand.Unfold,
  '|',
  EditorCommand.ZoomIn,
  EditorCommand.ZoomOut,
];

function TopCommand(props) {
  return (
    <div {...pick(props, ['className', 'style'])}>
      <div className={styles.toolbar}>
        {FLOW_COMMAND_LIST.map((name, index) => {
          if (name === '|') {
            return <Divider key={index} type="vertical" />;
          }

          return (
            <Command
              key={name}
              name={name}
              className={styles.command}
              disabledClassName={styles.commandDisabled}
            >
              <Tooltip title={upperFirst(name)}>
                <span className={styles.itemIcon}>{MAP_ICON[name]}</span>
              </Tooltip>
            </Command>
          );
        })}
      </div>
    </div>
  );
}

export default TopCommand;
