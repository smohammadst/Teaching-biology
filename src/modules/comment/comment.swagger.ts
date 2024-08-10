/**
 * @swagger
 *  components:
 *      schemas:
 *          TypeEnumComment:
 *              type: string
 *              enum:
 *                      -   courseID
 *                      -   blogID
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          TypeEnumSned:
 *              type: string
 *              enum:
 *                      -   answer
 *                      -   comment
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *        addComment:
 *              type: object
 *              required:
 *                  -   text
 *                  -   id
 *                  
 *              properties:
 *                  text:
 *                      type: string
 *                      description: the comment of product
 *                      example: کامنت محصول
 *                  ID:
 *                      type: string
 *                      description: the id of product
 *                      example: id product or course or blog
 *                  method:
 *                      $ref: '#/components/schemas/TypeEnumComment'
 *                  snedType:
 *                      $ref: '#/components/schemas/TypeEnumSned'
 *                  parent:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 * 
 *        remove:
 *              type: object
 *              required:
 *                  -   id
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the id of product
 *                      example: id product or course or blog
 *          
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        editComment:
 *              type: object
 *              required:
 *                  -   type
 *              properties:
 *                  type:
 *                      type: string
 *                      description: the comment of product
 *                      example: article
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        sendStatus:
 *              type: object
 *              required:
 *                  -   id
 *                  -   status
 *                  -   isAnswer
 *                  -   type
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the id of product
 *                  status:
 *                      type: bool
 *                      description: the comment of product
 *                  type:
 *                      type: string
 *                      description: the title of product
 */

/**
 * @swagger
 *  /comment/addComment:
 *      post:
 *          tags: [Comment]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addComment'
 *
 *          responses:
 *              201:
 *                  description: created new Product    
 */

/**
 * @swagger
 *  /comment/changeStatus/{id}:
 *      get:
 *          tags: [Comment(AdminPanel)]
 *          summary: change status
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of comment or answer
 *          responses:
 *              200:
 *                  description: success
 */


/**
 * @swagger
 *  /comment/deleteComment/{id}:
 *      delete:
 *          tags: [Comment(AdminPanel)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/remove'
 *          responses:
 *              201:
 *                  description: created new Product    
 */

/**
 * @swagger
 *  /comment/readByAdmin:
 *      get:
 *          tags: [Comment(AdminPanel)]
 *          summary: change status
 *          responses:
 *              200:
 *                  description: success
 */