/**
 * @swagger
 *  components:
 *      schemas:
 *          AuthEnumType:
 *              type: string
 *              enum:
 *                      -   register
 *                      -   loginOtp
 *                      -   loginPassword                
 *                      -   resetCodePhone
 *                      -   resetCodeEmail
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          AuthEnumMethod:
 *              type: string
 *              enum:
 *                      -   email
 *                      -   phone
 *                      -   id
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Auth:
 *              type: object
 *              required:
 *                  -   username
 *                  -   type
 *                  -   method
 *              properties:
 *                  username:
 *                      type: string
 *                      description: the title of category
 *                  password:
 *                      type: string
 *                      description: Course or Blog
 *                  code:
 *                      type: number
 *                      description: Course or Blog
 *                  type:
 *                      $ref: '#/components/schemas/AuthEnumType'
 *                  method:
 *                      $ref: '#/components/schemas/AuthEnumMethod'
 */

/**
 * @swagger
 *  /userExistence:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Auth'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Auth'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /all:
 *      get:
 *          tags: [Auth]
 *          summary: remove a Chapter of courses
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */