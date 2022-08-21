const selectAllCommand = {
  name: 'selectAll',
  canExecute(graph) {
    return !!graph.getNodes();
  },

  canUndo() {
    return false;
  },

  execute(graph) {
    const nodes = graph.getNodes();
    if (nodes) {
      graph.select(nodes);
    }
  },

  shortcuts: ['meta+a', 'ctrl+a'],
};

export default selectAllCommand;
