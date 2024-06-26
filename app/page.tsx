import { LOGIN_API_ROUTE } from '@/constants/routes';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href={LOGIN_API_ROUTE}>Login</a>
    </main>
  );
}
