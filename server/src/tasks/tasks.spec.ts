import { Task } from './tasks.entity';

describe('Tasks', () => {
  it('should be defined', () => {
    expect(new Task()).toBeDefined();
  });
});