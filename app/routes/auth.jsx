import authStyle from '~/styles/auth.css'
export default function AuthPage() {
  return (
    <div>
      Auth Page
    </div>
  );
}

export function links() {
	return [{ rel: "stylesheet", href: authStyles }];
}