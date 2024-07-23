/**
 * @swagger
 *  components:
 *      schemas:
 *          EvidenceAdd:
 *              type: object
 *              required:
 *                  -   courseID
 *              properties:
 *                  courseID:
 *                      type:   string
 *                      description:    آیدی دوره مد نظر کاربر
 */ 

/**
 * @swagger
 *  /evidence/addEvidence:
 *      post:
 *          tags: [Evidence]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EvidenceAdd'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EvidenceAdd'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /evidence/getAll:
 *      get:
 *          tags: [Evidence]
 *          summary: گرفتن تمامی گواهی های کاربران که در حالت انتظار هستند
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */