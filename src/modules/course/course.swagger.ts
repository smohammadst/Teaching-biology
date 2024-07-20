/**
 * @swagger
 *  components:
 *      schemas:
 *        Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   Description
 *                  -   price
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
 *                  price:
 *                      type: string
 *                      description: the title of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of course
 *                      example: 20
 *                  language:
 *                      type: string
 *                      description: the title of course
 *                      example: IR
 *                  prerequisitesText: 
 *                      type: string
 *                      description: the prerequisitesText of course
 *                  prerequisites: 
 *                      type: string
 *                      description: the id of course
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */
/**
 * @swagger
 *  definitions:
 *      publicDefinition:
 *          type: object
 *          properties:
 *              statusCode:                 
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "the best message for that action"
 */
/**
 * @swagger
 *  /createCourse:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          
 *          responses:
 *              201:
 *                  description: created new course
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */

/**
 * @swagger
 *  /updateCourse/{id}:
 *      patch:
 *          tags: [Course(AdminPanel)]
 *          summary: update course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product for update course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Course'
 *          
 *          responses:
 *              200:
 *                  description: updated Course
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /deleteCourse/{id}:
 *      delete:
 *          tags: [Course(AdminPanel)]
 *          summary: delete One course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of product
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
 *  /getOnecourse/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get One course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of course
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /getAllCourse:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all courses
 *          responses:
 *              200:
 *                  description: success
 */