import { Organization } from './organization.entity';

describe('Organization', () => {
  it('should be defined', () => {
    expect(new Organization()).toBeDefined();
  });
});
