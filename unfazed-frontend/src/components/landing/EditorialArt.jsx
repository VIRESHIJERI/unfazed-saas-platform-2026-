/**
 * Bespoke editorial vector artwork inspired by warm Indian therapy studios:
 * limewashed arches, teakwood joinery, handloom linen, terracotta planters,
 * and serene morning light. Zero generic stock clichés.
 */

export function HeroStudioArtwork({ className = '' }) {
  return (
    <svg
      viewBox="0 0 720 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration of a sunlit Indian therapy studio with teakwood chair, sheer curtains, and indoor greenery"
    >
      <defs>
        <linearGradient id="wallLight" x1="0" y1="0" x2="720" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F2EA" />
          <stop offset="60%" stopColor="#ECE7DC" />
          <stop offset="100%" stopColor="#E1DACB" />
        </linearGradient>
        <linearGradient id="sunShaft" x1="160" y1="40" x2="540" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F5F2EA" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="archShadow" x1="250" y1="80" x2="250" y2="470" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DDD5C5" />
          <stop offset="100%" stopColor="#E9E3D7" />
        </linearGradient>
        <linearGradient id="linenCurtain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF8F3" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#EAE4D7" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Limewashed Plaster Wall */}
      <rect width="720" height="560" fill="url(#wallLight)" />

      {/* Sunlit Arched Window Alcove */}
      <path
        d="M120 465V215C120 129.396 189.396 60 275 60C360.604 60 430 129.396 430 215V465H120Z"
        fill="url(#archShadow)"
      />
      <path
        d="M148 465V220C148 148.203 206.203 90 278 90C349.797 90 408 148.203 408 220V465H148Z"
        fill="#FAF7F0"
      />

      {/* Soft Morning Light Diagonal */}
      <polygon points="150,120 408,160 660,560 220,560" fill="url(#sunShaft)" />

      {/* Sheer Cotton Curtain Drapes */}
      <path d="M148 90H218C210 210 202 330 214 465H148V90Z" fill="url(#linenCurtain)" />
      <path d="M174 90V465" stroke="#DDD5C5" strokeWidth="1.2" opacity="0.6" />
      <path d="M196 90V465" stroke="#DDD5C5" strokeWidth="1.2" opacity="0.5" />

      {/* Warm Terracotta Floor & Handwoven Dhurrie */}
      <rect y="460" width="720" height="100" fill="#DDD4C3" />
      <path d="M90 486H640L680 544H50L90 486Z" fill="#CFC4B0" />
      <path d="M115 498H615" stroke="#B6A992" strokeWidth="1.5" strokeDasharray="6 6" />
      <path d="M95 530H635" stroke="#B6A992" strokeWidth="1.5" strokeDasharray="6 6" />

      {/* Framed Minimal Wall Art */}
      <rect x="485" y="138" width="132" height="172" rx="2" fill="#F8F7F3" stroke="#9C7B56" strokeWidth="4" />
      <circle cx="551" cy="218" r="34" fill="#A6B39A" opacity="0.45" />
      <path d="M518 262C534 234 568 234 584 262" stroke="#52644F" strokeWidth="2.2" strokeLinecap="round" />

      {/* Handcrafted Terracotta Planter & Indoor Areca / Olive Foliage */}
      <path d="M112 378H176L166 462H122L112 378Z" fill="#B67252" />
      <ellipse cx="144" cy="378" rx="32" ry="6" fill="#9A5B3E" />
      <path d="M144 378C142 324 134 272 114 226" stroke="#52644F" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M144 378C148 318 164 268 190 218" stroke="#52644F" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M144 378C144 316 144 258 148 198" stroke="#64785E" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="116" cy="248" rx="18" ry="8" transform="rotate(-32 116 248)" fill="#7A8E72" />
      <ellipse cx="132" cy="288" rx="20" ry="8" transform="rotate(-24 132 288)" fill="#52644F" />
      <ellipse cx="172" cy="252" rx="19" ry="8" transform="rotate(28 172 252)" fill="#7A8E72" />
      <ellipse cx="164" cy="300" rx="20" ry="8" transform="rotate(20 164 300)" fill="#52644F" />
      <ellipse cx="148" cy="212" rx="14" ry="7" transform="rotate(-10 148 212)" fill="#A6B39A" />

      {/* Indian Teakwood Armchair with Linen Cushion */}
      {/* Back legs */}
      <path d="M276 346L264 474" stroke="#6F4E37" strokeWidth="9" strokeLinecap="round" />
      <path d="M406 346L418 474" stroke="#6F4E37" strokeWidth="9" strokeLinecap="round" />
      {/* Backrest cushion */}
      <rect x="274" y="258" width="134" height="92" rx="18" fill="#F8F7F3" stroke="#DED6C6" strokeWidth="2" />
      {/* Seat cushion */}
      <rect x="256" y="344" width="170" height="44" rx="14" fill="#F2EDE2" stroke="#D8CEBC" strokeWidth="2" />
      {/* Sage throw cushion */}
      <rect x="284" y="284" width="54" height="58" rx="12" transform="rotate(-7 284 284)" fill="#A6B39A" />
      {/* Teak frame & armrests */}
      <path d="M250 326H432" stroke="#7A553B" strokeWidth="10" strokeLinecap="round" />
      <path d="M260 326V476" stroke="#7A553B" strokeWidth="10" strokeLinecap="round" />
      <path d="M422 326V476" stroke="#7A553B" strokeWidth="10" strokeLinecap="round" />
      <path d="M260 392H422" stroke="#684730" strokeWidth="8" />

      {/* Teak Side Table & Stoneware Chai Cup */}
      <ellipse cx="516" cy="382" rx="54" ry="11" fill="#8C6245" />
      <path d="M516 392V476" stroke="#724E35" strokeWidth="9" strokeLinecap="round" />
      <path d="M486 476H546" stroke="#724E35" strokeWidth="7" strokeLinecap="round" />
      {/* Ceramic cup + brass coaster */}
      <ellipse cx="508" cy="378" rx="16" ry="4" fill="#C4A46C" />
      <path d="M497 356H519L516 376H500L497 356Z" fill="#F8F7F3" stroke="#D8CEBC" strokeWidth="1.5" />
      {/* Linen journal on side table */}
      <rect x="526" y="366" width="32" height="10" rx="2" fill="#52644F" />
    </svg>
  );
}

