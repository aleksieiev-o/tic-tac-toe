import React, { FC, ReactElement, useContext, useState } from 'react';
import styles from './cell.module.scss';
import { ActiveRole, ActiveRoleContext } from '../../../Providers/ActiveRoleContext.provider';

enum CellValue {
  EMPTY_VALUE,
  CROSS_VALUE,
  NULL_VALUE,
}

interface Cell {
  id: string,
  value: CellValue;
}

interface Props {
  id: string;
}

const CellComponent: FC<Props> = ({ id}): ReactElement => {
  const [cellValue, setCellValue] = useState<CellValue>(CellValue.EMPTY_VALUE);
  const { activeRole, toggleActiveRole } = useContext(ActiveRoleContext);

  const changeCellValue = () => {
    if (cellValue === CellValue.EMPTY_VALUE && activeRole === ActiveRole.CROSS_ROLE) {
      setCellValue(CellValue.CROSS_VALUE);
      toggleActiveRole();
    } else if (cellValue === CellValue.EMPTY_VALUE && activeRole === ActiveRole.NULL_ROLE) {
      setCellValue(CellValue.NULL_VALUE);
      toggleActiveRole();
    }
  };

  return (
    <div id={id} className={styles.cell} onClick={() => changeCellValue()}>
      {cellValue}
    </div>
  );
};

export default CellComponent;
