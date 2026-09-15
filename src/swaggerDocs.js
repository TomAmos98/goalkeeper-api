/**
 * @swagger
 * components:
 *   schemas:
 *     Goalkeeper:
 *       type: object
 *       required:
 *         - name
 *         - club
 *         - nationality
 *         - age
 *         - league
 *         - appearances
 *         - cleanSheets
 *         - savePercentage
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Tom Amos
 *         club:
 *           type: string
 *           example: Arsenal
 *         nationality:
 *           type: string
 *           example: Sweden
 *         age:
 *           type: integer
 *           example: 28
 *         league:
 *           type: string
 *           example: Premier League
 *         appearances:
 *           type: integer
 *           example: 25
 *         cleanSheets:
 *           type: integer
 *           example: 12
 *         savePercentage:
 *           type: number
 *           example: 78
 */

/**
 * @swagger
 * /api/goalkeepers:
 *   get:
 *     summary: Get all goalkeepers
 *     parameters:
 *       - in: query
 *         name: nationality
 *         schema:
 *           type: string
 *         description: Filter by nationality
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of goalkeepers per page
 *     responses:
 *       200:
 *         description: List of goalkeepers
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a goalkeeper
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goalkeeper'
 *     responses:
 *       201:
 *         description: Goalkeeper created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/goalkeepers/{id}:
 *   get:
 *     summary: Get goalkeeper by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Goalkeeper found
 *       404:
 *         description: Goalkeeper not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a goalkeeper
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goalkeeper'
 *     responses:
 *       200:
 *         description: Goalkeeper updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Goalkeeper not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a goalkeeper
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Goalkeeper deleted
 *       404:
 *         description: Goalkeeper not found
 *       500:
 *         description: Internal server error
 */