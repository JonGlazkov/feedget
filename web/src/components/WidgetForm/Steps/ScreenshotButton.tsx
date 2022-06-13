import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  screenshot, 
  onScreenshotTook
 }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)


  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!); //Tirando print do HTML todo.
    const base64image = canvas.toDataURL('image/png');// Convertendo o print para uma imagem PNG no formato base64 (formato de texto que representa uma imagem)
    
    onScreenshotTook(base64image)
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
      type="button"
      className="p-1 w-10 h-10 roundend-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
      onClick={() => onScreenshotTook(null)}
      style={{
        backgroundImage: `url(${screenshot})`,
        backgroundPosition: `right bottom`,
        backgroundSize: 180,
      }} //A primeira chave indica que esta colocando um codigo JS e a segunda indica que esta colocando um objeto JS.
      >
        <Trash weight="fill"/>
      </button>
    );
  }

  return(
    <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"

            >
              { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
            </button>
  );
}