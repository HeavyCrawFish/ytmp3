import { useEffect, useState } from "react";
import { fetch } from "./services/AxiosRequest";

import "./App.css";
import {
  Alert,
  AppBar,
  Button,
  Paper,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

function App() {
  const [link, setLink] = useState("");
  const [response, setResponse] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
    }
  }, [response]);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (link === "") {
      console.log("Please provide a link!");
    } else {
      const text = link.split("=")[1];
      if (text) {
        let interval = setInterval(async function () {
          setDisabled(true);
          setOpen(true);
          const res = await fetch(text);

          if (res.status === 200 && res.data.status === "ok") {
            setDisabled(false);
            setResponse(res.data);
            clearInterval(interval);
          } else if (res.status === 200 && res.data.status === "fail") {
            setDisabled(false);
            setResponse(res);
            clearInterval(interval);
          }
        }, 1000);
      }
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="navbar">
        <AppBar>
          <Toolbar>
            <Typography variant="h4">
              <b>Youtube to mp3 Converter</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="form">
        <Paper
          sx={{
            mt: "10rem",
            p: "2rem",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          elevation={5}
        >
          <Typography>Paste your link below</Typography>
          <TextField
            type="text"
            variant="outlined"
            placeholder="link..."
            onChange={(e) => {
              setLink(e.target.value);
            }}
            value={link}
          />
          <Button
            variant="contained"
            onClick={handleDownload}
            disabled={disabled ? true : false}
          >
            Download
          </Button>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={"success"} />
          </Snackbar>
        </Paper>
      </div>
    </div>
  );
}

export default App;
