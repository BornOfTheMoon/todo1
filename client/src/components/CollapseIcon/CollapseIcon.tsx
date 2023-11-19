import styles from './CollapseIcon.module.scss';
import React from 'react'

function CollapseIcon(isCollapsed: any) {
    const flag = isCollapsed ? '+' : '-'
  return (
    <p className={styles.flag}>
      {flag}
    </p>
  );
}

export default CollapseIcon;
