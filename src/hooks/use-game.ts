import produce from 'immer'
import Phaser, { Game, Scene } from 'phaser'
import create from 'zustand'

export class InitialScene extends Scene {
  initialize() {
    console.log('Scene Initialized')
  }
  create() {
    console.log('Scene Created')
  }
}

export interface GameState {
  container: HTMLElement | undefined
  game: Game | undefined
  update(container: HTMLElement | undefined): void
}
export const useGame = create<GameState>((set, get) => ({
  game: undefined,
  container: undefined,
  update(container) {
    const state = get()
    let game = state.game
    if (!game && !!container && container !== state.container) {
      set(
        produce((state) => {
          state.container = container
          state.game = new Game({
            type: Phaser.AUTO,
            scale: {
              mode: Phaser.Scale.ScaleModes.RESIZE,
            },
            scene: [InitialScene],
            parent: container,
          })
        })
      )
      return
    }
    if (!container && !!game) {
      game.destroy(true)
      set(
        produce((state) => {
          state.game = undefined
          state.container = undefined
        })
      )
    }
  },
}))
