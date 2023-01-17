import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

import { Container, Grid, TextField } from "@mui/material";

import TextInput from "../TextInput";
import GenericButton from "../GenericButton";
import CodeEditor from "@uiw/react-textarea-code-editor";

import "./Compiler.css";

import api from "../../api/api";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

interface CompilerProps {
  code: string
  className?: string
  exerciseId: number
}

const ExerciseCompiler = ({
  code,
  className,
  exerciseId
}: CompilerProps) => {
  const [inputCode, setInputCode] = useState(code);
  const [output, setOutput] = useState("");

  const jwt = localStorage.getItem("jwt");

  const { id: userId }: any = jwtDecode(jwt as string); 

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCode(e.target.value);
  };

  const handleAttemptSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {  
    api.post({ code: inputCode }, `/exercise/${exerciseId}/${userId}`)
      .then(response => {
        setOutput(response.testOutput + `\n\n\nScore: ${response.score}/100`);

        toast("Solution was sent! Your best attempt will be saved.", {
          type: "success"
        });
      })
      .catch(err => toast("Something went wrong", {
        type: "error",
      }));
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
        <GenericButton onClick={handleAttemptSubmit}>Submit attempt</GenericButton>
      </Grid>
    </Grid>
  );
};

export default ExerciseCompiler;