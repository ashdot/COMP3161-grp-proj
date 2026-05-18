// // // // // import { useState } from "react";
// // // // // import Authside from "./Authside";

// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Label } from "@/components/ui/label";
// // // // // import { Checkbox } from "@/components/ui/checkbox";
// // // // // import { Card, CardContent } from "@/components/ui/card";

// // // // // export default function Login() {
// // // // //   // const [showPw, setShowPw] = useState(false);

// // // // //   // return (
// // // // //   //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-purple-100 p-6">
// // // // //   //     <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-white">
// // // // //   //       <Authside />

// // // // //   //       <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
// // // // //   //         <h1 className="text-3xl font-bold mb-2">Login</h1>
// // // // //   //         <p className="text-sm text-gray-500 mb-6">
// // // // //   //           Welcome back! Please sign in.
// // // // //   //         </p>

// // // // //   //         <div className="space-y-4">
// // // // //   //           <Input placeholder="Username" />

// // // // //   //           <div className="relative">
// // // // //   //             <Input
// // // // //   //               type={showPw ? "text" : "password"}
// // // // //   //               placeholder="Password"
// // // // //   //             />

// // // // //   //             <button
// // // // //   //               type="button"
// // // // //   //               onClick={() => setShowPw(!showPw)}
// // // // //   //               className="absolute right-3 top-2.5 text-sm text-gray-500"
// // // // //   //             >
// // // // //   //               {showPw ? "Hide" : "Show"}
// // // // //   //             </button>
// // // // //   //           </div>

// // // // //   //           <div className="flex items-center justify-between text-sm">
// // // // //   //             <label className="flex items-center gap-2">
// // // // //   //               <Checkbox />
// // // // //   //               Remember me
// // // // //   //             </label>

// // // // //   //             <button className="text-sky-500">Forgot?</button>
// // // // //   //           </div>

// // // // //   //           <Button className="w-full">Login</Button>

// // // // //   //           <p className="text-center text-sm text-gray-500">
// // // // //   //             Don’t have an account?{" "}
// // // // //   //             <a href="/register" className="text-sky-500 font-medium">
// // // // //   //               Sign up
// // // // //   //             </a>
// // // // //   //           </p>
// // // // //   //         </div>
// // // // //   //       </div>
// // // // //   //     </div>
// // // // //   //   </div>
// // // // //   // );



// // // // //     const [showPw, setShowPw] = useState(false);
// // // // //   const [remember, setRemember] = useState(true);

// // // // //   return (
// // // // //     <div className="flex flex-1 flex-col justify-center px-10 py-10">
// // // // //       <h1 className="font-['Playfair_Display'] mb-1.5 text-[34px] font-extrabold text-slate-900">
// // // // //         Login
// // // // //       </h1>
// // // // //       <p className="font-['DM_Sans'] mb-7 text-[13.5px] text-slate-500">
// // // // //         Welcome back! Please login to your account.
// // // // //       </p>

