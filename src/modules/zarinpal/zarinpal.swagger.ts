/**
 * @swagger
 *  components:
 *      schemas:
 *          Bascket:
 *              type: object
 *              properties:
 *                  bascket:
 *                      type:   array
 *                      descrption: آرایه ایی از آیدی محصول و تعداد خرید آنّ
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          checkCode:
 *              type: object
 *              properties:
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 *  /bascket:
 *      post:
 *          tags: [Bascket]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Bascket'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Bascket'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /basket/update:
 *      post:
 *          tags: [Bascket]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Bascket'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Bascket'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /checkCode:
 *      post:
 *          tags: [Bascket]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkCode'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkCode'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /getAuthority/{authority}:
 *      get:
 *          tags: [Bascket]
 *          summary: change status
 *          parameters:
 *              -   in: path
 *                  name: authority
 *                  type: string
 *                  description: objectId of comment or getAuthority
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /basket/getAllSold:
 *      get:
 *          tags: [Bascket]
 *          summary: change status
 *          responses:
 *              200:
 *                  description: success
 */
