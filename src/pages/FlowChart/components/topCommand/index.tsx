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
import { Command, constants, ContextMenu } from 'gg-editor';
import { MindData } from 'gg-editor/lib/common/interfaces';
import upperFirst from 'lodash/upperFirst';
import styles from './index.less';

const { EditorCommand } = constants;

// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: 'https://at.alicdn.com/t/font_1518433_oa5sw7ezue.js',
// });

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

const flowData = {
  nodes: [
    {
      id: '0',
      label: 'Node',
      x: 50,
      y: 50,
    },
    {
      id: '1',
      label: 'Node',
      x: 50,
      y: 200,
    },
  ],
  edges: [
    {
      label: 'Label',
      source: '0',
      sourceAnchor: 1,
      target: '1',
      targetAnchor: 0,
    },
  ],
};

const mindData: MindData = {
  id: '0',
  label: 'Central Topic',
  children: [
    {
      id: '1',
      side: 'left',
      label: 'Main Topic 1',
    },
    {
      id: '2',
      side: 'right',
      label: 'Main Topic 2',
    },
    {
      id: '3',
      side: 'right',
      label: 'Main Topic 3',
    },
  ],
};

function TopCommand() {
  return (
    <div>
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
                {/* <IconFont type={`icon-${name}`} /> */}
              </Tooltip>
            </Command>
          );
        })}
      </div>
      {/* <Mind className={styles.graph} data={mindData} /> */}
      <ContextMenu
        renderContent={(item, position, hide) => {
          const { x: left, y: top } = position;

          return (
            <div
              className={styles.contextMenu}
              style={{ position: 'absolute', top, left }}
            >
              {[
                EditorCommand.Undo,
                EditorCommand.Redo,
                EditorCommand.PasteHere,
              ].map((name) => {
                return (
                  <Command
                    key={name}
                    name={name}
                    className={styles.command}
                    disabledClassName={styles.commandDisabled}
                  >
                    <div onClick={hide}>
                      {/* <IconFont type={`icon-${name}`} /> */}
                      <span className={styles.itemIcon}>{MAP_ICON[name]}</span>
                      <span>{upperFirst(name)}</span>
                    </div>
                  </Command>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
}

export default TopCommand;
