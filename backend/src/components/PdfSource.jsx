const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

exports.createPdf = async (req, res) => {
  try {
    const {
      description,
      destination,
      dateOfTravel,
      serviceVehicle,
      department,
      employeeNames,
      area_office,
      dateOfTime,
      timeIn,
      timeOut,
    } = req.body;

    // Define the PDF file path
    const pdfFilePath = path.join(__dirname, "gatepass.pdf");

    // Check if the PDF file already exists, and delete it if it does
    if (fs.existsSync(pdfFilePath)) {
      fs.unlinkSync(pdfFilePath);
    }

    const browser = await puppeteer.launch({ headless: true });

    // Create a new page
    const page = await browser.newPage();

    // Generate the HTML content using your template and data
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Gate Pass</title>
        <style>
      * {
          margin: 0;
          padding: 0;
          text-indent: 0;
      }

      hr {
          color: #ccc;
          width: 90%;
      }

      h2 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 15.5pt;
      }

      .s1 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 15.5pt;
      }

      h1 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 18pt;
      }

      p {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 12pt;
          margin: 0pt;
      }

      h3 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 12pt;
      }

      body {
          padding: 20px;
      }
      .pdf-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 10px;
      }

      .left-side-pass,
      .right-side-pass {
          margin: 5px;
      }

      .document-header {
          display: grid;
          grid-template-columns: 15vh 1fr;
          
          text-align: left;
      }

      .document-content,
      .content-below {
          display: grid;
          grid-template-columns: 1fr 1fr;
          
      }

      .logo {
          margin-left: 20px;
      }

      .title {
          text-align: center;
      }

      .content-right {
          position: relative;
      }
      .signature-block {
          position: absolute;
          bottom: 0;
          right: 20;
      }
      
  </style>
    </head>
    <body>
    <div class="pdf-container">
  <div class="left-side-pass">
          <div class="document-header">
              <div class="logo">
                  <table cellspacing="0" cellpadding="0">
                      <tr>
                          <td><img width="39" height="60"
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA8CAYAAADlsqNtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAMOElEQVRoga1Za3RVxRX+9jn3JrkJQR4JCaYQQIsUFgaLlQZFsAsrqH0srYoKSxpJ0SptrYqotZZHH+ILWMgrCq1m2Sq1CvX9qqAsNdTwUB5SFUEtsEBQEUnuPefs/pjZM3NO7iVdXT1rQc6ZM2fmm2/v/e09c4mZIRczg4g63Oe75LsVaxdWHWo/cOaL256t271/R/9c1N7T9/xMhCjw4H9WxJlPLj29YXsmXbruBwMnba7tW8sAOh37i7aV5cTMnYIyCyB1/8e1i3o9uKFp2r/3v/f9kIPBRJTqMAEYxAQQGACBmYn8vaVU/PJFp01ZclbFD9eNrB9pgLokfZadfFaXdP+NVIi5JLiII/xifWPfZ15+5B4cDs8DoQSscRASq1Fw7BtmMJEFCvbJ31zfd+ztsy5csLpvRS0LjoO5yd/71zs9zhlxyj3XetLo/k0CfrL1yfT4u4ff9cyqh7fhy+BCEEo0KEY+65CBzAyAmcBk3gAEChHUvbrr2cfHLah77a7Hrq8BGAfDy8fs2P72ykcXzg6JCKlj2T6MQlzw7nn9tz229qkQ4SAiUrPoKRgAMQPJMWwbEYQ0YxnFHghEoPawrX5J66Lt5b1al51/WsvVN09oKa47NQ0A8GILJjL/wijApQvHj9rSvGaDAQaOMUWWiwRzbiMBmjdNROwLAmhoHyo779uv/nL18isyO7cNUg7rgnOdMowCTFx07tjWfWufB0fHkaWXwIhdFq34Aut725E4/hXDutHg4z0saGjH4f29Me/GO2L9OvhcGIWYuOD8U9fvWbsaQAnImcaa1J1cQtnl1IQpJ1ejV0hEGNTbw8Ip7VzkA7dOXMFtR8qIYT61PifMnf3xmOqP9r/1HBgZcSgCA9qpVXgTgQS19i9mHQISo8wE5WB6CNWg4Q2s9nBfYztKiiJ647nxaF0zRlZM+l/c5za83+rvadq0KuKwO8Rv2TKmPUaLgwpEyxgRQCyPzKRilkkHiAoOADixyuNFjVlkiiJuO9IFt09+gDny9CBkqDbgoijCbX+/piEbZr8lPsZgsuuQbzRQIgI5trRS4Xq9Gkl6MeGEXh4WN2ZRVhICAN35s/k4uK9KI5II1+DE1zbtXl+6Y/+mOWYcEBMbZweY2NxaT8qvc3BIh5JgZqBfJWHJT7LokgmJGXhv03A83XwZOwEcDwhlAsbM1ddNZ0SVDFbSxFoA2GBR05HQI4Gk3sYCSz0zKU8FwFRbQVg6NUBZSQhmcBSm+ZbLVyCXK9IebSUnBu6tD17z39m38UplBFIOTQaMNZi7LhazienFMirgQCC9UNR097lpaoDyTMASEQ/eeQN9sHWIMb/8cafwAGBl60PjmMMaZq34mgRxbZF15Q3MzCSmMInOxosRHyYQV3XzcP9VOZSXBpJdee/u/rz8tzM46RHkUMfMCtyTrSsna22QzK8EwekurshCkjQzsYUo+qqIrywn3D81QLcugcQUM4hmNy7B0SPlun/SJPZKAUDWa6sHAJLwl0hQSPTX9sFcDBBZZZY1EAE9yjxquiqHiq4BM4FY++0Lj16MlhfGag0y8gdZIckQRPAWvDCnNuLoeOHBurzDl7rXFicwWy2Ce6+v7qUe7r8qx1XdAogwE4G+OFjJd1w7H0bYnTkczTKX1x62DSflUxq5RKdgZIlbk5SkyMhXMh2XITRNzaG6RyBsqTUwYeHNs+nzA5WJhUsu7lDbwGPwiaYri4c7PsREsRVZN1aex7ahvITQNDVATUUg85t3W9ePwBMPXAkdch0u0cQYuE27W6ps7mYi0v8LkriTFSyZFLAQfSoDOM0AgGxbhmZc0gxJUe6IpLVHa2dc53bu3VGq5cg4vhIMPU58nXlLprJiwtLGkGt75WQJ8jWYgT/P/znv+bB/B2ZE3536JVZqeZ6XikBSc9lEaiqlTkqmLkXES6dE6FeVs/Z2sveeXQOwbOavhKUYOM2XmIPJKLgG1y/T97CeTXxIVd8GhhmSrbyq5ZQWAYunRBjQOwujjg4tYZDCLZc+hPa2DDFMzLn0M8A6cqV+t6byTh4y8iP1BYO0SAIs2cgkexgXUw+ZNHBfA/OJx2fj4mcB0osrL+Z33jxNOCJTCCScxU4i5ZwGR/C3W4qZTHZH4ZKpJA3M/zHTSV/Lys4C2ZwHm5OBw4d6Yu60eQT2HdW0idqUVKo1VjIJuFR1SU0rMwcAfHK+UiWTPOuSiUBFPnDvFYwhfbPY+5nP737i03MbfRSlgJkTjqpvmfC7q+/D55/2lIKGSau1AiNRaVbtip4FN2nM1ENzXrz+3QjBEJVDmKSSYxMoskqgYUwKGz4McceqDHZ9GunIjGhRgymhsGHtaLz82AVsmWBKqLUZ04InVcU4/VIAMKBi0CvvHdgyBFb5DX9S/0swLHlJCyxHOtUy+vTwMGxAlhmgIFvCs65cRlHokx1Kan7DjAGhGwuXTMNr6pcwc9RpyaSf2ciOcuxxdao7AVg28zb6+P0TtNaoCLWcKuHUkRvTNEOxMCol06wfzd/ik79Zj6DPNOQMweyEjbSqAlM9lBYRTzgjByJg57YhaL77OqeyNQyRw4qRDp2pzRsXKhHB0/sUPqF06CxtRmE7mQb1ho8dSzBO7kPIFIeIQp9nNy5GLlsC2Te6omdWaVVcbGys4t4bs3qehyemr1mVotRWZ0yd9J1FMbtaw0SEa86JAABPN0+kzetOl65sA581zcKOPXxyJUbZ2VQRbMABQHG6JDql5oyJBAS2EED80nsMMVlVV6B/dZY+3dsbc6fNk/TnyIEov96OWyhumSN5mJITerYLY+nERzbSVyULdT3nJiT7laMJl9QTPPJw7/V34avDXQ0ROo27fmbSFCVKG2OSBA0xcABwXNdu+OuNr8zwqahVFwkFS6ZMGjj/1Cw2vTYaz//lohh+8S2rG1ITxjOA5rFwyWQ66bOSupph2T81PHW2R95ujm9e7IwAhtV6oKALbrqkGcy+JUEW4aBg44hxfgqVTAzlxx1OmQBgxIBRh5ZfsXqER94uMxNgSiaPwNeOD7B8zq04uLea44ywLBXJq/OSCaSAqX6ee8rkXmcMHLtv6eV/+2bKS7e4yBngHmUgHPo6Hp43zWFBKKNYkxsdbjWiTig4ZkpGxMqYyop5z4TFxN8ZPO5Q05SnRtWU184HkIUO9YbRxXzTRY9wLlvsbqrNH2Uko+TsRBWJ52k/lMMLTb0NASPCbkOSyVH9Rudemr7luhEDxp2ZovTWtAccfH0S7dwymFh/ETcVXOd2/jGJlwmrqk8Ui3LX9KlCvzu4bWk/jeaGx99sD47WLf3HKb9fMenX5zKibxA8T6/eJHlHYp1TPXXg6GQMEoMLW0nFAgqcCQtA+Stgi1PF4YSRDXPXvd996GVXfzFsaP/sYi+V20aIsjCZXdKTYkjkXD1HIBWJuiiQzCDCHpeS2C8vAjBpagvaQ6+y6QeICH9Y1ONtZv4pM3DP3DcyXx0YNuztf9J3W9akb9deS45ia1E32eO/Kpk6/CzkMpcEK89um+cRbphRfxTA68sX5L5sWUO/UWjIlj+Q30vih8foIMg2uJm5IziXtXz+WJhVIAy5XUDZraspmUwhQlIkxkDJKzt2KjlBZ8EhbfkAH/kyaAdS4vhSVJqIgIkEhhSEusiObx705cng7q+G7qQuePlbSLiLMsgpAKRP6BRLsuvSuyzZT5CiinQ3ewxmMkQCbIcJk+8KAWRmVFSGOcR86f9UMh0LZKH7ZP9evb12t0liUcRFFJmdnUq81LanIAbcsfTNvQq1ydWzuq3NGZwFEmu1cL60P6VIfAg8p1JPJdko5E+dtTEzBp7UMwcEuuwhcphSM8fd3vyw4ch2bOOat2TKx5B75WOaiFBcDPY8hP97yZQ4ZXIZcFnrLDAKXb6vItY1T9LTHSUFqfJdCpZY/uoQEPkYOxaLeZBnARjmxC5yr2tefUuOrwlu5wgsqW+d+VWhd2YhIWflFetpbdUilZ7VOVsPsgZNHX0umSnyk9KxT/I5DJGFgsA2AKyYOMAQVxOKNQKdmDVfsORj2n3vpzhQU6kUpTbKUuU5Rbo2qwBi6waWuSQz+Z7daiRfX/feT1G7moRMemLHt+Kyq1KZsiXJTOalVwhQvnx6rCiVixltCoashE2OdczsRGVsi83uAv4DnX3UmuEHS8UAAAAASUVORK5CYIIA" />
                          </td>
                      </tr>
                  </table>
              </div>
              <div class="header-content">
                  <h2>QUEZON 1 ELECTRIC COOPERATIVE, INC</h2>
                  <p class="s1" >Poctol, Pitogo, Quezon</p>
              </div>
          </div>

     <div class="document-body">
      <br>
      <div class="title">
          <h1>EMPLOYEE GATEPASS</h1>
      </div>
      <br>
      <p>TO: GUARD ON DUTY</p>
      <p>Permission to leave Coop
      Headquarters is hereby granted to the following employee:</p>
     <br>
     <div class="document-content">
      <div class="content-left">
          <p>Name of Employee/s:</p>
          <h3> ${employeeNames}</h3>
          <br>
          <p>Area Office:${area_office}</p>
          
          <p>Department: ${department}</p> 
          <p>Time of Travel: ${dateOfTime}</p>
          <p>Destination: ${destination}</p>
          <p>Purpose: ${description}</p>
          <br>
          <p>Prepared by:</p>
          <br>
          <h3>Employee</h3>
         </div>
         <div class="content-right">
          <p> Date of Travel: ${dateOfTravel}</p>
          <p>Service Vehicle: ${serviceVehicle}</p>
          <br>
          <div class="signature-block">
              <h3>Approved by:</h3>
              <br>
              <h3>Manager</h3>
          </div>
         </div>
     </div>
     <br>
      <hr>
      <br>
      <h3>FOR SECURITY DIVISION</h3>
      <div class="content-below">
          <div class="content-left">
                  <p>Time out: ${timeOut}</p>
                  <p>Checked by: </p>
                  <h3>TRAVEL VERIFICATION</h3>
          </div>
          <div class="content-right">
              <p>Time in: ${timeIn}</p>
          </div>
          <div>
              <p>Person/s Visited:</p>
              <p>Date and Time:</p>
              <p>Signature</p>
          </div>
      </div>
     </div>
  </div>
  <div class="right-side-pass">
      <div class="document-header">
          <div class="logo">
              <table cellspacing="0" cellpadding="0">
                  <tr>
                      <td><img width="39" height="60"
                              src="data:image/png;base64,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" />
                      </td>
                  </tr>
              </table>
          </div>
          <div class="header-content">
              <h2>QUEZON 1 ELECTRIC COOPERATIVE, INC</h2>
              <p class="s1" >Poctol, Pitogo, Quezon</p>
          </div>
      </div>

 <div class="document-body">
  <br>
  <div class="title">
      <h1>EMPLOYEE GATEPASS</h1>
  </div>
  <br>
  <p>TO: GUARD ON DUTY</p>
  <p>Permission to leave Coop
  Headquarters is hereby granted to the following employee:</p>
 <br>
 <div class="document-content">
  <div class="content-left">
      <p>Name of Employee/s:</p>
      <h3> ${employeeNames}</h3>
      <br>
      <p>Area Office:${area_office}</p>
      
      <p>Department: ${department}</p> 
      <p>Time of Travel:${dateOfTime}</p>
      <p>Destination: ${destination}</p>
      <p>Purpose: ${description}</p>
      <br>
      <p>Prepared by:</p>
      <br>
      <h3>Employee</h3>
     </div>
     <div class="content-right">
      <p> Date of Travel: ${dateOfTravel}</p>
      <p>Service Vehicle: ${serviceVehicle}</p>
      <br>
      <div class="signature-block">
          <h3>Approved by:</h3>
          <br>
          <h3>Manager</h3>
      </div>
     </div>
 </div>
 <br>
  <hr>
  <br>
  <h3>FOR SECURITY DIVISION</h3>
  <div class="content-below">
      <div class="content-left">
              <p>Time out:${timeOut} </p>
              <p>Checked by: </p>
              <h3>TRAVEL VERIFICATION</h3>
      </div>
      <div class="content-right">
          <p>Time in:${timeIn}</p>
      </div>
      <div>
          <p>Person/s Visited:</p>
          <p>Date and Time:</p>
          <p>Signature</p>
      </div>
  </div>
 </div>
 </div>
 <div class="invoice-box">

  </div>
    </body>
    </html>
    `;

    // Set the content of the page
    await page.setContent(htmlContent);

    // Specify the PDF options
    const pdfOptions = {
      path: pdfFilePath,
      format: "Letter",
      landscape: true,
    };

    // Generate the PDF
    await page.pdf(pdfOptions);

    // Close the browser
    await browser.close();

    // Send the generated PDF file as a response
    res.sendFile(pdfOptions.path);
    res
      .status(200)
      .json({ success: true, message: "PDF generated successfully" });
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.fetchPdf = (req, res) => {
  const filePath = path.join(__dirname, "gatepass.pdf");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending PDF:", err);
      res.status(500).send("PDF Sending Error");
    }
  });
};
