import { siCloudflare, siDocker, siNginx } from "simple-icons";
import { DotLogo } from "@/components/shared/DotLogo";

const W = 1360;
const H = 300;
const MID = 150;

/** Dotted connector with live traffic flowing along it, ending in an arrowhead. */
function Link({ from, to }: { from: number; to: number }) {
  return (
    <g>
      <line x1={from} y1={MID} x2={to - 6} y2={MID} stroke="#333" strokeWidth="1" />
      <line x1={from} y1={MID} x2={to - 10} y2={MID} className="flow-dots" />
      <path d={`M${to - 12},${MID - 7} L${to - 2},${MID} L${to - 12},${MID + 7}`} fill="none" stroke="#a3a3a3" strokeWidth="1.5" />
    </g>
  );
}

function Label({ x, y, title, sub }: { x: number; y: number; title: string; sub: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="font-mono text-[12px] uppercase tracking-[0.1em]">
      <tspan className="fill-neutral-200">{title}</tspan>
      <tspan className="fill-neutral-500" dx="8">
        {sub}
      </tspan>
    </text>
  );
}

/**
 * Wide-screen diagram of what serves a visitor once a release is live:
 * visitor → Cloudflare → Nginx → the app's container, the last two inside the Linux server.
 */
export function RequestFlow() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Request path: visitor, Cloudflare, Nginx, application container">
      {/* Visitor: a browser window */}
      <rect x="20" y="92" width="176" height="116" rx="8" fill="#0A0A0A" stroke="#737373" />
      <line x1="20" y1="116" x2="196" y2="116" stroke="#333" />
      <circle cx="36" cy="104" r="3" className="fill-neutral-600" />
      <circle cx="48" cy="104" r="3" className="fill-neutral-600" />
      <circle cx="60" cy="104" r="3" className="fill-accent" />
      <text x="108" y="172" textAnchor="middle" className="fill-white font-display text-[24px] font-black uppercase">
        Visitor
      </text>

      <Link from={196} to={346} />

      {/* Cloudflare at the edge */}
      <circle cx="410" cy={MID} r="64" fill="#0A0A0A" stroke="#d4d4d4" />
      <foreignObject x="374" y={MID - 36} width="72" height="72">
        <DotLogo path={siCloudflare.path} className="h-full w-full text-white" />
      </foreignObject>
      <Label x={410} y={MID + 96} title="Cloudflare" sub="edge" />

      <Link from={474} to={676} />

      {/* The server, holding Nginx and the application container */}
      <rect x="600" y="28" width="740" height="244" rx="12" fill="none" stroke="#525252" strokeDasharray="6 6" />
      <rect x="624" y="18" width="178" height="20" fill="#0A0A0A" />
      <text x="634" y="33" className="fill-neutral-400 font-mono text-[12px] uppercase tracking-[0.1em]">
        AWS · Linux server
      </text>

      <circle cx="740" cy={MID} r="64" fill="#0A0A0A" stroke="#d4d4d4" />
      <foreignObject x="704" y={MID - 36} width="72" height="72">
        <DotLogo path={siNginx.path} className="h-full w-full text-white" />
      </foreignObject>
      <Label x={740} y={MID + 96} title="Nginx" sub="proxy" />

      <Link from={804} to={966} />

      <rect x="966" y="78" width="340" height="144" rx="8" fill="#0A0A0A" stroke="#d4d4d4" />
      <foreignObject x="990" y={MID - 36} width="72" height="72">
        <DotLogo path={siDocker.path} className="h-full w-full text-white" />
      </foreignObject>
      <text x="1082" y={MID - 2} className="fill-white font-display text-[24px] font-black uppercase">
        BloomAudit
      </text>
      <text x="1082" y={MID + 24} className="fill-neutral-500 font-mono text-[12px] uppercase tracking-[0.1em]">
        Docker container
      </text>
      <circle cx="1288" cy="96" r="4" className="fill-accent motion-safe:animate-blink" />
    </svg>
  );
}
