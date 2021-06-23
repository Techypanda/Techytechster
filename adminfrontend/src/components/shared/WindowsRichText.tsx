import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { WindowsRichTextProps, WindowsStyleButtonProps } from "../../interface";
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import {stateToHTML} from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import WindowsBtn from "./WindowsBtn";
import { Code, FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, FormatQuote, FormatUnderlined, Image } from "@material-ui/icons";


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

function WindowsRichText(props: WindowsRichTextProps) {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const editor = useRef();
  const focus = () => {
    // @ts-ignore
    editor.current.focus();
  }
  function handleImgUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files![0];
      const reader = new FileReader();
      reader.onloadend = (e) => {
        if (reader.result) {
          const newEditorState = insertImage(editorState, reader.result);
          setEditorState(newEditorState);
        } else {
          alert("Unable to process image");
        }
      }
      reader.readAsDataURL(file);
    } else {
      alert("Unable to process image");
    }
  };

  function handleUpdate(e: SetStateAction<EditorState>) {
    setEditorState(e);
  }

  useEffect(() => {
    props.onChange(stateToHTML(editorState.getCurrentContent()));
  }, [editorState, props]);

  function insertImage(editorState: any, base64: any) {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: base64 }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };
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
          <WindowsStyleButton
            onClick={() => { /* handleClick() */ document.getElementById('imgupload')!.click() }}
            toggle={false}
          >
            <Image />
          </WindowsStyleButton>
          <input id="imgupload" type="file" name="name" accept="image/*" hidden onChange={handleImgUpload} />
        </Box>
        <div onClick={focus}>
          <Editor
            editorState={editorState}
            onChange={handleUpdate}
            plugins={plugins}
            // @ts-ignore
            ref={(element) => editor.current = element}
          />
          <AlignmentTool />
        </div>
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
figure {
  margin: 0;
}
`;