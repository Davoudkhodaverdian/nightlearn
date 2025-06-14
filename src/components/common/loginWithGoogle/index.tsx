import Link from "next/link";
import React from "react";

const LoginWithGoogle: React.FC = () => {

  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  const scope = encodeURIComponent('openid email profile')
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`
  return (
    <div className="py-[20px] my-[6px]">
      <Link className="p-[10px] outline outline-1 outline-[#0c056d] rounded" href={authUrl}>ورود با Google</Link>
    </div>
  )
}
export default LoginWithGoogle