// // // // //       {/* Username */}
// // // // //       <div className="mb-4 space-y-1.5">
// // // // //         <Label
// // // // //           htmlFor="username"
// // // // //           className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// // // // //         >
// // // // //           Username
// // // // //         </Label>
// // // // //         <Input
// // // // //           id="username"
// // // // //           type="text"
// // // // //           className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 text-sm focus-visible:ring-sky-400"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Password */}
// // // // //       <div className="mb-4 space-y-1.5">
// // // // //         <Label
// // // // //           htmlFor="password"
// // // // //           className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// // // // //         >
// // // // //           Password
// // // // //         </Label>
// // // // //         <div className="relative">
// // // // //           <Input
// // // // //             id="password"
// // // // //             type={showPw ? "text" : "password"}
// // // // //             defaultValue="••••••••••••"
// // // // //             className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 pr-10 text-sm focus-visible:ring-sky-400"
// // // // //           />
// // // // //           <Button
// // // // //             type="button"
// // // // //             variant="ghost"
// // // // //             size="icon"
// // // // //             onClick={() => setShowPw((v) => !v)}
// // // // //             aria-label={showPw ? "Hide password" : "Show password"}
// // // // //             className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-slate-400 hover:text-slate-600"
// // // // //           >
// // // // //             {showPw ? (
// // // // //               <EyeOff className="h-4 w-4" />
// // // // //             ) : (
// // // // //               <Eye className="h-4 w-4" />
// // // // //             )}
// // // // //           </Button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Remember me + Forgot password */}
// // // // //       <div className="mb-6 flex items-center justify-between">
// // // // //         <div className="flex items-center gap-2">
// // // // //           <Checkbox
// // // // //             id="remember"
// // // // //             checked={remember}
// // // // //             onCheckedChange={(v) => setRemember(Boolean(v))}
// // // // //             className="rounded-full border-slate-300 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-400"
// // // // //           />
// // // // //           <Label
// // // // //             htmlFor="remember"
// // // // //             className="font-['DM_Sans'] cursor-pointer text-[13.5px] text-slate-600"
// // // // //           >
// // // // //             Remember me
// // // // //           </Label>
// // // // //         </div>
// // // // //         <Button
// // // // //           type="button"
// // // // //           variant="link"
// // // // //           className="font-['DM_Sans'] h-auto p-0 text-[13.5px] text-slate-400 hover:text-slate-600"
// // // // //         >
// // // // //           Forgot password?
// // // // //         </Button>
// // // // //       </div>

// // // // //       {/* Submit */}
// // // // //       <Button
// // // // //         type="button"
// // // // //         className="font-['DM_Sans'] h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90"
// // // // //       >
// // // // //         Login
// // // // //       </Button>

// // // // //       <p className="font-['DM_Sans'] mt-5 text-center text-[13.5px] text-slate-400">
// // // // //         Don&apos;t have an account?{" "}
// // // // //         <Button
// // // // //           type="button"
// // // // //           variant="link"
// // // // //           onClick={onSwitch}
// // // // //           className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
// // // // //         >
// // // // //           Sign up
// // // // //         </Button>
// // // // //       </p>
// // // // //     </div>
// // // // //   );
// // // // // // 

// // // // // }

// // // // import { useState } from "react";
// // // // import { Eye, EyeOff } from "lucide-react";
// // // // import { useNavigate } from "react-router-dom";

// // // // import Authside from "./Authside";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Label } from "@/components/ui/label";
// // // // import { Checkbox } from "@/components/ui/checkbox";
// // // // import { Card, CardContent } from "@/components/ui/card";

// // // // export default function Login() {
// // // //   const navigate = useNavigate();

// // // //   const [showPw, setShowPw] = useState(false);
// // // //   const [remember, setRemember] = useState(true);
// // // //   const [username, setUsername] = useState("");
// // // //   const [password, setPassword] = useState("");

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     // TODO: wire up your auth logic here
// // // //     console.log({ username, password, remember });
// // // //   };

// // // //   return (
// // // //     <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 via-slate-50 to-violet-100 p-4 md:p-6">
// // // //       <Card
// // // //         className="flex w-full max-w-[860px] overflow-hidden rounded-2xl border-0 shadow-[0_8px_48px_rgba(15,23,42,0.13)]"
// // // //         style={{ minHeight: 500 }}
// // // //       >
// // // //         <CardContent className="flex w-full p-0">
// // // //           {/* Left panel */}
// // // //           <Authside />

// // // //           {/* Right form panel */}
// // // //           <div className="flex flex-1 flex-col justify-center px-10 py-10">
// // // //             <h1 className="font-['Playfair_Display'] mb-1.5 text-[34px] font-extrabold text-slate-900">
// // // //               Login
// // // //             </h1>
// // // //             <p className="font-['DM_Sans'] mb-7 text-[13.5px] text-slate-500">
// // // //               Welcome back! Please login to your account.
// // // //             </p>

// // // //             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
// // // //               {/* Username */}
// // // //               <div className="space-y-1.5">
// // // //                 <Label
// // // //                   htmlFor="username"
// // // //                   className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// // // //                 >
// // // //                   Username
// // // //                 </Label>
// // // //                 <Input
// // // //                   id="username"
// // // //                   type="text"
// // // //                   placeholder="Enter your username"
// // // //                   value={username}
// // // //                   onChange={(e) => setUsername(e.target.value)}
// // // //                   className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 text-sm focus-visible:ring-sky-400"
// // // //                 />
// // // //               </div>

