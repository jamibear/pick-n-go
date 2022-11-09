import Link from "next/link";
import { supabase } from "utils/supabaseConfig";
import DeleteButton from "components/DeleteButton";
import EditButton from "components/EditButton";

async function getData() {
	const { data, error } = await supabase.from("products").select();
	return data;
}

export default async function Products() {
	const data = await getData();

	const pList = data!.map((p) => {
		return (
			<ul key={p.id} className="flex flex-row">
				<li className="m-3 w-24">{p.id}</li>
				<li className="m-3 w-60">{p.name}</li>
				<li className="m-3 w-24">{p.price}</li>
				<li className="m-3 w-24">{p.volume}</li>
				<li className="m-3 w-24">{p.unit}</li>
				<li className="m-3 w-24">{p.stock}</li>
				<li className="m-3 w-24">{p.sold}</li>

				<DeleteButton id={p.id} field="products" />
				<EditButton id={p.id} />
			</ul>
		);
	});
	console.log(data);

	return (
		<>
			<h1>Products</h1>
			<ul className="flex flex-row">
				<li className="font-bold m-3 w-24">id</li>
				<li className="font-bold m-3 w-60">name</li>
				<li className="font-bold m-3 w-24">price</li>
				<li className="font-bold m-3 w-24">volume</li>
				<li className="font-bold m-3 w-24">unit</li>
				<li className="font-bold m-3 w-24">stock</li>
				<li className="font-bold m-3 w-24">sold</li>
			</ul>
			{pList}
		</>
	);
}
