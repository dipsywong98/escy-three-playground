import { System } from 'ecsy'
import { Position } from '../components/Position'

export class PositionLogSystem extends System{
  init() {

  }

  execute (delta: number, time: number) {
    this.queries.position.results.forEach(entity => {
      // Access the component `Position` on the current entity
      const pos = entity.getMutableComponent(Position);
      if(pos) {
        console.log(`Entity with ID: ${entity.id} has component Position={x: ${pos.x}, y: ${pos.y}`);

      }
    });
  }
}

PositionLogSystem.queries = {
  position: {
    components: [Position]
  }
}
