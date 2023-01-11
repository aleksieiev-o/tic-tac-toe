import React, { FC, ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import styles from './cell.module.scss';
import { ActiveRole, ActiveRoleContext } from '../../../Providers/ActiveRoleContext.provider';

enum CellValue {
  EMPTY_VALUE = '',
  CROSS_VALUE = 'X',
  NULL_VALUE = '0',
}

interface Props {
  id: string;
  rowsAndColumnsCount: number;
  fieldSize: number;
}

const CellComponent: FC<Props> = ({ id, rowsAndColumnsCount, fieldSize}): ReactElement => {
  const [cellValue, setCellValue] = useState<CellValue>(CellValue.EMPTY_VALUE);
  const { activeRole, toggleActiveRole } = useContext(ActiveRoleContext);

  useEffect(() => {
    setCellValue(CellValue.EMPTY_VALUE);
  }, [fieldSize]);

  const cellSize = useMemo(() => {
    return {
      width: `calc(100% / ${rowsAndColumnsCount})`,
      height: `calc(100% / ${rowsAndColumnsCount})`,
    };
  }, [rowsAndColumnsCount]);

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
    <div id={id} className={styles.cell} style={cellSize} onClick={() => changeCellValue()}>
      {cellValue}
    </div>
  );
};

export default CellComponent;
