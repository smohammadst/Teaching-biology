/**
 * @swagger
 *  components:
 *      schemas:
 *          TypeEnumFaq:
 *              type: string
 *              enum:
 *                      -   course
 *                      -   all
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        addFaq:
 *              type: object
 *              required:
 *                  -   question
 *                  -   answer
 *                  
 *              properties:
 *                  question:
 *                      type: string
 *                      description: the comment of product
 *                      example: کامنت محصول
 *                  answer:
 *                      type: string
 *                      description: the id of product
 *                      example: id product or course or blog
 *                  type:
 *                      $ref: '#/components/schemas/TypeEnumFaq'
 */

/**
 * @swagger
 *  /faq/create:
 *      post:
 *          tags: [FAQ]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addFaq'
 *          responses:
 *              201:
 *                  description: created new Product    
 */

/**
 * @swagger
 * /faq/delete/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog to delete
 *     responses:
 *       200:
 *         description: The blog was successfully deleted
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */