"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string; // Ignored in mock
    const grade = formData.get("grade") as string;
    const gender = formData.get("gender") as string;
    const dormitory = formData.get("dormitory") as string;

    signup({ email, grade, gender, dormitory });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-center">Create Account</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-72">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2.5 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2.5 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="grade" className="block mb-1 font-medium">
              Grade
            </label>
            <select
              id="grade"
              name="grade"
              required
              className="w-full p-2.5 border border-gray-300 rounded"
            >
              <option value="">Select Grade</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender" className="block mb-1 font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="w-full p-2.5 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="dormitory" className="block mb-1 font-medium">
              Dormitory Level
            </label>
            <input
              type="text"
              id="dormitory"
              name="dormitory"
              required
              className="w-full p-2.5 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold"
          >
            Create Account
          </button>
        </form>
        <div className="mt-5 text-center">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
