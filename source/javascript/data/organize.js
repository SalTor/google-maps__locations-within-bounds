let data = require("./dataset-result.json"),
    _ = require("lodash"),
    fs = require("fs")

let data__sorted_by_lng = _.sortBy(data, index => index.longitude)

let data__grouped_by_lng = _.groupBy(data__sorted_by_lng, index => index.longitude > 0 ? Math.floor(index.longitude) : Math.ceil(index.longitude))

fs.writeFile("source/javascript/data/dataset-organized.json", JSON.stringify(data__grouped_by_lng), {}, error => {
    if(error) console.log("There was an error: ", error)

    console.log("Successfully written to file ./dataset-organized.json")
})
