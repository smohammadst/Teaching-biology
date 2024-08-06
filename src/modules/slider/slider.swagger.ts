
/**
 * @swagger
 *  components:
 *      schemas:
 *        Slider:
 *              type: object
 *              required:
 *                  -   images
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  description:
 *                      type: string
 *                      description: the title of product
 *                  subtitle:
 *                      type: string
 *                      description: the title of course
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                  url:
 *                      type: string
 *                      description: the title of course
 */

/**
 * @swagger
 *  /slider/addSlider:
 *      post:
 *          tags: [Slider(Admin)]
 *          summary: Slider
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Slider'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Slider'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /slider/getAll:
 *      get:
 *          tags: [Slider]
 *          summary: read all slider
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
 *  /slider/remove/{id}:
 *      delete:
 *          tags: [Slider(Admin)]
 *          summary: delete One slider
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