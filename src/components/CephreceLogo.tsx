import React from 'react'

interface CephreceLogoProps {
  className?: string
  variant?: 'light' | 'dark'
}

/**
 * Official CEPH/RECE Logo Component
 * Uses the official PNG asset provided by cephrece.org.br with fallback high-fidelity SVG icon and typography
 */
export const CephreceLogo: React.FC<CephreceLogoProps> = ({
  className = '',
  variant = 'light',
}) => {
  const [imgError, setImgError] = React.useState(false)

  // Official URL extracted from cephrece.org.br footer
  const officialLogoUrl =
    'https://cephrece.org.br/wp-content/themes/atratis/build/images/footer-cephrece.png'

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {!imgError ? (
        <div className="relative flex items-center">
          <img
            src={officialLogoUrl}
            alt="CEPH/RECE — Centro de Pesquisas em Doenças Hepato Renais do Ceará"
            className="h-12 md:h-14 w-auto max-w-[220px] object-contain transition-opacity duration-500 hover:opacity-95 drop-shadow-sm"
            onError={() => setImgError(true)}
            loading="eager"
          />
        </div>
      ) : (
        /* High-fidelity Vector Fallback matching CEPH/RECE geometric brand symbol */
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1BA6A6] to-[#0E7A7A] shadow-md shadow-[#1BA6A6]/20">
            {/* Interlinked rhomboid loops of CEPH/RECE symbol */}
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-white"
            >
              <rect
                x="8"
                y="8"
                width="20"
                height="20"
                rx="6"
                stroke="currentColor"
                strokeWidth="3.2"
                transform="rotate(45 18 18)"
              />
              <rect
                x="18"
                y="18"
                width="20"
                height="20"
                rx="6"
                stroke="#A7F3D0"
                strokeWidth="3.2"
                transform="rotate(45 28 28)"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-extrabold tracking-tight text-xl leading-none ${
                variant === 'light' ? 'text-white' : 'text-[#1B263B]'
              }`}
            >
              cephrece
            </span>
            <span
              className={`text-[9.5px] font-semibold tracking-wider uppercase mt-1 ${
                variant === 'light' ? 'text-[#1BA6A6]' : 'text-[#158383]'
              }`}
            >
              Laboratório de HLA
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CephreceLogo
