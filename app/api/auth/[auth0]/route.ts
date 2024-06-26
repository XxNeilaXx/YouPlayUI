import { DASHBOARD_PAGE } from '@/constants/routes';
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

console.log('the AUTH0_SECRET env var is set: ', !!process.env.AUTH0_SECRET);

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: process.env.AUTH0_SCOPE,
    },
    returnTo: DASHBOARD_PAGE,
  }),
});
