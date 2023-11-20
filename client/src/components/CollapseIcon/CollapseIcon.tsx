import { ReactElement } from 'react';
import styles from './CollapseIcon.module.scss';

function CollapseIcon(isCollapsed: any): ReactElement<any, any> {
    const flag = isCollapsed ? '+' : '-'
  return (
    <p className={styles.flag}>
      {flag}
    </p>
  );
}

export default CollapseIcon;
