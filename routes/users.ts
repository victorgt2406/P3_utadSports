import express from "express";
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
router.post('/register',);

/**
 * @openapi
 * /api/users/login:
 *  post:
 *      tags:
 *      - Users
 *      summary: Login
 *      responses:
 *          '200':
 *              description: User has login succesfully and it will return the user infromation with its token
 */ 
router.post('/login',);

router.get('/',);

router.get('/:id',);

router.put('/:id',);

router.delete('/:id',);

// module.exports = router;
export default router;