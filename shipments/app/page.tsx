"use client";
import { Field, Formik } from "formik";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "3rem",
          borderRadius: "1rem",
          borderWidth: "1rem",
          borderColor: "#000000",
        }}
      >
        <Formik
          initialValues={{ location: "", password: "" }}
          onSubmit={(values, actions) => {
            () => {};
            if (values.password === "manila" && values.location === "City of Manila") {
              router.push("/manila");
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              Drop off point: <br />
              <Field
                type="text"
                as="select"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.location}
                name="location"
              >
                <option value="---">Pick a station</option>
                <option value="City of Manila">Manila</option>
                {props.errors.location && (
                  <div id="feedback">{props.errors.location}</div>
                )}
              </Field>
              <br />
              <div style={{ marginTop: "1rem" }}>
                Password: <br />
                <input
                  type="password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  name="password"
                />{" "}
                <br />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
