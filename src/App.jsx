import { useEffect, useState } from "react";
import { fetch } from "./services/AxiosRequest";
import { saveAs } from "file-saver";

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
import axios from "axios";

function App() {
  const [link, setLink] = useState("");
  const [data, setData] = useState([{}]);
  const [open, setOpen] = useState(false);

  const handleConvert = async (e) => {
    await axios
      .get(`https://flask-ytmp3-backend.onrender.com/convert?link=${link}`)
      .then((res) => {
        setOpen(true);
        setData(res.data);
        console.log(res.data);
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
          <Button variant="contained" onClick={handleConvert}>
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
