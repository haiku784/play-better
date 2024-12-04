const mongoose = require('mongoose');"
\
const gameplaySchema = new mongoose.Schema({\
    player_id: String,\
    session_data: Object,\
});\
\
const Gameplay = mongoose.model('Gameplay', gameplaySchema);\
\
module.exports = Gameplay;