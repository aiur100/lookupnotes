const url = require("./config.json")[process.env.APP_ENV].url;
const fetch = require("node-fetch");
const assert = require("assert");

describe("API Test",function(){

    it("GET test",function(){

        fetch(url+"api/info").then(r => r.json()).then(r => {
            assert.strictEqual(r.application,"sample-app");
        });

    });

    it("POST test",function(){

        fetch(url+"api/v1/getback",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ hello:"world" })
        }).then(r => r.json()).then(r => {
            console.log(r);
        });
        
    });

});