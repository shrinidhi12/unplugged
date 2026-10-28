"""Tag each Off Tech listing with one activity type and summarize per venue.

Keyword tagging is imperfect; activity_overrides.csv corrects single events.
Run directly to see the per-venue summary and the untagged ("Other") events.
"""
import re, collections, csv, json, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from data import rows, V
ACTS = [ # (tag, regex on lowercased event name) — first match wins
 ("Luddite Club meetups", r"luddite club(?! doc)|^luddite club"),
 ("Outreach & tabling", r"tabling|say hi"),
 ("Support groups", r"addicts anonymous|itaa|office hours|appstinence|psychiatrist"),
 ("Reading, poetry & book clubs", r"poetry|poetry project|book club|bring your own book|byob|boyb|quiet reading|silent reading|read-in|reading series|mass reading|howl|offline book|study group|study circle|poetry today|book clubbing|song of myself|whitman|odyssey|reading"),
 ("Book launches & talks", r"book launch|launch party.*attensity|attensity|talk|lecture|conversation|discussion|assembly|salon|panel|evening with|haidt|tim wu|extraction economy|q&a|decide|expertise|tedx|trial of|newsreel|news & brews|data disappears|devotion|doctorow|enshittification|turkle|morrison|bezos|paul chan|ludd club doc|conference|should we get off|reality check|kill the internet|friends of attention|moving offline|history lesson|attention harvest|radical imagination|tech justice|4\.6 billion|google in real life|pops: history|conflict lab|ai & environmental"),
 ("Teach-ins & workshops", r"teach-in|teach in|workshop|training|train-the-trainer|facilitat|101|201|class|intro to|how to|seminar|school|defense against|creatives|organizer meetup|organizing|calendar|press conference|meeting"),
 ("Attention Labs (SoRA)", r"attention lab|sidewalk study|study corps|poetry intervention|eye-?catch|sanctuary salon|radical attention|sora|opening reception|dark flow|vessels|chaos & order"),
 ("Writing, zines & letters", r"zine|writ|letter|epistolar|postcard|journal|poster"),
 ("Crafts, repair & making", r"craft|sewing|repair|mending|men-ding|stitch|soldering|makerspace|creative coding|computer care|hat making|prop build|art build|tech support|synthesizer|mesh|linux|digital security|cybersecurity|infosec|info security|laptop|ai and you|break up with google|divorcing google|card catalog|datasets|tapestry"),
 ("Music & dance", r"music|jamboree|jam|orchestra|dance|contra|cdny|concert|record release|dj|soup sets|spotify|mix tape|songwrit|circlesing|radio|rips|disorientation|swing|swap"),
 ("Film & screenings", r"screening|film|ghost in the machine|anna by|premiere|speakeasy|movie|watching"),
 ("Art & performance", r"gallery|exhibition|expo|art|theatre|theater|performance|puppet|clown|mim|comedy|show|press play|figure drawing|life drawing|landscape|fashion|play\b|play-in|protocol|vermin|living room|foot|weave|instructions on getting lost|paper route|giorno|bright five"),
 ("Protests & actions", r"protest|delete day|shitphone|s\.h\.i\.t|screenmime|day of action|closed ai|chatgtfo|buy nothing|post-conference action|opt out|spooky walk|flash mob|ludds in d|retooling|pride|stupid|candidate|quiet|nyc mesh"),
 ("Moon rituals & meditation", r"moon|meditation|ritual|equinox|druid|ceremony|deep listening|group hug|not one|sunset in silence|naming|mass for"),
 ("Walks, hikes & nature", r"hike|walk|bird|nature|cleanup|clean up|trash|molting|leafing|ecology|tree|corvid|soil|field trip|get lost|beach|creature|sunset|trephelobia|landscape"),
 ("Games & play", r"game|play|treasure|scavenger|multiplayer|mario|pattern recognition|capture the future|field day|meet cute|dating|ludd lover|rizz|flirtation"),
 ("Parties & socials", r"party|potluck|lunch|kookout|celebration|bash|mixer|picnic|cafe night|launch|get off together|social|hang out|tonight|mania|infrastructure|junction|we are already gathered|month offline|distro|public service|rat city|gunk|flea|tea|airplane mode|phone-free adelphi|no lights|escape the internet|event event|open house|science fair|christmas presence|jews on time|still going|ihatemyphone|live texting|lunacy|dark"),
]
def series(ev):
    s=re.sub(r"\s*[\(\[].*?[\)\]]","",ev)
    s=re.sub(r"^(SoRA (?!at)|NYPL |SNFL )","",s)
    s=re.sub(r"\s*[:—-]\s*.*$","",s) if re.match(r"(?i)(offline book club|attention lab|sidewalk study|nypl offline book club|monthly molting|study corps|unplatform|letter writing|communal letter|anna by the window|cdny)",s) else s
    s=s.replace('"','').strip("'").replace("Chrxch","Chxrch").replace(" w/ Rev. Billy","").strip()
    return re.sub(r"\s+"," ",s).lower().capitalize() if s.isupper() else s

def load_overrides(path=HERE/"activity_overrides.csv"):
    """event name -> activity. Matches the listed name or its series name, ignoring case."""
    if not path.exists(): return {}
    with open(path,encoding="utf-8",newline="") as f:
        out={r["event"].strip().lower():r["activity"].strip() for r in csv.DictReader(f) if r.get("event")}
    known={t for t,_ in ACTS}|{"Other"}
    bad=[a for a in out.values() if a not in known]
    if bad: sys.exit(f"activity_overrides.csv: unknown activity {bad[0]!r}. Use one of: {', '.join(sorted(known))}")
    return out
OVERRIDES=load_overrides()

def tag(ev):
    for k in (ev.lower(), series(ev).lower()):
        if k in OVERRIDES: return OVERRIDES[k]
    e=ev.lower()
    for t,rx in ACTS:
        if re.search(rx,e): return t
    return "Other"

def summarize(R=None):
    """venue name -> dict(acts=top 3 [(tag,n)], all={tag:n}, series=top 3 [(name,n)], n)."""
    R=R if R is not None else rows()
    out={}; other=collections.Counter()
    for r in R:
        if r['vcode'].startswith('N:'): continue
        name=V[r['vcode']][0]
        o=out.setdefault(name,{'acts':collections.Counter(),'series':collections.Counter(),'seen':set()})
        key=(series(r['event']).lower(),r['date'])
        if key in o['seen']: continue
        o['seen'].add(key); o.setdefault('ev',[]).append((r['date'],series(r['event'])))
        t=tag(r['event']); o['acts'][t]+=1; o['series'][series(r['event'])]+=1
        if t=="Other": other[r['event']]+=1
    res={}
    for v,o in out.items():
        n=sum(o['acts'].values())
        acts=[(t,c) for t,c in o['acts'].most_common() if t!="Other"][:3]
        ser=[(s,c) for s,c in o['series'].most_common(3) if c>1]
        for d,e in sorted(o['ev'],reverse=True):
            if len(ser)>=3: break
            if e not in [x[0] for x in ser]: ser.append((e,o['series'][e]))
        res[v]=dict(acts=acts,all={t:c for t,c in o['acts'].items() if t!="Other"},series=ser[:3],n=n)
    return res, other

if __name__ == "__main__":
    res, other = summarize()
    print("Other:",other.most_common(40))
    for v in ["Tompkins Square Park","Strother School of Radical Attention (SoRA)","Prospect Park (incl. Boathouse, Fallkill Falls, Rose Garden)","Fort Greene Park"]:
        print(v, res[v])
