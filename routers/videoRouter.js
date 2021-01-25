import express from "express";
import {
  deleteVideo,
  editVideo,
  upload,
  video,
  videoDetail,
} from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get("/", video);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail, videoDetail);

export default videoRouter;
