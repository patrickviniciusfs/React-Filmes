import { useEffect } from "react";

export default function VLibras() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;

    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="enabled-vlibras">
      <div id="vlibras-widget" className="vlibras-widget-wrapper">
        <div className="vw-access-button"></div>
        <div className="vw-plugin-wrapper">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>
  );
}