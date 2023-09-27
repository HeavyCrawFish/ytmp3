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
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
      setResponse(null);
    } else {
      setResponse(null);
    }
  }, [response]);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (link === "") {
      await setMsg("Please provide a link!");
      await setLink("");
      await setOpen(true);
    } else if (!link.includes("=")) {
      await setMsg("Wrong link!");
      await setLink("");
      await setOpen(true);
    } else {
      const text = link.split("=")[1];
      if (text) {
        let interval = setInterval(async function () {
          await setDisabled(true);
          await setMsg("Downloading");
          await setOpen(true);

          //api call
          const res = await fetch(text);

          if (res.status === 200 && res.data.status === "ok") {
            await setDisabled(false);
            await setResponse(res.data);
            await setOpen(false);
            await setLink("");
            clearInterval(interval);
          } else if (res.status === 200 && res.data.status === "fail") {
            await setDisabled(false);
            await setResponse(res);
            await setOpen(false);
            await setLink("");
            await clearInterval(interval);
          }
        }, 1000);
      }
    }
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="navbar">
        <AppBar>
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5">
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
            width: {
              xs: "20rem",
              sm: "30rem",
              md: "40rem",
              lg: "50rem",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          elevation={5}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Paste your link below
          </Typography>
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
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={msg.includes("Downloading") ? "success" : "error"}
            >
              {msg}
            </Alert>
          </Snackbar>
        </Paper>
      </div>
    </div>
  );
}

export default App;
