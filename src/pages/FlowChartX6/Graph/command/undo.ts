const undoCommand = {
  name: 'undo',

  canExecute(graph) {
    return graph.history.canUndo();
  },

  canUndo() {
    return false;
  },

  init() {},

  execute(graph) {
    if (graph.history.canUndo()) {
      graph.history.undo();
    }
    return false;
  },

  undo() {},

  shortcuts: ['meta+z', 'ctrl+z'],
};

export default undoCommand;
