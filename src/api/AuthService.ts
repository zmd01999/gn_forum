import { IUser } from "../models/types";
import { setLocalStorage } from "../utils";
import { ApiService } from "./ApiService";

export class AuthService {
 
  api: ApiService<IUser>;

  constructor() {
    this.api = new ApiService<IUser>();
  }

  // private handleUserResponse(user:IUser) {
  //   setLocalStorage("token", user.token);
  // }

  // TODO define return type
  // public register(username: string, email: string, password: string) {
  //   const data = {
  //     user: {
  //       username: username,
  //       email: email,
  //       password: password,
  //     },
  //   };

  //   return this.api.post("users", data).then((res)=>{
  //     this.handleUserResponse(res.data.user);
  //     return Promise.resolve(res.data.user.username);
  //   });
  // }

  // public login(email: string, password: string) {
  //   const data = {
  //     user: {
  //       email: email,
  //       password: password,
  //     },
  //   };
  //   return this.api.post("users/login", data)
  //   .then((res) => {
  //     this.handleUserResponse(res.data.user);
  //     return Promise.resolve(res.data.user.username);
  //   });
  // }

  // public getCurrrentUser() {
  //   return this.api.get("user");
  // }

  // public updateUser(user:object) {
  //   return this.api.put('user',{"user":user})
  // }

  private handleUserResponse(token:string) {
    setLocalStorage("token", token);
  }
  public async register(username: string, password: string, phone: string,email: string , code:string) {
    const data = {
      
        nickName: username,
        password: password,
        phoneNumber: phone,
        email: email,
        sms: code,
      
    };

    const res = await this.api.post("register", data);
    this.handleUserResponse(res.data.data.token);
    // return await Promise.resolve({"code":res.data.code,"username":res.data.data.nickname,"id":res.data.data.id});
    return await Promise.resolve(res.data);

  }

  public async login(email: string, password: string) {
    const data = {
        account: email,
        password: password,
    };
    return this.api.post("login", data)
    .then((res) => {
      this.handleUserResponse(res.data.data.token);
      console.log(res.data.data);
      return Promise.resolve({"code":res.data.code,"username":res.data.data.nickname,"id":res.data.data.id});
    });
  }

  public async loginSms(phone: string, code: string) {
    const data = {
      phone: phone,
        sms: code,
    };
    return this.api.post("login/sms", data)
    .then((res) => {
      this.handleUserResponse(res.data.data.token);
      return Promise.resolve({"code":res.data.code,"username":res.data.data.nickname,"id":res.data.data.id});
    });
  }


  public getCurrrentUser() {
    return this.api.get("user");
  }

  public updateUser(user:object) {
    return this.api.put('user',{"user":user})
  }

  public verifyCode(parameter:string) {
    const data={
      phone : parameter,
      msg : "regist"
    };
    return this.api.post(`/sms/send`,data);
  }

  public verifyLCode(parameter:string) {
    const data={
      phone : parameter,
      msg : "login"
    };
    return this.api.post(`/sms/send`,data);
  }
}
