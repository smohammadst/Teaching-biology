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
 *                      description: course or blog
 *                      example: course
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
 *  /updateCategory/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit or update category title with object id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
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
 *              200:
 *                  description: success
 *              500:    
 *                  description: internalServerErorr
 */
/**
 * @swagger
 *  /deleteCategory/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summary: remove category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /getOneCategory/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get One Categoty
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /getchildern:
 *      get:
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
 *  /getAllCategory/{type}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get all Category
 *          parameters:
 *              -   in: path
 *                  name: type
 *                  type: string
 *                  nullable: true
 *                  required: false
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */