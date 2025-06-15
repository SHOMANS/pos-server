import Role from '../models/Role';
import Tenant from '../models/Tenant';
import { User } from '../models/User';
import { createDefaultRolesForTenant } from '../utils';
import { comparePassword, hashPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { Request, Response } from 'express';

export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: 'Name, email, and password are required' });
      return;
    }

    // 1️⃣ Create tenant
    const tenant = await Tenant.create({ name });

    // 2️⃣ Create default roles
    await createDefaultRolesForTenant(tenant._id as any);
    const adminRole = await Role.findOne({ tenant: tenant._id, name: 'admin' });

    if (!adminRole) {
      throw new Error('Admin role creation failed');
    }

    // 3️⃣ Create admin user
    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      tenant: tenant._id,
      role: adminRole._id,
    });

    // 4️⃣ Generate JWT
    const token = generateToken({
      userId: user._id,
      tenantId: (user.tenant as any)._id.toString(),
    });

    res.status(201).json({
      message: 'Admin user and tenant created',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tenant: tenant._id,
        role: adminRole.name,
      },
    });
    return;
  } catch (err) {
    console.error('Create admin user error:', err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email })
      .select('+password')
      .populate('role')
      .populate('tenant');

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      tenantId: (user.tenant as any)._id.toString(),
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tenant: user.tenant,
        role: user.role,
      },
    });
    return;
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};
