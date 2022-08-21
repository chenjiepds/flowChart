import { Addon, Graph } from '@antv/x6';
import { pick } from 'lodash';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { EditorContext } from '../EditorContext';
import {
  CUSTOM_NODE_LIST,
  IMAGE_SHAPE_LIST,
  NODE_LIST,
  REGISTER_NODE_LIST,
} from './const';
import registerCustomEdge from './CustomNode/CustomEdge';

const Panel = (props) => {
  const stencilRef = useRef(null);
  const divRef = useRef(null);
  const { graph } = useContext(EditorContext);

  stencilRef.current = useMemo(
    () =>
      new Addon.Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 220,
        // stencilGraphHeight: 220,
        collapsable: true,
        groups: [
          {
            title: '基础流程图',
            name: 'group1',
            graphHeight: 180,
          },
          {
            title: '系统设计图',
            name: 'group2',
            graphHeight: 250,
            layoutOptions: {
              rowHeight: 70,
            },
          },
          {
            title: '自定义',
            name: 'group3',
            graphHeight: 100,
            layoutOptions: {
              columns: 1,
              marginX: 40,
            },
          },
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 100,
          rowHeight: 55,
          //   marginX: 20,
          //   resizeToFit: true,
        },
      }),
    [graph],
  );

  useEffect(() => {
    registerNode();
    registerCustomEdge();
  }, []);

  useEffect(() => {
    if (stencilRef.current) {
      divRef.current.appendChild(stencilRef.current.container);
      if (graph) {
        const nodeGroups = createNode(graph);
        nodeGroups?.map(({ gName, nodes }) =>
          stencilRef.current.load(nodes, gName),
        );
      }
    }
  }, [stencilRef.current]);

  const registerNode = () => {
    REGISTER_NODE_LIST.forEach(({ name, attr }) => {
      Graph.registerNode(name, attr, true);
    });
  };

  const createNode = (graph) => {
    const basicNodes = NODE_LIST.map((item) => graph.createNode(item));

    const customNodes = IMAGE_SHAPE_LIST.map((item) =>
      graph.createNode({
        shape: 'custom-image',
        label: item.label,
        attrs: {
          image: {
            'xlink:href': item.image,
          },
        },
      }),
    );

    const selfNodes = CUSTOM_NODE_LIST.map((item) => graph.createNode(item));

    return [
      { nodes: basicNodes, gName: 'group1' },
      { nodes: customNodes, gName: 'group2' },
      { nodes: selfNodes, gName: 'group3' },
    ];
  };

  return (
    <div
      ref={(ref) => (divRef.current = ref)}
      {...pick(props, ['style', 'className'])}
    ></div>
  );
};

export default Panel;
