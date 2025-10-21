import express from "express";
import { syncIRL, getAllIRL } from "../services/irlService.js";

const router = express.Router();

/**
 * POST /api/v2/irl/sync
 * Synchronizes the IRL dataset from INSEE
 */
router.post("/sync", async (req, res) => {
  try {
    const result = await syncIRL();
    res.json({
      message: "IRL data synchronized successfully",
      result,
    });
  } catch (error) {
    console.error("IRL sync failed:", error);
    res.status(500).json({ error: "Failed to sync IRL data" });
  }
});

/**
 * GET /api/v2/irl/history
 * Returns all stored IRL values
 */
router.get("/history", async (req, res) => {
  try {
    const irlList = await getAllIRL();
    res.json(irlList);
  } catch (error) {
    console.error("Failed to get IRL history:", error);
    res.status(500).json({ error: "Failed to retrieve IRL data" });
  }
});

export default router;
