"use client";
import { useEffect, useState } from "react";
import { remoteConfig, fetchAndActivate, getValue } from "../lib/firebase";

export default function Home() {
  const [buttonText, setButtonText] = useState("Loading...");
  const [bannerUrl, setBannerUrl] = useState("/default-banner.jpg");

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {
        const btn = getValue(remoteConfig, "button_text").asString();
        const banner = getValue(remoteConfig, "banner_url").asString();
        setButtonText(btn);
        setBannerUrl(banner);
      })
      .catch(() => {
        setButtonText("Get Started");
        setBannerUrl("/default-banner.jpg");
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <img src={bannerUrl} alt="Banner" className="w-full max-w-4xl rounded-lg shadow mb-6" />
      <button className="bg-blue-600 text-white px-6 py-3 text-xl rounded hover:bg-blue-700 transition">
        {buttonText}
      </button>
    </main>
  );
}
