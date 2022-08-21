const pasteCommand = {
  canExecute(graph) {
    return !graph.isClipboardEmpty();
  },

  execute(graph) {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  },

  undo(graph) {},

  shortcuts: ['meta+v', 'ctrl+v'],
};

export default pasteCommand;
