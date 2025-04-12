import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <nav>
        <Link>
          <Button>Go to dashboard</Button>
        </Link>
      </nav>
    </div>
  )
}

export default LandingPage