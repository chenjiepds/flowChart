import { useContext, useEffect, useState } from 'react';
import { EditorContext } from '../EditorContext';

const Command = (props) => {
  const { children, className, disabledClassName, name } = props;
  const [disabled, setDisabled] = useState(false);
  const { commandManager, graph } = useContext(EditorContext);

  //   if (!graph) {
  //     return null;
  //   }

  useEffect(() => {
    setDisabled(commandManager.canExecute(graph, name));
  }, [graph]);

  const handleClick = () => {
    commandManager.execute(graph, name);
  };
  return (
    <div
      className={`${className}${disabled ? ` ${disabledClassName}` : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Command;
