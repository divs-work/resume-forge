import type { ATSCheck } from "@/types/resume";

interface ATSResult { checks: ATSCheck[]; score: number; }

/*
 * ResumeForge ATS Checker v3 â€” 2026 Edition
 *
 * Sources:
 * - EDLIGO 2025 (1,000 rejected resumes across Workday/Taleo/Greenhouse)
 * - Enhancv Recruiter Study (Sep-Oct 2025, n=25 US recruiters, 10+ ATS)
 * - Jobscan Fortune 500 ATS Report (2025, all 500 companies)
 * - CoverSentry ATS Statistics 2026 (30+ sources)
 * - HiroCV Resume Statistics 2026
 * - WEF Future of Jobs Report 2025 (ESCO/O*NET)
 * - ResumeAdapter ATS Formatting Rules 2026
 */

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HELPERS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function count(text: string, regex: RegExp): number {
  return (text.match(new RegExp(regex.source, regex.flags)) || []).length;
}

function unique(text: string, regex: RegExp): number {
  return new Set(
    (text.match(new RegExp(regex.source, regex.flags)) || []).map((m) =>
      m.toLowerCase().trim(),
    ),
  ).size;
}

function strip(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\\[a-zA-Z]+\*?\{([^}]*)\}/g, "$1")
    .replace(/\\[a-zA-Z]+\*?/g, " ")
    .replace(/[#*_`~\[\](){}|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text: string): number {
  return strip(text)
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

function extractBullets(text: string): string[] {
  const bullets: string[] = [];
  for (const p of [
    /^[\s]*[-â€¢*]\s+(.+)$/gm,
    /\\item\s+(.+)/g,
    /<li[^>]*>([\s\S]+?)<\/li>/gi,
  ]) {
    let m;
    const r = new RegExp(p.source, p.flags);
    while ((m = r.exec(text)) !== null) bullets.push(strip(m[1]));
  }
  return bullets;
}

function extractDateRanges(
  text: string,
): { start: number; end: number | null }[] {
  const ranges: { start: number; end: number | null }[] = [];
  const r = /(\d{4})\s*[â€“\-â€”to]+\s*(present|current|now|\d{4})/gi;
  let m;
  while ((m = r.exec(text)) !== null) {
    const endStr = m[2].toLowerCase();
    ranges.push({
      start: parseInt(m[1]),
      end: ["present", "current", "now"].includes(endStr)
        ? null
        : parseInt(m[2]),
    });
  }
  return ranges;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• KEYWORD BANKS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const ACTION_VERBS =
  /\b(accelerated|achieved|administered|advanced|analyzed|architected|automated|built|championed|co-founded|collaborated|communicated|configured|consolidated|coordinated|created|debugged|delivered|deployed|designed|developed|directed|documented|drove|eliminated|enabled|engineered|established|evaluated|executed|expanded|facilitated|formulated|founded|generated|grew|headed|identified|implemented|improved|increased|influenced|initiated|innovated|integrated|introduced|investigated|launched|led|maintained|managed|mentored|migrated|modernized|negotiated|operated|optimized|orchestrated|organized|overhauled|partnered|performed|piloted|pioneered|planned|presented|produced|proposed|published|raised|rebuilt|recruited|redesigned|reduced|reengineered|refactored|reformed|researched|resolved|restructured|revamped|reviewed|scaled|secured|simplified|solved|spearheaded|standardized|streamlined|strengthened|supervised|supported|surpassed|tested|trained|transformed|troubleshot|unified|upgraded|validated|verified)\b/gi;

const WEAK_PHRASES =
  /\b(responsible for|worked on|helped with|assisted in|was involved|duties included|tasked with|participated in|took part in|was in charge of|handled various|played a role|contributed to the|supported the team|was part of|dealt with|familiar with|exposure to|knowledge of|understanding of|experience with various|involved in various|various responsibilities|day-to-day|general duties|among other things)\b/gi;

const PASSIVE_VOICE =
  /\b(was|were|been|being|is|are|am)\s+(given|made|done|used|taken|seen|known|found|called|asked|told|shown|left|held|brought|written|provided|set|run|moved|kept|started|turned|opened|closed|paid|sent|built|cut|put|read|spent|grown|lost|stood|heard|allowed|added|followed|included|met|led|reached|believed|received|required|produced|reported|decided|considered|expected|presented|developed|established|managed|designed|created|assigned|promoted|selected|chosen|approved|rejected|offered|awarded|recognized|completed|implemented|executed|reviewed|updated|monitored|maintained|supported|handled|processed|performed|conducted|prepared|submitted|delivered|organized|coordinated|scheduled|planned|evaluated|assessed|analyzed|resolved|improved|configured|installed|deployed|integrated|tested|verified|validated|documented|published|released|launched|initiated|proposed|recommended)\b/gi;

const TECH_KEYWORDS =
  /\b(javascript|typescript|python|java|kotlin|swift|rust|go|golang|ruby|php|perl|scala|haskell|elixir|clojure|dart|lua|r\b|matlab|assembly|c\+\+|c#|objective.?c|\.net|f#|erlang|fortran|solidity|zig|julia|groovy|powershell|bash|shell|react|angular|vue|svelte|solid\.?js|next\.?js|nuxt|gatsby|remix|astro|ember|jquery|alpine\.?js|htmx|lit|preact|qwik|node\.?js|express|fastify|nest\.?js|deno|bun|django|flask|fastapi|spring|spring\s*boot|rails|laravel|phoenix|gin|fiber|actix|rocket|axum|asp\.?net|blazor|symfony|sql|nosql|mongodb|postgresql|postgres|mysql|mariadb|sqlite|oracle|sql\s*server|dynamodb|cassandra|couchdb|neo4j|influxdb|cockroachdb|supabase|firebase|redis|memcached|elasticsearch|opensearch|solr|meilisearch|algolia|aws|azure|gcp|google\s*cloud|heroku|vercel|netlify|cloudflare|digitalocean|docker|podman|kubernetes|k8s|openshift|terraform|pulumi|ansible|puppet|helm|istio|consul|vault|git|github|gitlab|bitbucket|ci\/cd|jenkins|github\s*actions|gitlab\s*ci|circleci|argocd|tekton|buildkite|graphql|rest|restful|grpc|websocket|oauth|jwt|saml|openid|api|sdk|openapi|swagger|microservices|serverless|event.?driven|cqrs|html|css|sass|scss|tailwind|bootstrap|material\s*ui|chakra|shadcn|styled.?components|webpack|vite|rollup|esbuild|turbopack|react\s*native|flutter|expo|ionic|electron|tauri|pwa|linux|unix|ubuntu|nginx|apache|caddy|haproxy|prometheus|grafana|datadog|new\s*relic|splunk|elk|opentelemetry|sentry|s3|ec2|lambda|ecs|eks|rds|aurora|sqs|sns|cloudfront|route53|iam|cloudformation|cdk|sagemaker|bedrock|cosmos\s*db|bigquery|cloud\s*run|vertex\s*ai|machine\s*learning|deep\s*learning|nlp|computer\s*vision|generative\s*ai|llm|transformer|bert|gpt|rag|fine.?tuning|prompt\s*engineering|langchain|pytorch|tensorflow|keras|scikit.?learn|pandas|numpy|jupyter|hugging\s*face|mlops|mlflow|hadoop|spark|kafka|rabbitmq|airflow|dbt|snowflake|databricks|looker|tableau|power\s*bi|figma|sketch|storybook|cypress|playwright|selenium|jest|pytest|junit|vitest|testing\s*library|postman|agile|scrum|kanban|jira|confluence|linear|notion|slack)\b/gi;

const SOFT_SKILLS =
  /\b(leadership|communication|problem.?solving|teamwork|collaboration|analytical\s*thinking|critical\s*thinking|creative\s*thinking|adaptability|resilience|time\s*management|project\s*management|mentoring|coaching|presentation|public\s*speaking|negotiation|conflict\s*resolution|decision.?making|strategic\s*thinking|emotional\s*intelligence|interpersonal|organizational|prioritization|delegation|attention\s*to\s*detail|initiative|self.?motivated|resourceful|cross.?functional|stakeholder\s*management|client\s*relations|customer\s*focus|accountability|ownership|curiosity|continuous\s*learning|growth\s*mindset|agility|active\s*listening)\b/gi;

const BUZZWORDS =
  /\b(synergy|guru|ninja|rockstar|passionate|driven|self.?starter|go.?getter|thought\s*leader|leverage|paradigm|disrupt|holistic|proactive|dynamic|innovative|cutting.?edge|bleeding.?edge|world.?class|best.?of.?breed|game.?changer|visionary|results.?oriented|detail.?oriented|hard.?working|team\s*player|fast\s*learner|people\s*person|perfectionist|workaholic|think\s*outside|hit\s*the\s*ground|wear\s*many\s*hats|move\s*the\s*needle|low.?hanging\s*fruit|circle\s*back|deep\s*dive|ideate|value.?add|next.?level|seasoned|extensive\s*experience)\b/gi;

const DEGREES =
  /\b(b\.?s\.?\b|b\.?a\.?\b|b\.?sc\.?|b\.?eng\.?|b\.?tech|b\.?com|b\.?ed|b\.?f\.?a\.?|b\.?arch|b\.?des|b\.?b\.?a\.?|b\.?c\.?a\.?|a\.?a\.?\b|a\.?s\.?\b|m\.?s\.?\b|m\.?a\.?\b|m\.?sc\.?|m\.?eng\.?|m\.?tech|m\.?com|m\.?ed|m\.?f\.?a\.?|m\.?b\.?a\.?|m\.?phil|m\.?arch|m\.?p\.?h\.?|m\.?p\.?a\.?|m\.?s\.?w\.?|m\.?c\.?a\.?|ph\.?d|d\.?b\.?a|ed\.?d|j\.?d\.?\b|ll\.?b|ll\.?m|m\.?d\.?\b|d\.?o\.?\b|d\.?d\.?s|pharm\.?d|d\.?v\.?m|d\.?p\.?t|psy\.?d|d\.?eng|bachelor|master|associate\s*degree|diploma|doctorate|postgraduate|undergraduate|honours|honors)\b/i;

const CERTIFICATIONS =
  /\b(certified|certification|certificate|licensed|registered|accredited|chartered|pmp|capm|prince2|csm|cspo|safe\s*agilist|itil|togaf|six\s*sigma|green\s*belt|black\s*belt|aws\s*certified|aws\s*solutions\s*architect|aws\s*developer|aws\s*cloud\s*practitioner|azure\s*certified|az.?\d{2,3}|google\s*cloud\s*certified|gcp\s*professional|terraform\s*associate|ckad|cka|cks|cissp|cism|cisa|ceh|oscp|comptia|security\+|network\+|a\+|cloud\+|ccna|ccnp|ccie|rhce|rhcsa|cpa|cfa|cfp|cma|shrm.?cp|shrm.?scp|phr|sphr|salesforce\s*certified|tableau\s*certified|databricks\s*certified|snowflake\s*certified|psm|pspo|docker\s*certified|oracle\s*certified|sap\s*certified|scrum\.?org|series\s*[0-9]+|finra|real\s*estate\s*license|pe\s*license|bar\s*admission|board\s*certified|rn\s*license|cpr\s*certified|osha)\b/i;

const JOB_TITLES =
  /\b(engineer|developer|programmer|architect|designer|analyst|scientist|researcher|manager|director|lead|principal|senior|junior|staff|distinguished|intern|associate|coordinator|specialist|consultant|administrator|technician|strategist|officer|executive|president|vice\s*president|vp|chief|cto|ceo|cfo|coo|cio|ciso|head\s*of|founder|co.?founder|freelancer|contractor|devops|sre|platform|infrastructure|backend|frontend|fullstack|full.?stack|mobile|web|cloud|data|ml|ai|security|qa|automation|product|program|scrum\s*master|product\s*owner|agile\s*coach|ux|ui|graphic|content|marketing|growth|sales|account|business\s*development|customer\s*success|solutions|recruiter|hr\s*generalist|supply\s*chain|logistics|procurement|financial\s*advisor|portfolio\s*manager|investment\s*banker|teacher|professor|nurse|physician|pharmacist|attorney|counsel)\b/gi;

const INDUSTRY_TERMS =
  /\b(roi|kpi|okr|sla|slo|mvp|poc|saas|paas|iaas|b2b|b2c|erp|crm|cms|lms|hris|ats|sdk|api|ui|ux|qa|iso\s*\d{3,5}|soc\s*[12]|hipaa|gdpr|ccpa|pci\s*dss|owasp|nist|seo|sem|ppc|ctr|ltv|cac|arr|mrr|churn|retention|nps|conversion|funnel|a\/b\s*test|compliance|governance|audit|risk|disaster\s*recovery|business\s*continuity|incident\s*management|change\s*management|capacity\s*planning|high\s*availability|fault\s*tolerance|zero\s*downtime|blue.?green|canary|feature\s*flag|monorepo|microservices|serverless|etl|elt|data\s*pipeline|data\s*warehouse|data\s*lake|olap|oltp|acid|sharding|replication|indexing|schema\s*migration|unit\s*test|integration\s*test|e2e|load\s*test|chaos\s*engineering|observability|monitoring|alerting|logging|tracing|sprint|standup|retrospective|backlog|velocity|story\s*points|epic|user\s*story|roadmap|stakeholder|prd|technical\s*debt|code\s*review|pair\s*programming|post.?mortem|root\s*cause|on.?call|triage)\b/gi;

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MAIN CHECKER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

export function checkAts(content: string): ATSResult {
  const lower = content.toLowerCase();
  const plain = strip(content);
  const wc = wordCount(content);
  const bullets = extractBullets(content);
  const dateRanges = extractDateRanges(content);

  const verbCount = count(content, ACTION_VERBS);
  const uniqueVerbCount = unique(content, ACTION_VERBS);
  const repeatedVerbCount = verbCount - uniqueVerbCount;

  const metricPattern =
    /\d+\s*%|\d+\+|\$[\d,.]+[KkMmBb]?|\d+x\b|\d+\s*(users|clients|customers|projects|team|members|engineers|people|requests|revenue|sales|hours|months|downloads|visits|deployments|sprints|tickets)/gi;
  const metricCount = count(content, metricPattern);

  const uniqueTech = unique(lower, TECH_KEYWORDS);
  const softCount = unique(lower, SOFT_SKILLS);
  const buzzCount = count(lower, BUZZWORDS);
  const weakCount = count(lower, WEAK_PHRASES);
  const passiveCount = count(plain, PASSIVE_VOICE);
  const titleCount = count(content, JOB_TITLES);
  const industryTerms = unique(lower, INDUSTRY_TERMS);

  const shortBullets = bullets.filter((b) => b.split(/\s+/).length < 5).length;
  const longBullets = bullets.filter((b) => b.split(/\s+/).length > 35).length;
  const bulletVerbStarts = bullets.filter((b) => {
    const first = b.split(/\s/)[0] || "";
    return new RegExp(ACTION_VERBS.source, "i").test(first);
  }).length;

  const sectionPattern =
    /\b(experience|education|skills|summary|objective|profile|projects|certifications|awards|publications|volunteer|interests|languages|references|training|achievements|research|affiliations)\b/g;
  const sectionCount = count(lower, sectionPattern);

  let hasGap = false;
  let gapYears = 0;
  if (dateRanges.length >= 2) {
    const sorted = [...dateRanges].sort((a, b) => a.start - b.start);
    for (let i = 1; i < sorted.length; i++) {
      const prevEnd = sorted[i - 1].end ?? new Date().getFullYear();
      const gap = sorted[i].start - prevEnd;
      if (gap > 1) {
        hasGap = true;
        gapYears = gap;
        break;
      }
    }
  }

  const orderSections = [
    "summary",
    "objective",
    "profile",
    "experience",
    "education",
    "skills",
  ];
  const found: number[] = [];
  for (const s of orderSections) {
    const i = lower.indexOf(s);
    if (i !== -1) found.push(i);
  }
  const isOrdered = found.every((v, i, a) => i === 0 || v >= a[i - 1]);

  const sumMatch = lower.match(
    /(?:summary|objective|profile|overview|about)[:\s\n]*\n?([\s\S]{10,600}?)(?=\n\s*(?:#{1,3}\s|\\section|experience|education|skills|projects|$))/i,
  );
  const sumWords = sumMatch ? wordCount(sumMatch[1]) : 0;

  const skillsMatch = lower.match(
    /(?:skills|technologies|tech\s*stack|proficiencies|competencies|expertise)[:\s\n]*\n?([\s\S]{10,3000}?)(?=\n\s*(?:#{1,3}\s|\\section|experience|education|projects|certifications|$))/i,
  );
  const skillTokens = skillsMatch
    ? skillsMatch[1].split(/[,;|â€¢Â·\n]/).filter((s) => s.trim().length > 1)
        .length
    : 0;

  const presentInPast =
    /(?:20[01]\d|201\d|202[0-4])\s*[â€“\-â€”]\s*(?:20[01]\d|201\d|202[0-4])[\s\S]{0,400}\b(manage|develop|lead|build|create|design|implement|optimize|deliver|maintain|coordinate|oversee|drive|execute)\b/i.test(
      content,
    );

  const wordFreq: Record<string, number> = {};
  strip(content)
    .toLowerCase()
    .split(/\s+/)
    .forEach((w) => {
      if (w.length > 3) wordFreq[w] = (wordFreq[w] || 0) + 1;
    });
  const stuffedWords = Object.entries(wordFreq).filter(
    ([, c]) => c >= 6,
  ).length;

  const headerFooterContact =
    /<header[^>]*>[\s\S]*?(email|phone|linkedin|@)[\s\S]*?<\/header>/i.test(
      content,
    );

  const checks: ATSCheck[] = [
    // â•â•â• CONTACT INFO (6) â•â•â•
    {
      label: "Email address found",
      pass: /[\w.+-]+@[\w.-]+\.\w{2,}/.test(content),
      tip: "Add a professional email address (firstname.lastname@gmail.com). Avoid novelty emails.",
      category: "Contact Info",
    },
    {
      label: "Phone number found",
      pass: /(\+?\d[\d\s\-().]{7,}\d)/.test(content),
      tip: "Include your phone number with country/area code. Format: +1 (555) 123-4567.",
      category: "Contact Info",
    },
    {
      label: "LinkedIn or portfolio link",
      pass: /linkedin\.com\/in\/|github\.com\/|portfolio|\.dev\/|\.io\/|gitlab\.com\/|behance\.net|dribbble\.com/i.test(
        content,
      ),
      tip: "Add your LinkedIn profile URL (linkedin.com/in/yourname) or a portfolio/GitHub link. 87% of recruiters check LinkedIn.",
      category: "Contact Info",
    },
    {
      label: "Location or Remote status",
      pass:
        /[A-Z][a-z]+,?\s*[A-Z]{2}\b/.test(content) ||
        /[A-Z][a-z]+,\s*[A-Z][a-z]/.test(content) ||
        /\bremote\b/i.test(lower),
      tip: "State your city/state (e.g. 'San Francisco, CA') or write 'Remote'. Many ATS filter by location.",
      category: "Contact Info",
    },
    {
      label: "Full name prominent",
      pass: /^.{0,250}[A-Z][a-z]{1,20}\s+[A-Z][a-z]{1,20}/.test(content),
      tip: "Place your full name at the very top of your resume in a large heading. It should be the first thing parsed.",
      category: "Contact Info",
    },
    {
      label: "Contact not buried in header/footer",
      pass:
        !headerFooterContact ||
        /(?:email|phone|@|linkedin)[\s\S]{0,500}(?:experience|summary|skills)/i.test(
          lower,
        ),
      tip: "Place contact info in the main body, not in HTML headers/footers. 25% of ATS skip header/footer content entirely (EDLIGO 2025).",
      category: "Contact Info",
    },

    // â•â•â• SECTION STRUCTURE (7) â•â•â•
    {
      label: "Summary/Profile section",
      pass: /\b(summary|objective|profile|about\s*me|professional\s*overview|career\s*summary|professional\s*summary|executive\s*summary)\b/.test(
        lower,
      ),
      tip: "Add a 'Summary' or 'Professional Profile' section at the top. This is your elevator pitch â€” 2-4 sentences summarizing your value.",
      category: "Sections",
    },
    {
      label: "Experience section",
      pass: /\b(experience|work\s*history|employment|professional\s*experience|work\s*experience)\b/.test(
        lower,
      ),
      tip: "Include a 'Work Experience' or 'Professional Experience' section. Use this exact standard heading â€” creative names confuse ATS.",
      category: "Sections",
    },
    {
      label: "Education section",
      pass: /\b(education|academic|qualifications|university|college)\b/.test(
        lower,
      ),
      tip: "Add an 'Education' section with your degree, institution, and graduation year. Even if you're experienced, ATS checks for this.",
      category: "Sections",
    },
    {
      label: "Skills section",
      pass: /\b(skills|technologies|proficiencies|competencies|tech\s*stack|expertise|technical\s*skills|core\s*competencies)\b/.test(
        lower,
      ),
      tip: "Add a 'Skills' or 'Technical Skills' section. List 10-20 relevant skills. ATS extracts these for keyword matching against job descriptions.",
      category: "Sections",
    },
    {
      label: "3+ standard sections",
      pass: sectionCount >= 3,
      tip: "Use at least 3 standard section headings (Experience, Education, Skills, Projects, etc.). Standard names help ATS categorize your content.",
      category: "Sections",
    },
    {
      label: "5+ sections (thorough)",
      pass: sectionCount >= 5,
      tip: "Consider adding Projects, Certifications, Awards, Publications, or Volunteer sections. More sections = more keyword opportunities.",
      category: "Sections",
    },
    {
      label: "Sections in logical order",
      pass: isOrdered,
      tip: "Order sections: Summary â†’ Experience â†’ Education â†’ Skills. This matches what 80% of recruiters expect and what ATS parses most reliably.",
      category: "Sections",
    },

    // â•â•â• CONTENT QUALITY (14) â•â•â•
    {
      label: `Strong action verbs (${verbCount})`,
      pass: verbCount >= 8,
      tip: "Start each bullet with a powerful action verb (Led, Built, Deployed, Automated, Reduced). Aim for 8+. Avoid generic verbs like 'did', 'made', 'got'.",
      category: "Content Quality",
    },
    {
      label: `Unique verbs (${uniqueVerbCount})`,
      pass: uniqueVerbCount >= 6,
      tip: "Use at least 6 different action verbs. Repeating 'managed' in every bullet signals lazy writing. Vary: Led, Architected, Streamlined, Mentored.",
      category: "Content Quality",
    },
    {
      label: "Minimal verb repetition",
      pass: repeatedVerbCount <= 3,
      tip: `You're repeating the same verbs ${repeatedVerbCount} times. Replace duplicates with synonyms â€” 'developed' â†’ 'engineered', 'built', 'created'.`,
      category: "Content Quality",
    },
    {
      label: `Quantified achievements (${metricCount})`,
      pass: metricCount >= 3,
      tip: "Add numbers to your achievements: 'Reduced latency by 40%', 'Managed team of 8', 'Grew revenue $2M'. Aim for 3+ metrics. Numbers make ATS rank you higher.",
      category: "Content Quality",
    },
    {
      label: "Rich metrics (5+)",
      pass: metricCount >= 5,
      tip: "Top resumes have 5+ quantified results. Add %, $, counts, or time savings to more bullets. 'Improved' â†’ 'Improved by 35%'.",
      category: "Content Quality",
    },
    {
      label: "No first-person pronouns",
      pass: !/\b(I|me|my|mine|myself)\b/.test(plain),
      tip: "Remove all I/me/my/mine. Use implied first person: 'Led a team of 5' not 'I led a team of 5'. This is standard resume convention.",
      category: "Content Quality",
    },
    {
      label: `No weak phrases (${weakCount})`,
      pass: weakCount === 0,
      tip: "Replace weak phrases: 'Responsible for managing' â†’ 'Managed'. 'Helped with deployment' â†’ 'Deployed'. 'Worked on features' â†’ 'Built features'.",
      category: "Content Quality",
    },
    {
      label: "Minimal weak phrases",
      pass: weakCount <= 2,
      tip: `Found ${weakCount} weak phrases like 'responsible for' or 'helped with'. Rewrite each to lead with what you actually did.`,
      category: "Content Quality",
    },
    {
      label: `Low passive voice (${passiveCount})`,
      pass: passiveCount <= 3,
      tip: "Reduce passive voice: 'System was built by me' â†’ 'Built the system'. Active voice scores higher and reads better. Keep under 3 instances.",
      category: "Content Quality",
    },
    {
      label: "Date ranges present",
      pass: dateRanges.length >= 1,
      tip: "Include date ranges for every role: 'Jan 2022 â€“ Present' or '2022 â€“ 2024'. ATS uses these to calculate years of experience.",
      category: "Content Quality",
    },
    {
      label: "Consistent date formatting",
      pass:
        count(content, /\d{4}\s*[â€“\-â€”]/g) >= 2 ||
        count(
          content,
          /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{4}/gi,
        ) >= 2,
      tip: "Use one date format throughout: either 'Jan 2022 â€“ Dec 2023' or '2022 â€“ 2023'. Mixing formats confuses parsers.",
      category: "Content Quality",
    },
    {
      label: `No employment gaps${hasGap ? ` (${gapYears}yr gap detected)` : ""}`,
      pass: !hasGap,
      tip: hasGap
        ? `A ${gapYears}-year gap was detected. Fill it with freelance work, study, volunteering, or add a brief note. 52% of companies auto-filter for gaps.`
        : "No employment gaps detected. Good â€” gaps are the #1 automatic ATS filter.",
      category: "Content Quality",
    },
    {
      label: "Past tense for past roles",
      pass: !presentInPast,
      tip: "Use past tense for completed roles ('Led', 'Built', 'Managed') and present tense only for your current role. Tense inconsistency signals carelessness.",
      category: "Content Quality",
    },
    {
      label: `Summary length (${sumWords}w)`,
      pass: sumWords >= 15 && sumWords <= 60,
      tip:
        sumWords < 15
          ? "Your summary is too short. Write 2-4 sentences (15-60 words) highlighting your experience level, key skills, and what you bring to a role."
          : sumWords > 60
            ? "Your summary is too long. Cut to 2-4 crisp sentences (15-60 words). Recruiters spend 6-8 seconds on initial scan."
            : "Summary length is good â€” 15-60 words is the sweet spot for ATS parsing and recruiter attention.",
      category: "Content Quality",
    },

    // â•â•â• BULLET POINT QUALITY (6) â•â•â•
    {
      label: `Bullet points used (${bullets.length})`,
      pass: bullets.length >= 6,
      tip: "Use bullet points for all achievements. Aim for 6+ total. Paragraphs of text are harder for ATS to parse and recruiters to scan.",
      category: "Bullet Quality",
    },
    {
      label: "Enough depth (10+ bullets)",
      pass: bullets.length >= 10,
      tip: "Strong resumes have 10+ bullet points across all roles. Each bullet = one achievement with context, action, and result.",
      category: "Bullet Quality",
    },
    {
      label: "No too-short bullets (<5 words)",
      pass: shortBullets <= 1,
      tip: `${shortBullets} bullets are under 5 words. Short bullets like 'Used Python' are worthless. Expand: 'Built Python ETL pipeline processing 2M records/day'.`,
      category: "Bullet Quality",
    },
    {
      label: "No too-long bullets (>35 words)",
      pass: longBullets === 0,
      tip: `${longBullets} bullets exceed 35 words. Break long bullets into two or tighten the language. Each bullet should be 1-2 lines max.`,
      category: "Bullet Quality",
    },
    {
      label: `Bullets start with verbs (${bulletVerbStarts}/${bullets.length})`,
      pass: bullets.length === 0 || bulletVerbStarts >= bullets.length * 0.5,
      tip: "At least 50% of bullets should start with an action verb. 'Built', 'Led', 'Reduced' â€” not 'The system was...' or 'Responsible for...'.",
      category: "Bullet Quality",
    },
    {
      label: "3-6 bullets per role",
      pass:
        bullets.length === 0 ||
        (dateRanges.length > 0 &&
          bullets.length / Math.max(1, dateRanges.length) >= 2.5 &&
          bullets.length / Math.max(1, dateRanges.length) <= 7),
      tip: "Each role should have 3-6 bullet points. Fewer looks thin, more looks unfocused. Prioritize your most impactful achievements.",
      category: "Bullet Quality",
    },

    // â•â•â• KEYWORDS & SKILLS (7) â•â•â•
    {
      label: `Technical keywords (${uniqueTech})`,
      pass: uniqueTech >= 5,
      tip: "Include at least 5 relevant technical skills/tools. ATS matches these against job descriptions. List them in Skills AND demonstrate them in Experience bullets.",
      category: "Keywords",
    },
    {
      label: "Broad tech coverage (10+)",
      pass: uniqueTech >= 10,
      tip: "Top tech resumes mention 10+ unique technologies. Cover your languages, frameworks, databases, cloud, and tools. Skills in context rank higher than skills in lists.",
      category: "Keywords",
    },
    {
      label: "Deep tech expertise (15+)",
      pass: uniqueTech >= 15,
      tip: "Senior roles should show 15+ unique technologies. Include DevOps tools, monitoring, testing frameworks â€” not just languages and frameworks.",
      category: "Keywords",
    },
    {
      label: `Soft skills mentioned (${softCount})`,
      pass: softCount >= 2,
      tip: "Mention 2+ soft skills naturally: 'Led cross-functional team' (leadership + collaboration). WEF 2025 top skills: analytical thinking, resilience, adaptability.",
      category: "Keywords",
    },
    {
      label: `No buzzword overload (${buzzCount})`,
      pass: buzzCount <= 2,
      tip: `Found ${buzzCount} buzzwords like 'ninja', 'rockstar', 'synergy'. Remove them â€” recruiters and modern ATS penalize fluff. Replace with evidence.`,
      category: "Keywords",
    },
    {
      label: `Industry terms (${industryTerms})`,
      pass: industryTerms >= 3,
      tip: "Use 3+ industry terms (ROI, KPI, SLA, CI/CD, sprint, backlog, etc.). This signals domain knowledge. Modern ATS uses semantic matching against industry taxonomies.",
      category: "Keywords",
    },
    {
      label: "No keyword stuffing",
      pass: stuffedWords === 0,
      tip:
        stuffedWords > 0
          ? `${stuffedWords} words appear 6+ times. ATS detects and penalizes unnatural repetition. EDLIGO found 67% rejection rate for keyword-stuffed resumes.`
          : "No keyword stuffing detected. Keywords appear at natural frequency.",
      category: "Keywords",
    },

    // â•â•â• CREDENTIALS (4) â•â•â•
    {
      label: "Degree listed",
      pass: DEGREES.test(content),
      tip: "List your degree: 'B.S. Computer Science, MIT, 2019'. Include abbreviation AND full name for ATS compatibility. Even bootcamp diplomas help.",
      category: "Credentials",
    },
    {
      label: "Certification or license",
      pass: CERTIFICATIONS.test(content),
      tip: "Add relevant certifications (AWS Certified, PMP, CKA, CompTIA, etc.). 100% of recruiters use knockout filters for required certs (Enhancv 2025).",
      category: "Credentials",
    },
    {
      label: `Job titles present (${titleCount})`,
      pass: titleCount >= 2,
      tip: "Include clear job titles for each role. Use standard titles ATS recognizes: 'Senior Software Engineer' not 'Code Wizard' or 'Innovation Lead'.",
      category: "Credentials",
    },
    {
      label: "Recent dates (2023+)",
      pass: /202[3-9]|203\d|present|current/i.test(content),
      tip: "Modern ATS applies recency bias â€” recent experience is weighted more heavily. Make sure your current/latest role shows dates from 2023 or later.",
      category: "Credentials",
    },

    // â•â•â• ATS FORMATTING (8) â•â•â•
    {
      label: "No emojis or special icons",
      pass: !/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]|[â˜…â—â—†â–ªâ–ºâ†’âœ“âœ—âœ”âœ˜â˜‘â˜âš¡ðŸ”¥ðŸ’¡ðŸš€ðŸŽ¯ðŸ“ŒðŸ ðŸ“§ðŸ“±ðŸ’¼ðŸŽ“â­â™¦â™£â™ â™¥â€¢â€£âƒâˆ™]/u.test(
        content,
      ),
      tip: "Remove all emojis and decorative icons. ATS parsers render them as garbled characters or skip the entire line. Use plain text only.",
      category: "Formatting",
    },
    {
      label: "No tables (parsing risk)",
      pass: !/\bgrid-cols-[2-9]\b|\bcolumn-count\b|<table[\s>]|\\begin\{tabular\}/i.test(
        content,
      ),
      tip: "Remove all tables. EDLIGO found 23% of rejections are from parsing errors caused by tables, columns, and graphics. Single-column = 93% parsing accuracy.",
      category: "Formatting",
    },
    {
      label: "Single-column layout",
      pass: !/\bgrid-cols-[2-9]\b|\bcolumns?:\s*[2-9]\b/i.test(content),
      tip: "Use a single-column layout. Two-column resumes drop to 86% parsing accuracy (EDLIGO 2025). ATS may read columns left-right, scrambling your content.",
      category: "Formatting",
    },
    {
      label: "No embedded images",
      pass: !/<img[^>]*>|\\includegraphics/i.test(
        content.replace(/{{img-[^}]+}}/g, ""),
      ),
      tip: "Remove photos and graphics from your resume. ATS can't read images, and 88% of UK employers reject resumes with photos (anti-discrimination).",
      category: "Formatting",
    },
    {
      label: "Standard fonts",
      pass: !/\b(comic\s*sans|papyrus|impact|brush\s*script|curlz|jokerman|chiller)\b/i.test(
        lower,
      ),
      tip: "Use standard fonts: Calibri, Arial, Garamond, Georgia, Helvetica. Decorative fonts may convert to garbled characters during ATS parsing.",
      category: "Formatting",
    },
    {
      label: "Clean structure (no scripts)",
      pass: !/(<script|javascript:|onclick|onerror|onload|eval\()/i.test(
        content.replace(/tailwindcss|tailwind\.config/gi, ""),
      ),
      tip: "Remove any inline JavaScript or event handlers. ATS strips these and may flag your resume as corrupted.",
      category: "Formatting",
    },
    {
      label: `Skills list not overstuffed (${skillTokens})`,
      pass: skillTokens <= 25,
      tip:
        skillTokens > 25
          ? `You have ${skillTokens} items in your skills section. EDLIGO found 67% rejection rate for 20+ separate skills. Keep under 25, integrate the rest into experience bullets.`
          : "Skills section size is good. Keep it focused â€” quality over quantity.",
      category: "Formatting",
    },
    {
      label: "Valid URL format",
      pass:
        !/(https?:\/\/[^\s"'>]+)/.test(content) ||
        /https?:\/\/[\w.-]+\.\w{2,}(\/[\w./?#&=-]*)?/.test(content),
      tip: "Make sure all URLs are complete and valid (https://linkedin.com/in/yourname). Broken URLs get stripped by ATS and waste space.",
      category: "Formatting",
    },

    // â•â•â• LENGTH & DENSITY (4) â•â•â•
    {
      label: `Word count: ${wc}`,
      pass: wc >= 250,
      tip:
        wc < 250
          ? `Only ${wc} words. Most competitive resumes are 350-700 words. Add more achievement bullets, expand your skills, or include a projects section.`
          : `${wc} words is a good foundation. Keep refining content quality.`,
      category: "Length",
    },
    {
      label: "Sufficient depth (350+)",
      pass: wc >= 350,
      tip:
        wc < 350
          ? "Under 350 words looks thin. Each role should have 3-6 bullets with specific achievements. Add quantified results and technical details."
          : "Good depth â€” your resume has enough content for ATS to extract meaningful data.",
      category: "Length",
    },
    {
      label: "Not overlong (<1000 words)",
      pass: wc <= 1000,
      tip:
        wc > 1000
          ? `At ${wc} words, your resume is too long. NovorÃ©sumÃ© recommends under 3 pages. Cut old roles to 2 bullets, remove anything older than 10-15 years.`
          : "Length is within range. Recruiters spend 6-8 seconds on initial scan â€” every word should earn its place.",
      category: "Length",
    },
    {
      label: "Good information density",
      pass: wc > 0 && metricCount / (wc / 100) >= 0.5,
      tip:
        wc > 0 && metricCount / (wc / 100) < 0.5
          ? `Only ${(metricCount / (wc / 100)).toFixed(1)} metrics per 100 words. Aim for 0.5+. Replace vague bullets with quantified achievements.`
          : "Good metric density â€” your resume is evidence-rich, which modern ATS rewards with higher ranking scores.",
      category: "Length",
    },
  ];

  const passed = checks.filter((c) => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);

  return { checks, score };
}
