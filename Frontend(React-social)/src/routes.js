import UserLayout from "./layouts/UserLayout";
import HeaderOnly from "./layouts/HeaderOnly";
import AdminLayout from "./layouts/AdminLayout";
// ---------- USER ----------
import Cinemas from "./views/user/cinemas/Cinemas";
import Movies from "./views/user/movies/Movies";
import Booking from "./views/user/booking/Booking";
import SeatCinema from "./views/user/movies/SeatCinema";
// ---------- ADMIN ----------
import MovieList from "./views/admin/movie/MovieList";
import Dashboard from "./views/admin/dashboard/Dashboard";
import StaffManagement from "./views/admin/staff/StaffManagement";
import Feedback from "./views/admin/feedback/Feedback";
import AddNewMovie from "./views/admin/movie/AddNewMovie";
import DetailMovie from "./views/admin/movie/DetailMovie";
import Banner from "./views/admin/banner/Banner";
import EditMovie from "./views/admin/movie/EditMovie";
import AddNewStaff from "./views/admin/staff/AddNewStaff";
import InformationMovie from "./views/user/movies/InformationMovie";
import Cinema from "./views/admin/cinema/Cinema";
import CreateCinema from "./views/admin/cinema/CreateCinema";
import MoviesStaff from "./views/staff/movies/MoviesStaff";
import StaffLayout from "./layouts/StaffLayout";
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
    path: "/cinemas",
    component: Cinemas,
    layout: UserLayout,
  },
  {
    path: "/booking",
    component: Booking,
    layout: UserLayout,
  },

  {
    path: "/seat",
    component: SeatCinema,
    layout: null,
  },
];

//---------- ADMIN ROUTE ---------
export const AdminRoutes = [
  {
    path: "/admin",
    component: Dashboard,
    layout: AdminLayout,
    isProtected: true,
  },
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
    path: "/feedback",
    component: Feedback,
    layout: AdminLayout,
    isProtected: true,
  },
  {
    path: "/movie/addmovie",
    component: AddNewMovie,
    layout: HeaderOnly,
    isProtected: true,
  },
  {
    path: "/movie/detailmovie/:id",
    component: DetailMovie,
    layout: HeaderOnly,
    isProtected: true,
  },
  {
    path: "/movie/editmovie/:id",
    component: EditMovie,
    layout: HeaderOnly,
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
    component: MoviesStaff,
    layout: StaffLayout,
  },
];
