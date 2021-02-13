const express = require('express');
const hotspotRouter = express.Router();

hotspotRouter.get('/', (req, res) => {
    res.json({
        Page: "Hotspot page"
    });
})

module.exports = hotspotRouter;