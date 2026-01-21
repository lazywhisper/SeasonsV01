/**
 * OG Image Generator Component
 * 
 * This component can be used to generate Open Graph images (1200x630px)
 * for social media sharing. You can render this component and take a screenshot,
 * or use a service like Vercel's OG Image Generation.
 * 
 * Usage:
 * 1. Render this component
 * 2. Take a screenshot at 1200x630px
 * 3. Save as og-image.jpg
 * 4. Place in /public/ folder
 */

interface OGImageProps {
  title?: string;
  subtitle?: string;
}

export function OGImageGenerator({
  title = 'Seasons',
  subtitle = 'Alternative, Onchain Yield',
}: OGImageProps) {
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: 'linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}
    >
      {/* Background gradient accent */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '800px',
          height: '800px',
          background:
            'radial-gradient(circle, rgba(233, 199, 116, 0.15) 0%, rgba(242, 119, 131, 0.1) 25%, rgba(180, 75, 203, 0.1) 50%, rgba(75, 128, 203, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
        }}
      />

      {/* Brand gradient bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background:
            'linear-gradient(90deg, #E9C774 0%, #F27783 33%, #B44BCB 66%, #4B80CB 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        {/* Logo/Icon placeholder */}
        <div
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 40px',
            background:
              'linear-gradient(135deg, #E9C774 0%, #F27783 33%, #B44BCB 66%, #4B80CB 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          S
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '96px',
            fontWeight: 600,
            color: '#FFFFFF',
            margin: '0 0 24px 0',
            letterSpacing: '-0.02em',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '40px',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '0 0 60px 0',
            letterSpacing: '0.01em',
          }}
        >
          {subtitle}
        </p>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                background:
                  'linear-gradient(135deg, #E9C774 0%, #F27783 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}
            >
              Real-time
            </div>
            <div
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Analytics
            </div>
          </div>

          <div
            style={{
              width: '2px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                background:
                  'linear-gradient(135deg, #F27783 0%, #B44BCB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}
            >
              Passive
            </div>
            <div
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Rewards
            </div>
          </div>

          <div
            style={{
              width: '2px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 600,
                background:
                  'linear-gradient(135deg, #B44BCB 0%, #4B80CB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}
            >
              Governance
            </div>
            <div
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Voting
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '80px',
          right: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          Solana DeFi Platform
        </div>
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          seasons.finance
        </div>
      </div>
    </div>
  );
}

/**
 * Usage for different pages:
 * 
 * Dashboard:
 * <OGImageGenerator 
 *   title="Dashboard" 
 *   subtitle="Real-time Yield Analytics" 
 * />
 * 
 * Governance:
 * <OGImageGenerator 
 *   title="Governance" 
 *   subtitle="Vote on Protocol Proposals" 
 * />
 */