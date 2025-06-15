import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../utils/hash';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { tenantId } = (req as any).user;
    const users = await User.find({ tenant: tenantId })
      .populate('role', '_id name permissions')
      .populate('tenant', '_id name');
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { tenantId } = (req as any).user;
    const user = await User.findOne({
      _id: req.params.id,
      tenant: tenantId,
    })
      .populate('role', '_id name permissions')
      .populate('tenant', '_id name');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error('Get user detail error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfileInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user;
    const user = await User.findById(userId)
      .populate('role', '_id name permissions')
      .populate('tenant', '_id name');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const editUserInfo = async (req: Request, res: Response) => {
  try {
    const { tenantId } = (req as any).user;
    const { name, email, role } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, tenant: tenantId },
      { name, email, role },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error('Edit user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { tenantId } = (req as any).user;
    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400).json({ message: 'New password is required' });
      return;
    }

    const hashed = await hashPassword(newPassword);
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, tenant: tenantId },
      { password: hashed },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
