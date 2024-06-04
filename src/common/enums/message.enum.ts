export enum AuthMessageError {
    Confirm = "کابری با این مشخصات وجود دارد",
    NotFound = "کاربری یافت نشد",
    UnauthorizedPassword = "نام کاربری یا رمز ورود اشتباه می باشد",
    UnauthorizedEmailAndPhone = "اعتبار سنجی ایمیل یا شماره تماس را انجام نداده ایید",
    UnauthorizedCode = "کد وارد شده اشتباه میباشد",
    UnauthorizedExpires = "کد وارد شده منقضی شده است"
}

export enum GlobalMessageError {
    ServiceUnavailable = "سرور با مشکل مواجه شده است دوباره تلاش کنید"
}
