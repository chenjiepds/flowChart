const copyCommand = {
  canExecute(graph) {
    return !!graph.getSelectedCells().length;
  },

  canUndo() {
    return false;
  },

  execute(graph) {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  },

  shortcuts: ['meta+c', 'ctrl+c'],
};

export default copyCommand;
