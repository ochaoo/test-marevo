import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { QRCodeSVG } from "qrcode.react";
import BackpackModel from "./components/models/BackPackModel";
import Icon from "/button_icon.svg?url";

const colors = ["#8B4512", "black", "blue"];
const metals = ["silver", "black", "gold"];

const BackpackConfigurator = () => {
  const [color, setColor] = useState("#8B4512");
  const [metal, setMetal] = useState("gold");
  const [material, setMaterial] = useState("leather");
  const [showQR, setShowQR] = useState(false);

  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  return (
    <div>
      <div className="flex justify-center pt-[35px] font-medium text-sm text-white">
        <button
          onClick={() => setShowQR(!showQR)}
          className="w-[156px] h-10 flex justify-center items-center gap-2.5 bg-[#4169E1] rounded-4xl hover:cursor-pointer hover:bg-[#758fdd]"
        >
          <img src={Icon} /> See In Real Life
        </button>
      </div>

      <div className="w-screen h-[60vh] flex justify-center items-center">
        {showQR ? (
          isMobile ? (
            <div className="w-full h-full flex flex-col items-center">
              <ARButton sessionInit={{ requiredFeatures: ["hit-test"] }} />
              <Canvas>
                <XR>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <BackpackModel position={[0, 0, -2]} metalColor={metal} bodyColor={color} materialType={material} />
                  <Controllers />
                  <Hands />
                </XR>
              </Canvas>
            </div>
          ) : (
            <div className="w-[305px] h-[400px] border-[1px] rounded-4xl border-[#4169E1] flex flex-col items-center text-[#4169E1] pt-[16px]">
              <button className="hover:cursor-pointer self-end mr-5" onClick={() => setShowQR(!showQR)}>
                X
              </button>
              <span className="w-[225px] mb-[30px] border-b-[1px] border-[#4169E1] pb-1 text-center text-lg">
                Scan the QR code with your phone. Within 1-3 seconds the AR function opens on your phone.
              </span>
              <div className="w-[190px] h-[190px] border-[1px] rounded-4xl border-[#4169E1] flex justify-center items-center">
                <QRCodeSVG
                  value="https://test-marevo-three.vercel.app/"
                  size={128}
                  fgColor="#4169E1"
                  bgColor="transparent"
                />
              </div>
            </div>
          )
        ) : (
          <Canvas camera={{ position: [0, 0, 3] }}>
            <OrbitControls />
            <Environment preset="apartment" />

            <directionalLight position={[0, 2, 3]} intensity={2} castShadow />
            <ambientLight intensity={0.8} />

            <BackpackModel metalColor={metal} bodyColor={color} materialType={material} />
          </Canvas>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 text-sm md:flex-row md:gap-20 md:px-5">
        <div className="w-[260px] font-semibold">
          <h3>Body Color</h3>
          <hr className="mt-1.5 mb-3.5" />
          <div className="color-buttons">
            {colors.map((clr) => (
              <button
                key={clr}
                className="hover:cursor-pointer"
                style={{ backgroundColor: clr, width: 30, height: 30, borderRadius: "50%", border: "none", margin: 5 }}
                onClick={() => setColor(clr)}
              />
            ))}
          </div>
        </div>

        <div className="w-[260px] font-semibold text-sm">
          <h3>Metal Color</h3>
          <hr className="mt-1.5 mb-3.5" />
          <div className="color-buttons">
            {metals.map((m) => (
              <button
                key={m}
                className="hover:cursor-pointer"
                style={{ backgroundColor: m, width: 30, height: 30, borderRadius: "50%", border: "none", margin: 5 }}
                onClick={() => setMetal(m)}
              />
            ))}
          </div>
        </div>

        <div className="w-[260px] font-medium text-xs">
          <h3 className="font-semibold text-sm">Material</h3>
          <hr className="mt-1.5 mb-3.5" />
          <div className="flex gap-2.5">
            <button
              className="w-[80px] h-9 border-[1px] rounded-[20px] hover:cursor-pointer"
              onClick={() => setMaterial("leather")}
            >
              Leather
            </button>
            <button
              className="w-[80px] h-9 border-[1px] rounded-[20px] hover:cursor-pointer"
              onClick={() => setMaterial("fabric")}
            >
              Fabric
            </button>
            <button
              className="w-[80px] h-9 border-[1px] rounded-[20px] hover:cursor-pointer"
              onClick={() => setMaterial("denim")}
            >
              Denim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackpackConfigurator;
