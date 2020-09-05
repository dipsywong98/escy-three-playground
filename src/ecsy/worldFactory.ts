import { World } from 'ecsy'
import { Position } from './components/Position'
import { Velocity } from './components/Velocity'
import { PositionLogSystem } from './systems/PositionLogSystem'

export const worldFactory = (): World => {
  const world = new World()
  world
    .registerComponent(Position)
    .registerComponent(Velocity)
    .registerSystem(PositionLogSystem)
  return world
}
