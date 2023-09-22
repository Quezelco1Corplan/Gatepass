const express = require("express");
const { createPdf, fetchPdf } = require("../components/PdfSource.jsx");
const GatepassSource = express.Router();

GatepassSource.post("/createPdf", createPdf);

GatepassSource.get("/fetchPdf", fetchPdf);

module.exports = GatepassSource;
