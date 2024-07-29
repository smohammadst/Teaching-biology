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
 *          register:
 *              type: object
 *              required:
 *                  -   first_name
 *                  -   last_name
 *                  -   phone
 *                  -   email
 *              properties:
 *                  email:
 *                      type: string
 *                      description: شماره همراه کاربر یا ایمیل کاربر
 *                  phone:
 *                      type: number
 *                      description: کد برای اعتبار سنجی
 *                  first_name:
 *                      type: string
 *                      description: نام برای ثبت نام
 *                  last_name: 
 *                      type: string
 *                      description: نام خانوادگی برای ثبت نام
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
 *  /auth/register:
 *      post:
 *          tags: [Auth]
 *          summary: auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/register'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/register'
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
