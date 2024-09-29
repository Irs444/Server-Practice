const express = require("express")
const app = express()
const fs = require("fs")

const PORT = 5000

const users = require("./MOCK_DATA.json")

//middleware
app.use(express.urlencoded({ extended: false }))

// Route to getall users
app.get("/", (req, res) => {
    return res.json(users)
})

//Route to get a single user
app.get("/user/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

// Route to create a new user
app.post("/user", (req, res) => {
    const body = req.body
    users.push({  id: users.length + 1,  ...body })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length })
    })

})

app.listen(PORT, () => {
    console.log(`sever started at PORT ${PORT}`);

})