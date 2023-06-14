import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [locationInput, setLocationInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: locationInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setLocationInput(location);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Itinerary Creator</title>
      </Head>

      <main className={styles.main}>
        <h3>Itinerary Creator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="location"
            placeholder="Enter a city or location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <input type="submit" value="Generate Itinerary" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
