export const EndPoints = {
  Auth: {
    Post: {
      Login: "user/login",
      Register: "user/register",
      ChangePassword: "user/change-password",
      EditProfile: "user/update-me",
    },
    Get: {
      Logout: "user/logout",
      Profile: "user/me",
    },
  },
  Course: {
    Post: {
      Create: "course",
    },
    Get: {
      GetAllCourse: "course",
    },
  },
};
