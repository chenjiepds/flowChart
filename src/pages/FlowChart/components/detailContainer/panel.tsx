import { Card, Form, Input } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';
import { DetailPanelComponentProps } from 'gg-editor/lib/components/DetailPanel';
import { EditorContextProps } from 'gg-editor/lib/components/EditorContext';
import upperFirst from 'lodash/upperFirst';
import React, { useMemo } from 'react';

const { Item } = Form;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

interface PanelProps
  extends FormComponentProps,
    EditorContextProps,
    DetailPanelComponentProps {}

const DetailItemPanel = (props) => {
  const { type, nodes, edges, executeCommand } = props;
  const [form] = Form.useForm();
  const label = useMemo(() => {
    if (type === 'node') {
      return nodes[0].getModel().label;
    }

    if (type === 'edge') {
      return edges[0].getModel().label;
    }
  }, [type]);

  const handleSubmit = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const item = type === 'node' ? nodes[0] : edges[0];
    const values = form.getFieldsValue();

    executeCommand('update', {
      id: item.get('id'),
      updateModel: {
        ...values,
      },
    });
  };

  const renderNodeDetail = () => {
    return (
      <Form form={form} {...formItemLayout} initialValues={{ label }}>
        <Form.Item name="label" label="Label">
          <Input onBlur={handleSubmit} />
        </Form.Item>
      </Form>
    );
  };

  const renderEdgeDetail = () => {
    return (
      <Form form={form} {...formItemLayout} initialValues={{ label }}>
        <Item name="label" label="Label">
          <Input onBlur={handleSubmit} />
        </Item>
      </Form>
    );
  };

  const renderMultiDetail = () => {
    return null;
  };

  const renderCanvasDetail = () => {
    return <p>Select a node or edge :)</p>;
  };

  return (
    <Card title={upperFirst(type)} bordered={false}>
      {type === 'node' && renderNodeDetail()}
      {type === 'edge' && renderEdgeDetail()}
      {type === 'multi' && renderMultiDetail()}
      {type === 'canvas' && renderCanvasDetail()}
    </Card>
  );
};

type WrappedPanelProps = Omit<PanelProps, keyof FormComponentProps>;
const WrappedPanel = withEditorContext(DetailItemPanel);

export const NodePanel =
  DetailPanel.create<WrappedPanelProps>('node')(WrappedPanel);
export const EdgePanel =
  DetailPanel.create<WrappedPanelProps>('edge')(WrappedPanel);
export const MultiPanel =
  DetailPanel.create<WrappedPanelProps>('multi')(WrappedPanel);
export const CanvasPanel =
  DetailPanel.create<WrappedPanelProps>('canvas')(WrappedPanel);
