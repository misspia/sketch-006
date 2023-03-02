import React, { useEffect, useRef, useMemo } from 'react';
import { useWindowSize } from './useWindowSize';
import { Sketch } from './Sketch';
import { Tooltip } from "./Tooltip"


export default function Page({
  ready = true,
}) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const sketch = useMemo(() => {
    if (!canvasRef.current) {
      return;
    }
    return new Sketch(
      canvasRef.current,
      audioRef.current
    );
  }, [canvasRef.current]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!sketch) {
      return;
    }
    sketch.resize(width, height)
  }, [sketch, width, height]);

  useEffect(() => {
    if (!sketch || !ready) {
      return;
    }
    sketch.render();
  }, [sketch, ready]);

  return (
    <>
      <Tooltip>
        Press & hold to make the sphere explode
      </Tooltip>
      <canvas ref={canvasRef}></canvas>
      <audio ref={audioRef} loop />
    </>
  )
}
