import { PageContainer } from '@ant-design/pro-components';
import GGEditor, { EditableLabel, Flow } from 'gg-editor';
import DetailPanel from './components/detailContainer';
import PanelList from './components/panelList';
import TopCommand from './components/topCommand';
import styles from './index.less';

const data = {
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
    {
      id: '2',
      type: 'circle',
      label: 'circle',
      x: 50,
      y: 350,
      size: 50,
      anchorPoints: [
        [0, 0.5],
        [0.5, 1],
      ],
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true,
      },
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
    {
      label: 'Label',
      source: '1',
      sourceAnchor: 1,
      target: '2',
      targetAnchor: 0,
    },
  ],
};

const AccessPage: React.FC = () => {
  //   const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '流程图',
      }}
    >
      <GGEditor>
        <TopCommand />
        <PanelList />
        <DetailPanel />
        <Flow className={styles.graph} data={data} />
        <EditableLabel />
      </GGEditor>
    </PageContainer>
  );
};

export default AccessPage;
