import React from 'react';
import styles from './index.less';
interface NodeStatus {
  id: string;
  status: 'default' | 'success' | 'failed' | 'running';
  label?: string;
}

const image = {
  logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
  success:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
  failed:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
  running:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
};
export class AlgoNode extends React.Component<{ node?: Node }> {
  shouldComponentUpdate() {
    const { node } = this.props;
    if (node) {
      if (node.hasChanged('data')) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { node } = this.props;
    const data = node?.getData();
    const { label = '自定义过程', status = 'default' } =
      data || ({} as NodeStatus);

    return (
      <div className={`${styles.node} ${styles[status]}`}>
        <img src={image.logo} />
        <span className={styles.label}>{label}</span>
        <span className={styles.status}>
          {status === 'success' && <img src={image.success} />}
          {status === 'failed' && <img src={image.failed} />}
          {status === 'running' && <img src={image.running} />}
        </span>
      </div>
    );
  }
}
