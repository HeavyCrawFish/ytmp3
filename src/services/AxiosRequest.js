import axios from "axios";

const requestOptions = {
  method: "GET",
  url: "https://youtube-mp36.p.rapidapi.com/dl",
  params: { id: "UxxajLWwzqY" },
  headers: {
    "X-RapidAPI-Key": "ee456337c8msh0d5d0e68637e946p174d1ejsnd0aee61179fa",
    "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
  },
};

const fetch = async (id) => {
  requestOptions.params = { id };
  const response = await axios.request(requestOptions);
  return response;
};

export { fetch };
