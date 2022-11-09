export default function UserRow({ id, fname, lname, uname, email, utype }) {
	return (
		<>
			<li>
				<span className="m-2">{id}</span>
				<span className="m-2">{utype}</span>
				<span className="m-2">{fname}</span>
				<span className="m-2">{lname}</span>
				<span className="m-2">{uname}</span>
				<span className="m-2">{email}</span>
			</li>
		</>
	);
}
