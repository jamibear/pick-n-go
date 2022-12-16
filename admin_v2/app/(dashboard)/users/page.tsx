import ButtonDelete from "components/ButtonDelete";
import Image from "next/image";
import { supabase } from "utils/supabaseConfig";

async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select()
  if (error) console.log(error.message);
  return data;
}

export default async function Users() {
  const data = await getUsers();

  const userList = data!.map((user) => {
    return (
      <ul key={user.id} className="flex flex-row">
        <li className="m-3 w-10 self-center">
          <Image
            className="rounded-full"
            src={user.avatar_url}
            alt="avatar"
            width="40"
            height="40"
          />
        </li>
        <li className="truncate m-3 w-40">{user.id}</li>
        <li className="m-3 w-40">{user.user_type ? user.user_type : " "}</li>
        <li className="m-3 w-40">{user.first_name ? user.first_name : " "}</li>
        <li className="m-3 w-40">{user.last_name ? user.last_name : " "}</li>
        <li className="m-3 w-40 font-bold">
          {user.username ? `@${user.username}` : " "}
        </li>
        <ButtonDelete id={user.id} field="profiles" />
      </ul>
    );
  });

  return (
    <>
      <h1>Users</h1>
      <ul className="flex flex-row">
        <li className="font-bold m-3 w-10"></li>
        <li className="font-bold m-3 w-40">id</li>
        <li className="font-bold m-3 w-40">user_type</li>
        <li className="font-bold m-3 w-40">first_name</li>
        <li className="font-bold m-3 w-40">last_name</li>
        <li className="font-bold m-3 w-40">username</li>
      </ul>
      {userList}
    </>
  );
}
