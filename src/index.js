var getInfo = require('./utils/getInfo');
var fs = require('fs');
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors())

app.get('/classes', (req, res) => {
    res.header("Content-Type", 'application/json');
    // res.header('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Headers', "*");
    res.send(JSON.stringify(getInfo.getInfo(), null, 4))
});

app.get('/classes/:classId/:syllabiId', (req, res) => {
    var pdf = getInfo.getSyllabus(req.params.classId, req.params.syllabiId);

    if (pdf.length > 4) {

        var pdfFile = fs.createReadStream(pdf);
        var pdfStat = fs.statSync(pdf);

        res.header("Content-Length", pdfStat.size);
        res.header("Content-Type", 'application/pdf');

        pdfFile.pipe(res);
    } else {
        res.send(pdf);
    }
});


app.listen(process.env.PORT, () => {
    console.log("Server running on port 3001!");
});


/*

    - Client sends request to fetch data on cs classes. Only data describing classes is sent such as the name of the class and description as well as the pdf name.
    - When client clicks on pdf link, client sends request to get pdf file. Server sends pdf back.

    [
        {
            topic: string,
            classes: [
                {
                    id: string,
                    description: string,
                    syllabi: string[] | string
                }
            ]
        },
        {
            topic: string,
            classes: [
                {
                    id: string,
                    description: string,
                    syllabi: string[] | string
                }
            ]
        }
    ]




*/