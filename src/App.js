import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./App.scss";
import Img1A from "./assets/1.webp";
import Img1B from "./assets/1b.jpeg";
import Img1C from "./assets/1c.jpeg";
import Img2A from "./assets/2.webp";
import Img2B from "./assets/2b.jpeg";
import Img2C from "./assets/2c.jpeg";
import Img3A from "./assets/3.webp";
import Img3B from "./assets/3b.jpeg";
import Img3C from "./assets/3c.jpeg";
import Img4A from "./assets/4.webp";
import Img4B from "./assets/4b.jpeg";
import Img4C from "./assets/4c.jpeg";
import Img5A from "./assets/5.webp";
import Img5B from "./assets/5b.jpeg";
import Img5C from "./assets/5c.jpeg";
import Img6A from "./assets/6.webp";
import Img6B from "./assets/6b.jpeg";
import Img6C from "./assets/6c.jpeg";
import Editor from "./assets/editor.png";

const templates = {
  template1: [Img1A, Img2A, Img3A, Img4A, Img5A, Img6A],
  template2: [Img1B, Img2B, Img3B, Img4B, Img5B, Img6B],
  template3: [Img1C, Img2C, Img3C, Img4C, Img5C, Img6C],
};

function App() {
  const [images, setImages] = useState(templates["template1"]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("template1");

  const handleTemplateChange = (template) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveTemplate(template);
    setTimeout(() => {
      setImages(templates[template]);
      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  };
  //

  const [heights, setHeights] = useState(
    Array(14)
      .fill()
      .map(() => Math.random() * (60 - 5) + 10 + "vh")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(heights.map(() => Math.random() * (60 - 5) + 10 + "vh"));
    }, 200);

    return () => clearInterval(interval);
  }, [heights]);

  //
  const noiseCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = noiseCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const pixels = imageData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const grayscale = Math.random() * 255;
        pixels[i] = pixels[i + 1] = pixels[i + 2] = grayscale;
        pixels[i + 3] = 50;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animateNoise = () => {
      generateNoise();
      requestAnimationFrame(animateNoise);
    };

    animateNoise();
  }, []);

  return (
    <div className="App">
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="sound">
          {heights.map((height, index) => (
            <span key={index} style={{ height }} />
          ))}
          <canvas ref={noiseCanvasRef} className="noise"></canvas>
        </div>
        <div className="row">
          <div className="column" style={{ alignItems: "center" }}>
            <h1>Your Podcast. Your Website. Your Way.</h1>
            <p>
              Create a podcast website that’s truly yours—with powerful hosting,
              full customization, and tools to grow your audience.
            </p>
            <button style={{ marginTop: "2.4rem" }} className="button">
              Start Your Podcast Site
            </button>
            <img src={Editor} alt="Editor" />
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="column">
            <h2>A seamless listening experience, built in.</h2>
            <p>
              Showcase your episodes with a fully customizable Podcast Player
              block. Use the Gutenberg editor and podcast-ready templates to
              create a site that reflects your brand—no extra plugins, no
              limitations.
            </p>
            <div className="templateselector">
              <button
                className={`template1 ${
                  activeTemplate === "template1" ? "selected" : ""
                }`}
                onClick={() => handleTemplateChange("template1")}
              >
                <svg
                  width="20"
                  height="40"
                  viewBox="0 0 20 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20C20 31.0457 11.0457 40 0 40V0C11.0457 0 20 8.9543 20 20Z"
                    fill="black"
                  />
                </svg>
                <span />
              </button>
              <button
                className={`template2 ${
                  activeTemplate === "template2" ? "selected" : ""
                }`}
                onClick={() => handleTemplateChange("template2")}
              >
                <svg
                  width="20"
                  height="40"
                  viewBox="0 0 20 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20C20 31.0457 11.0457 40 0 40V0C11.0457 0 20 8.9543 20 20Z"
                    fill="#4D1137"
                  />
                </svg>
                <span />
              </button>
              <button
                className={`template3 ${
                  activeTemplate === "template3" ? "selected" : ""
                }`}
                onClick={() => handleTemplateChange("template3")}
              >
                <svg
                  width="20"
                  height="40"
                  viewBox="0 0 20 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20C20 31.0457 11.0457 40 0 40V0C11.0457 0 20 8.9543 20 20Z"
                    fill="#316014"
                  />
                </svg>
                <span />
              </button>
              <p>+ and more</p>
            </div>
          </div>
          <div className="column">
            <div className="templates">
              {[0, 2, 4].map((startIndex, i) => (
                <motion.div
                  key={i}
                  className="row"
                  initial={{ opacity: 1, x: 0 }}
                  animate={{
                    opacity: isAnimating ? 0 : 1,
                    x: isAnimating ? 8 : -8,
                  }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <div className="image">
                    <img src={images[startIndex]} alt="template" />
                  </div>
                  <div className="image">
                    <img src={images[startIndex + 1]} alt="template" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
