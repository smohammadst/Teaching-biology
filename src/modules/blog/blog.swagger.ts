

/**
 * @swagger
 *  components:
 *      schemas:
 *        Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   Description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  Description:
 *                      type: string
 *                      description: the title of course
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the title of parent category
 *                  status:
 *                      type: boolean
 *                      description: false or true
 *                  shortLink:
 *                      type: string
 *                      description: short link
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *        Edit-Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   Description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  Description:
 *                      type: string
 *                      description: the title of course
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the title of parent category
 *                  status:
 *                      type: boolean
 *                      description: false or true
 *                  shortLink:
 *                      type: string
 *                      description: shortttttttt
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Sort-Blog:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  sortByNumber:
 *                      type: number    
*/

/**
 * @swagger
 *  /createBlog:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create and save Blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          
 *          responses:
 *              201:
 *                  description: created new blog
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /deleteBlog/{id}:
 *      delete:
 *          tags: [Blog(AdminPanel)]
 *          summary: delete One blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of blog
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /updateBlog/{id}:
 *      put:
 *          tags: [Blog(AdminPanel)]
 *          summary: update blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of book for update blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Blog'
 *          
 *          responses:
 *              200:
 *                  description: updated Blog
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/blog/sortByNumber:
 *      put:
 *          tags: [Blog(AdminPanel)]
 *          summary: add number for sort
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Sort-Blog'
 *          
 *          responses:
 *              200:
 *                  description: updated Blog
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /getOneBlog/{id}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get One blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of blog
 *          responses:
 *              200:
 *                  description: find one Blog
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /getAllBlog/{categoryId}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blog
 *          parameters:
 *              -   in: path
 *                  name: categoryId
 *                  type: string
 *                  required: false
 *                  default: 669d16c7670adf539f2ec227
 *                  description: objectId of category
 *          responses:
 *              200:
 *                  description: success
 */