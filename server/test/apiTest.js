const url = require("./config.json")[process.env.APP_ENV].url;
const fetch = require("node-fetch");
const assert = require("assert");

describe("API Test",function(){

    it("POST Notes",function(){

        fetch(url+"/api/v1/notes",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title:"I love cats so much",text:"SOmething about cats" })
        }).then(r => r.json()).then(r => {
            console.log(r);
        });
        
    });

    it("GET Notes",function(){

        fetch(url+"/api/v1/notes").then(r => r.json()).then(r => {
            assert.strictEqual(Array.isArray(r.data),true);
            console.log(r.data);
        });

    });

});