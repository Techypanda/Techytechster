import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps, WindowsStyleButtonProps } from "../../interface";
import { EditorState, RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import { useState } from "react";
import 'draft-js/dist/Draft.css';
import WindowsBtn from "./WindowsBtn";
import { Code, FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, FormatQuote, FormatUnderlined } from "@material-ui/icons"

const RawStyleButton = (props: WindowsStyleButtonProps) => {
  if (!props.toggle) {
    return (
      <Box className={props.className} display="inline-block">
        <div className="windowsstylebtn" onMouseDown={e => { e.preventDefault(); props.onClick(); }}>
          {props.children}
        </div>
      </Box>
    )
  } else {
    return (
      <Box className={props.className} display="inline-block">
        <div className={`windowsstylebtn ${props.toggleVar ? 'windowsstyleactive' : ''}`} onMouseDown={e => { e.preventDefault(); props.onClick(); }}>
          {props.children}
        </div>
      </Box>
    )
  }
}
const WindowsStyleButton = styled(RawStyleButton)`
.windowsstylebtn {
  cursor: pointer;
  color: 000;
  font-family: more_perfect_dos_vgaregular !important;
  display: inline-block;
}
.windowsstylebtn:hover {
  color: rgb(0,0,132);
}
.windowsstyleactive {
  color: rgb(0,0,132);
}
`;

function WindowsRichText(props: DefaultProps) {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const imagePlugin = createImagePlugin();
  const plugins = [imagePlugin];
  return (
    <Box className={props.className} mt={2}>
      <Box className="graybg" p={2}>
        <Box mb={1}>
          <Box display="inline-block" mr={0.5}>
            <WindowsStyleButton
              onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'))}
              toggle={true}
              toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-one'}
            >
              <Typography variant="subtitle1" component="p" className="transformfix bold">H1</Typography>
            </WindowsStyleButton>
          </Box>
          <Box display="inline-block" mr={0.5}>
            <WindowsStyleButton
              onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-two'))}
              toggle={true}
              toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-two'}
            >
              <Typography variant="subtitle1" component="p" className="transformfix bold">H2</Typography>
            </WindowsStyleButton>
          </Box>
          <Box display="inline-block" mr={0.5}>
            <WindowsStyleButton
              onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-three'))}
              toggle={true}
              toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-three'}
            >
              <Typography variant="subtitle1" component="p" className="transformfix bold">H3</Typography>
            </WindowsStyleButton>
          </Box>
          <Box display="inline-block" mr={0.5}>
            <WindowsStyleButton
              onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-four'))}
              toggle={true}
              toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-four'}
            >
              <Typography variant="subtitle1" component="p" className="transformfix bold">H4</Typography>
            </WindowsStyleButton>
          </Box>
          <Box display="inline-block" mr={0.5}>
            <WindowsStyleButton
              onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-five'))}
              toggle={true}
              toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-five'}
            >
              <Typography variant="subtitle1" component="p" className="transformfix bold">H5</Typography>
            </WindowsStyleButton>
          </Box>
          <Box display="inline-block" mr={0.5}>
            <WindowsStyleButton
              onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-six'))}
              toggle={true}
              toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-six'}
            >
              <Typography variant="subtitle1" component="p" className="transformfix bold">H6</Typography>
            </WindowsStyleButton>
          </Box>
          <WindowsStyleButton
            onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'blockquote'))}
            toggle={true}
            toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'blockquote'}
          >
            <FormatQuote />
          </WindowsStyleButton>
          <WindowsStyleButton
            onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))}
            toggle={true}
            toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'unordered-list-item'}
          >
            <FormatListBulleted />
          </WindowsStyleButton>
          <WindowsStyleButton
            onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'ordered-list-item'))}
            toggle={true}
            toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'ordered-list-item'}
          >
            <FormatListNumbered />
          </WindowsStyleButton>
          <WindowsStyleButton onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))} toggle={true} toggleVar={editorState.getCurrentInlineStyle().has('BOLD')}><FormatBold /></WindowsStyleButton>
          <WindowsStyleButton onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))} toggle={true} toggleVar={editorState.getCurrentInlineStyle().has('ITALIC')}><FormatItalic /></WindowsStyleButton>
          <WindowsStyleButton onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))} toggle={true} toggleVar={editorState.getCurrentInlineStyle().has('UNDERLINE')}><FormatUnderlined /></WindowsStyleButton>
          <WindowsStyleButton onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'CODE'))} toggle={true} toggleVar={editorState.getCurrentInlineStyle().has('CODE')}><Code /></WindowsStyleButton>
          <WindowsStyleButton
            onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'code-block'))}
            toggle={true}
            toggleVar={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'code-block'}
          >
            <Code />
          </WindowsStyleButton>
        </Box>
        <Editor editorState={editorState} onChange={setEditorState} />
      </Box>
    </Box>
  )
}

export default styled(WindowsRichText)`
.graybg {
  background-color: rgb(187,187,187) !important;
}
.transformfix {
  transform: translateY(-6px);
}
.bold {
  font-weight: 600;
}
`;