import Link from "next/link";
import { supabase } from "utils/supabaseConfig";
import DeleteButton from "components/DeleteButton";
import EditButton from "components/EditButton";

async function getUsers() {
	const { data, error } = await supabase.from("users").select();
	return data;
}

export default async function Users() {
	const data = await getUsers();

	const userList = data!.map((user) => {
		return (
			<ul key={user.id} className="flex flex-row">
				<li className="m-3 w-24">{user.id}</li>
				<li className="m-3 w-24">{user.user_type}</li>
				<li className="m-3 w-24">{user.first_name}</li>
				<li className="m-3 w-24">{user.last_name}</li>
				<li className="m-3 w-40">{user.username}</li>
				<li className="m-3 w-60">{user.email}</li>
				<DeleteButton id={user.id} field="users" />
				<EditButton id={user.id} />
			</ul>
		);
	});
	console.log(data);

	return (
		<>
			<h1>Users</h1>
			<ul className="flex flex-row">
				<li className="font-bold m-3 w-24">id</li>
				<li className="font-bold m-3 w-24">user_type</li>
				<li className="font-bold m-3 w-24">first_name</li>
				<li className="font-bold m-3 w-24">last_name</li>
				<li className="font-bold m-3 w-40">username</li>
				<li className="font-bold m-3 w-60">email</li>
			</ul>
			{userList}
		</>
	);
}
