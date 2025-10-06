import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const Posts = memo(() => {
  return <Outlet />;
});

Posts.displayName = 'Posts';

export default Posts;

