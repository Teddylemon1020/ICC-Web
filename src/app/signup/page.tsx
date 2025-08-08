"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { signupUser } from "@/store/asyncThunks/userThunks";
import { clearAuthError } from "@/store/slices/userSlice";

const SignUpStep1Form = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [localError, setLocalError] = useState("");
	const dispatch = useAppDispatch();
	const { authLoading, authError, isAuthenticated } = useAppSelector((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/home");
		}
	}, [isAuthenticated, router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError("");
		dispatch(clearAuthError());

		if (formData.password !== formData.confirmPassword) {
			setLocalError("Passwords do not match");
			return;
		}

		// Create normal account for all users
		try {
			await dispatch(signupUser(formData)).unwrap();
			router.push("/home");
		} catch {
			// Error is handled by Redux
		}
	};

	return (
		<div className="bg-white flex flex-col">
			<main className="flex-grow flex items-center justify-center px-4">
				<div className="max-w-md w-full mx-auto text-center">
					<div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
						<h1 className="text-4xl font-bold text-gray-900 mb-8">Create your account</h1>

						<form
							onSubmit={handleSubmit}
							className="space-y-5">
							{(authError || localError) && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{localError || authError}</div>}

							<div>
								<input
									type="text"
									name="username"
									placeholder="Username"
									value={formData.username}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 bg-green-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
								/>
							</div>

							<div>
								<input
									type="email"
									name="email"
									placeholder="Email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 bg-green-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
								/>
							</div>

							<div>
								<input
									type="password"
									name="password"
									placeholder="Password"
									value={formData.password}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 bg-green-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
								/>
							</div>

							<div>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
									value={formData.confirmPassword}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 bg-green-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
								/>
							</div>

							<button
								type="submit"
								disabled={authLoading}
								className="w-full bg-[#10B981] hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
								{authLoading ? "Creating Account..." : "Create Account"}
							</button>
						</form>

						<p className="mt-6 text-center text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								href="/login"
								className="font-medium text-emerald-600 hover:underline">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SignUpStep1Form;
