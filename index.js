const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

function LoggerMiddleware(req, res, next) {
  console.log(`Reques received at: ${new Date()}`);
  next();
}

app.use(LoggerMiddleware);

app.get("/api/customers", (req, res) => {
  const { keyword, category, limit } = req.query;

  res.status(200).json({
    message: "get success",
    data: [
      {
        name: "tanah",
        email: "ok",
        role: "ko",
      },
      {
        name: "jawa",
        email: "ok",
        role: "ko",
      },
    ],
    pagination: {
      total_record: 100,
      current_page: 1,
      total_pages: limit,
    },
    search: {
      keyword: keyword,
      category: category,
    },
  });
});

app.post("/api/customers", LoggerMiddleware, (req, res) => {
  console.log(req.body);
  const { nim, nama, jurusan } = req.body;
  res.status(201).json({
    message: "create data seuccessfully",
    data: {
      nim: nim,
      nama: nama,
      jurusan: jurusan,
    },
  });
});

app.get("/api/customers/:id", (req, res) => {
  const customerID = req.params.id;
  res.status(200).json({
    message: "get success",
    data: {
      customerID: customerID,
      nim: "tanah",
      nama: "ok",
      jurusan: "ko",
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
