import UserLayout from "./layouts/UserLayout";
import HeaderOnly from "./layouts/HeaderOnly";
import AdminLayout from "./layouts/AdminLayout";
// ---------- USER ----------
import GiftShop from "./views/user/giftshop/GiftShop";
import Cinemas from "./views/user/cinemas/Cinemas";
import Movies from "./views/user/movies/Movies";
import Promotion from "./views/user/promotion/Promotion";
import Booking from "./views/user/booking/Booking";
import SubBooking from "./views/user/booking/SubBooking";
import Showtimes from "./views/user/booking/Showtimes";
import SeatCinema from "./views/user/movies/SeatCinema";
// ---------- ADMIN ----------
import MovieList from "./views/admin/movie/MovieList";
import Dashboard from "./views/admin/dashboard/Dashboard";
import Staff from "./views/admin/staff/StaffManagement";
import Feedback from "./views/admin/feedback/Feedback";
import AddNewMovie from "./views/admin/movie/AddNewMovie";
import DetailMovie from "./views/admin/movie/DetailMovie";
import Banner from "./views/admin/banner/Banner";
import EditMovie from "./views/admin/movie/EditMovie";
//---------- USER ROUTE ---------
export const UserRoutes = [
  {
    path: "/",
    component: Movies,
    layout: UserLayout,
  },
  {
    path: "/giftshop",
    component: GiftShop,
    layout: UserLayout,
  },
  {
    path: "/cinemas",
    component: Cinemas,
    layout: UserLayout,
  },
  {
    path: "/promotion",
    component: Promotion,
    layout: UserLayout,
  },
  {
    path: "/booking",
    component: Booking,
    layout: UserLayout,
  },
  {
    path: "/subbooking",
    component: SubBooking,
    layout: UserLayout,
  },
  {
    path: "/showtimes",
    component: Showtimes,
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
  { path: "/listmovie", component: MovieList, layout: AdminLayout },
  { path: "/staff", component: Staff, layout: AdminLayout },
  { path: "/feedback", component: Feedback, layout: AdminLayout },
  { path: "/movie/addmovie", component: AddNewMovie, layout: HeaderOnly },
  {
    path: "/movie/detailmovie/:id",
    component: DetailMovie,
    layout: HeaderOnly,
    isProtected: true,
  },
  { path: "/movie/editmovie/:id", component: EditMovie, layout: HeaderOnly },
  { path: "/banner", component: Banner, layout: AdminLayout },
];
