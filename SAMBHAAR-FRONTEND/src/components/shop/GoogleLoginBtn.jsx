import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../util/baseURL";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {

      const credential = credentialResponse.credential;
        
        
      const res = await fetch(
        `${getBaseUrl()}/api/auth/google/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential }),
        }
      );
  

      const data = await res.json();

      if (data.user && data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setUser({ user: data.user })); 
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error(data.error || "Missing user or token in response");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Login Failed")}
      />
    </div>
  );
};

export default GoogleLoginButton;
