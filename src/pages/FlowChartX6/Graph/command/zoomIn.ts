const zoomInCommand = {
  canUndo() {
    return false;
  },
  canExecute() {
    return true;
  },

  execute(graph) {
    const zoom = graph.zoom();
    if (zoom < 1.5) {
      graph.zoom(0.1);
    }
  },

  shortcuts: ['ctrl+1', 'meta+1'],
};

export default zoomInCommand;