// // // //               {/* Password */}
// // // //               <div className="space-y-1.5">
// // // //                 <Label
// // // //                   htmlFor="password"
// // // //                   className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// // // //                 >
// // // //                   Password
// // // //                 </Label>
// // // //                 <div className="relative">
// // // //                   <Input
// // // //                     id="password"
// // // //                     type={showPw ? "text" : "password"}
// // // //                     placeholder="Enter your password"
// // // //                     value={password}
// // // //                     onChange={(e) => setPassword(e.target.value)}
// // // //                     className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 pr-10 text-sm focus-visible:ring-sky-400"
// // // //                   />
// // // //                   <Button
// // // //                     type="button"
// // // //                     variant="ghost"
// // // //                     size="icon"
// // // //                     onClick={() => setShowPw((v) => !v)}
// // // //                     aria-label={showPw ? "Hide password" : "Show password"}
// // // //                     className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-slate-400 hover:text-slate-600"
// // // //                   >
// // // //                     {showPw ? (
// // // //                       <EyeOff className="h-4 w-4" />
// // // //                     ) : (
// // // //                       <Eye className="h-4 w-4" />
// // // //                     )}
// // // //                   </Button>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Remember me + Forgot password */}
// // // //               <div className="flex items-center justify-between">
// // // //                 <div className="flex items-center gap-2">
// // // //                   <Checkbox
// // // //                     id="remember"
// // // //                     checked={remember}
// // // //                     onCheckedChange={(v) => setRemember(Boolean(v))}
// // // //                     className="rounded-full border-slate-300 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-400"
// // // //                   />
// // // //                   <Label
// // // //                     htmlFor="remember"
// // // //                     className="font-['DM_Sans'] cursor-pointer text-[13.5px] text-slate-600"
// // // //                   >
// // // //                     Remember me
// // // //                   </Label>
// // // //                 </div>
// // // //                 <Button
// // // //                   type="button"
// // // //                   variant="link"
// // // //                   className="font-['DM_Sans'] h-auto p-0 text-[13.5px] text-slate-400 hover:text-slate-600"
// // // //                 >
// // // //                   Forgot password?
// // // //                 </Button>
// // // //               </div>

// // // //               {/* Submit */}
// // // //               <Button
// // // //                 type="submit"
// // // //                 className="font-['DM_Sans'] mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90"
// // // //               >
// // // //                 Login
// // // //               </Button>
// // // //             </form>

// // // //             <p className="font-['DM_Sans'] mt-5 text-center text-[13.5px] text-slate-400">
// // // //               Don&apos;t have an account?{" "}
// // // //               <Button
// // // //                 type="button"
// // // //                 variant="link"
// // // //                 onClick={() => navigate("/register")}
// // // //                 className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
// // // //               >
// // // //                 Sign up
// // // //               </Button>
// // // //             </p>
// // // //           </div>
// // // //         </CardContent>
// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from "react";
// // // import { Eye, EyeOff } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";

// // // import Authside from "./Authside";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Checkbox } from "@/components/ui/checkbox";

// // // export default function Login() {
// // //   const navigate = useNavigate();

// // //   const [showPw, setShowPw] = useState(false);
// // //   const [remember, setRemember] = useState(true);
// // //   const [username, setUsername] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     // TODO: wire up your auth logic here
// // //     console.log({ username, password, remember });
// // //   };

// // //   return (
// // //     <div className="flex h-screen w-screen overflow-hidden bg-white">
// // //       {/* Left — full screen image */}
// // //       <Authside />

// // //       {/* Right — form panel */}
// // //       <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-white px-8 py-12 lg:w-1/2">
// // //         <div className="w-full max-w-[400px]">
// // //           <h1 className="font-['Playfair_Display'] mb-1.5 text-[34px] font-extrabold text-slate-900">
// // //             Login
// // //           </h1>
// // //           <p className="font-['DM_Sans'] mb-8 text-[13.5px] text-slate-500">
// // //             Welcome back! Please login to your account.
// // //           </p>

