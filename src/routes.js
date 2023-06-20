import UserLayout from './layouts/UserLayout'
// ---------- USER ----------
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import GiftShop from "./views/user/giftshop/GiftShop";
import Cinemas from "./views/user/cinemas/Cinemas";
import Movies from "./views/user/movies/Movies";
import Promotion from "./views/user/promotion/Promotion";
import Booking from "./views/user/booking/Booking";
import SubBooking from "./views/user/booking/SubBooking";
import Showtimes from "./views/user/booking/Showtimes";
// ---------- ADMIN ----------
// import HeaderOnly from "./layouts/HeaderOnly";
// import AdminLayout from "./layouts/AdminLayout";
// import MovieList from "./././views/movie/MovieList";
// import Dashboard from "./././views/dashboard/Dashboard";
// import Staff from "./././views/staff/StaffManagement";
// import Feedback from "./././views/feedback/Feedback";
// import AddNewMovie from "./././views/movie/AddNewMovie";
// import DetailMovie from "./././views/movie/DetailMovie";
// import Banner from "./././views/banner/Banner";

//---------- USER ROUTE ---------
export const UserRoutes =[
    {
        path:'signup',
        component:SignUp,
        layout:UserLayout
    },
    {
        path:'signin',
        component:SignIn,
        layout:UserLayout
    },
    {
        path: '/',
        component:Movies,
        layout:UserLayout
    },
    {
        path:'/giftshop',
        component:GiftShop,
        layout:UserLayout
    },
    {
        path:'/cinemas',
        component:Cinemas,
        layout:UserLayout
    },
    {
        path:'/promotion',
        component:Promotion,
        layout:UserLayout
    },
    {
        path:'/booking',
        component:Booking,
        layout:UserLayout
    },
    {
        path:'/subbooking',
        component:SubBooking,
        layout:UserLayout
    },
    {
        path:'/showtimes',
        component:Showtimes,
        layout:UserLayout
    },
]

//---------- ADMIN ROUTE ---------
