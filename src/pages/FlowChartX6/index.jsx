import { PageContainer } from '@ant-design/pro-components';
import FlowEditor from './FlowEditor';
import './index.less';

const FlowChart = () => {
  return (
    <PageContainer
      ghost
      header={{
        title: '流程图',
      }}
    >
      <FlowEditor />
    </PageContainer>
  );
};
export default FlowChart;
