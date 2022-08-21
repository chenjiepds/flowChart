import services from '@/services/demo';
import { useEffect, useState } from 'react';
import CommandManager from '../CommandManager';
import { EditorContext } from '../EditorContext';
import Graph from '../Graph';
import Panel from '../Panel';
import TopCommand from '../TopCommand';
import styles from './index.less';

const { queryFlowData } = services.FlowController;

const commandManager = new CommandManager();

const nodeStatusList = [
  [
    {
      id: '1',
      status: 'default',
    },
    {
      id: '2',
      status: 'default',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'running',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'running',
    },
    {
      id: '4',
      status: 'running',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'success',
    },
    {
      id: '4',
      status: 'failed',
    },
  ],
];

const FlowEditor = (props) => {
  const [graph, setGraph] = useState(null);

  const runStart = () => {
    showNodeStatus(nodeStatusList);
  };

  // 显示节点状态
  const showNodeStatus = async (statusList) => {
    const status = statusList.shift();
    status?.forEach((item) => {
      const { id, status } = item;
      const node = graph.getCellById(id);
      const data = node.getData();
      node.setData({
        ...data,
        status: status,
      });
    });
    setTimeout(() => {
      showNodeStatus(statusList);
    }, 3000);
  };

  const initGraph = async () => {
    const { data } = (await queryFlowData()) || {};
    const cells = [];
    data.forEach((item) => {
      if (item.shape === 'dag-node') {
        cells.push(graph.createNode(item));
      } else {
        cells.push(graph.createEdge(item));
      }
    });
    graph.resetCells(cells);
    graph.centerContent();
  };

  useEffect(() => {
    if (graph) {
      initGraph();
    }
  }, [graph]);

  return (
    <div className={styles.container}>
      <EditorContext.Provider
        value={{ graph, setGraph, commandManager, runStart }}
      >
        <TopCommand className={styles.command} />
        <Panel className={styles.panel} />
        <Graph className={styles.graph} />
      </EditorContext.Provider>
    </div>
  );
};

export default FlowEditor;
