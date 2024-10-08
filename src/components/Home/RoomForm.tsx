import { useState } from "react";
import { roomMetaType } from "../../types/roomTypes";
import { createRoom, joinRoom } from "../../api";
import { useNavigate } from "react-router-dom";

export enum roomType {
  JOIN,
  CREATE,
}
interface RoomFormProps {
  Room: { Room: roomType };
}
export function RoomForm({ Room }: RoomFormProps) {
  const [room, setRoomMeta] = useState<roomMetaType>({
    title: "",
    maxUsers: 0,
  });
  const [roomKey, setRoomKey] = useState("");
  const isJoin = Room.Room === roomType.JOIN;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Handle room creation or joining response
      const resp = isJoin ? await joinRoom(roomKey) : await createRoom(room);
      const roomId = resp.data.result.roomKey;
      navigate(`/room/${roomId}`);
      console.log("Form submitted:", resp);
    } catch (error) {
      console.error("Error while handling form submission:", error);
      // Handle error appropriately, e.g., display error message to user
    }
    // Add form submission logic here
  };
  return (
    <div className="form-container bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]  flex flex-col justify-center h-96 sm:h-screen ">
      <h2 className="text-2xl font-manrope font-bold mb-4">
        {isJoin ? "Join a Room " : "Create a Room"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className=" flex  flex-col justify-center  items-center"
      >
        <div className="mb-4  flex flex-col text-start justify-center w-56">
          <label className="block font-manrope dark:text-neutral-200 text-gray-700">
            {isJoin ? "Enter Room Key" : "Room Name"}
          </label>
          <input
            type="text"
            onChange={(e) =>
              isJoin
                ? setRoomKey(e.target.value)
                : setRoomMeta((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
            }
            className="mt-1 p-2 py-2 placeholder:text-sm placeholder:font-manrope block border rounded-md outline-none focus:border-green-300 dark:bg-[#222222]"
            placeholder={isJoin ? "paste your key here" : "eg:homies,theatre"}
          />
          {isJoin ? null : (
            <>
              <label className="block dark:text-neutral-200 text-gray-700">
                Enter member limit
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setRoomMeta((prevState) => ({
                    ...prevState,
                    maxUsers: parseInt(e.target.value),
                  }))
                }
                className="mt-1 p-2 py-2 placeholder:text-sm placeholder:font-manrope block border rounded-md outline-none focus:border-green-300 dark:bg-[#222222]"
                placeholder="Enter number"
              />
            </>
          )}
        </div>
        <button
          type="submit"
          className="bg-black dark:bg-white font-manrope font-semibold dark:text-black text-white p-2 px-3 rounded-md"
        >
          {isJoin ? "Join Room" : "Create Room"}
        </button>
      </form>
    </div>
  );
}
