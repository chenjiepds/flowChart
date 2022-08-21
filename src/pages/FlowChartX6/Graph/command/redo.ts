const redoCommand = {
  name: 'redo',

  params: {},

  canExecute(graph) {
    return graph.history.canRedo();
  },

  shouldExecute() {
    return true;
  },

  canUndo() {
    return false;
  },

  init() {},

  execute(graph) {
    if (graph.history.canRedo()) {
      graph.history.redo();
    }
    return false;
  },

  undo() {},

  shortcuts: ['meta+shift+z', 'ctrl+shift+z'],
};

export default redoCommand;
