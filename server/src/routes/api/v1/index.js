const router = require("express").Router();

router.use("/test",async (req,res,next)=>{
    const data = await req.config.dynamoDbClient.scan({
        TableName: req.config.docsTable
    }).promise();
    res.send({test:"route", data: data.Items });
});

router.use("/secondtest",(req,res,next)=>{
    res.send({secondtest:"route"});
});

module.exports = router;