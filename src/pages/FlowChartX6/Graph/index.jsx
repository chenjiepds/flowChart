import { Graph, Shape } from '@antv/x6';
import { pick } from 'lodash';
import { useContext, useEffect, useRef } from 'react';
import { EditorContext } from '../EditorContext';
import commands from './command';

const GraphFlow = (props) => {
  const { container } = props;
  const graphRef = useRef(null);
  const graphDomRef = useRef(null);

  const { setGraph, commandManager } = useContext(EditorContext);

  useEffect(() => {
    initGraph();
    bindEvent();
    bindKeyCommand();
  }, []);

  const bindEvent = () => {
    const graph = graphRef.current;
    const showPorts = (ports, show) => {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden';
      }
    };
    graph.on('node:mouseenter', () => {
      const ports = graphDomRef.current.querySelectorAll('.x6-port-body');
      showPorts(ports, true);
    });
    graph.on('node:mouseleave', () => {
      const ports = graphDomRef.current.querySelectorAll('.x6-port-body');
      showPorts(ports, false);
    });

    graph.on('node:change:data', ({ node }) => {
      const edges = graph.getIncomingEdges(node);
      const { status } = node.getData();
      edges?.forEach((edge) => {
        if (status === 'running') {
          edge.attr('line/strokeDasharray', 5);
          edge.attr('line/style/animation', 'running-line 30s infinite linear');
        } else {
          edge.attr('line/strokeDasharray', '');
          edge.attr('line/style/animation', '');
        }
      });
    });

    graph.on('edge:connected', ({ edge }) => {
      edge.attr({
        line: {
          strokeDasharray: '',
        },
      });
    });
  };

  const bindKeyCommand = () => {
    const graph = graphRef.current;

    Object.keys(commands).forEach((name) => {
      commandManager.register(name, commands[name]);
      // 绑定事件
      const { shortcuts, execute } = commands[name];
      shortcuts &&
        graph.bindKey(shortcuts, () => commandManager.execute(graph, name));
    });
  };

  const initGraph = () => {
    graphRef.current = new Graph({
      container: graphDomRef.current,
      grid: true,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
      },
      connecting: {
        router: {
          name: 'manhattan',
          args: {
            padding: 1,
          },
        },
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: {
          radius: 20,
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          });
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet;
        },
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF',
            },
          },
        },
      },
      resizing: true,
      rotating: true,
      selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      },
      snapline: true,
      keyboard: true,
      clipboard: true,
      history: {
        enabled: true,
      },
    });

    setGraph(graphRef.current);
  };
  return <div ref={graphDomRef} {...pick(props, ['style', 'className'])}></div>;
};

export default GraphFlow;
