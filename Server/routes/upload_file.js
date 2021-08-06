const express = require("express");
const formidable = require("formidable");
const router = express.Router();

router.post("/load", async (req, res) => {

    console.log("called /upload_file");

    const form = new formidable.IncomingForm();
    // Parse `req` and upload all associated files
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        const [firstFileName] = Object.keys(files);

        res.json({
            filename: firstFileName
        });
    });

    console.log("req=" + JSON.stringify(req.body));

    res.status(200).json({
        success: true,
    });
});
module.exports = router;
