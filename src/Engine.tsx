'use client'

import { fixed } from './common.styles'
import { useGame } from './hooks/use-game'
import { Hud } from './Hud'
import { Lobby } from './Lobby'
import { Menu } from './Menu'

export function Engine() {
  const { container, game, update } = useGame()
  return (
    <div>
      <div
        className={fixed}
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
