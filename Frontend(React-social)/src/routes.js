import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// ---------- USER ----------
import Movies from "./views/user/movies/Movies";
import Booking from "./views/user/booking/Booking";
import SeatCinema from "./views/user/movies/SeatCinema";
import InformationMovie from "./views/user/movies/InformationMovie";

// ---------- ADMIN and STAFF----------
import MovieList from "./views/admin/movie/MovieList";
import Dashboard from "./views/admin/dashboard/Dashboard";
import StaffManagement from "./views/admin/staff/StaffManagement";
import AddNewMovie from "./views/admin/movie/AddNewMovie";
import DetailMovie from "./views/admin/movie/DetailMovie";
import Banner from "./views/admin/banner/Banner";
import EditMovie from "./views/admin/movie/EditMovie";
import AddNewStaff from "./views/admin/staff/AddNewStaff";
import Cinema from "./views/admin/cinema/Cinema";
import CreateCinema from "./views/admin/cinema/CreateCinema";
import MoviesStaff from "./views/staff/movies/MoviesStaff";
import StaffLayout from "./layouts/StaffLayout";
import ProfileAccount from "./views/auth/ProfileAccount";
import DashboardStaff from "./views/staff/dashboard/DashboardStaff";
import InformationMoviesStaff from "./views/staff/movies/InformationMoviesStaff";
import ChangePassword from "./views/auth/ChangePassword";
import History from "./views/user/cinemas/History";
import ForgotPassword from "./views/auth/ForgotPassword";
import ChangePasswordUser from "./views/auth/ChangePasswordUser";
//---------- USER ROUTE ---------
export const UserRoutes = [
  {
    path: "/",
    component: Movies,
    layout: UserLayout,
  },
  {
    path: "/informationmovie/:id",
    component: InformationMovie,
    layout: UserLayout,
  },

  {
    path: "/history",
    component: History,
    layout: UserLayout,
  },
  {
    path: "/booking",
    component: Booking,
    layout: UserLayout,
  },
  {
    path: "/profile",
    component: ProfileAccount,
    layout: UserLayout,
  },
  {
    path: "/change-password",
    component: ChangePassword,
    layout: UserLayout,
  },
  {
    path: "/user/change-password",
    component: ChangePasswordUser,
    layout: UserLayout,
  },

  {
    path: "/seat",
    component: SeatCinema,
    layout: null,
  },
  {
    path: "/forgotpassword",
    component: ForgotPassword,
    layout: UserLayout,
  },
];

//---------- ADMIN ROUTE ---------
export const AdminRoutes = [
  {
    path: "/listmovie",
    component: MovieList,
    layout: AdminLayout,
    isProtected: true,
  },
  {
    path: "/staff",
    component: StaffManagement,
    layout: AdminLayout,
    isProtected: true,
  },
  {
    path: "/addstaff",
    component: AddNewStaff,
    layout: AdminLayout,
    isProtected: true,
  },
  {
    path: "/cinema",
    component: Cinema,
    layout: AdminLayout,
    isProtected: true,
  },
  {
    path: "/cinema/create",
    component: CreateCinema,
    layout: AdminLayout,
    isProtected: true,
  },

  {
    path: "/movie/addmovie",
    component: AddNewMovie,
    layout: null,
    isProtected: true,
  },
  {
    path: "/movie/detailmovie/:id",
    component: DetailMovie,
    layout: null,
    isProtected: true,
  },
  {
    path: "/movie/editmovie/:id",
    component: EditMovie,
    layout: null,
    isProtected: true,
  },
  {
    path: "/banner",
    component: Banner,
    layout: AdminLayout,
    isProtected: true,
  },
];

// Staff Routes
export const StaffRoutes = [
  {
    path: "/staffmanagement",
    component: DashboardStaff,
    layout: StaffLayout,
    isProtected: true,
  },
  {
    path: "/staffmanagement/movies",
    component: MoviesStaff,
    layout: StaffLayout,
    isProtected: true,
  },
  {
    path: "/staffmanagement/movies/informationmovie/:id",
    component: InformationMoviesStaff,
    layout: StaffLayout,
    isProtected: true,
  },
];
