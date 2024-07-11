/**
 * @swagger
 *  components:
 *      schemas:
 *        AddChapter:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of chapter
 *                      example: hapter 1 zero - hero javascript
 *                  id:
 *                      type: string
 *                      description: the title of chapter
 *                  time:
 *                      type: object
 *                      description: the describe about this chapter
 *                      example: تایم فصل را وارد کنید
 */

/**
 * @swagger
 *  /addChapter:
 *      post:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create and save chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
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

