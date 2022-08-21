class CommandManager {
  constructor() {
    this.command = {};
    this.commandQueue = [];
    this.commandIndex = 0;
  }

  /** 注册命令 */
  register(name, command) {
    this.command[name] = {
      ...command,
      name,
    };
  }

  /** 执行命令 */
  execute(graph, name) {
    const Command = this.command[name];

    if (!Command) {
      return;
    }

    const command = Object.create(Command);

    if (!command.canExecute(graph)) {
      return;
    }

    command.execute(graph);
  }

  /** 判断是否可以执行 */
  canExecute(graph, name) {
    return this.command[name].canExecute(graph);
  }
}

export default CommandManager;
