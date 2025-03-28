
export interface IMailAdapter {
    sendUserVerifyEmail(to: string, fullName: string, token: string): Promise<void>;
    sendOtp(to: string, fullName: string, otp: string) :Promise<void>;
}
  