export function DeskStillLifeArtwork({ className = '' }) {
  return (
    <svg
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration of a therapist's serene desk with linen journal, brass pen, stoneware cup, and eucalyptus"
    >
      <rect width="640" height="480" fill="#EFECE3" />
      {/* Sunlight window shadow stripes */}
      <polygon points="0,0 380,0 240,480 0,480" fill="#F8F7F3" opacity="0.65" />
      <line x1="120" y1="0" x2="20" y2="480" stroke="#DDD6C7" strokeWidth="18" opacity="0.35" />
      <line x1="250" y1="0" x2="150" y2="480" stroke="#DDD6C7" strokeWidth="18" opacity="0.35" />

      {/* Teak Desk Surface */}
      <rect y="300" width="640" height="180" fill="#B99674" />
      <rect y="300" width="640" height="8" fill="#A68260" />

      {/* Ceramic Vase & Sage Leaves */}
      <path d="M126 218C118 248 116 286 128 308H176C188 286 186 248 178 218H126Z" fill="#F8F7F3" />
      <path d="M152 218C152 172 138 134 114 102" stroke="#52644F" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M154 218C164 166 184 128 212 96" stroke="#52644F" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="122" cy="144" r="14" fill="#A6B39A" />
      <circle cx="136" cy="176" r="12" fill="#7D9074" />
      <circle cx="182" cy="148" r="14" fill="#A6B39A" />
      <circle cx="196" cy="118" r="11" fill="#52644F" />

      {/* Linen-Bound Clinical Notebook */}
      <rect x="242" y="294" width="194" height="140" rx="8" transform="rotate(-6 242 294)" fill="#F8F7F3" stroke="#DCD5C6" strokeWidth="2" />
      <rect x="242" y="294" width="22" height="140" rx="4" transform="rotate(-6 242 294)" fill="#52644F" />
      <line x1="286" y1="332" x2="404" y2="320" stroke="#D2CBC0" strokeWidth="2" />
      <line x1="290" y1="358" x2="394" y2="347" stroke="#D2CBC0" strokeWidth="2" />
      <line x1="294" y1="384" x2="372" y2="376" stroke="#D2CBC0" strokeWidth="2" />

      {/* Brass Pen */}
      <rect x="448" y="344" width="110" height="8" rx="4" transform="rotate(24 448 344)" fill="#B69354" />
      <polygon points="448,344 438,341 445,351" fill="#242522" />

      {/* Stoneware Mug */}
      <rect x="478" y="246" width="64" height="68" rx="10" fill="#242522" />
      <path d="M542 262C558 262 558 296 542 296" stroke="#242522" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="510" cy="246" rx="32" ry="7" fill="#3B3D38" />
    </svg>
  );
}

