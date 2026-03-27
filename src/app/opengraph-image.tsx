import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#f9f9ff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#006c49',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 800,
              color: 'white',
            }}
          >
            F
          </div>
          <span style={{ fontSize: '40px', fontWeight: 800, color: '#006c49' }}>
            Flo
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#111c2d',
              lineHeight: 1.1,
              letterSpacing: '-2px',
            }}
          >
            Controlá tus
            <br />
            finanzas personales.
          </div>
          <div style={{ fontSize: '28px', color: '#3c4a42', fontWeight: 500 }}>
            Ingresos, gastos y estadísticas en un solo lugar.
          </div>
        </div>

        {/* Bottom: decorative pills */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Transacciones', 'Estadísticas', 'Tips personalizados'].map((label) => (
            <div
              key={label}
              style={{
                padding: '10px 20px',
                borderRadius: '100px',
                background: '#006c491a',
                color: '#006c49',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: '#006c49',
            opacity: 0.06,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
