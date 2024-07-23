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
 *                      description: شماره همراه کاربر یا ایمیل کاربر
 *                  password:
 *                      type: string
 *                      description: اگر پسسورد خواست کاربر
 *                  code:
 *                      type: number
 *                      description: کد برای اعتبار سنجی
 *                  type:
 *                      $ref: '#/components/schemas/AuthEnumType'
 *                      description:    نوع درخواست هست که معلوم میکنه برای ثبت نام هست یا ورود یا ....
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

// /**
//  * @swagger
//  *  /all:
//  *      get:
//  *          tags: [Auth]
//  *          summary: remove a Chapter of courses
//  *          responses:
//  *              200:
//  *                  description: success
//  *                  content:
//  *                      application/json:
//  *                          schema: 
//  *                              $ref: '#/definitions/publicDefinition'
//  */