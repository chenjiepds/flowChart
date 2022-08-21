const removeCommand = {
  canExecute(graph) {
    return !!graph.getSelectedCells().length;
  },

  execute(graph) {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
  },

  shortcuts: 'backspace',
};

export default removeCommand;
