import { auth } from '@/firebase.js'
import { updateProfile as firebaseUpdateProfile } from 'firebase/auth'

export const extractPhotoURL = (firebaseUser: any): string => {
  if (!firebaseUser) return ''
  if (firebaseUser.photoURL) return firebaseUser.photoURL
  if (Array.isArray(firebaseUser.providerData)) {
    for (const provider of firebaseUser.providerData) {
      if (provider && provider.photoURL) {
        return provider.photoURL
      }
    }
  }
  return ''
}

export interface UserProfileData {
  email: string
  full_name?: string
  role?: string
  department?: string
  first_name?: string
  last_name?: string
  phone?: string
  bio?: string
  facebook?: string
  x?: string
  linkedin?: string
  instagram?: string
  country?: string
  city_state?: string
  postal_code?: string
  tax_id?: string
  photo_url?: string
  custom_metadata?: Record<string, any>
}

const API_BASE = 'http://localhost:8000/api/v1/users'

export class UserService {
  /**
   * Fetches user profile from Neon PostgreSQL backend by email.
   */
  static async fetchUserProfile(email: string): Promise<UserProfileData | null> {
    try {
      const response = await fetch(`${API_BASE}/by-email/${encodeURIComponent(email)}`)
      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error(`Server returned status ${response.status}`)
      }
      const data = await response.json()
      const meta = data.custom_metadata || {}

      return {
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        department: data.department,
        first_name: data.first_name || meta.first_name || data.full_name?.split(' ')[0] || '',
        last_name: data.last_name || meta.last_name || data.full_name?.split(' ').slice(1).join(' ') || '',
        phone: data.phone || meta.phone || '+09 363 398 46',
        bio: data.bio || meta.bio || 'Team Manager',
        facebook: data.facebook || meta.facebook || 'https://www.facebook.com/PimjoHQ',
        x: data.x_link || meta.x || 'https://x.com/PimjoHQ',
        linkedin: data.linkedin || meta.linkedin || 'https://www.linkedin.com/company/pimjo/posts/?feedView=all',
        instagram: data.instagram || meta.instagram || 'https://instagram.com/PimjoHQ',
        country: data.country || meta.country || 'United States',
        city_state: data.city_state || meta.city_state || 'Phoenix, Arizona, United States',
        postal_code: data.postal_code || meta.postal_code || 'ERT 2489',
        tax_id: data.tax_id || meta.tax_id || 'AS4568384',
        photo_url: data.photo_url || meta.photo_url || '',
        custom_metadata: meta,
      }
    } catch (err) {
      console.warn('Failed to fetch profile from Neon database:', err)
      return null
    }
  }

  /**
   * Updates user profile in Neon PostgreSQL database and syncs with Firebase Auth if available.
   */
  static async updateUserProfile(profileData: UserProfileData): Promise<boolean> {
    try {
      const first = profileData.first_name ?? ''
      const last = profileData.last_name ?? ''
      const computedFullName = profileData.full_name || `${first} ${last}`.trim() || profileData.email.split('@')[0]

      const payload = {
        email: profileData.email,
        full_name: computedFullName,
        first_name: first,
        last_name: last,
        phone: profileData.phone ?? '',
        bio: profileData.bio ?? '',
        role: profileData.role || 'employee',
        department: profileData.department || 'Engineering',
        country: profileData.country ?? '',
        city_state: profileData.city_state ?? '',
        postal_code: profileData.postal_code ?? '',
        tax_id: profileData.tax_id ?? '',
        photo_url: profileData.photo_url ?? '',
        facebook: profileData.facebook ?? '',
        x_link: profileData.x ?? '',
        linkedin: profileData.linkedin ?? '',
        instagram: profileData.instagram ?? '',
        custom_metadata: profileData.custom_metadata || {},
      }

      // Send to FastAPI backend -> Neon PostgreSQL
      const response = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to update profile in Neon DB. Status: ${response.status}`)
      }

      // Also update Firebase Auth profile if user is currently signed in
      const currentFirebaseUser = auth.currentUser
      if (currentFirebaseUser) {
        await firebaseUpdateProfile(currentFirebaseUser, {
          displayName: computedFullName,
          photoURL: profileData.photo_url || currentFirebaseUser.photoURL || '',
        }).catch((err) => console.warn('Firebase profile sync notice:', err))
      }

      return true
    } catch (err) {
      console.error('Error updating user profile in Neon DB:', err)
      throw err
    }
  }
}
