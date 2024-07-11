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
 *  components:
 *      schemas:
 *        EditChapter:
 *              type: object
 *              properties:   
 *                  title:
 *                      type: string
 *                      description: the title of chapter
 *                      example: hapter 1 zero - hero javascript
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
/**
 * @swagger
 *  /chapter/update/{id}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: update detail of Chapter
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
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
 *  /chapter/delete/{id}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: remove a Chapter of courses
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */