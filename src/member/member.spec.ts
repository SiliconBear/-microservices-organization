import { Member } from './member.entity';

describe('Member', () => {
  it('should be defined', () => {
    expect(new Member()).toBeDefined();
  });
});
