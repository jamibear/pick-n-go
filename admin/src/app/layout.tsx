import "styles/globals.css";
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="max-w-6xl mx-auto my-3">{children}</body>
		</html>
	);
}
