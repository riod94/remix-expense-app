import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from "@remix-run/react";

import sharedStyles from "~/styles/shared.css";
import Error from "./components/util/Error";

export const meta = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export function links() {
	return [{ rel: "stylesheet", href: sharedStyles }];
}

function Document({ title, children }) {
	return (
		<html lang="en">
			<head>
				<title>{title}</title>
				<Meta />
				<Links />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<Document title={caught.statusText}>
			<Error title={caught.statusText}>
				<p>
					{caught.data?.message ||
						"Something went wrong. Please try again later"}
				</p>
				<p>
					Back to <Link>Home</Link>.
				</p>
			</Error>
		</Document>
	);
}

export function ErrorBoundary({ error }) {
	return (
		<Document title="An error occurred">
			<Error title="An error occurred">
				<p>
					{error.message ||
						"Something went wrong. Please try again later"}
				</p>
				<p>
					Back to <Link>Home</Link>.
				</p>
			</Error>
		</Document>
	);
}
