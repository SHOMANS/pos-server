import mongoose from 'mongoose';
import { ROLE_NAMES } from '../constants/roles';
import Role from '../models/Role';

const defaultRoles = [
  {
    name: ROLE_NAMES.ADMIN,
    permissions: [
      'product:create',
      'product:update',
      'product:delete',
      'order:view',
      'order:refund',
      'inventory:view',
      'user:manage',
      'role:manage',
    ],
  },
  {
    name: ROLE_NAMES.MANAGER,
    permissions: [
      'product:create',
      'product:update',
      'order:view',
      'inventory:view',
    ],
  },
  {
    name: ROLE_NAMES.CASHIER,
    permissions: ['order:view', 'order:refund', 'inventory:view'],
  },
];

export const createDefaultRolesForTenant = async (
  tenantId: mongoose.Types.ObjectId
) => {
  const rolesWithTenant = defaultRoles.map((role) => ({
    ...role,
    tenant: tenantId,
  }));

  await Role.insertMany(rolesWithTenant);
};
