const router = require("express").Router();

router.route("/notes").get(async (req,res,next)=>{
    const data = await req.config.dynamoDbClient.scan({
        TableName: req.config.notesTable
    }).promise();
    req.logger.info("Notes retrieved successfully", { responseData: data.Items });
    res.send({test:"route", data: data.Items });
});

/**
 * {
        "pk": "userid1",
        "sk": "userid1|catsaregreat",
        "title": "Cats are great"
    },
 */
router.route("/notes").post(async (req,res,next)=>{
    const body = req.body;
    req.logger.info("Storing a note...", { responseData: body });
    const data = await req.config.dynamoDbClient.put({
        TableName: req.config.notesTable,
        Item: {
            pk: "userid1",
            sk: "userid1|"+body.title.split(' ').join('').toLowerCase(),
            ...body
        }
    }).promise();
    req.logger.info("Note stored successfully");
    res.send({test:"note post", data });
});

router.use("/secondtest",(req,res,next)=>{
    res.send({secondtest:"route"});
});

module.exports = router;