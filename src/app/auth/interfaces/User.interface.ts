export interface UserResponse {
  message:      string;
  access_token: string;
  user:         User;
}

export interface User {
  id:                number;
  username:          string;
  email:             string;
  steam_id?:          string;
  role:              string;
}

