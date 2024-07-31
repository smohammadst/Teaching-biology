
/**
 * @swagger
 *  components:
 *      schemas:
 *        Ticket:
 *              type: object
 *              required:
 *                  -   title
 *                  -   desc
 *                  -   phone
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  desc:
 *                      type: string
 *                      description: the title of product
 *                  phone:
 *                      type: string
 *                      description: the title of course
 */

/**
 * @swagger
 *  /tiket/add:
 *      post:
 *          tags: [Ticket(AdminPanel)]
 *          summary: ticket
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Ticket'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Ticket'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /tiket/readAll:
 *      get:
 *          tags: [Ticket(AdminPanel)]
 *          summary: read all ticket
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
 *  /tiket/remove/{id}:
 *      delete:
 *          tags: [Ticket(AdminPanel)]
 *          summary: delete One course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of ticket
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */