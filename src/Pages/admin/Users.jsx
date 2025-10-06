import { memo } from 'react';
import ManageUsers from '../../components/admin/users/ManageUsers';

const Users = memo(() => {
  return <ManageUsers />;
});

Users.displayName = 'Users';

export default Users;

