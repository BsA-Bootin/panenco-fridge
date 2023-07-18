import { Forbidden, IRequirement } from '@panenco/papi';
import { Request } from 'express';
import { MyToken } from './token.type';

export const adminRequirement: IRequirement = (req: Request) => {
  const { token } = req as any;

  if ((token as MyToken).role === 'admin') {
    return;
  }

  throw new Forbidden('NoAccessToUser', 'Not enough rights');
};