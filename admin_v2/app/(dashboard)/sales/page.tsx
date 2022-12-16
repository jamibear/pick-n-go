import Link from "next/link";
import { supabase } from "utils/supabaseConfig";
import ButtonDelete from "components/ButtonDelete";
import Image from "next/image";

async function getData() {
  const { data, error } = await supabase.from("farmer_sales").select();
  return data;
}

export default async function Sales() {
  const data = await getData();

  const fList = data!.map((p) => {
    return (
      <ul key={p.id} className="flex flex-row">
        <li className="m-3 w-20 rounded-full self-center">
          <Image
            src={p.avatar_url}
            alt="product image"
            width="40"
            height="40"
				className="rounded-full"
          />
        </li>
        <li className=" truncate m-3 w-24">{p.farm_id}</li>
        <li className="m-3 w-24">{p.username}</li>
        <li className="m-3 w-24">{p.first_name}</li>
        <li className="m-3 w-24">{p.last_name}</li>
        <li className="m-3 w-24">{p.total_sales}</li>
        <li className="m-3 w-24">{p.shipments}</li>
        <li className="m-3 w-24">{p.total_products}</li>
      </ul>
    );
  });
  console.log(data);

  return (
    <>
      <ul className="flex flex-row">
        <li className="font-bold m-3 w-20">Sales</li>
        <li className="font-bold m-3 w-24">id</li>
        <li className="font-bold m-3 w-24">username</li>
        <li className="font-bold m-3 w-24">first_name</li>
        <li className="font-bold m-3 w-24">last_name</li>
        <li className="font-bold m-3 w-24">total_sales</li>
        <li className="font-bold m-3 w-24">shipments</li>
        <li className="font-bold m-3 w-24">products</li>
      </ul>
      {fList}
    </>
  );
}