// // //           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
// // //             {/* Username */}
// // //             <div className="space-y-1.5">
// // //               <Label
// // //                 htmlFor="username"
// // //                 className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// // //               >
// // //                 Username
// // //               </Label>
// // //               <Input
// // //                 id="username"
// // //                 type="text"
// // //                 placeholder="Enter your username"
// // //                 value={username}
// // //                 onChange={(e) => setUsername(e.target.value)}
// // //                 className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
// // //               />
// // //             </div>

// // //             {/* Password */}
// // //             <div className="space-y-1.5">
// // //               <Label
// // //                 htmlFor="password"
// // //                 className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// // //               >
// // //                 Password
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="password"
// // //                   type={showPw ? "text" : "password"}
// // //                   placeholder="Enter your password"
// // //                   value={password}
// // //                   onChange={(e) => setPassword(e.target.value)}
// // //                   className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 pr-11 text-sm focus-visible:ring-sky-400"
// // //                 />
// // //                 <Button
// // //                   type="button"
// // //                   variant="ghost"
// // //                   size="icon"
// // //                   onClick={() => setShowPw((v) => !v)}
// // //                   aria-label={showPw ? "Hide password" : "Show password"}
// // //                   className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600"

// // //                 >
// // //                   {showPw ? (
// // //                     <EyeOff className="h-4 w-4" />
// // //                   ) : (
// // //                     <Eye className="h-4 w-4" />
// // //                   )}
// // //                 </Button>
// // //               </div>
// // //             </div>

// // //             {/* Remember me + Forgot password */}
// // //             <div className="flex items-center justify-between">
// // //               <div className="flex items-center gap-2">
// // //                 <Checkbox
// // //                   id="remember"
// // //                   checked={remember}
// // //                   onCheckedChange={(v) => setRemember(Boolean(v))}
// // //                   className="rounded-full border-slate-300 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-400"
// // //                 />
// // //                 <Label
// // //                   htmlFor="remember"
// // //                   className="font-['DM_Sans'] cursor-pointer text-[13.5px] text-slate-600"
// // //                 >
// // //                   Remember me
// // //                 </Label>
// // //               </div>
// // //               <Button
// // //                 type="button"
// // //                 variant="link"
// // //                 className="font-['DM_Sans'] h-auto p-0 text-[13.5px] text-slate-400 hover:text-slate-700"
// // //               >
// // //                 Forgot password?
// // //               </Button>
// // //             </div>

// // //             {/* Submit */}
// // //             <Button
// // //               type="submit"
// // //               className="font-['DM_Sans'] h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90"
// // //             >
// // //               Login
// // //             </Button>
// // //           </form>

// // //           <p className="font-['DM_Sans'] mt-6 text-center text-[13.5px] text-slate-400">
// // //             Don&apos;t have an account?{" "}
// // //             <Button
// // //               type="button"
// // //               variant="link"
// // //               onClick={() => navigate("/register")}
// // //               className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
// // //             >
// // //               Sign up
// // //             </Button>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useState } from "react";
// // import { Eye, EyeOff } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // import Authside from "./Authside";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { loginUser } from "@/api";

// // export default function Login() {
// //   const navigate = useNavigate();

// //   const [showPw, setShowPw] = useState(false);
// //   const [remember, setRemember] = useState(true);
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);

// //     const result = await loginUser(email, password);

// //     setLoading(false);

// //     if (result.message === "Login successful") {
// //       // Store user info so other pages can access it
// //       if (remember) {
// //         localStorage.setItem("user", JSON.stringify(result.user));
// //       } else {
// //         sessionStorage.setItem("user", JSON.stringify(result.user));
// //       }

// //       // Redirect based on role
// //       const role = result.user.accessLvl;
// //       if (role === "admin") navigate("/dashboard/admin");
// //       else if (role === "lecturer") navigate("/dashboard/lecturer");
// //       else navigate("/dashboard/student");
// //     } else {
// //       setError(result.error || "Invalid credentials. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen w-screen overflow-hidden bg-white">
// //       {/* Left — full screen image */}
// //       <Authside />