export function TherapistPortraitArt({
  bg = '#EAE4D7',
  skin = '#C68B66',
  hair = '#252320',
  attire = '#52644F',
  accent = '#A6B39A',
  glasses = false,
  beard = false,
  shortHair = false,
  label = 'Illustrative therapist portrait',
}) {
  return (
    <svg
      viewBox="0 0 320 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full object-cover"
      role="img"
      aria-label={label}
    >
      <rect width="320" height="380" fill={bg} />
      {/* Warm architectural background arch */}
      <path
        d="M52 380V154C52 94.353 100.353 46 160 46C219.647 46 268 94.353 268 154V380H52Z"
        fill="#F8F7F3"
        opacity="0.55"
      />
      {/* Botanical leaf silhouette */}
      <ellipse cx="242" cy="116" rx="22" ry="9" transform="rotate(-32 242 116)" fill={accent} opacity="0.55" />
      <ellipse cx="256" cy="144" rx="18" ry="8" transform="rotate(-12 256 144)" fill={accent} opacity="0.4" />

      {/* Hair back */}
      {!shortHair && (
        <path
          d="M108 176C108 128 130 100 160 100C190 100 212 128 212 176V226H108V176Z"
          fill={hair}
        />
      )}

      {/* Shoulders & Linen Attire */}
      <path
        d="M62 380C66 306 106 270 160 270C214 270 254 306 258 380H62Z"
        fill={attire}
      />
      {/* Collar detail */}
      <path d="M136 272L160 304L184 272" stroke="#F8F7F3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />

      {/* Neck */}
      <rect x="142" y="228" width="36" height="50" rx="14" fill={skin} />
      <path d="M142 246C150 254 170 254 178 246" fill="#000000" opacity="0.08" />

      {/* Head */}
      <rect x="116" y="122" width="88" height="114" rx="44" fill={skin} />

      {/* Hair top */}
      {shortHair ? (
        <path
          d="M114 166C114 128 134 106 160 106C188 106 206 128 206 166C194 146 178 140 160 140C142 140 126 148 114 166Z"
          fill={hair}
        />
      ) : (
        <path
          d="M114 166C116 126 136 106 160 106C184 106 204 126 206 166C190 146 172 138 156 144C140 150 124 156 114 166Z"
          fill={hair}
        />
      )}

      {/* Facial Features */}
      <circle cx="142" cy="178" r="3" fill="#242522" />
      <circle cx="178" cy="178" r="3" fill="#242522" />
      <path d="M134 168C140 165 146 165 150 168" stroke="#242522" strokeWidth="2" strokeLinecap="round" />
      <path d="M170 168C174 165 180 165 186 168" stroke="#242522" strokeWidth="2" strokeLinecap="round" />
      <path d="M160 180V194" stroke="#242522" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />

      {glasses && (
        <g stroke="#242522" strokeWidth="2" opacity="0.75">
          <circle cx="142" cy="178" r="13" />
          <circle cx="178" cy="178" r="13" />
          <line x1="155" y1="178" x2="165" y2="178" />
        </g>
      )}

      {beard && (
        <path
          d="M118 192C122 222 140 236 160 236C180 236 198 222 202 192C194 210 178 214 160 214C142 214 126 210 118 192Z"
          fill={hair}
          opacity="0.85"
        />
      )}

      {/* Warm Gentle Smile */}
      <path
        d="M148 206C155 212 165 212 172 206"
        stroke={beard ? '#F8F7F3' : '#6A3E2E'}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
