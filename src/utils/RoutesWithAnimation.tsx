import { Route, Routes, useLocation } from "react-router-dom";
import { LandingPage } from "../pages/Landing";
import ProtectedRoute from "./ProtectedRoute";
import { Room } from "../pages/Room";
import { Auth } from "../pages/Auth";
import { Home } from "../pages/Home";
import { RoomInvite } from "../pages/RoomInvite";
import { Error } from "../pages/Error";
import { Waitlist } from "../pages/WaitlistPage";
import { InviteLinks } from "../pages/InviteLink";

export function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/waitlist" element={<Waitlist />} />

      <Route path="/signin" element={<Auth type="signin" />} />
      <Route path="/signup" element={<Auth type="signup" />} />
      <Route path="/invite/:id" element={<InviteLinks />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/room/:id" element={<Room />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join/:id" element={<RoomInvite />} />
      </Route>
    </Routes>
  );
}
