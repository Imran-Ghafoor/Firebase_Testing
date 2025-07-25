// components/ABTestSection.js
import { useEffect, useState } from "react";
import { remoteConfig, analytics } from "../lib/firebase";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { logEvent } from "firebase/analytics";

export default function ABTestSection() {
    const [buttonText, setButtonText] = useState("Loading...");
    const [bannerImage, setBannerImage] = useState("");

    useEffect(() => {
        fetchAndActivate(remoteConfig)
            .then(() => {
                const btnText = getValue(remoteConfig, "button_text").asString();
                const img = getValue(remoteConfig, "banner_image").asString();

                setButtonText(btnText);
                setBannerImage(img);

                logEvent(analytics, "ab_test_loaded", {
                    button_text: btnText,
                    banner_image: img,
                });
            })
            .catch((err) => {
                console.error("Remote Config fetch failed:", err);
            });
    }, []);

    const handleClick = () => {
        logEvent(analytics, "button_clicked", {
            button_text: buttonText,
        });
        alert(`Clicked: ${buttonText}`);
    };

    return (
        <div className="flex flex-col justify-center items-center text-center bg-amber-500">
            <img className="w-2xl rounded-2xl mt-5" src={bannerImage} alt="Banner" />
            <button className="cursor-pointer font-bold text-2xl mt-6 border-4  " onClick={handleClick} >
                {buttonText}
            </button>
        </div>
    );
}
