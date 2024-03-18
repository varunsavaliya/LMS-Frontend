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
      Update: "course",
    },
    Get: {
      GetAllCourse: "course",
    },
    Delete: {
      DeleteCourse: "course",
    },
  },
  Lecture: {
    Path: "course",
    Get: {
      AllLectures: "lectures",
    },
  },
  Payment: {
    RazorpayId: "/payment/razorpay-key",
    PurchaseCourseBundle: "/payment/subscribe",
    VerifyPayment: "/payment/verify",
    PaymentRecords: "/payment",
    CancelCourseBundle: "/payment/unsubscribe",
  },
  Stats: {
    getStats: "stats/users",
  },
};
