import { useEffect, lazy, Suspense, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfile } from "./instance";
import SkeletonShape from "./SkeletonShape";
import { TProfileCard } from "./ProfileCard";

const ProfileCard = lazy(() => import("./ProfileCard"));

/**
 * @Penjelasan
 * kode dibawah ini akan menampilkan tampilan sederhana, hanya memiliki
 * button logout dan detail user, untuk data user di dapat dari hasil fetch API.
 * ada beberapa concern terkait re render yg terjadi ketika page ini di render pertama kali.
 * yaitu dalam penggunaan @useNavigate yg men trigger re render, namun hal tersebut dianggap wajar.
 * because changing the path means changing the view.
 * @reference issue
 * https://shallowdepth.online/posts/2022/04/why-usenavigate-hook-in-react-router-v6-triggers-waste-re-renders-and-how-to-solve-it/
 * namun re render sendiri tidak terjadi ketika kita menggunakan react-router-dom v5.
 
 * namun fokus kita tidak pada issue rerender melainkan penggunaan axios instance yg sangat membantu
 * dalam memanipulasi / memodifikasi request dan juga response ketika akan / setelah berkomunikasi dengan server.
 
 * penjelasan lebih detail silahkan ke halaman ./instance
 * */

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<TProfileCard>();

  const accToken = localStorage.getItem("access_token");
  const refToken = localStorage.getItem("refresh_token");

  useEffect(() => {
    const abortController = new AbortController();

    getProfile().then((response) => setProfile(response));

    // abort request when page unmount
    return () => abortController.abort();
  }, []);

  const onLogout = useCallback(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  if (!accToken && !refToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-semibold">My App</div>
          <button onClick={onLogout} className="text-white font-semibold">
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto py-8">
        <div className="bg-white p-8 rounded shadow-md">
          {profile?.name && (
            <Suspense fallback={<SkeletonShape />}>
              <ProfileCard {...profile} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
