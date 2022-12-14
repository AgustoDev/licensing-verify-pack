import { expect, it, describe } from 'vitest';
import { licenseValidator } from '../src/main';

const payload =
  'gq6lex82q7tp1ynloa8rq8vquvvwufhtdqi7lllU2FsdGVkX1/RCCB5VLN4QMqGjqNC+449xGd/htOBzjv2EaAsTzg6i6TkKkMIa3+pv5OESpb2nYDPGK+UEEg8TIs9NpsqWPn5G6IpsU6Ag8jyrdcqDJ/YzxwPKhvFWMV1aH2duDZPJtK6NPfi/hcrewJmdJedgQ4MLAFrsR4Yw76EEzQGSbYt4Ocj8RAD4rEXFZw7xvyusR2wtKR3YfD49Ti59Ur/Uj5Z9+VlvtkRqgk=7aw72v2axqwng6zfpplri1339';

describe('app', () => {
  it('should work', () => {
    expect(licenseValidator).toBeDefined();
  });

  it('should decrypt a license', () => {
    const decrypted = licenseValidator.verify(payload);
    expect(decrypted).toBeDefined();
    expect(decrypted?.data).toBeDefined();
    expect(decrypted?.data?.id).toEqual('1b518f5d-ac5d-4cd5-a93c-6130c9ecf3d3');
    expect(decrypted?.data?.name).toEqual('Test Company');
    expect(decrypted?.data?.startDate).toBeDefined();
    expect(decrypted?.data?.endDate).toBeDefined();
    expect(decrypted?.data?.gracePeriod).toEqual(5);
  });

  it('should throw an error if the license is invalid', () => {
    const decrypted = licenseValidator.verify('invalid-license');
    expect(decrypted).toBeDefined();
    expect(decrypted?.errorMessage).toBeDefined();
  });
});
