import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...role: UserRoles[]) => SetMetadata(ROLES_KEY, role);
