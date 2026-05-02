import React, { useState } from "react";
import {
  User,
  Lock,
  Loader2,
  ArrowLeft,
  AlertCircle,
  LayoutDashboard,
  Eye,
  EyeOff,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import lightlogo from "../components/Assests/Darkmode.jpeg";
import darklogo from "../components/Assests/Lightmode.jpeg";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Login data:", data);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 text-blue-500/10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-current rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Company Logo & Name */}
        <div className="flex flex-col items-center mb-8 pt-2">
          <div className=" text-white dark:text-gray-900 shadow-lg mb-3">
            <img
              src={lightlogo}
              alt="Logo"
              className="w-20 h-15  dark:hidden"
            />
            <img
              src={darklogo}
              alt="Logo"
              className="w-20 h-15 hidden dark:block"
            />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase dark:text-white">
            Iot SmartHome
          </h1>
        </div>

        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your username to access your home
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 focus:ring-blue-500"} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all dark:text-white`}
                    placeholder="Enter your username"
                  />
                )}
              />
            </div>
            {errors.username && (
              <div className="flex items-center gap-1 text-red-500 text-xs ml-1 animate-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.username.message}</span>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 focus:ring-blue-500"} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all dark:text-white`}
                    placeholder="••••••••"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 text-red-500 text-xs ml-1 animate-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer group">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <input
                    {...field}
                    checked={value}
                    onChange={onChange}
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                )}
              />
              <span className="group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gray-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Validating...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
