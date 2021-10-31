import { useState } from "react";
import styled from "styled-components";
import { DefaultProps } from "../../interface";
import { useViewport } from "./ViewportProvider";

const unusableBreakpoint = 650;
function ShilohPlayer(props: DefaultProps) {
  const { width } = useViewport();
  const [hoverState, setHoverState] = useState("");
  function updateHover(value: string = "hoversoundcloud") {
    setHoverState(value)
  }
  if (width > unusableBreakpoint) {
    return (
      <div className={props.className} onMouseEnter={() => updateHover()} onMouseLeave={() => updateHover("")}>
        <div className={`soundcloudplayer ${hoverState}`}>
          <iframe title="shilohdynasty" width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1266258478&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
          <div className="soundCloudDiv">
            <a href="https://soundcloud.com/shilohdynasty" title="Shiloh Dynasty" rel="noreferrer" target="_blank" className="soundCloudAHref">Shiloh Dynasty</a> · <a href="https://soundcloud.com/shilohdynasty/sets/fukai-2" rel="noreferrer" title="Fukai" target="_blank" className="soundCloudAHref">Fukai</a>
          </div>
        </div>
      </div>
    )
  } else { return (<></>) }
}
const styledShiloh = styled(ShilohPlayer)`
.soundCloudDiv {
  font-size: 10px;
  color: #cccccc;
  line-break: anywhere;
  word-break: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-weight: 100;
}
.soundCloudAHref {
  color: #cccccc;
  text-decoration: none;
}
.soundcloudplayer {
  max-width: 300px;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s;
  -webkit-transition: opacity 0.3s;
  opacity: 5%;
}
.hoversoundcloud {
  opacity: 100%;
}
`

export { styledShiloh as ShilohPlayer }
export default styledShiloh;