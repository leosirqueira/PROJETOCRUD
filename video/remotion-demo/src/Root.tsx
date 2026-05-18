import "./index.css";
import {Composition} from "remotion";
import {Vinheta} from "./Vinheta";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Vinheta"
        component={Vinheta}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
