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