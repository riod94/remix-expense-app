import AuthForm from "~/components/auth/AuthForm";
import { signin, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";

export default function AuthPage() {
	return <AuthForm />;
}

export async function action({ request }) {
	const searchParams = new URL(request.url).searchParams;
	const authMode = searchParams.get("mode") || "login";

	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);

	// validate user input
	try {
		validateCredentials(credentials);
	} catch (error) {
		return error;
	}

	try {
		if (authMode == "login") {
			return await signin(credentials)

		} else {
			return await signup(credentials);
		}
	} catch (error) {
		if (error.status === 422) {
			return { credentials: error.message };
		}
	}
}

export function links() {
	return [{ rel: "stylesheet", href: authStyles }];
}
