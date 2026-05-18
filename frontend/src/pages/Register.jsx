// // // import { useState } from "react";
// // // import Authside from "./Authside";

// // // import { Button } from "../components/ui/button";
// // // import { Input } from "../components/ui/input";

// // // export default function Register() {
// // //   const [showPw, setShowPw] = useState(false);

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-purple-100 p-6">
// // //       <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-white">
// // //         <Authside />

// // //         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
// // //           <h1 className="text-3xl font-bold mb-2">Create Account</h1>
// // //           <p className="text-sm text-gray-500 mb-6">
// // //             Sign up to get started.
// // //           </p>

// // //           <div className="space-y-4">
// // //             <div className="flex gap-3">
// // //               <Input placeholder="First name" />
// // //               <Input placeholder="Last name" />
// // //             </div>

// // //             <Input placeholder="Username" />
// // //             <Input placeholder="Email" />

// // //             <div className="relative">
// // //               <Input
// // //                 type={showPw ? "text" : "password"}
// // //                 placeholder="Password"
// // //               />

// // //               <button
// // //                 type="button"
// // //                 onClick={() => setShowPw(!showPw)}
// // //                 className="absolute right-3 top-2.5 text-sm text-gray-500"
// // //               >
// // //                 {showPw ? "Hide" : "Show"}
// // //               </button>
// // //             </div>

// // //             <Button className="w-full">Create account</Button>

// // //             <p className="text-center text-sm text-gray-500">
// // //               Already have an account?{" "}
// // //               <a href="/login" className="text-sky-500 font-medium">
// // //                 Login
// // //               </a>
// // //             </p>
// // //           </div>
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
// // import { Card, CardContent } from "@/components/ui/card";

// // export default function Register() {
// //   const navigate = useNavigate();

