import { User } from './users.entity';

describe('Users', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});