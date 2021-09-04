
/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - fullname
 *         - password
 *         - whatsapp
 *         - email
 * 
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant auto-increment
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur
 *         fullname:
 *           type: string
 *           description: Le nom complet de l'utilisateur
 *         whatsapp:
 *           type: string
 *           description: Le numero whatsapp de l'utilisateur
 * 
 *       example:
 *         password: hsddhjdghdf
 *         fullname: Benin Bet 
 *         email: beninbet@contact.com
 *         whatsapp: +229 00 00 00 00
 */

/**
 * @swagger
 * tags:
 *   name: users
 *   description: Operation sur les utilisateus
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: inscription d'un utilisateur
 *     tags: [users]
 *     requestBody:
 *       required: 
 *         - email
 *         - password
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: Connexion reussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       400:
 *         description: Impossible de se connecter
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion a un compte utilisateur
 *     tags: [users]
 *     description: connexion a un compte utilisateur
*     requestBody:
 *       required: 
 *         - email
 *         - password
 *       content:
 *         application/json:
 *           schema:
 *              users:
 *                  type: object
 *                  required:
 *                     
 *     responses:
 *       200:
 *         description: connecté
 */
/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: deconnecter l'utilisateur
 *     tags: [users]    
 *     responses:
 *       200:
 *         description: Utilisateur deconnecter
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       404:
 *         description: echec de deconnexion
 */


// user DB

/**
 * @swagger
 * /users:
 *   get:
 *     summary: liste des utilisateur
 *     tags: [users]    
 *     responses:
 *       200:
 *         description: Liste des utilisateur bien retournée
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       400:
 *         description: echec de recuperation des utilisateur
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: return un utilisateur
 *     tags: [users]    
 *     responses:
 *       200:
 *         description: information de l'utilisateur
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       400:
 *         description: echec de recuperation de l'utilisateur
 */


/**
 * @swagger
 * /users/one/{id}:
 *   put:
 *     summary: update information de l'utilisateur
 *     tags: [users]    
 *     responses:
 *       200:
 *         description: Les données sont bien mise a jour
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       400:
 *         description: echec de mise a jour
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [users]    
 *     responses:
 *       200:
 *         description: utilisateur bien supprimé
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       400:
 *         description: echec de suppression
 */


/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Return les informations de l'utilisateur connecté
 *     tags: [users]    
 *     responses:
 *       200:
 *         description: utilisateur retourner
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'

 */