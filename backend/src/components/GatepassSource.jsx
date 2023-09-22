const express = require("express");
const { createPdf, fetchPdf } = require("../components/PdfSource.jsx");
const gatepassSource = express.Router();

gatepassSource.post("/createPdf", createPdf);

gatepassSource.get("/fetchPdf", fetchPdf);

module.exports = gatepassSource;
