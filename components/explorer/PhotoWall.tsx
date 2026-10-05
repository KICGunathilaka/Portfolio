import Image from "next/image";

const DIR = "/images/explorer/";

// Five stacks of photographs. Neighbouring stacks travel in opposite directions.
const STACKS = [
  [
    "485958654_590964707321946_8339585942871855994_n.jpg",
    "486480782_590334667384950_7960085291165407875_n.jpg",
    "486553809_590959253989158_1003449634325424260_n.jpg",
    "486695966_591128960638854_2467638316001813296_n.jpg",
    "703665774_940897148995365_2525273680976652082_n.jpg",
  ],
  [
    "487492968_593720577046359_4572052592759202345_n.jpg",
    "486332390_591129103972173_1047931479366709534_n.jpg",
    "486576493_591631987255218_8361187685238473632_n.jpg",
    "486619089_591857770565973_7252829527118412493_n.jpg",
    "486526375_592754640476286_3007275089205870712_n.jpg",
  ],
  [
    "486841965_591857767232640_3030881238236543652_n.jpg",
    "487081499_592773020474448_1241373210144809525_n.jpg",
    "487491069_594655966952820_2266355550664252025_n.jpg",
    "671227272_17872996098598039_3283153268389051503_n.webp",
    "691589178_17877712173598039_6334832775984425000_n.webp",
  ],
  [
    "703811982_940892782329135_6027131970418897955_n.jpg",
    "486407707_591139147304502_8001835149558163448_n.jpg",
    "571112680_766733833078365_4972601483978071223_n.jpg",
    "486775793_592754293809654_9122257929533382080_n.jpg",
    "486542653_591631947255222_8781936745614695504_n.jpg",
  ],
  [
    "486719910_591129020638848_1162982494395982719_n.jpg",
    "486948713_592754553809628_2777172630417378208_n.jpg",
    "571224062_766679703083778_4989177501429992537_n.jpg",
    "684760654_17875892058598039_8376536889358571927_n.webp",
    "486604025_591129043972179_2448555075143694271_n.jpg",
  ],
];

// Seconds per full loop; uneven so the stacks never fall into step
const PACE = [58, 46, 64, 50, 56];

/**
 * A wall of photographs filling its parent: stacks that scroll endlessly, alternating up and down.
 * Each stack is rendered twice end to end so the loop has no seam.
 */
export function PhotoWall({ className }: { className?: string }) {
  return (
    <div className={`flex gap-1.5 sm:gap-2 ${className ?? ""}`} aria-hidden>
      {STACKS.map((stack, i) => (
        // Phones show three stacks; wider screens show all five
        <div key={i} className={`min-w-0 flex-1 overflow-hidden ${i > 2 ? "hidden md:block" : ""}`}>
          <div
            className={`will-change-transform ${
              i % 2 === 0 ? "motion-safe:animate-wall-up" : "motion-safe:animate-wall-down"
            }`}
            style={{ animationDuration: `${PACE[i]}s` }}
          >
            {[...stack, ...stack].map((file, j) => (
              <div key={j} className="relative mb-1.5 aspect-[3/4] sm:mb-2">
                <Image
                  src={`${DIR}${file}`}
                  alt=""
                  fill
                  priority={i < 3 && j < 2}
                  sizes="(min-width: 768px) 20vw, 34vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
