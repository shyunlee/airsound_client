import React from 'react';
import styles from './mood_list.module.css'

const MoodList = (props) => {
  return (
    <>
      <div className={styles.mood_list}>

      </div>
      <div className={styles.mood_list_bar}></div>
      <div className={styles.mood_list_toggle}>
        <img className={`${styles.toggle_btn} ${styles.opened}`} src="./images/arrow_btn.png" alt="arrow" />
      </div>
    </>
  )
}

export default MoodList;