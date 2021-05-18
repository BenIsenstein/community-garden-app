import React, { useEffect, useState } from "react";

export default function LandingPage({ name }) {
  const [gardenData, setGardenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `/api/get-all-gardens/individual-garden?name=${name}`
      );
      let resObject = await response.json();
      let gardenObject = resObject.garden;
      setGardenData(gardenObject);
    };
    fetchData();
  }, []);

  return <h1>{gardenData ? "Loading..." : gardenData.name}</h1>;
}
