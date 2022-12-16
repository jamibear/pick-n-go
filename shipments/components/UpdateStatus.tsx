"use client";
export default function UpdateStatus({ ord_id }) {
  const updateStatus = async () => {
    const { data, error } = await supabase
      .from("order_details")
      .update({ status: "shipping" })
      .eq("id", ord_id);

    error
      ? console.warn(error.message)
      : console.warn("successfully updated status");
  };

  const updateStatusCompleted = async () => {
    const { data, error } = await supabase
      .from("order_details")
      .update({ status: "completed" })
      .eq("id", ord_id);

    error
      ? console.warn(error.message)
      : console.warn("successfully updated status");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button
        style={{
          background: "lightblue",
          color: "blue",
          padding: "6px 12px",
          borderRadius: "3rem",
        }}
        onClick={updateStatus}
      >
        to:shipping
      </button>
      <button
        style={{
          background: "lightgreen",
          color: "green",
          padding: "6px 12px",
          borderRadius: "3rem",
        }}
        onClick={updateStatusCompleted}
      >
        to:recieved
      </button>
    </div>
  );
}
