import React, { ChangeEvent, FC, ReactElement } from 'react';
import styles from './field-actions-selector.module.scss';

interface Props {
  label: string;
  selectName: string;
  selectValue: string | number;
  selectOptions: Array<ReactElement>;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FieldActionsSelectorComponent: FC<Props> = (props): ReactElement => {
  const {label, selectName, selectValue, selectOptions, changeHandler} = props;

  return (
    <div className={styles.fieldActionsWrapper}>
      <label htmlFor={selectName}>
        {label}
      </label>

      <select onChange={changeHandler} className={styles.fieldActionsSelector} name={selectName} id={selectName} value={selectValue}>
        {selectOptions}
      </select>
    </div>
  );
};

export default FieldActionsSelectorComponent;
