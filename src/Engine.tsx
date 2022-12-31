import { useState } from 'react'

import styles from '../styles/fixed.module.css'
import { useGame } from './hooks/use-game'
import Hud from './Hud'
import Lobby from './Lobby'
import Menu from './Menu'

export default function Engine() {
  const { container, game, update } = useGame()
  return (
    <div>
      <div
        className={styles.fixed}
        ref={(element) =>
          container !== (element || undefined) && update(element || undefined)
        }
      ></div>
      <Lobby />
      <Hud />
      <Menu />
    </div>
  )
}
