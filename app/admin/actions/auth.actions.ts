'use server';

import { signOut } from '../../auth';

export const adminSignOutAction = async () => {
  await signOut({ redirectTo: '/admin/login' });
};
