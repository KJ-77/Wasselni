import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate age from birthdate string (YYYY-MM-DD format)
 */
export function calculateAge(birthdate: string): number {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Create a new user in the database via API
 */
export async function createUserInDatabase(userData: {
  id: string;
  full_name: string;
  gender: string;
  age: number;
  email: string;
  phone_number: string;
  address: string;
}): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL;

  const payload = {
    id: userData.id,
    full_name: userData.full_name,
    gender: userData.gender,
    age: userData.age,
    email: userData.email,
    phone_number: userData.phone_number,
    profile_picture: null,
    status: null,
    bio: null,
    address: userData.address,
  };

  const response = await fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create user in database: ${response.status} ${errorText}`);
  }
}
