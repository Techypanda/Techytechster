import { createContext, useContext, useEffect, useState } from "react";
import { DefaultProps } from "../../interface";

const viewportContext = createContext({});

function ViewportProvider(props: DefaultProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  function handleWindowResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{width, height}}>
      {props.children}
    </viewportContext.Provider>
  )
}

function useViewport() {
  const { width, height }: any  = useContext(viewportContext);
  return { width, height };
}
export { ViewportProvider, useViewport };