// //       {/* Right — form panel */}
// //       <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-white px-8 py-12 lg:w-1/2">
// //         <div className="w-full max-w-[400px]">
// //           <h1 className="font-['Playfair_Display'] mb-1.5 text-[34px] font-extrabold text-slate-900">
// //             Login
// //           </h1>
// //           <p className="font-['DM_Sans'] mb-8 text-[13.5px] text-slate-500">
// //             Welcome back! Please login to your account.
// //           </p>

// //           {/* Error banner */}
// //           {error && (
// //             <div className="font-['DM_Sans'] mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[13.5px] text-red-600">
// //               {error}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
// //             {/* Email — your Flask API uses email, not username */}
// //             <div className="space-y-1.5">
// //               <Label
// //                 htmlFor="email"
// //                 className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// //               >
// //                 Email
// //               </Label>
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="Enter your email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //                 className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
// //               />
// //             </div>

// //             {/* Password */}
// //             <div className="space-y-1.5">
// //               <Label
// //                 htmlFor="password"
// //                 className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// //               >
// //                 Password
// //               </Label>
// //               <div className="relative">
// //                 <Input
// //                   id="password"
// //                   type={showPw ? "text" : "password"}
// //                   placeholder="Enter your password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 pr-11 text-sm focus-visible:ring-sky-400"
// //                 />
// //                 <Button
// //                   type="button"
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={() => setShowPw((v) => !v)}
// //                   aria-label={showPw ? "Hide password" : "Show password"}
// //                   className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600"
// //                 >
// //                   {showPw ? (
// //                     <EyeOff className="h-4 w-4" />
// //                   ) : (
// //                     <Eye className="h-4 w-4" />
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>

// //             {/* Remember me + Forgot password */}
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-2">
// //                 <Checkbox
// //                   id="remember"
// //                   checked={remember}
// //                   onCheckedChange={(v) => setRemember(Boolean(v))}
// //                   className="rounded-full border-slate-300 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-400"
// //                 />
// //                 <Label
// //                   htmlFor="remember"
// //                   className="font-['DM_Sans'] cursor-pointer text-[13.5px] text-slate-600"
// //                 >
// //                   Remember me
// //                 </Label>
// //               </div>
// //               <Button
// //                 type="button"
// //                 variant="link"
// //                 className="font-['DM_Sans'] h-auto p-0 text-[13.5px] text-slate-400 hover:text-slate-700"
// //               >
// //                 Forgot password?
// //               </Button>
// //             </div>

// //             {/* Submit */}
// //             <Button
// //               type="submit"
// //               disabled={loading}
// //               className="font-['DM_Sans'] h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90 disabled:opacity-60"
// //             >
// //               {loading ? "Logging in..." : "Login"}
// //             </Button>
// //           </form>

// //           <p className="font-['DM_Sans'] mt-6 text-center text-[13.5px] text-slate-400">
// //             Don&apos;t have an account?{" "}
// //             <Button
// //               type="button"
// //               variant="link"
// //               onClick={() => navigate("/register")}
// //               className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
// //             >
// //               Sign up
// //             </Button>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // latest 
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import Authside from "./Authside";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { loginUser } from "@/api";

// export default function Login() {
//   const navigate = useNavigate();
//   const [showPw, setShowPw] = useState(false);
//   const [remember, setRemember] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const result = await loginUser(email, password);
//     setLoading(false);

//     if (result.status === 200) {
//       const storage = remember ? localStorage : sessionStorage;
//       // Store user object AND plaintext password (needed for Basic Auth on all future API calls)
//       storage.setItem("user", JSON.stringify({ ...result.user, email }));
//       storage.setItem("password", password);

//       const role = result.user.accessLvl;
//       if (role === "admin") navigate("/dashboard/admin");
//       else if (role === "lecturer") navigate("/dashboard/lecturer");
//       else navigate("/dashboard/student");
//     } else {
//       setError(result.error || "Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-white">
//       <Authside />

