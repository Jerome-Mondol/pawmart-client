import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.init'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const { user, emailPasswordSignOut, loading } = useAuth()
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDisplayName(user?.displayName || '')
    setPhotoURL(user?.photoURL || '')
  }, [user])

  const handleSignOut = async () => {
    try {
      await emailPasswordSignOut()
      localStorage.removeItem('token')
    } catch (err) {
      toast.error('Unable to sign out')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!auth.currentUser) return toast.error('No user logged in')
    setSaving(true)
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName || null,
        photoURL: photoURL || null,
      })
      toast.success('Profile updated')
      setEditing(false)
    } catch (err) {
      toast.error(`Update failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!user ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">You are not signed in</h2>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-outline">Register</Link>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-200 shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL || '/publicdist/react.svg'} alt="avatar" />
                </div>
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-xl font-bold">{user?.displayName || 'No display name'}</h3>
                <p className="text-sm text-base-content/70">{user?.email}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link to="/my-listing" className="btn btn-sm btn-outline">My Listings</Link>
                  <Link to="/my-orders" className="btn btn-sm">My Orders</Link>
                  <button onClick={() => setEditing(v => !v)} className="btn btn-sm btn-ghost">{editing ? 'Cancel' : 'Edit Profile'}</button>
                  <button onClick={handleSignOut} className="btn btn-sm btn-danger">Sign out</button>
                </div>
              </div>
            </div>

            {editing && (
              <form onSubmit={handleSave} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Display name</span>
                  </label>
                  <input value={displayName} onChange={e => setDisplayName(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input value={photoURL} onChange={e => setPhotoURL(e.target.value)} className="input input-bordered w-full" />
                </div>
                <div className="md:col-span-2 flex gap-3 mt-2">
                  <button type="submit" disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : 'Save'}</button>
                  <button type="button" onClick={() => setEditing(false)} className="btn btn-ghost">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
