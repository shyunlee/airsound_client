import React, { useRef, useState } from 'react';
import styles from './console.module.css'
import SoundCard from '../card_sound/SoundCard';
import ScreenBall from '../ball_screen/ScreenBall'
import { MoodOnConsoleT, VideoT, SoundT } from '../../types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlay, faPause, faUndoAlt, faSave, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons'


type ConsoleProps = {
  onSaveOrEdit: (consoleMoodInfo: MoodOnConsoleT, consoleVideo: VideoT, consoleSounds: SoundT[] ) => Promise<Boolean>;
  onDelete: (moodId: number) => Promise<void>;
  selectedVideo: VideoT | undefined;
  selectedSoundsList: SoundT[];
  selectedMoodInfo: MoodOnConsoleT;
  unSelectMood: () => void;
  unSelectVideo: () => void;
  unSelectSound: (soundId: number) => void;
}

const Console = ({
  onSaveOrEdit, 
  onDelete,
  selectedVideo,
  selectedSoundsList,
  selectedMoodInfo,
  unSelectMood,
  unSelectVideo,
  unSelectSound
}: ConsoleProps): JSX.Element => {
  const [toggleDisplay, setToggleDisplay] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const titleRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<HTMLInputElement>(null)
  // const titleRef = createRef<HTMLInputElement>()
  // const timerRef = createRef<HTMLInputElement>()


  const onToggleDisplay = () => {
    setToggleDisplay(!toggleDisplay)
  }

  const deleteMoodOnConsole = () => {
    onDelete(selectedMoodInfo.id!)
    unSelectMood()
  }

  const saveMoodOnConsole = async () => {
    if (selectedVideo === undefined && selectedSoundsList.length === 0) {
      return;
    }
    const moodInfo = {
      id: selectedMoodInfo.id,
      title: titleRef.current?.value! || selectedMoodInfo.title || 'No Title',
      timer: Number(timerRef.current?.value) || selectedMoodInfo.timer || 3
    }
    const isSaved = await onSaveOrEdit(moodInfo, selectedVideo!, selectedSoundsList)
    if (isSaved) {
      return window.alert('Saved')
    }
    window.alert('Something went wrong')
  }

  console.log('console')
  return (
    <>
    {
      selectedVideo === undefined && selectedSoundsList.length === 0 ?
      ''
      :
      <div className={styles.console_controller}>
        <div className={styles.console_contoller_box}>
          <button className={`${styles.console_control_btn} ${styles.play}`}>
            {
              isPlaying? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>
            }
          </button>
          <button className={`${styles.console_control_btn} ${styles.save}`} onClick={saveMoodOnConsole}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button className={`${styles.console_control_btn} ${styles.delete}`} onClick={unSelectMood}>
            <FontAwesomeIcon icon={faTrashRestoreAlt} />
          </button>
          {
            selectedMoodInfo.id ? 
            <>
              <button className={`${styles.console_control_btn} ${styles.reset}`}>
                <FontAwesomeIcon icon={faUndoAlt} />
              </button>
              <button className={`${styles.console_control_btn} ${styles.delete}`} onClick={deleteMoodOnConsole}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </>
            :
              ''
          }
        </div>
      </div>
    }
      <div className={styles.console_container}>
        <div className={`${styles.console} ${toggleDisplay?styles.closed:''}`}>
        {
          selectedSoundsList.length===0 && selectedVideo === undefined
          ?
          ''
          : 
          <div className={styles.console_top}>
          {
            selectedVideo ? 
            <div className={styles.selected_screen}>
              <ScreenBall video={selectedVideo}/>
              <button className={styles.clear_screen_btn} onClick={unSelectVideo}>X</button>
            </div>
            : ''
          }
          <div className={styles.mood_info}>
            <p className={styles.mood_info_title}>
              Mood<input  ref={titleRef} name='title' type="text" placeholder={selectedMoodInfo.title.slice(0,1).toUpperCase().concat(selectedMoodInfo.title.slice(1)) || 'No Title'}/>
            </p>
            <p className={styles.mood_info_timer}>
              min<input  ref={timerRef} name='timer' type="number" placeholder={`${selectedMoodInfo.timer}`}/>
            </p>
          </div>
        </div>
        }
          <div>
            {selectedSoundsList.map(item => <SoundCard key={item.id} sound={item} unSelectSound={unSelectSound}/>)}
          </div>
        </div>
          <div className={`${styles.console_toggle} ${toggleDisplay?styles.closed:''}`}>
            <div className={styles.console_bar}></div>
            <img className={`${styles.toggle_btn} ${toggleDisplay?styles.closed:''}`} onClick={onToggleDisplay} src="./images/arrow_btn.png" alt="arrow" />
          </div>
      </div>
    </>
  )
}

export default Console;