//       <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-white px-8 py-12 lg:w-1/2">
//         <div className="w-full max-w-[400px]">
//           <h1 className="font-['Playfair_Display'] mb-1.5 text-[34px] font-extrabold text-slate-900">
//             Login
//           </h1>
//           <p className="font-['DM_Sans'] mb-8 text-[13.5px] text-slate-500">
//             Welcome back! Please login to your account.
//           </p>

//           {error && (
//             <div className="font-['DM_Sans'] mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[13.5px] text-red-600">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <div className="space-y-1.5">
//               <Label htmlFor="email" className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <Label htmlFor="password" className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700">
//                 Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPw ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 pr-11 text-sm focus-visible:ring-sky-400"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setShowPw((v) => !v)}
//                   className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600"
//                 >
//                   {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </Button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   id="remember"
//                   checked={remember}
//                   onCheckedChange={(v) => setRemember(Boolean(v))}
//                   className="rounded-full border-slate-300 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-400"
//                 />
//                 <Label htmlFor="remember" className="font-['DM_Sans'] cursor-pointer text-[13.5px] text-slate-600">
//                   Remember me
//                 </Label>
//               </div>
//               <Button type="button" variant="link" className="font-['DM_Sans'] h-auto p-0 text-[13.5px] text-slate-400 hover:text-slate-700">
//                 Forgot password?
//               </Button>
//             </div>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="font-['DM_Sans'] h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90 disabled:opacity-60"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>

//           <p className="font-['DM_Sans'] mt-6 text-center text-[13.5px] text-slate-400">
//             Don&apos;t have an account?{" "}
//             <Button
//               type="button"
//               variant="link"
//               onClick={() => navigate("/register")}
//               className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
//             >
//               Sign up
//             </Button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// 3am
import { useState } from "react";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser } from "@/api";

export default function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await loginUser(email, password);
    setLoading(false);

    if (result.status === 200) {
      const store = remember ? localStorage : sessionStorage;
      store.setItem("user", JSON.stringify({ ...result.user, email }));
      store.setItem("password", password);

      const role = result.user.accessLvl;
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "lecturer") navigate("/dashboard/lecturer");
      else navigate("/dashboard/student");
    } else {
      setError(result.error || "Invalid credentials.");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Left panel */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-sky-500" />
        <div className="absolute left-8 top-8 z-10 flex items-center gap-3">
          <GraduationCap className="h-9 w-9 text-white drop-shadow" />
          <span className="font-['Playfair_Display'] text-[22px] font-bold text-white">StudEx</span>
        </div>
        <div className="absolute bottom-14 left-8 right-8 z-10">
          <h2 className="font-['Playfair_Display'] mb-3 text-[30px] font-black uppercase tracking-[4px] text-white">
            Welcome Back
          </h2>
          <p className="text-[14px] leading-relaxed text-white/80">
            Your virtual learning environment. Access courses, assignments, forums, and more.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-white px-8 py-12 lg:w-1/2">
        <div className="w-full max-w-[400px]">
          <h1 className="font-['Playfair_Display'] mb-1.5 text-[34px] font-extrabold text-slate-900">Login</h1>
          <p className="font-['DM_Sans'] mb-8 text-[13.5px] text-slate-500">
            Sign in to your account to continue.
          </p>

          {error && (
            <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[13.5px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[13.5px] font-semibold text-slate-700">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                className="h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-indigo-400" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[13.5px] font-semibold text-slate-700">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="Your password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="h-11 rounded-lg border-slate-200 bg-slate-50 pr-11 text-sm focus-visible:ring-indigo-400" />
                <Button type="button" variant="ghost" size="icon" onClick={() => setShowPw(v => !v)}
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={remember} onCheckedChange={v => setRemember(Boolean(v))}
                  className="border-slate-300 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500" />
                <Label htmlFor="remember" className="cursor-pointer text-[13.5px] text-slate-600">Remember me</Label>
              </div>
            </div>

            <Button type="submit" disabled={loading}
              className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-[15px] font-bold text-white disabled:opacity-60">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}