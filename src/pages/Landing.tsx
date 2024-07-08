import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.name) {
      navigate("/home");
    }
  }, []);

  return (
    <div className=" flex justify-center font-manrope  min-h-screen  ">
      <div className=" flex flex-col justify-center">
        <div className=" text-7xl font-bold  ">
          hi there ,<br />
          welcome to synclistener.
        </div>
        <div className=" p-5 text-lg ">
          {/* a simple voice room where you can listen to music together with sync. */}
          Sync and enjoy music together in a simple voice room
        </div>
      </div>
    </div>
  );
}
