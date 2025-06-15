import mongoose from 'mongoose';
import Role from '../models/Role';

const defaultRoles = [
  {
    name: 'admin',
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
    name: 'manager',
    permissions: [
      'product:create',
      'product:update',
      'order:view',
      'inventory:view',
    ],
  },
  {
    name: 'cashier',
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
