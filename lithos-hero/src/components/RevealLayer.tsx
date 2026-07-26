import { useEffect, useRef, useState } from 'react';
import { SPOTLIGHT_R } from '../constants';

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

/**
 * Shows `image` only inside a soft circular spotlight that follows the cursor.
 *
 * The spotlight is a fixed shape: as the cursor moves, only its *position*
 * changes. So the radial gradient is rasterised on a canvas and encoded to a
 * data URL exactly once, on mount, and the per-frame work is reduced to moving
 * the mask via `mask-position`.
 *
 * Re-encoding the canvas inside the render path — `canvas.toDataURL()` on every
 * frame, sized to the viewport — would run a synchronous PNG encode plus base64
 * stringify over ~2M pixels 60 times a second, and the browser would then have
 * to decode that multi-megabyte data URL again as a mask image. That collapses
 * the frame rate on mid-range hardware. Identical visual result, so the encode
 * is hoisted out of the loop.
 */
export default function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = SPOTLIGHT_R * 2;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    const gradient = ctx.createRadialGradient(
      SPOTLIGHT_R,
      SPOTLIGHT_R,
      0,
      SPOTLIGHT_R,
      SPOTLIGHT_R,
      SPOTLIGHT_R
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(SPOTLIGHT_R, SPOTLIGHT_R, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    setMaskUrl(canvas.toDataURL());
  }, []);

  const size = SPOTLIGHT_R * 2;
  const offsetX = cursorX - SPOTLIGHT_R;
  const offsetY = cursorY - SPOTLIGHT_R;

  const maskStyle: React.CSSProperties = maskUrl
    ? {
        maskImage: `url(${maskUrl})`,
        WebkitMaskImage: `url(${maskUrl})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: `${size}px ${size}px`,
        WebkitMaskSize: `${size}px ${size}px`,
        maskPosition: `${offsetX}px ${offsetY}px`,
        WebkitMaskPosition: `${offsetX}px ${offsetY}px`,
      }
    : { opacity: 0 };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})`, ...maskStyle }}
      />
    </>
  );
}
