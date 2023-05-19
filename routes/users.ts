import express from "express";
import { validatorLogin, validatorRegister, validatorUpdateUser } from "../validators/users";
import { deleteUser, loginUser, registerUser, updateUser } from "../controllers/users";
import tokenAuth from "../middleware/tokenAuth";
const router = express.Router();

/**
 * @openapi
 * /api/users/register:
 *  post:
 *      tags:
 *      - Users
 *      summary: Register
 *      responses:
 *          '200':
 *              description: User has been registered and it will return a login
 */ 
router.post('/register', validatorRegister, registerUser);

/**
 * @openapi
 * /api/users/login:
 *  post:
 *      tags:
 *      - Users
 *      summary: Login
 *      responses:
 *          '200':
 *              description: User has loged succesfully
 */ 
router.post('/login', validatorLogin, loginUser);

/**
 * @openapi
 * /api/users/:
 *  get:
 *      tags:
 *      - Users
 *      summary: Get all the users, there are filters
 *      responses:
 *          '200':
 *              description: All the users base on the filter
 */ 
router.get('/',);

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *      tags:
 *      - Users
 *      summary: Get a user by id
 *      responses:
 *          '200':
 *              description: All the users base on the filter
 */ 
router.get('/:id',);

/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags:
 *      - Users
 *      summary: Update a user
 *      responses:
 *          '200':
 *              description: User updated
 */ 
router.put('/:id', validatorUpdateUser, tokenAuth, updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *      tags:
 *      - Users
 *      summary: Delete a user
 *      responses:
 *          '200':
 *              description: User deleted
 */ 
router.delete('/:id', tokenAuth, deleteUser);

// module.exports = router;
export default router;