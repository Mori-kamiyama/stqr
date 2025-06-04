"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Mock signup logic
    console.log("Signup attempt");
    // In a real app, you'd call your auth context signup function here
    // For now, we'll just redirect to a placeholder dashboard
    router.push("/dashboard");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Create Account</h1>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="grade" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Grade</label>
            <select
              id="grade"
              name="grade"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Select Grade</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Gender</label>
            <select
              id="gender"
              name="gender"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="dormitory" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Dormitory Level</label>
            <input
              type="text"
              id="dormitory"
              name="dormitory"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: '10px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Create Account
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>
            Already have an account?{" "}
            <Link href="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
