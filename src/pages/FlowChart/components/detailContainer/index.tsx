import styles from './index.less';
import { CanvasPanel, EdgePanel, MultiPanel, NodePanel } from './panel';

function DetailPanel() {
  return (
    <div className={styles.detailPanel}>
      <NodePanel />
      <EdgePanel />
      <MultiPanel />
      <CanvasPanel />
    </div>
  );
}

export default DetailPanel;
