const cutCommand = {
  canExecute(graph) {
    return !!graph.getSelectedCells().length;
  },

  canUndo() {
    return false;
  },

  execute(graph) {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  },

  shortcuts: ['meta+x', 'ctrl+x'],
};

export default cutCommand;
