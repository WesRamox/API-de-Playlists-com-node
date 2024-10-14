const express = require('express')
const musicController = require("./controllers/music-controller")

const router = express.Router()

router.get("/playlists", musicController.index)
router.get("/playlists/:id", musicController.show)

router.post("/playlists", musicController.save)
router.put("/playlists/:id", musicController.update)

router.delete("/playlists/:id", musicController.remove)

router.post("/playlists/:id/music", musicController.addMusic)

module.exports = router