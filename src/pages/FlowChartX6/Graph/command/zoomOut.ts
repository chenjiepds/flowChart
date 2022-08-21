const zoomOutCommand = {
  canUndo() {
    return false;
  },
  canExecute() {
    return true;
  },

  execute(graph) {
    const zoom = graph.zoom();
    if (zoom > 0.5) {
      graph.zoom(-0.1);
    }
  },

  shortcuts: ['ctrl+2', 'meta+2'],
};

export default zoomOutCommand;
