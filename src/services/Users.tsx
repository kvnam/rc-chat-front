
interface UserType {
  username: string
  room: string
  joined? : Date
  lastActive? : Date
}

let UserService = null;

/**
 *  User class to maintain user state
 * 
 *  TODO: 
 *  - Add call to API to check username availability
 *  
 */
class Users {

  private userList : [UserType]

  constructor(){
    this.userList = [{
      username: '',
      room: ''
    }];
  }
  /**
   *  Add a new user to the room
   *  @param user User object
   *  @returns Status string
   */
  addUser = (user: UserType): string => {
    if(!this.checkUsername(user.username)){
      this.userList.push({
        username: user.username,
        room: user.room,
        joined: new Date(),
        lastActive: new Date() 
       });
       return "Success!";
    }else{
      return "Pick another username!";
    }
    
  }

  /**
   *  Remove a user from a room 
   *  @param user User object
   */
  removeUser = (user: UserType): void => {
    const userIndex = this.userList.findIndex((userObj: UserType) => {
      return user.username === userObj.username && user.room === userObj.room;
    });

    if(userIndex){
      delete this.userList[userIndex];
    }else{
      console.log('User not found!');
    }
  }

  /**
   *  Checks if user name exists, across rooms
   *  @param username
   *  @todo Change this to an API call
   */
  checkUsername = (username: string): boolean => {
    const userIndex = this.userList.findIndex((userObj: UserType) => {
      return username === userObj.username;
    });
    console.log(`User name index returned ${userIndex}`);
    if(userIndex) return false;

    return true;
  }

  static initUserService = (): Users => {
    UserService = new Users();
    return UserService;
  }
}

export const getUserService = Users.initUserService;
