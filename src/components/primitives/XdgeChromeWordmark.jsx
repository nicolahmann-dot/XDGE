import { useId } from 'react';

export function XdgeChromeWordmark({ className }) {
  const gradId = `xdge-chrome-fill-${useId().replace(/:/g, '')}`;

  return (
    <svg
      className={className}
      viewBox="0 0 1191 358"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="595"
          y1="0"
          x2="595"
          y2="358"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5a5a5a" />
          <stop offset="14%" stopColor="#c8c8c8" />
          <stop offset="28%" stopColor="#ffffff" />
          <stop offset="42%" stopColor="#7a7a7a" />
          <stop offset="58%" stopColor="#1a1a1a" />
          <stop offset="72%" stopColor="#b0b0b0" />
          <stop offset="100%" stopColor="#404040" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        d="M 383.5 14 L 382 16.5 Q 299.7 110.2 210.5 197 Q 133.3 273.8 48.5 343 L 50 340.5 Q 135.4 240.4 229.5 149 Q 302.5 77.5 383.5 14 Z"
        fill={`url(#${gradId})`}
      />
      <path
        fillRule="evenodd"
        d="M 456.5 79 L 520.5 79 L 521.5 80 L 533.5 80 L 534.5 81 L 545.5 82 Q 579 90.5 598 113.5 Q 611.4 129.1 618 151.5 L 621 164.5 L 621 171.5 L 622 172.5 L 622 193.5 L 621 194.5 L 621 200.5 L 618 214.5 L 607 239.5 Q 598.5 253 586.5 263 Q 571 276 548.5 282 L 538.5 284 L 530.5 284 L 529.5 285 L 484.5 286 L 483.5 285 L 442.5 285 L 441.5 284 L 383.5 284 L 381.5 285 L 377 282.5 L 377 82.5 L 379.5 80 L 455.5 80 L 456.5 79 Z M 429 126 L 429 235 L 530 235 L 550 225 L 561 213 L 566 203 L 569 190 L 569 177 L 567 167 Q 563 153 555 144 Q 545 131 528 127 L 519 127 L 518 126 L 429 126 Z"
        fill={`url(#${gradId})`}
      />
      <path
        fillRule="evenodd"
        d="M 728.5 80 L 899.5 80 L 900 80.5 L 900 126 L 747.5 126 L 746.5 127 L 737.5 127 Q 717.9 131.4 708 145.5 Q 700.6 155.1 697 168.5 L 696 173.5 L 696 194.5 Q 700.6 217.4 716.5 229 Q 723.8 234.7 734.5 237 L 848 237 L 848 206 L 773.5 206 L 772 204.5 L 772 162.5 L 773.5 161 L 898.5 161 L 900 162.5 L 900 284 L 895.5 286 L 894.5 285 L 829.5 285 L 828.5 286 L 741.5 286 L 740.5 285 L 724.5 284 L 701.5 277 Q 680.8 268.2 667 252.5 Q 653 237 646 214.5 L 642 194.5 L 642 171.5 L 646 151.5 L 657 126.5 Q 666.1 111.6 679.5 101 Q 690 92.5 703.5 87 L 728.5 80 Z"
        fill={`url(#${gradId})`}
      />
      <path
        fillRule="evenodd"
        d="M 936.5 81 L 1140.5 81 L 1141 82.5 L 1142 83.5 L 1142 123.5 L 1140.5 125 L 935 125 L 935 82.5 L 936.5 81 Z"
        fill={`url(#${gradId})`}
      />
      <path
        fillRule="evenodd"
        d="M 936.5 161 L 1139.5 161 L 1141 162.5 L 1141 204.5 L 1139.5 205 L 1138.5 206 L 937.5 206 L 935 205 L 935 162.5 L 936.5 161 Z"
        fill={`url(#${gradId})`}
      />
      <path
        fillRule="evenodd"
        d="M 251.5 178 L 363 284.5 L 282.5 285 L 212 216.5 L 212 214.5 L 223.5 203 L 251.5 178 Z"
        fill={`url(#${gradId})`}
      />
      <path
        fillRule="evenodd"
        d="M 935 238 L 1140.5 238 L 1141 238.5 L 1141 285 L 935.5 285 L 935 284.5 L 935 238 Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}
