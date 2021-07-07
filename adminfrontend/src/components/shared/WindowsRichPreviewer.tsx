import styled from "styled-components";
import { WindowsRichPreviewProps } from "../../interface";
import { EditorState, convertFromRaw } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import { useEffect, useRef, useState } from "react";
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const blockDndPlugin = createBlockDndPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
)

const imagePlugin = createImagePlugin({ decorator });

const plugins = [imagePlugin, blockDndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin];

function WindowsRichPreviewer(props: WindowsRichPreviewProps) {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const editor = useRef();
  const focus = () => {
    // @ts-ignore
    editor.current.focus();
  }
  useEffect(() => {
    if (props.initialState) {
      setEditorState(() => EditorState.push(
        editorState,
        convertFromRaw(JSON.parse(props.initialState!)),
        "remove-range"
      ));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div onClick={focus} className={props.className}>
      <div id="lockeditor">
        <Editor
          editorState={editorState}
          onChange={() => null}
          plugins={plugins}
          // @ts-ignore
          ref={(element) => editor.current = element}
        />
        <AlignmentTool />
      </div>
    </div>
  )
}

export default styled(WindowsRichPreviewer)`
.graybg {
  background-color: rgb(187,187,187) !important;
}
.transformfix {
  transform: translateY(-6px);
}
.bold {
  font-weight: 600;
}
figure {
  margin: 0;
}
#lockeditor {
  cursor: default;
}
`;