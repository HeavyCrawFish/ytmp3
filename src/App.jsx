import { useState } from "react";
import { saveAs } from "file-saver";

import "./App.css";
import {
  Alert,
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";

function App() {
  const [link, setLink] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([{}]);
  const [open, setOpen] = useState(false);

  const handleConvert = async (e) => {
    await setData([{}]);
    await setDisabled(true);
    await setLoading(true);
    await axios
      .get(`https://flask-ytmp3-backend.onrender.com/convert?link=${link}`)
      .then(async (res) => {
        await setOpen(true);
        await setLoading(false);
        await setDisabled(false);
        await setData(res.data);
      });
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    setLink("");
    setData([{}]);
    saveAs(
      `https://flask-ytmp3-backend.onrender.com/getfiles?file_name=${data.name}`
    );
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
            onClick={handleConvert}
            disabled={disabled ? true : false}
          >
            Convert
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={data.msg}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={data.code === "failed" ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {data.msg}
            </Alert>
          </Snackbar>
        </Paper>
        <div className="file_download">
          {loading ? (
            <CircularProgress
              color="inherit"
              sx={{ mt: "5rem", maxWidth: "20rem" }}
            />
          ) : (
            <div></div>
          )}
          {data.name === undefined ? (
            <div></div>
          ) : (
            <Button
              variant="contained"
              sx={{ mt: "5rem", maxWidth: "20rem" }}
              onClick={handleDownload}
            >
              Download
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
