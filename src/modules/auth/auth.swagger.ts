/**
 * @swagger
 *  components:
 *      schemas:
 *          Enum:
 *              type: string
 *              items:
 *                  type: string
 *                  enum:
 *                      -   login
 *                      -   register
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          resetCode:
 *              type:   object
 *              required:
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type:   string
 *          checkOtp:
 *              type:   object
 *              required:
 *                  -   phone
 *                  -   code
 *              properties:
 *                  phone:
 *                      type:   string
 *                  code:
 *                      type:   string
 *          refreshToken:
 *              type:   object
 *              required:
 *                  -   token
 *              properties:
 *                  token:
 *                      type:   string
 *          login:
 *              type:   object
 *              required:
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type:   string
 *          registerStepTwo:
 *              type: object
 *              required:
 *                  -   first_name
 *                  -   last_name
 *                  -   email
 *                  -   phone
 *                  -   code
 *              properties:
 *                  email:
 *                      type: string
 *                      description: ایمیل کاربر
 *                  phone:
 *                      type: string
 *                      description: شماره همراه کاربر 
 *                  first_name:
 *                      type: string
 *                      description: نام برای ثبت نام
 *                  last_name: 
 *                      type: string
 *                      description: نام خانوادگی برای ثبت نام
 *                  code: 
 *                      type: string
 *                      description: نام خانوادگی برای ثبت نام
 *          registerStepOne:
 *              type: object
 *              required:
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: شماره همراه کاربر یا ایمیل کاربر
 */

/**
 * @swagger
 *  /auth/refreshToken:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshToken'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /auth/registerStepOne:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/registerStepOne'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/registerStepOne'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /auth/registerStepTwo:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/registerStepTwo'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/registerStepTwo'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /auth/login:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/login'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/login'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /auth/resetCode:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/resetCode'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/resetCode'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /auth/checkOtp:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *          responses:
 *              201:
 *                  description: success
 */
