import { IUserInfo } from "../models/types";
import { ApiService } from "./ApiService";

export class ProfileService {
  api: ApiService<IUserInfo>;

  constructor() {
    this.api = new ApiService<IUserInfo>();
  }

  public followUser(id: string) {
    return this.api.post(`user/toUser`,{id:id});
  }

  public isFollow(id:string) {
    return this.api.post(`user/isUserFollow`,{id:id});
  }

  public unfollowUser(username: string) {
    return this.api.delete(`profiles/${username}/follow`);
  }

  public getUser(id: string) {
    return this.api.get(`user/detail/${id}`).then(
      (res) => {
        return Promise.resolve(res.data);
      }
    );
  }

  public updateUser(user: any) {
    return this.api.post(`user/update`, user).then(
      (res) => {
        return Promise.resolve(res.data);
      }
    );
  }
}
