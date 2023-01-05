import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

import { Container, Grid, TextField } from "@mui/material";

import TextInput from "../TextInput";
import GenericButton from "../GenericButton";
import CodeEditor from "@uiw/react-textarea-code-editor";

import "./Compiler.css";

import api from "../../api/api";

interface CompilerProps {
  code: string
  language: string
  className?: string
}

const Compiler = ({
  code,
  language,
  className
}: CompilerProps) => {
  const [inputCode, setInputCode] = useState(code);
  const [output, setOutput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCode(e.target.value);
  };

  const handleCompile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const body = {
      script: inputCode,
      language: language
    };
    
    api.post(body, "/compiler")
      .then(response => {
        const fullOutput = `${response.output}\n\n\nExecution time: ${response.cpuTime}`;
        
        setOutput(fullOutput);
      })
      .catch(err => console.error(err));
  };

  return (
    <Grid container direction="column" spacing={1} className={className} marginTop="1rem">
      <Grid container item direction="row">
        <Grid item xs={7}>
          <CodeEditor 
            value={inputCode}
            language="js"
            onChange={handleChange}
            style={{
              fontSize: 16,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.0)",
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              border: "1px solid",
              borderColor: "#595959",
              borderRadius: "0.3rem",
              width: "98%",
              maxHeight: 260,
              overflowY: "scroll"
            }}
            minHeight={260}
          />
        </Grid>
        
        <Grid item xs={5}>
          <TextInput 
            value={output} 
            disabled
            multiline
            sx={{
              width: "98%",
            }}
            rows={10}
          />
        </Grid>
      </Grid>

      <Grid container item direction="row">
        <GenericButton onClick={handleCompile}>Run code</GenericButton>
      </Grid>
    </Grid>
  );
};

export default Compiler;