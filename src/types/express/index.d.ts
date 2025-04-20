import { UserRoles } from '../auth/roles/roles.enum';

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        roles: UserRoles[];
      };
    }
  }
}
