import React, { FC, ReactElement, useContext, useState } from 'react';
import styles from './field.module.scss';
import CellComponent from './Cell/Cell.component';
import { ActiveRoleContext } from '../../Providers/ActiveRoleContext.provider';

const FieldComponent: FC = (): ReactElement => {
  const [fieldSize, setFieldSize] = useState<number>(9);
  const { resetActiveRole } = useContext(ActiveRoleContext);

  const changeFieldSize = (size: number) => {
    resetActiveRole();
    setFieldSize(size);
  };

  const renderCells = (): Array<ReactElement> => {
    const cells = [];

    for (let i = 0; i < fieldSize; i++) {
      const id = i.toString();
      cells.push(<CellComponent id={id} key={id}/>);
    }

    return cells;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.field}>
          {
            renderCells()
          }
        </div>
      </div>
    </div>
  );
};

export default FieldComponent;
