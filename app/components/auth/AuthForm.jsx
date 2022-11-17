import { Form, Link, useActionData, useSearchParams, useTransition } from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

function AuthForm() {
	const [searchParams] = useSearchParams();
	const transition = useTransition();
	const errors = useActionData();
	const authMode = searchParams.get("mode") || "login";
	const submitBtnCaption = authMode == "login" ? "Login" : "Register";
	const toggleBtnCaption =
		authMode == "login" ? "Create New User" : "Log in with existing user";

	const isSubmitting = transition.state != "idle";

	return (
		<Form method="post" className="form" id="auth-form">
			<div className="icon-img">
				{authMode == "login" ? <FaLock /> : <FaUserPlus />}
			</div>
			<p>
				<label htmlFor="email">Email Address</label>
				<input type="email" id="email" name="email" required />
			</p>
			<p>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					minLength={7}
				/>
			</p>
			{errors && (
				<ul>
					{Object.values(errors).map((error) => (
						<li key={error}>
							<span>{error}</span>
						</li>
					))}
				</ul>
			)}
			<div className="form-actions">
				<button disabled={isSubmitting}>
					{isSubmitting ? "Authenticating" : submitBtnCaption}
				</button>
				<Link to={`?mode=${authMode == "login" ? "register" : "login"}`}>
					{toggleBtnCaption}
				</Link>
			</div>
		</Form>
	);
}

export default AuthForm;
