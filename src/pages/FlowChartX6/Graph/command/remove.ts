const removeCommand = {
  canExecute(graph) {
    return !!graph.getSelectedCells().length;
  },

  execute(graph) {
    const cells = graph.getSelectedCells();
    console.log(123, cells);
    if (cells.length) {
      graph.removeCells(cells);
    }
  },

  shortcuts: 'backspace',
};

export default removeCommand;
