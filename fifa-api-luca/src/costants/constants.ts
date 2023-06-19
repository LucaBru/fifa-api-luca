import type { GenericError } from '../types/GenericError';

export const internalServerError: GenericError = {
  message: 'API Failed',
  explanation: 'API internel failure',
  action: 'Contact api team',
};
