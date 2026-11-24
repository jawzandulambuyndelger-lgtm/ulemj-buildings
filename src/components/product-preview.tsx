"use client";
import { useId } from "react";
import { type MarbleColor } from "@/lib/data";
export function StoneTexture({ color }: { color: MarbleColor }) {
  return (
    <svg
      className="swatch-texture"
      viewBox="0 0 100 70"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="none" stroke={color.vein}>
        <path
          d="M-5 60C14 36 17 55 32 31S55 24 66 4M18 76C36 51 43 59 54 36S80 26 105 7"
          strokeWidth=".7"
        />
        <path
          d="M-5 58C15 39 17 55 31 32S53 24 65 4M27 50L22 32L36 13M53 38L72 42L93 29M-5 9L17 18L27 14L49 23M75 75L78 55L98 42"
          opacity=".4"
          strokeWidth=".4"
        />
      </g>
    </svg>
  );
}
export function ProductPreview({
  color,
  productType,
}: {
  color: MarbleColor;
  productType: string;
}) {
  const id = useId().replaceAll(":", "");
  const stone = `url(#stone-${id})`,
    shadow = `url(#shadow-${id})`;
  const bathroom = productType.includes("өрөө") || productType === "Угаалтуур";
  const sill = productType.includes("Цонхны");
  return (
    <div className="preview-frame">
      <span className="preview-label">ULEMJ MARBLE / МАТЕРИАЛЫН СУДАЛГАА</span>
      <svg
        className="product-preview"
        viewBox="0 0 900 660"
        role="img"
        aria-label={`${productType}, ${color.name} өнгийн жишиг дүрслэл`}
      >
        <defs>
          <linearGradient id={`wall-${id}`} x1="0" x2="1" y1="0" y2=".5">
            <stop stopColor="#deddd6" />
            <stop offset="1" stopColor="#f0eee8" />
          </linearGradient>
          <linearGradient id={`wood-${id}`} x1="0" x2="1">
            <stop stopColor="#beb19b" />
            <stop offset=".5" stopColor="#d0c4af" />
            <stop offset="1" stopColor="#b8ac98" />
          </linearGradient>
          <linearGradient id={`metal-${id}`}>
            <stop stopColor="#464a48" />
            <stop offset=".4" stopColor="#b2b5b0" />
            <stop offset=".6" stopColor="#e0e0d9" />
            <stop offset="1" stopColor="#767b76" />
          </linearGradient>
          <linearGradient id={`glass-${id}`} x1="0" x2=".7" y1="0" y2="1">
            <stop stopColor="#c8d5d4" />
            <stop offset=".55" stopColor="#edf1e9" />
            <stop offset="1" stopColor="#b7c7c5" />
          </linearGradient>
          <filter
            id={`shadow-${id}`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <pattern
            id={`stone-${id}`}
            width="500"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            <rect width="500" height="320" fill={color.hex} />
            <g fill="none" stroke={color.vein} opacity=".63">
              <path
                d="M-80 272C19 202 44 238 92 172S187 135 233 55S346 42 405-25M98 370C147 310 179 332 208 251S292 226 337 145S415 126 538 44"
                strokeWidth="1.5"
              />
              <path
                d="M-70 269C26 203 41 241 93 174S187 138 235 56S349 42 408-25M92 172L80 114L129 30M208 252L289 270L383 214M-30 14L49 63L98 54L195 103M383 358L386 276L490 217"
                strokeWidth=".6"
                opacity=".5"
              />
              <path
                d="M-25 192L56 166L92 172M331 153L378 158L434 130M152 301L137 256L153 211"
                strokeWidth=".4"
              />
            </g>
          </pattern>
          <pattern
            id={`grain-${id}`}
            width="9"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M1 0V80M4 0V80M8 0V80"
              stroke="#675e4d"
              strokeWidth=".45"
              opacity=".13"
            />
          </pattern>
        </defs>
        <rect width="900" height="660" fill={`url(#wall-${id})`} />
        <path d="M0 550H900V660H0Z" fill="#d1cec5" />
        <path
          d="M0 550H900M0 625L900 580M180 660L475 550M675 660L625 550"
          stroke="#c4c0b5"
          strokeWidth="1"
        />
        {sill ? (
          <>
            <rect x="120" y="105" width="650" height="365" fill="#b7b8ad" />
            <rect
              x="139"
              y="119"
              width="612"
              height="331"
              fill={`url(#glass-${id})`}
            />
            <path
              d="M445 119V450M139 284H751"
              stroke="#686e66"
              strokeWidth="11"
            />
            <path
              d="M169 420L295 344L401 389L530 288L751 370V450H139Z"
              fill="#b5c3b8"
              opacity=".5"
            />
            <path d="M111 457H779L809 486H85Z" fill={stone} />
            <path d="M85 486H809V508H85Z" fill={stone} />
            <path d="M85 486H809V492H85Z" fill="#fff" opacity=".25" />
            <rect
              x="107"
              y="508"
              width="681"
              height="7"
              fill="#9d9e94"
              opacity=".5"
            />
            <path
              d="M138 119V450M751 119V450"
              stroke="#515950"
              strokeWidth="10"
            />
            <path d="M165 126L412 126L165 361Z" fill="#fff" opacity=".13" />
            <ellipse
              cx="664"
              cy="451"
              rx="36"
              ry="8"
              fill="#676c5e"
              opacity=".2"
            />
            <path d="M639 408H687L680 451H646Z" fill="#8e9684" />
            <path
              d="M662 412C616 366 635 340 661 386C661 339 701 344 672 387C710 369 707 404 662 412Z"
              fill="#6e7a64"
            />
          </>
        ) : bathroom ? (
          <>
            <rect x="140" y="90" width="615" height="268" fill="#c8cbc2" />
            <rect
              x="148"
              y="98"
              width="599"
              height="252"
              fill={`url(#glass-${id})`}
            />
            <path
              d="M150 100L744 348M745 100L150 348"
              stroke="#fff"
              opacity=".12"
            />
            <rect x="145" y="115" width="6" height="218" fill="#eae9dd" />
            <rect x="744" y="115" width="5" height="218" fill="#eae9dd" />
            <ellipse
              cx="467"
              cy="565"
              rx="300"
              ry="20"
              fill="#6e7165"
              opacity=".15"
              filter={shadow}
            />
            <path d="M139 409H757V545H139Z" fill={`url(#wood-${id})`} />
            <path d="M139 409H757V545H139Z" fill={`url(#grain-${id})`} />
            <path
              d="M346 421V545M551 421V545"
              stroke="#887e6a"
              strokeWidth="1"
            />
            <path d="M125 377H744L782 411H100Z" fill={stone} />
            <path d="M100 411H782V435H100Z" fill={stone} />
            <path d="M100 411H782" stroke="#fff" opacity=".4" />
            <ellipse cx="439" cy="395" rx="106" ry="30" fill="#eeeae1" />
            <ellipse cx="439" cy="399" rx="83" ry="22" fill="#c3c5bc" />
            <ellipse cx="439" cy="403" rx="62" ry="14" fill="#e1e2db" />
            <ellipse cx="439" cy="409" rx="7" ry="2" fill="#858d82" />
            <path
              d="M436 373V325Q436 310 453 310H473"
              fill="none"
              stroke={`url(#metal-${id})`}
              strokeWidth="10"
            />
            <path d="M477 309V321" stroke="#8b9087" strokeWidth="8" />
            <rect
              x="666"
              y="330"
              width="32"
              height="56"
              rx="3"
              fill="#9c9f8e"
            />
            <rect x="673" y="324" width="18" height="8" fill="#72796a" />
            <path
              d="M681 325V317H696"
              fill="none"
              stroke="#72796a"
              strokeWidth="4"
            />
          </>
        ) : (
          <>
            <rect x="61" y="110" width="520" height="170" fill="#e3e2da" />
            <path
              d="M61 110H581M61 280H581M235 110V280M409 110V280"
              stroke="#c6c8bd"
              strokeWidth="1"
            />
            <rect x="61" y="314" width="750" height="223" fill="#c5bdac" />
            <rect
              x="61"
              y="314"
              width="750"
              height="223"
              fill={`url(#grain-${id})`}
            />
            <path
              d="M61 375H811M208 315V537M357 315V537M506 315V537M655 315V537"
              stroke="#9a9483"
              strokeWidth="1"
            />
            <path d="M59 301H815V316H59Z" fill="#deddd5" />
            <rect x="615" y="98" width="196" height="197" fill="#d8ded6" />
            <rect
              x="627"
              y="110"
              width="172"
              height="173"
              fill={`url(#glass-${id})`}
            />
            <path d="M713 110V283" stroke="#949e90" strokeWidth="5" />
            <path d="M645 110L799 221V110Z" fill="#fff" opacity=".2" />
            <ellipse
              cx="464"
              cy="590"
              rx="310"
              ry="32"
              fill="#64675c"
              opacity=".18"
              filter={shadow}
            />
            <path d="M165 368L350 457V609L165 520Z" fill="#aca18c" />
            <path d="M350 457L810 405V564L350 609Z" fill={`url(#wood-${id})`} />
            <path
              d="M350 457L810 405V564L350 609Z"
              fill={`url(#grain-${id})`}
            />
            <path
              d="M505 440V593M660 423V579"
              stroke="#8a806b"
              strokeWidth="1.3"
            />
            <path d="M165 368L610 330L810 405L350 457Z" fill={stone} />
            <path
              d="M165 368L350 457L810 405V421L350 473L165 384Z"
              fill={stone}
            />
            <path
              d="M165 368L350 457L810 405"
              fill="none"
              stroke="#fff"
              strokeWidth="1.4"
              opacity=".5"
            />
            <path
              d="M165 384L350 473L810 421"
              fill="none"
              stroke="#74776c"
              opacity=".18"
            />
            <path d="M506 369L583 362L644 383L564 391Z" fill="#a8ada1" />
            <path d="M514 372L581 367L631 383L565 388Z" fill="#7f897c" />
            <path
              d="M581 362V318Q581 306 595 308L611 312"
              fill="none"
              stroke={`url(#metal-${id})`}
              strokeWidth="7"
            />
            <path d="M611 311V324" stroke="#9a9f95" strokeWidth="5" />
            <ellipse cx="332" cy="392" rx="34" ry="10" fill="#b4b0a4" />
            <path
              d="M299 390Q307 413 333 414Q358 412 366 390Z"
              fill="#d6d2c4"
            />
            <ellipse cx="333" cy="390" rx="33" ry="9" fill="#c2c2ad" />
            <ellipse cx="325" cy="389" rx="8" ry="7" fill="#9caa89" />
            <ellipse cx="341" cy="390" rx="7" ry="6" fill="#aeaa82" />
            <path d="M101 300H131L127 255H106Z" fill="#a1a18e" />
            <path
              d="M117 259C83 235 87 214 114 243C108 212 141 221 122 246C148 234 142 254 117 259Z"
              fill="#7a866e"
            />
          </>
        )}
      </svg>
      <div className="preview-badge">
        <span>МАТЕРИАЛЫН ЖИШИГ ДҮРСЛЭЛ · БОДИТ ЗУРАГ БИШ</span>
        <span>{color.name.toUpperCase()}</span>
      </div>
    </div>
  );
}
