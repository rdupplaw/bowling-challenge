const Game = require('../lib/game')

describe('Game', () => {
  let game

  class FrameClassDouble {
    addRoll () {}
    addBonus () {}
    get isFinalized () {}
  }

  beforeEach(() => {
    game = new Game(FrameClassDouble)
  })

  describe('.prototype.bowl(pinfall)', () => {
    it('sends .addRoll(pinfall) to the current frame', () => {
      const firstFrame = game._currentFrame
      spyOn(firstFrame, 'addRoll')
      game._addNewFrame()
      const secondFrame = game._currentFrame
      spyOn(secondFrame, 'addRoll')
      game.bowl(4)

      expect(firstFrame.addRoll).not.toHaveBeenCalled()
      expect(secondFrame.addRoll).toHaveBeenCalledWith(4)
    })

    it('sends .addBonus(pinfall) to all frames', () => {
      const firstFrame = game._currentFrame
      spyOn(firstFrame, 'addBonus')
      game._addNewFrame()
      const secondFrame = game._currentFrame
      spyOn(secondFrame, 'addBonus')
      game._addNewFrame()
      const thirdFrame = game._currentFrame
      spyOn(thirdFrame, 'addBonus')
      game.bowl(4)

      expect(firstFrame.addBonus).toHaveBeenCalledWith(4)
      expect(secondFrame.addBonus).toHaveBeenCalledWith(4)
      expect(thirdFrame.addBonus).toHaveBeenCalledWith(4)
    })

    it('moves onto the next frame if current frame is over', () => {
      const firstFrame = game._currentFrame
      const spy = spyOnProperty(firstFrame, 'isFinalized', 'get').and.returnValue(true)

      expect(firstFrame).toBe(game._currentFrame)

      game.bowl(4)

      expect(spy).toHaveBeenCalledWith()
      expect(firstFrame).not.toBe(game._currentFrame)
    })
  })
})