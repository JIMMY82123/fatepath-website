import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from './SEO'

const RedirectToServices = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // 重定向到服务页面
    navigate('/services', { replace: true })
  }, [navigate])

  return (
    <>
      <SEO 
        title="Services - Patreon Membership | FatePath"
        description="Join our Patreon community for ongoing personalized BaZi insights and fortune guidance. We've moved to a membership-based service model."
        canonical={`${window.location.origin}/services`}
        noIndex={true}
      />
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-mystic-300">Redirecting to services page...</p>
        </div>
      </div>
    </>
  )
}

export default RedirectToServices

