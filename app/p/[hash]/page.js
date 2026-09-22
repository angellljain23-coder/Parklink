// app/p/[hash]/page.js
"use client";

import { useState, useEffect, use } from "react";
import PublicScanPage from "../../components/PublicScanPage";
import DirectVehiclePage from "../../components/DirectVehiclePage";

export default function DynamicPageRoute({ params: paramsPromise }) {
  // Unwrap params Promise in Next.js 15
  const params = use(paramsPromise);
  const { hash } = params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data using the dynamic slug parameter
    fetch(`/api/vehicles?identifier=${hash}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hash]);

  if (loading)
    return <p style={{ color: "#94a3b8", textAlign: "center" }}>Loading...</p>;

  // Conditional Rendering based on response type
  if (data?.type === "QR_SCAN") {
    return <PublicScanPage vehicle={data.vehicle} />;
  }

  return <DirectVehiclePage vehicle={data?.vehicle} />;
}
