import React, { useState } from 'react';
import { Mail, Lock, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = (data) => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      console.log('Login data:', data);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-10 mt-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your home</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: "Email is required", 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <input 
                    {...field}
                    type="email" 
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all dark:text-white`}
                    placeholder="you@example.com"
                  />
                )}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 text-red-500 text-xs ml-1 animate-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required", minLength: { value: 6, message: "Must be at least 6 characters" } }}
                render={({ field }) => (
                  <input 
                    {...field}
                    type="password" 
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all dark:text-white`}
                    placeholder="••••••••"
                  />
                )}
              />
            </div>
            {errors.password && (
               <div className="flex items-center gap-1 text-red-500 text-xs ml-1 animate-in slide-in-from-top-1">
                 <AlertCircle className="w-3 h-3" />
                 <span>{errors.password.message}</span>
               </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
             <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer">
               <Controller
                 name="rememberMe"
                 control={control}
                 render={({ field: { value, onChange, ...field } }) => (
                   <input 
                    {...field}
                    checked={value}
                    onChange={onChange}
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                   />
                 )}
               />
               Remember me
             </label>
             <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
               Forgot password?
             </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gray-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Don't have an account? <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;