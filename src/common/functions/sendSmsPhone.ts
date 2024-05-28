import melipayamak from "melipayamak"

const username: string = process.env.SMSUSERNAME
const password: string = process.env.SMSPASSWORD
const api = new melipayamak(username, password)

export function sendSMS(phone: string, text: string) {
    const sms = api.sms()
    const from: string = process.env.SMSPHONE
    let sendBool = false
    sms.send(phone, from, text).then(e => {
        sendBool = true
        console.log(e)
    }).catch(err => {
        console.log("err" + err)
    })
    return sendBool
}