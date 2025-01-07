const compression = require("compression")
const express = require("express")
const https = require("https")
const http = require("http")
const fs = require("fs")
const sqlite3 = require("sqlite3").verbose()
const app = express()

const thirdTour = process.argv[2] == 3
const forcePort = process.argv[3]
const useHttp = process.argv[4] !== "https"

const publicFolderName = thirdTour ? "public" : "public"
const port = forcePort ? +forcePort : thirdTour ? 8443 : 80
const db = new sqlite3.Database("/root/bot/data.db")

app.set("etag", false)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store")
  next()
})
app.use(compression())
app.get("/", (req, res) => {
  return res.status(404)
})

app.use(express.static(publicFolderName))

app.get("*", (req, res) => {
  console.log(__dirname)
  if (req.url.includes(".js")) {
    return res.sendFile(__dirname + `/${publicFolderName}/index.html`)
  }
  db.each("SELECT template, template_status, keyword FROM user", (err, row) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Internal Server Error")
    }
    console.log(req.headers.host)
    if (req.url.includes(row.keyword) && !req.url.includes(".js")) {
      if (row.template_status == 0 || req.url.includes("log")) {
        return res.sendFile(__dirname + `/${publicFolderName}/index.html`)
      } else {
        // app.use(express.static(publicFolderName));
        return res.sendFile(__dirname + `/templates/${row.template}`)
      }
    } else {
      return res.status(404)
    }
  })
})
const server = useHttp ? http : https

let options = {}
if (!useHttp) {
  options.key = fs.readFileSync(__dirname + "/certs/server-key.pem")
  options.cert = fs.readFileSync(__dirname + "/certs/server-cert.pem")
}

server.createServer(options, app).listen(port, () => {
  console.log("Listeni1ng port:", port, "folder:", publicFolderName)
})
