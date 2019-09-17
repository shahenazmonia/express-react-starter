export type user = {
  id: number;
  fullname: string;
  roles: Array<string> | undefined;
  sessionToken: string;
  loggedIn: boolean;
};

export interface MenuProps {
  user: any;
  navPressed: any;
  handleClick: any;
  logout?: any;
  current: string;
}
export interface MenuState {}
