import express from "express";
import uploadMiddleware from "../utils/handleStorage";
const router = express.Router();
import { getItem, getItems, createItem, deleteItem } from "../controllers/storages";
import { validatorGetItem } from "../validators/storages";
/**
 * @swagger
 * tags:
 *   name: Storages
 *   description: Storage management
 */

/**
 * @swagger
 * /storages:
 *   get:
 *     summary: Retrieve a list of storages
 *     description: Get a list of all storages from the database
 *     tags: [Storages]
 *     responses:
 *       200:
 *         description: A list of storages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 */
router.get("/", getItems)

/**
 * @swagger
 * /storages/{id}:
 *   get:
 *     summary: Retrieve a single storage
 *     description: Get a specific storage by its id from the database
 *     tags: [Storages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Storage id
 *     responses:
 *       200:
 *         description: A single storage
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/storage'
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * @swagger
 * /storages:
 *   post:
 *     summary: Upload a file and register it
 *     description: Upload a new storage item to the database
 *     tags: [Storages]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Storage created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/storage'
 */
router.post("/", uploadMiddleware.single("file"), createItem)

/**
 * @swagger
 * /storages/{id}:
 *   delete:
 *     summary: Delete a storage
 *     description: Remove a specific storage by its id from the database
 *     tags: [Storages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Storage id
 *     responses:
 *       200:
 *         description: Storage deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/storage'
 */
router.delete("/:id", validatorGetItem, deleteItem);

export default router;