/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  type:
 *                      type: string
 *                      description: Course or Blog
 *                  parent:
 *                      type: string
 *                      description: the parent of category
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          getCategory:
 *              type: object
 * 
 *              properties:
 *                  nameParent:
 *                      type: string
 *                      description: the parent of category
 */
/**
 * @swagger
 *  /addCategory:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create category course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /createCategoryBlog:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create category Blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /getchildern:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: get childern
 *          requestBody:
 *              required: true
 *              content: Related categories
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/getCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/getCategory'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: remove a Chapter of courses
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */