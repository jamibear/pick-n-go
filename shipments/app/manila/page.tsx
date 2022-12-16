import { supabase } from "../../lib/supabase";
import UpdateStatus from "../../components/UpdateStatus";

async function getData() {
  const { data, error } = await supabase
    .from("order_list")
    .select()
    .not("ord_status", "in", "(cancelled,completed)");
  error ? console.warn(error.message) : console.warn(data);
  return data;
}

export default async function Page() {
  const data = await getData();

  const orderDetails = supabase
    .channel("public:order_details")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "order_details" },
      () => {
        getData();
      }
    )
    .subscribe();

  console.log(data);
  return (
    <div style={{ margin: "30px" }}>
      <h1
        style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}
      >
        Manila drop off point
      </h1>
      <table>
        <tr>
          <th>tracking id</th>
          <th>status</th>
          <th>recipient</th>
          <th>pick up address </th>
          <th>customer address</th>
          <th>total payment</th>
          <th>items</th>
          <th>created at</th>
          <th>update status</th>
        </tr>
        {data &&
          data?.map((row) => (
            <tr key={row.ord_id}>
              <td>{row.ord_name}</td>
              <td>{row.ord_status}</td>
              <td>
                {row.recipient_first} {row.recipient_last}
              </td>
              <td>{row.addr_from}</td>
              <td>{row.addr_to}</td>
              <td>P{row.ord_total}</td>
              <td>{JSON.stringify(row.ord_items).substring(0, 30)}</td>
              <td>{row.ord_created_at}</td>
              <td>
                <UpdateStatus ord_id={row.ord_id} />
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
