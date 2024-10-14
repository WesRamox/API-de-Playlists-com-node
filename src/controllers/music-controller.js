let playlists = [
  {
    id: 200,
    name: "Trap BR",
    tags: ["trap", "nacional", "plug"],
    musics: [
      {
        name: "Ok, Ok!",
        year: 2024,
        artist: "Teto",
        album: "Solo"
      },
      {
        name: "333",
        year: 2024,
        artist: "Matue",
        album: "333"
      },
    ]
  },
  {
    id: 220,
    name: "Trap Gringo",
    tags: ["trap", "internacional", "central"],
    musics: [
      {
        name: "Sicko Mode",
        year: 2018,
        artist: "Travis Scott",
        album: "ASTROWORLD"
      },
      {
        name: "Greece",
        year: 2020,
        artist: "DJ Khaled ft. Drake",
        album: "Khaled Khaled"
      }
    ]
  }
]

module.exports = {
  // GET /playlists
  index: (req, res) => {
    res.json(playlists)
  },

  // GET /playlists/:id
  show: (req, res) => {
    const { id } = req.params

    const playlist = playlists.find(playlist => playlist.id === +id)

    if (!playlist) {
      const { id } = req.params
      res.status(404)
      res.json({ message: `Playlist with id ${id} not found!` })
    } else {
      res.json(playlist)
    }
  },

  // POST /playlists
  save: (req, res) => {
    const { name, tags, musics } = req.body

    const newPlaylist = {
      id: Math.floor(Math.random() * 200000),
      name,
      tags,
      musics
    }
    playlists.push(newPlaylist)

    res.status(201)
    res.json(newPlaylist)
  },

  // PUT /playlists/:id
  update: (req, res) => {
    const { id } = req.params
    const { name, tags } = req.body

    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist não encontrada!" })
    }

    if (typeof name === 'string') {
      playlists[playlistIndex].name = name
    } else {
      return res.status(404).json({ message: "valor inválido" })
    }

    if (Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags
    } else {
      res.status(400).json({ message: "valor inválido" })
    }

    res.json(playlists[playlistIndex])
  },

  // DELETE /playlists/:id
  remove: (req, res) => {
    const { id } = req.params

    const newPlaylist = playlists.filter(playlist => playlist.id !== +id)

    if (newPlaylist.length === playlists.length) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    playlists = newPlaylist
    res.json(playlists)
  },

  // POST /playlists/:id/music
  addMusic: (req, res) => {
    const { id } = req.params
    const { name, year, artist, album } = req.body

    const playlistToAddMusic = playlists.find(playlist => playlist.id === +id)
    const newMusicIntoPlaylist = { name, year, artist, album }

    playlistToAddMusic.musics.push(newMusicIntoPlaylist)
    
    res.status(201)
    res.json(playlistToAddMusic)
  }
}