const express = require("express");
const router = express.Router();
const controller = require("../controllers/listController");
const extractFile = require("../middlewares/image_upload");
const extractVideo = require("../middlewares/video_upload");

router.post("/add", controller.addMovies);
router.get("/popular", controller.getPopularList);
router.get("/latest", controller.getLatestList);
router.get("/getImage", controller.getImage);
router.patch("/addPoster/:id", 
            extractFile,
            controller.updatePoster
);
router.patch("/addTrailer/:id", 
            extractVideo,
            controller.updateTrailer
);
router.get("/getMovie/:title", controller.getMovieDetails);
// router.patch("/update/:id", controller.update);

module.exports = router;