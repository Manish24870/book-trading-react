import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

const QrCodeScanner = (props) => {
  useEffect(() => {
    const createConfig = () => {
      let config = {};
      if (props.fps) {
        config.fps = props.fps;
      }
      if (props.qrbox) {
        config.qrbox = props.qrbox;
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
      }
      if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
      }
      return config;
    };

    let config = createConfig();
    let verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required";
    }
    let html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    return () => {
      html5QrcodeScanner.clear().catch((err) => {
        console.log("Failed to clear scanner. ", err);
      });
    };
  }, []);

  return <div id={qrcodeRegionId}></div>;
};

export default QrCodeScanner;
