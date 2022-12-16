import Link from "next/link";
import { supabase } from "utils/supabaseConfig";
import ButtonDelete from "components/ButtonDelete";
import Image from "next/image";

async function getData() {
  const { data, error } = await supabase.from("products").select();
  return data;
}

export default async function Products() {
  const data = await getData();

  const pList = data!.map((p) => {
    return (
      <ul key={p.id} className="flex flex-row">
        <li className="m-3 w-20 self-center">
          <Image src={p.img_url} alt="product image" width="40" height="40" />
        </li>
        <li className=" truncate m-3 w-24">{p.id}</li>
        <li className="m-3 w-60">{p.title}</li>
        <li className="m-3 w-24">{p.price}</li>
        <li className="m-3 w-24">{p.variant}</li>
        <li className="m-3 w-24">{p.stock}</li>
        <li className="m-3 w-24">{p.sold}</li>

        <ButtonDelete id={p.id} field="products" />
      </ul>
    );
  });
  console.log(data);

  return (
    <>
      <ul className="flex flex-row">
        <li className="font-bold m-3 w-20">Products</li>
        <li className="font-bold m-3 w-24">id</li>
        <li className="font-bold m-3 w-60">title</li>
        <li className="font-bold m-3 w-24">price</li>
        <li className="font-bold m-3 w-24">variant</li>
        <li className="font-bold m-3 w-24">stock</li>
        <li className="font-bold m-3 w-24">sold</li>
      </ul>
      {pList}
    </>
  );
}
