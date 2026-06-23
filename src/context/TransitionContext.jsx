import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BlindsTransition from '../components/BlindsTransition'

const TransitionContext = createContext()

export const useTransitionNavigate = () => {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransitionNavigate must be used within a TransitionProvider')
  }
  return context
}

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState('idle') // 'idle' | 'covering' | 'revealing'
  const [pendingRoute, setPendingRoute] = useState(null)
  const navigate = useNavigate()

  const navigateWithTransition = useCallback((to) => {
    // If it's a hash link (e.g. #services), let browser/default navigate handle it
    if (to.includes('#')) {
      window.location.href = to
      return
    }

    if (isTransitioning) return
    setIsTransitioning(true)
    setTransitionPhase('covering')
    setPendingRoute(to)
  }, [isTransitioning])

  const handleCoverComplete = useCallback(() => {
    if (pendingRoute) {
      navigate(pendingRoute)
      setPendingRoute(null)
      // Small delay to let React mount the new page components before opening
      setTimeout(() => {
        setTransitionPhase('revealing')
      }, 60)
    }
  }, [pendingRoute, navigate])

  const handleRevealComplete = useCallback(() => {
    setTransitionPhase('idle')
    setIsTransitioning(false)
  }, [])

  return (
    <TransitionContext.Provider value={navigateWithTransition}>
      {children}
      {isTransitioning && (
        <BlindsTransition 
          phase={transitionPhase} 
          onCoverComplete={handleCoverComplete}
          onRevealComplete={handleRevealComplete}
        />
      )}
    </TransitionContext.Provider>
  )
}
