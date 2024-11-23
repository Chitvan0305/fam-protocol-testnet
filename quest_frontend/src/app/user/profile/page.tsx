"use client";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import ModalForm from "@/app/components/ModalForm";
import { fetchUserData } from "@/redux/reducer/authSlice";
import { Button, Chip } from "@nextui-org/react";
import type { Friend} from "@/types/types";
import UserTable from "@/app/components/table/userTable";
import TeleApp from "@/app/components/telegram";
import { TailSpinLoader } from "@/app/components/loader";
import axiosInstance from "@/utils/axios/axios";
import Link from "next/link";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "FAMPOINTS", uid: "fampoints" },
  { name: "XPS", uid: "xps" },
];

const Profile: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [earned, setEarned] = useState<number | null>(null);
  const [allFriends, setAllFriends] = useState<any>([]);

  const user: any = useSelector((state: RootState) => state.login.user);
  // console.log("user", user);

  const getFriendIds = (user: any) => {
    // Combine followers and following into a single array
    const allConnections = [
      ...(user?.followers || []),
      ...(user?.following || []),
    ];

    // Create a Set to remove duplicates
    const uniqueConnectionsSet = new Set(allConnections);

    // Convert the Set back to an array
    const uniqueFriendIds = Array.from(uniqueConnectionsSet);

    return uniqueFriendIds;
  };

  const friendsIds = getFriendIds(user);

  const getFriends = async () => {
    try {
      const response = await axiosInstance.post('/user/friends',friendsIds);
      // console.log(data)
      setAllFriends(response.data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEarnRewardsClicks = () => {
    if (earned === null) {
      const earnedAmount: number = 5000;
      setEarned(earnedAmount);
    } else {
      setEarned(null);
    }
  };

  const signupDiscord = async () => {
    const authUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`;
    window.open(authUrl, "_blank", "noopener,noreferrer");
  };
  const signupX = async () => {
    const authUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/twitter/auth`;
    window.open(authUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    dispatch(fetchUserData());
    getFriends();
  }, [dispatch]);

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <TailSpinLoader />
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-2 py-4">
        {/* user info */}
        <section className="w-full md:w-[90%] lg:w-[80%] mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start justify-center lg:justify-between lg:pt-20 mx-4 lg:mx-10">
            {/* user info */}
            <div className="lg:w-2/5 w-full">
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="bottom-trapezium w-40 h-40 flex justify-center items-center">
                  {user ? (
                    <img
                      src={user.image}
                      alt="avatar photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>

                <div className="lg:w-[16rem] flex lg:justify-start items-start mt-6 lg:mt-1">
                  <div className=" flex flex-col items-start ">
                    <div className="flex flex-col justify-center lg:justify-start items-start">
                      <div className="text-2xl font-famFont ">
                        {user?.displayName}
                      </div>
                      <div className="text-xl text-famPurple flex items-baseline justify-center lg:justify-start ">
                        {/* #{user?.rank} */}
                        <span>@</span>
                        <span className="font-famFont">
                          {user?.domain?.domainAddress}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center  justify-center lg:justify-start gap-1">
                        <div className="box1 right-trapezium  w-[2rem] h-[2rem] p-[1px] bg-zinc-800 ">
                          <a target="_blank" href={"https://x.com/fr_Ani5"}>
                            <svg
                              className="box2 right-trapezium p-2 bg-black "
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                            >
                              <path
                                d="M12.5736 2.125H14.7461L10.0003 7.52604L15.5834 14.875H11.2115L7.78815 10.4175L3.87035 14.875H1.69577L6.7724 9.09854L1.41669 2.125H5.89902L8.99444 6.19933L12.5736 2.125ZM11.8115 13.5802H13.0156L5.24452 3.35183H3.95252L11.8115 13.5802Z"
                                fill="white"
                              />
                            </svg>
                          </a>
                        </div>
                        <div className="box1 left-right-trapezium w-[2rem] h-[2rem] p-[1px] bg-zinc-800 ">
                          <a
                            href={"https://discord.gg/vASfWSV6"}
                            target="_blank"
                          >
                            <svg
                              className="box2 left-right-trapezium bg-black p-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                            >
                              <path
                                d="M13.6496 3.77537C12.7075 3.3362 11.6875 3.01745 10.625 2.83328C10.6157 2.83299 10.6064 2.83473 10.5978 2.83841C10.5893 2.84208 10.5816 2.84758 10.5754 2.85453C10.4479 3.08828 10.2991 3.39287 10.2 3.62662C9.07302 3.45662 7.92694 3.45662 6.79998 3.62662C6.70081 3.38578 6.55206 3.08828 6.41748 2.85453C6.4104 2.84037 6.38915 2.83328 6.3679 2.83328C5.3054 3.01745 4.29248 3.3362 3.34331 3.77537C3.33623 3.77537 3.32915 3.78245 3.32206 3.78953C1.3954 6.67245 0.864148 9.47745 1.12623 12.2541C1.12623 12.2683 1.13331 12.2825 1.14748 12.2895C2.42248 13.2245 3.6479 13.7912 4.85915 14.1666C4.8804 14.1737 4.90165 14.1666 4.90873 14.1525C5.19206 13.7629 5.44706 13.352 5.66665 12.92C5.68081 12.8916 5.66665 12.8633 5.63831 12.8562C5.23456 12.7004 4.85206 12.5162 4.47665 12.3037C4.44831 12.2895 4.44831 12.247 4.46956 12.2258C4.54748 12.1691 4.6254 12.1054 4.70331 12.0487C4.71748 12.0345 4.73873 12.0345 4.7529 12.0416C7.18956 13.1537 9.81748 13.1537 12.2258 12.0416C12.24 12.0345 12.2612 12.0345 12.2754 12.0487C12.3533 12.1125 12.4312 12.1691 12.5091 12.2329C12.5375 12.2541 12.5375 12.2966 12.5021 12.3108C12.1337 12.5304 11.7441 12.7075 11.3404 12.8633C11.3121 12.8704 11.305 12.9058 11.3121 12.927C11.5387 13.3591 11.7937 13.77 12.07 14.1595C12.0912 14.1666 12.1125 14.1737 12.1337 14.1666C13.3521 13.7912 14.5775 13.2245 15.8525 12.2895C15.8666 12.2825 15.8737 12.2683 15.8737 12.2541C16.1854 9.04537 15.3566 6.26162 13.6779 3.78953C13.6708 3.78245 13.6637 3.77537 13.6496 3.77537ZM6.03498 10.5612C5.3054 10.5612 4.69623 9.88828 4.69623 9.05953C4.69623 8.23078 5.29123 7.55787 6.03498 7.55787C6.78581 7.55787 7.38081 8.23787 7.37373 9.05953C7.37373 9.88828 6.77873 10.5612 6.03498 10.5612ZM10.9721 10.5612C10.2425 10.5612 9.63332 9.88828 9.63332 9.05953C9.63332 8.23078 10.2283 7.55787 10.9721 7.55787C11.7229 7.55787 12.3179 8.23787 12.3108 9.05953C12.3108 9.88828 11.7229 10.5612 10.9721 10.5612Z"
                                fill="#8C71FF"
                              />
                            </svg>
                          </a>
                        </div>
                        <div className="box1 left-trapezium w-[2rem] h-[2rem] p-[1px] bg-zinc-800 ">
                          <a
                            target="_blank"
                            href={"https://t.me/+8Cgy2Zu8y-U0MjVl"}
                          >
                            <svg
                              className="box2 left-trapezium p-2 bi bi-telegram bg-black "
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                            </svg>
                          </a>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start mt-4">
                {user && (
                  <div className="w-full">
                    <div className="w-full flex flex-col items-center md:items-start justify-center lg:justify-start">
                      <div className="flex justify-center items-center md:justify-start md:items-start gap-2 ">
                        <ModalForm />
                        <Link className="px-4 py-2 bg-famViolate rounded-md " href="/user/referral/dashboard" >Referral dashboard</Link>
                      </div>
                      <div className="flex flex-wrap justify-center md:justify-start items-center my-4 gap-2">
                          {!user?.teleInfo?.telegramId && (
                            <div className="mb-2">
                              <TeleApp />
                            </div>
                          )}
                          {!user?.discordInfo?.username && (
                            <div className="mb-2">
                              <Button
                                onClick={signupDiscord}
                                className="bg-[#c62df4] text-white px-2 py-0 text-md"
                              >
                                <span>connect </span>
                                <span>
                                  <i className="bi bi-discord"></i>
                                </span>
                              </Button>
                            </div>
                          )}
                          {!user?.twitterInfo?.username && (
                            <div className="mb-2">
                              <Button
                                variant="solid"
                                onClick={signupX}
                                className="bg-[#e6e6e6] text-black text-md"
                              >
                                <span>connect </span>
                                <span>
                                  <i className="bi bi-twitter-x"></i>
                                </span>
                              </Button>
                            </div>
                          )}
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start gap-3">
                        <button className="font-bold py-2 rounded-full text-center hover:text-[#FA00FF] ">
                          {user?.following?.length} following
                        </button>
                        <button className="font-bold py-2 rounded-full text-center hover:text-[#FA00FF] ">
                          {user?.followers?.length} followers
                        </button>
                      </div>
                    <div className="flex col gap-5 justify-center md:justify-start items-center">
                        <Chip
                          onClick={handleEarnRewardsClicks}
                          variant="bordered"
                          color="warning"
                          className="cursor-pointer border-2 px-4 py-2 mt-3"
                        >
                          {user?.rewards?.xp} Xps
                        </Chip>

                        <Chip
                          variant="solid"
                          color="warning"
                          className="cursor-pointer px-4 py-2 mt-3"
                        >
                         {user?.rewards?.coins} Fps
                        </Chip>
                      </div>
                      
                  </div>
                )}
              </div>
            </div>
            {/* badges */}
            <div className="lg:w-3/5 w-full font-famFont ">
              <div className="flex flex-col lg:justify-start justify-center lg:items-start items-center">
                  <div className="w-full  badgesBox">
                    <div className="w-full p-4 h-full innerbox2 ">
                      <svg
                        className="top-0 left-0 svg1"
                        style={{ strokeWidth: "1px", stroke: "#FA00FF" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="5"
                        height="4"
                        viewBox="0 0 5 4"
                        fill="none"
                      >
                        <path
                          d="M4.5 3.5L1 3.5L1 4.17371e-08"
                          stroke="#FA00FF"
                        />
                      </svg>
                      <svg
                        className="top-0 left-0 svg2"
                        style={{ strokeWidth: "1px", stroke: "#FA00FF" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="4"
                        height="5"
                        viewBox="0 0 4 5"
                        fill="none"
                      >
                        <path d="M0 4L3.5 4L3.5 0.5" stroke="#FA00FF" />
                      </svg>
                      {user?.badges?.length ? (
                        <div className="flex flex-wrap lg:justify-start justify-center items-center p-4">
                          {user.badges.map((data: any) => (
                            <div
                              key={data?.id}
                              className="p-2 rounded-md flex items-center text-white flex-col justify-center hover:text-white hover:bg-gray-500 cursor-pointer"
                            >
                              <div className="w-[2rem] h-[2rem] bottom-trapezium">
                                <img
                                  src={
                                    data?.imageUrl ||
                                    "https://i.pinimg.com/originals/88/ea/0a/88ea0a1c3c448867bb7133692c5c6682.png"
                                  }
                                  alt="badge photo"
                                  className="w-full h-full bg-cover object-cover"
                                />
                              </div>
                              <h1 className="font-medium">{data?.name}</h1>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="flex justify-center items-center p-4 hover:cursor-pointer"
                          onClick={() => router.push("/allcommunity")}
                        >
                          <div className=" rounded-lg p-6 text-center shadow-md">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-300">
                              No badges yet
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Complete quests and tasks to earn badges!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
        {/* friends  */}
        <section className="lg:w-[60%] w-full mx-auto sm:mt-8 ">
          <div className="flex items-center gap-2 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
            >
              <path
                d="M0.5 1H5.98652L14.5 10"
                stroke="#FA00FF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M5.5 5L10.5 10" stroke="#FA00FF" strokeLinecap="round" />
            </svg>

            <div className="listOfFriends font-famFont">
              People Followed You
            </div>
          </div>
          <div className="friendTable">
            <UserTable<Friend>
              data={allFriends}
              columns={columns}
              rowsPerPage={5}
              noData="No FamUser followed you yet"
            />
          </div>
        </section>
      </div>
    </>
  );
};
export default Profile;