// //   const [showPw, setShowPw] = useState(false);
// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     username: "",
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e) => {
// //     setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // TODO: wire up your registration logic here
// //     console.log(form);
// //   };

// //   return (
// //     <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 via-slate-50 to-violet-100 p-4 md:p-6">
// //       <Card
// //         className="flex w-full max-w-[860px] overflow-hidden rounded-2xl border-0 shadow-[0_8px_48px_rgba(15,23,42,0.13)]"
// //         style={{ minHeight: 540 }}
// //       >
// //         <CardContent className="flex w-full p-0">
// //           {/* Left panel */}
// //           <Authside />

// //           {/* Right form panel */}
// //           <div className="flex flex-1 flex-col justify-center px-10 py-8">
// //             <h1 className="font-['Playfair_Display'] mb-1.5 text-[30px] font-extrabold text-slate-900">
// //               Create an Account
// //             </h1>
// //             <p className="font-['DM_Sans'] mb-5 text-[13.5px] leading-relaxed text-slate-500">
// //               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// //               Pellentesque a libero sit amet enim mollis vehicula luctus et
// //               nisl.
// //             </p>

// //             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
// //               {/* First + Last name */}
// //               <div className="grid grid-cols-2 gap-3.5">
// //                 <div className="space-y-1.5">
// //                   <Label
// //                     htmlFor="firstName"
// //                     className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// //                   >
// //                     First Name
// //                   </Label>
// //                   <Input
// //                     id="firstName"
// //                     type="text"
// //                     placeholder="John"
// //                     value={form.firstName}
// //                     onChange={handleChange}
// //                     className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 text-sm focus-visible:ring-sky-400"
// //                   />
// //                 </div>
// //                 <div className="space-y-1.5">
// //                   <Label
// //                     htmlFor="lastName"
// //                     className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// //                   >
// //                     Last Name
// //                   </Label>
// //                   <Input
// //                     id="lastName"
// //                     type="text"
// //                     placeholder="Doe"
// //                     value={form.lastName}
// //                     onChange={handleChange}
// //                     className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 text-sm focus-visible:ring-sky-400"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Username */}
// //               <div className="space-y-1.5">
// //                 <Label
// //                   htmlFor="username"
// //                   className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// //                 >
// //                   Username
// //                 </Label>
// //                 <Input
// //                   id="username"
// //                   type="text"
// //                   placeholder="johndoe123"
// //                   value={form.username}
// //                   onChange={handleChange}
// //                   className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 text-sm focus-visible:ring-sky-400"
// //                 />
// //               </div>

// //               {/* Email */}
// //               <div className="space-y-1.5">
// //                 <Label
// //                   htmlFor="email"
// //                   className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// //                 >
// //                   Email
// //                 </Label>
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   placeholder="john@example.com"
// //                   value={form.email}
// //                   onChange={handleChange}
// //                   className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 text-sm focus-visible:ring-sky-400"
// //                 />
// //               </div>

// //               {/* Password */}
// //               <div className="space-y-1.5">
// //                 <Label
// //                   htmlFor="password"
// //                   className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
// //                 >
// //                   Password
// //                 </Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="password"
// //                     type={showPw ? "text" : "password"}
// //                     placeholder="Create a password"
// //                     value={form.password}
// //                     onChange={handleChange}
// //                     className="font-['DM_Sans'] h-10 rounded-lg border-slate-200 pr-10 text-sm focus-visible:ring-sky-400"
// //                   />
// //                   <Button
// //                     type="button"
// //                     variant="ghost"
// //                     size="icon"
// //                     onClick={() => setShowPw((v) => !v)}
// //                     aria-label={showPw ? "Hide password" : "Show password"}
// //                     className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-slate-400 hover:text-slate-600"
// //                   >
// //                     {showPw ? (
// //                       <EyeOff className="h-4 w-4" />
// //                     ) : (
// //                       <Eye className="h-4 w-4" />
// //                     )}
// //                   </Button>
// //                 </div>
// //               </div>

// //               {/* Submit */}
// //               <Button
// //                 type="submit"
// //                 className="font-['DM_Sans'] mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90"
// //               >
// //                 Create account
// //               </Button>
// //             </form>

// //             <p className="font-['DM_Sans'] mt-4 text-center text-[13.5px] text-slate-400">
// //               Already have an account?{" "}
// //               <Button
// //                 type="button"
// //                 variant="link"
// //                 onClick={() => navigate("/login")}
// //                 className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
// //               >
// //                 Login
// //               </Button>
// //             </p>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }



// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import Authside from "./Authside";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function Register() {
//   const navigate = useNavigate();

//   const [showPw, setShowPw] = useState(false);
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: wire up your registration logic here
//     console.log(form);
//   };

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-white">
//       {/* Left — full screen image */}
//       <Authside />

//       {/* Right — form panel */}
//       <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-white px-8 py-12 lg:w-1/2">
//         <div className="w-full max-w-[400px]">
//           <h1 className="font-['Playfair_Display'] mb-1.5 text-[30px] font-extrabold text-slate-900">
//             Create an Account
//           </h1>
//           <p className="font-['DM_Sans'] mb-7 text-[13.5px] leading-relaxed text-slate-500">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             Pellentesque a libero sit amet enim mollis vehicula luctus et nisl.
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             {/* First + Last name */}
//             <div className="grid grid-cols-2 gap-3">
//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="firstName"
//                   className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
//                 >
//                   First Name
//                 </Label>
//                 <Input
//                   id="firstName"
//                   type="text"
//                   placeholder="John"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="lastName"
//                   className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
//                 >
//                   Last Name
//                 </Label>
//                 <Input
//                   id="lastName"
//                   type="text"
//                   placeholder="Doe"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
//                 />
//               </div>
//             </div>

//             {/* Username */}
//             <div className="space-y-1.5">
//               <Label
//                 htmlFor="username"
//                 className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
//               >
//                 Username
//               </Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="johndoe123"
//                 value={form.username}
//                 onChange={handleChange}
//                 className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
//               />
//             </div>

//             {/* Email */}
//             <div className="space-y-1.5">
//               <Label
//                 htmlFor="email"
//                 className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
//               >
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="john@example.com"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-1.5">
//               <Label
//                 htmlFor="password"
//                 className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700"
//               >
//                 Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPw ? "text" : "password"}
//                   placeholder="Create a password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 pr-11 text-sm focus-visible:ring-sky-400"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setShowPw((v) => !v)}
//                   aria-label={showPw ? "Hide password" : "Show password"}
//                   className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600"
//                 >
//                   {showPw ? (
//                     <EyeOff className="h-2 w-2" />
//                   ) : (
//                     <Eye className="h-2 w-2" />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             {/* Submit */}
//             <Button
//               type="submit"
//               className="font-['DM_Sans'] mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90"
//             >
//               Create account
//             </Button>
//           </form>

//           <p className="font-['DM_Sans'] mt-5 text-center text-[13.5px] text-slate-400">
//             Already have an account?{" "}
//             <Button
//               type="button"
//               variant="link"
//               onClick={() => navigate("/login")}
//               className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
//             >
//               Login
//             </Button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Authside from "./Authside";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/api";

// ─── IMPORTANT ───────────────────────────────────────────────────────────────
// Your Flask /users/register requires Basic Auth from an ADMIN account.
// In a real app these would come from a login session, env vars, or a
// separate admin-only flow. For now, put your test admin credentials here.
const ADMIN_EMAIL = "diana.burgess_adm0@vle.uwi.edu";
const ADMIN_PASSWORD = "Admin@111000000";
// ─────────────────────────────────────────────────────────────────────────────

export default function Register() {
  const navigate = useNavigate();

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);  // holds the API success response
  const [error, setError] = useState(null);       // holds an error message string

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accessLvl: "student", // default role; change or add a dropdown if needed
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await registerUser(ADMIN_EMAIL, ADMIN_PASSWORD, {
      fname: form.firstName,
      lname: form.lastName,
      email: form.email,
      accessLvl: form.accessLvl,
    });

    setLoading(false);

    if (result.status === 201) {
      // Success — show the generated password returned by the API
      setSuccess(result);
    } else {
      // API returned an error message
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-white">
        <Authside />

        <div className="flex w-full flex-col items-center justify-center bg-white px-8 lg:w-1/2">
          <div className="w-full max-w-[400px] text-center">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-sky-500" />

            <h1 className="font-['Playfair_Display'] mb-2 text-[28px] font-extrabold text-slate-900">
              Account Created!
            </h1>
            <p className="font-['DM_Sans'] mb-6 text-[13.5px] text-slate-500">
              The account for{" "}
              <span className="font-semibold text-slate-700">
                {success.user.fname} {success.user.lname}
              </span>{" "}
              has been created successfully.
            </p>

            {/* Generated password box */}
            <div className="mb-6 rounded-xl border border-sky-100 bg-sky-50 px-6 py-4 text-left">
              <p className="font-['DM_Sans'] mb-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
                Generated Password
              </p>
              <p className="font-mono text-[22px] font-bold tracking-widest text-slate-800">
                {success.generatedPassword}
              </p>
              <p className="font-['DM_Sans'] mt-2 text-[12px] text-slate-400">
                Share this password with the user. They should change it after
                first login.
              </p>
            </div>

            {/* User details */}
            <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 px-6 py-4 text-left text-sm">
              <div className="font-['DM_Sans'] flex justify-between border-b border-slate-200 py-1.5">
                <span className="text-slate-400">User ID</span>
                <span className="font-semibold text-slate-700">{success.user.userID}</span>
              </div>
              <div className="font-['DM_Sans'] flex justify-between border-b border-slate-200 py-1.5">
                <span className="text-slate-400">Email</span>
                <span className="font-semibold text-slate-700">{success.user.email}</span>
              </div>
              <div className="font-['DM_Sans'] flex justify-between py-1.5">
                <span className="text-slate-400">Role</span>
                <span className="font-semibold capitalize text-slate-700">{success.user.accessLvl}</span>
              </div>
            </div>

            <Button
              onClick={() => navigate("/login")}
              className="font-['DM_Sans'] h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white"
            >
              Go to Login
            </Button>

            <button
              onClick={() => {
                setSuccess(null);
                setForm({ firstName: "", lastName: "", email: "", accessLvl: "student" });
              }}
              className="font-['DM_Sans'] mt-3 text-[13px] text-slate-400 underline hover:text-slate-600"
            >
              Register another user
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Register form ───────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Left — full screen image */}
      <Authside />

      {/* Right — form panel */}
      <div className="flex w-full flex-col items-center justify-center overflow-y-auto bg-white px-8 py-12 lg:w-1/2">
        <div className="w-full max-w-[400px]">
          <h1 className="font-['Playfair_Display'] mb-1.5 text-[30px] font-extrabold text-slate-900">
            Create an Account
          </h1>
          <p className="font-['DM_Sans'] mb-7 text-[13.5px] leading-relaxed text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque a libero sit amet enim mollis vehicula luctus et nisl.
          </p>

          {/* Error banner */}
          {error && (
            <div className="font-['DM_Sans'] mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[13.5px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="font-['DM_Sans'] h-11 rounded-lg border-slate-200 bg-slate-50 text-sm focus-visible:ring-sky-400"
              />
            </div>

            {/* Role selector */}
            <div className="space-y-1.5">
              <Label htmlFor="accessLvl" className="font-['DM_Sans'] text-[13.5px] font-semibold text-slate-700">
                Role
              </Label>
              <select
                id="accessLvl"
                value={form.accessLvl}
                onChange={handleChange}
                className="font-['DM_Sans'] h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="font-['DM_Sans'] mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-[15px] font-bold tracking-wide text-white shadow-[0_4px_18px_rgba(14,165,233,0.35)] transition-all hover:-translate-y-px hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="font-['DM_Sans'] mt-5 text-center text-[13.5px] text-slate-400">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/login")}
              className="font-['DM_Sans'] h-auto p-0 text-[13.5px] font-semibold text-sky-500 hover:text-sky-600"
            >
              Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

