# Venue references extracted from all 27 NYC Off Tech issues (Oct 2025 - Oct 2026).
# One row = one event listing in one issue (a recurring series listed within an issue counts once,
# dated to its last listed occurrence). "N:<hood>" = undisclosed address, neighborhood only.

ISSUES = {
 "I01": ("2025-10-02", "NYC Off Tech — OCTOBER (2025)", "nyc-off-tech-october"),
 "I02": ("2025-10-17", "NYC Off Tech Mid-October Updates (2025)", "nyc-off-tech-mid-october-updates"),
 "I03": ("2025-11-01", "NYC Off Tech — NOVEMBER", "nyc-off-tech-november"),
 "I04": ("2025-11-14", "NYC Off Tech Mid-November Updates", "nyc-off-tech-mid-november-updates"),
 "I05": ("2025-12-01", "NYC Off Tech — DECEMBER", "nyc-off-tech-december"),
 "I06": ("2025-12-13", "NYC Off Tech — Mid-December Updates", "nyc-off-tech-mid-december-updates"),
 "I07": ("2026-01-02", "NYC Off Tech — JANUARY", "nyc-off-tech-january"),
 "I08": ("2026-01-16", "NYC Off Tech — Mid-January Updates", "nyc-off-tech-mid-january-updates"),
 "I09": ("2026-02-02", "NYC Off Tech — FEBRUARY", "nyc-off-tech-february"),
 "I10": ("2026-02-17", "NYC Off Tech — Mid-February Updates", "nyc-off-tech-mid-february-updates"),
 "I11": ("2026-03-02", "NYC Off Tech — MARCH", "nyc-off-tech-march"),
 "I12": ("2026-03-18", "NYC Off Tech — Mid-March Updates", "nyc-off-tech-mid-march-updates"),
 "I13": ("2026-04-02", "NYC Off Tech — APRIL", "nyc-off-tech-april"),
 "I14": ("2026-04-17", "NYC Off Tech — Mid-April Updates", "nyc-off-tech-mid-april-updates"),
 "I15": ("2026-05-01", "NYC Off Tech — MAY", "nyc-off-tech-may"),
 "I16": ("2026-05-19", "NYC Off Tech — Mid-May Updates", "nyc-off-tech-mid-may-updates"),
 "I17": ("2026-06-01", "NYC Off Tech — JUNE", "nyc-off-tech-june"),
 "I18": ("2026-06-14", "NYC Off Tech — Mid-June Updates", "nyc-off-tech-mid-june-updates"),
 "I19": ("2026-06-20", "Summer of Ludd Schedule", "summer-of-ludd-schedule"),
 "I20": ("2026-07-03", "We can have this all summer", "we-can-have-this-all-summer"),
 "I21": ("2026-07-11", "NYC Off Tech — Mid-July Updates", "nyc-off-tech-mid-july-updates"),
 "I22": ("2026-08-01", "NYC Off Tech — AUGUST", "nyc-off-tech-august"),
 "I23": ("2026-08-15", "NYC Off Tech — Mid-August Updates", "nyc-off-tech-mid-august-updates"),
 "I24": ("2026-09-01", "NYC Off Tech — SEPTEMBER", "nyc-off-tech-september"),
 "I25": ("2026-09-14", "NYC Off Tech — Mid-September Updates", "nyc-off-tech-mid-september-updates"),
 "I26": ("2026-10-01", "NYC Off Tech — OCTOBER (2026)", "nyc-off-tech-october-26"),
 "I27": ("2026-10-16", "NYC Off Tech — Mid-October Updates (2026)", "nyc-off-tech-mid-october-updates-26"),
}

# code -> (canonical name, area/address, type)
V = {
 "TSP": ("Tompkins Square Park", "East Village, Manhattan", "Park / public space"),
 "WSP": ("Washington Square Park", "Greenwich Village, Manhattan", "Park / public space"),
 "FGP": ("Fort Greene Park", "Fort Greene, Brooklyn", "Park / public space"),
 "PP": ("Prospect Park (incl. Boathouse, Fallkill Falls, Rose Garden)", "Brooklyn", "Park / public space"),
 "MSP": ("Madison Square Park", "Flatiron, Manhattan", "Park / public space"),
 "MCG": ("McGolrick Park", "Greenpoint, Brooklyn", "Park / public space"),
 "GOV": ("Governors Island", "Manhattan", "Park / public space"),
 "BPL": ("Brooklyn Public Library – Central Library", "Grand Army Plaza, Brooklyn", "Library"),
 "SNFL": ("Stavros Niarchos Foundation Library (NYPL)", "Midtown, Manhattan", "Library"),
 "JEFF": ("Jefferson Market Library (NYPL)", "Greenwich Village, Manhattan", "Library"),
 "WBLIB": ("Williamsburgh Library (BPL)", "240 Division Ave, Williamsburg", "Library"),
 "RIDGEWOODLIB": ("Ridgewood Library (QPL)", "Ridgewood, Queens", "Library"),
 "BHLIB": ("Brooklyn Heights Library (BPL)", "Brooklyn Heights", "Library"),
 "FDS": ("Father Demo Square", "6th Ave & Bleecker, Manhattan", "Park / public space"),
 "SORA": ("Strother School of Radical Attention (SoRA)", "DUMBO, Brooklyn (listed as 'DUMBO')", "Arts / community space"),
 "XR": ("XRoads Cafe Bushwick", "Bushwick, Brooklyn", "Cafe / bar / restaurant"),
 "COL": ("Columbia University (incl. The Forum / Bollinger Forum)", "Morningside Heights, Manhattan", "University"),
 "APPLE": ("Apple Store Fifth Avenue ('the Cube')", "Fifth Ave & Central Park S, Manhattan", "Retail (protest site)"),
 "APPLES": ("Apple Stores (various)", "Citywide", "Retail (protest site)"),
 "ROCK": ("Rockefeller Center", "Midtown, Manhattan", "Park / public space"),
 "875": ("875 Third Ave. (POPS, Lower Level)", "Midtown East, Manhattan", "Park / public space"),
 "TELOS": ("telos.haus", "Brooklyn", "Arts / community space"),
 "FULTON": ("Fulton Hall", "Fort Greene, Brooklyn", "Event venue / club"),
 "BOSHI": ("boshi's place", "East Williamsburg, Brooklyn", "Arts / community space"),
 "MARYLOU": ("Marylou", "East Village, Manhattan", "Cafe / bar / restaurant"),
 "BRYANT": ("Bryant Park", "Midtown, Manhattan", "Park / public space"),
 "KINGSTON": ("Kingston Hall", "Manhattan", "Event venue / club"),
 "PIONEER": ("Pioneer Works", "Red Hook, Brooklyn", "Arts / community space"),
 "TJB": ("T.J. Byrnes", "77 Fulton St., FiDi, Manhattan", "Cafe / bar / restaurant"),
 "LLAMA": ("Hungry Llama", "Manhattan", "Cafe / bar / restaurant"),
 "STMARKS": ("St. Mark's Church in-the-Bowery", "East Village, Manhattan", "Church / meeting house"),
 "BABYS": ("Baby's All Right", "Williamsburg, Brooklyn", "Event venue / club"),
 "PT": ("P&T Knitwear", "Lower East Side, Manhattan", "Bookstore"),
 "JUDSON": ("Judson Memorial Church", "Greenwich Village, Manhattan", "Church / meeting house"),
 "VERCI": ("Verci Flatiron", "Flatiron, Manhattan", "Cafe / bar / restaurant"),
 "222": ("222 Bowery (Giorno Poetry Systems)", "Bowery, Manhattan", "Arts / community space"),
 "SJNY": ("SJNY", "Manhattan", "Arts / community space"),
 "WONDER": ("Wonderville", "Bushwick, Brooklyn", "Cafe / bar / restaurant"),
 "UNDERLAND": ("Underland Gallery", "Bay Ridge, Brooklyn", "Gallery / museum"),
 "NYU": ("NYU School of Law – Vanderbilt Hall (incl. Greenberg Lounge)", "Greenwich Village, Manhattan", "University"),
 "NC101": ("Nightclub 101", "Manhattan", "Event venue / club"),
 "INDEXCT": ("Index Chinatown", "Chinatown, Manhattan", "Arts / community space"),
 "INDEXGP": ("Index Greenpoint", "Greenpoint, Brooklyn", "Arts / community space"),
 "JADE": ("JADE", "Brooklyn", "Event venue / club"),
 "INTERF": ("Interference Archive", "Gowanus, Brooklyn", "Arts / community space"),
 "MAYDAY": ("Mayday Space", "Bushwick, Brooklyn", "Arts / community space"),
 "RISO": ("Secret Riso Club", "Brooklyn", "Arts / community space"),
 "TNS": ("The New School (incl. TNS Black Box Theatre)", "Greenwich Village, Manhattan", "University"),
 "LIFEWORLD": ("LIFEWORLD", "Manhattan", "Arts / community space"),
 "RIZZOLI": ("Rizzoli Bookstore", "NoMad, Manhattan", "Bookstore"),
 "QUAKER": ("15th Street Quaker Meeting House (15 Rutherford Pl.)", "Stuyvesant Square, Manhattan", "Church / meeting house"),
 "MTPROSPECT": ("Mount Prospect Park", "Prospect Heights, Brooklyn", "Park / public space"),
 "ZUCC": ("Zuccotti Park", "FiDi, Manhattan", "Park / public space"),
 "WHITNEY": ("Whitney Museum (Biennial)", "Meatpacking, Manhattan", "Gallery / museum"),
 "NAD": ("National Academy of Design (NoAD)", "Manhattan", "Gallery / museum"),
 "Q96": ("96 St. Q Station (Quiet Q Train)", "Upper East Side, Manhattan", "Transit"),
 "CROWNINN": ("The Crown Inn", "Crown Heights, Brooklyn", "Cafe / bar / restaurant"),
 "BBP": ("Brooklyn Bridge Park", "Brooklyn", "Park / public space"),
 "EDGE": ("Edge Studio", "Manhattan", "Arts / community space"),
 "PEACE": ("Peace Cafe", "Brooklyn", "Cafe / bar / restaurant"),
 "LOOKUP": ("The Look Up", "Brooklyn", "Event venue / club"),
 "METROROCK": ("MetroRock Bushwick", "Bushwick, Brooklyn", "Event venue / club"),
 "HVK": ("Herbert Von King Park", "Bed-Stuy, Brooklyn", "Park / public space"),
 "FUTURESPACE": ("Future Space Studios", "Ridgewood, Queens", "Arts / community space"),
 "MESH": ("53 Bridge St. (NYC Mesh)", "DUMBO, Brooklyn", "Arts / community space"),
 "BKBREW": ("Brooklyn Brewery", "Williamsburg, Brooklyn", "Cafe / bar / restaurant"),
 "SDR": ("Sara D. Roosevelt Park", "Lower East Side, Manhattan", "Park / public space"),
 "MOMI": ("Museum of the Moving Image", "Astoria, Queens", "Gallery / museum"),
 "BENCH": ("The Bench", "Manhattan", "Cafe / bar / restaurant"),
 "HUNTERS": ("Hunters Point South Park", "Long Island City, Queens", "Park / public space"),
 "BRIC": ("BRIC", "Fort Greene, Brooklyn", "Arts / community space"),
 "AMELIAS": ("Amelia's", "Brooklyn", "Cafe / bar / restaurant"),
 "TRANSPECOS": ("TransPecos", "Ridgewood, Queens", "Event venue / club"),
 "STUDIODEM": ("Studio Dem", "Brooklyn", "Gallery / museum"),
 "CRYSTAL": ("Crystal Lake", "Williamsburg, Brooklyn", "Cafe / bar / restaurant"),
 "LALINS": ("Lalin's", "Brooklyn", "Cafe / bar / restaurant"),
 "LAPLAZA": ("La Plaza Cultural", "East Village, Manhattan", "Park / public space"),
 "MARIAH": ("Maria Hernandez Park", "Bushwick, Brooklyn", "Park / public space"),
 "177": ("177 Prince St. (Museum of Interesting Things)", "SoHo, Manhattan", "Gallery / museum"),
 "180": ("180 Maiden Lane (POPS)", "FiDi, Manhattan", "Park / public space"),
 "6365": ("63 5th Ave. (Palantir action)", "Greenwich Village, Manhattan", "Retail (protest site)"),
 "ELJARDIN": ("El Jardín (710 E. 5th St.)", "East Village, Manhattan", "Park / public space"),
 "STUY": ("Stuyvesant Park", "Stuyvesant Square, Manhattan", "Park / public space"),
 "MORUS": ("Museum of Reclaimed Urban Space (MoRUS)", "East Village, Manhattan", "Gallery / museum"),
 "LITTLEISLAND": ("Little Island", "Hudson River Park, Manhattan", "Park / public space"),
 "BEACH90": ("Beach 90th St., Rockaway", "Rockaway, Queens", "Park / public space"),
 "NUBLU": ("Nublu", "East Village, Manhattan", "Event venue / club"),
 "CP106": ("Central Park (106th St & CPW)", "Manhattan", "Park / public space"),
 "CLEMENTE": ("The Clemente", "107 Suffolk St., Lower East Side", "Arts / community space"),
 "ROOSEVELT": ("Roosevelt Island", "Manhattan", "Park / public space"),
 "GREENOASIS": ("Green Oasis Community Garden", "East Village, Manhattan", "Park / public space"),
 "CLASSON": ("Classon Playground", "Bed-Stuy, Brooklyn", "Park / public space"),
 "BAM": ("BAM Rose Cinemas", "Fort Greene, Brooklyn", "Event venue / club"),
 "UNDERSTMARKS": ("Under St. Marks", "East Village, Manhattan", "Event venue / club"),
 "WOODBINE": ("Woodbine (414 Broadway, 3rd Fl.)", "Chinatown/SoHo, Manhattan", "Arts / community space"),
 "CDNY520": ("520 8th Ave., 3rd Fl. (CDNY)", "Midtown, Manhattan", "Arts / community space"),
 "DENIZEN": ("Denizen Theatre", "New Paltz, NY", "Event venue / club"),
 "LIGHTNING": ("Lightning Society Lofts", "Brooklyn", "Arts / community space"),
 "HUDSON": ("Hudson Highlands State Park", "Cold Spring, NY", "Park / public space"),
 "CORNER": ("Cornerstone Makerspace (incl. Little City Studio)", "178 Bennett Ave., Washington Heights", "Arts / community space"),
 "CAPITOL": ("U.S. Capitol", "Washington, D.C.", "Park / public space"),
 "NEWTOWN": ("Newtown Radio", "262 Meserole St., East Williamsburg", "Arts / community space"),
 "BONDST": ("9 Bond St., 4th Fl. (Alex House Project)", "Downtown Brooklyn", "Arts / community space"),
 "ITAA208": ("208 W 13th St. (ITAA meeting)", "West Village, Manhattan", "Arts / community space"),
 "BARNARD": ("Movement Lab at Barnard", "Morningside Heights, Manhattan", "University"),
 "CASSETTE": ("Cassette", "Brooklyn", "Event venue / club"),
 "PRODUCERS": ("Producers Club", "Midtown, Manhattan", "Event venue / club"),
 "TORST": ("TØRST Greenpoint", "Greenpoint, Brooklyn", "Cafe / bar / restaurant"),
 "BOOKCLUBBAR": ("Book Club Bar", "East Village, Manhattan", "Bookstore"),
 "SULTAN": ("The Sultan Room (incl. Rooftop)", "Bushwick, Brooklyn", "Event venue / club"),
 "FTILDEN": ("Fort Tilden", "Rockaway, Queens", "Park / public space"),
 "AMANT": ("Amant", "East Williamsburg, Brooklyn", "Gallery / museum"),
 "VERSO": ("Verso Books", "207 32nd St., Brooklyn", "Bookstore"),
 "BBG": ("Brooklyn Botanic Garden", "Brooklyn", "Park / public space"),
 "157E37": ("157 E 37th St. (POPS)", "Murray Hill, Manhattan", "Park / public space"),
 "BEACON": ("The Beacon", "Beacon, NY", "Event venue / club"),
 "JALOPY": ("Jalopy Theatre", "Red Hook, Brooklyn", "Event venue / club"),
 "MILMUNDOS": ("Mil Mundos Books", "Bushwick, Brooklyn", "Bookstore"),
 "DORRIANS": ("Dorrian's Red Hand", "2nd Ave & 84th St., Manhattan", "Cafe / bar / restaurant"),
 "ERIE": ("Erie Basin Park", "Red Hook, Brooklyn", "Park / public space"),
 "PLAYERS": ("The Players Club", "16 Gramercy Park S., Manhattan", "Event venue / club"),
 "GCT": ("Grand Central Terminal", "Midtown, Manhattan", "Transit"),
 "HUNTER": ("Hunter College", "Upper East Side, Manhattan", "University"),
 "BEARDED": ("Bearded Lady", "Prospect Heights, Brooklyn", "Cafe / bar / restaurant"),
 "CHURCHVILLAGE": ("Church of the Village (CDNY dances)", "West Village, Manhattan", "Church / meeting house"),
 "MCCARREN": ("McCarren Park", "Williamsburg/Greenpoint, Brooklyn", "Park / public space"),
 "197EB": ("197 E Broadway, 6th Fl.", "Lower East Side, Manhattan", "Arts / community space"),
 "TANE": ("Tane Poetry Library (Walt Whitman Initiative)", "91 South St., Manhattan", "Library"),
 "ACCORD": ("Gel Conference venue", "Accord, NY", "Event venue / club"),
 "OPENSOURCE": ("Open Source Gallery", "Brooklyn", "Gallery / museum"),
 "SOUTHOXFORD": ("South Oxford Space", "Fort Greene, Brooklyn", "Arts / community space"),
 "STRAND": ("The Strand (Rare Book Room)", "828 Broadway, Manhattan", "Bookstore"),
 "GREENLIGHT": ("Greenlight Bookstore", "Brooklyn", "Bookstore"),
 "GARNET": ("Garnet", "Manhattan", "Cafe / bar / restaurant"),
 "MAGENTA": ("Magenta Plains", "Manhattan", "Gallery / museum"),
 "PETES": ("Pete's Candy Store", "Williamsburg, Brooklyn", "Cafe / bar / restaurant"),
 "ALLSOULS": ("All Souls Unitarian Church", "1157 Lexington Ave., Manhattan", "Church / meeting house"),
 "GREENWOOD": ("Green-Wood Cemetery", "Brooklyn", "Park / public space"),
 "MANHBRIDGE": ("Manhattan Bridge (Manhattan side)", "Manhattan", "Park / public space"),
 "WEBSTER": ("Webster Hall", "East Village, Manhattan", "Event venue / club"),
 "PRIME": ("Prime Produce", "Hell's Kitchen, Manhattan", "Arts / community space"),
 "100SUTTON": ("100 Sutton St.", "Greenpoint, Brooklyn", "Event venue / club"),
 "CAVEAT": ("Caveat", "Lower East Side, Manhattan", "Event venue / club"),
 "CAMPFRIEND": ("Camp Friendship", "Park Slope, Brooklyn", "Arts / community space"),
 "RODEO": ("Rodeo (1134 President St.)", "Crown Heights, Brooklyn", "Cafe / bar / restaurant"),
 "COLLIDER": ("Collider NYC", "Manhattan", "Arts / community space"),
 "215": ("215th St. Stairs", "Inwood, Manhattan", "Park / public space"),
 "136MILTON": ("136 Milton St.", "Greenpoint, Brooklyn", "Arts / community space"),
}

# Host normalization
H = {
 "SoRA": "School of Radical Attention (SoRA)",
 "Study": "SoRA Study Corps",
 "NYPLBC": "NYPL Offline Book Club",
 "NYPL": "NYPL / SNFL",
 "Kyle": "Kyle Barnes / Chimeras Collective",
 "Connor": "Connor Griffin",
 "Phil": "Phil Nguyen",
 "Rebecca": "Rebecca Lipsitch (How Do We Play)",
 "Dan": "Dan Fox (Phone-Free Adelphi)",
 "Dan Fox": "Dan Fox (Phone-Free Adelphi)",
 "SoL": "Summer of Ludd",
 "Earth": "Earth Chxrch (Rev. Billy)",
 "AugAndy": "August Lamm & Andy Henley",
 "Aug": "August Lamm",
 "Unplat": "Unplatform",
 "BLC": "Brooklyn Luddite Club",
 "LC": "Luddite Club (The Ludds)",
 "Corner": "Cornerstone Makerspace",
 "MO": "Month Offline",
 "LGOT": "NYC offline community (Let's Get Off Together)",
 "OffTech": "NYC Off Tech organizers",
 "Amalia": "Amalia Mayorga",
 "Mesh": "NYC Mesh",
 "ITAA": "Internet & Tech Addicts Anonymous",
 "Boshi": "boshi's place",
 "CyPurr": "CyPurr Collective",
 "Baggy": "BAGGYSUIT",
 "Trail": "NY-NJ Trail Conference (Hudson Valley Trail Stewards)",
 "Koll": "Koll",
 "Josh": "Josh",
 "CDNY": "CDNY",
 "Newsreel": "Newsreel",
 "BP": "Burner Phone",
 "Colin": "Colin Yaccarino",
 "Kelner": "Nicole Kelner & Rizzoli New York",
}

def h(x):
    return H.get(x, x)

RAW = """
I01|Reconnect Phone-Free Field Trip|2025-10-04|GOV|Reconnect
I01|McGolrick Park Bird Club|2025-10-25|MCG|
I01|Community-Building Meditation|2025-10-27|N:Crown Heights|Phil
I01|SoRA Attention Lab "COALITION"|2025-10-07|SORA|SoRA
I01|Harvest Moon Party|2025-10-07|FGP|Kyle
I01|ENSHITTIFICATION w/ Cory Doctorow & Lina Khan|2025-10-09|BPL|
I01|DELETE DAY|2025-10-10|TSP|Time to Refuse
I01|Attention Potlucks|2025-10-24|N:Crown Heights|Connor
I01|BOYB: Bring Your Own Book|2025-10-23|N:Crown Heights|Connor
I01|'Monthly Molting' Ecology Workshop|2025-10-19|PP|
I01|Come Say Hi to Friend AI|2025-10-19|FDS|
I01|Offline Book Club: Superbloom|2025-10-23|SNFL|NYPLBC
I01|Pop-Up Spooky Walk|2025-10-31|TSP|
I01|RETOOLING|2025-11-01|N:Williamsburg|
I01|Say Hi IRL (tabling)|2025-10-14|WSP|OffTech
I02|Come Say Hi to Friend AI|2025-10-19|FDS|
I02|Pop-Up Spooky Walk|2025-10-31|TSP|
I02|RETOOLING|2025-11-01|MSP|
I03|RETOOLING|2025-11-01|MSP|
I03|SoRA Attention Lab "COALITION"|2025-11-02|SORA|SoRA
I03|Intentional Tech Use: Community Discussion|2025-11-02|XR|Logina Mostafa & Connor Griffin
I03|You Don't Need a Smartphone|2025-11-06|WSP|August Lamm & friends
I03|PSYCHIATRIST & SNACKS|2025-11-06|N:Bushwick|Rebecca
I03|New Luddism conference|2025-11-07|COL|
I03|Beaver Moon Party|2025-11-07|N:Park Slope|Kyle
I03|ScreenMime|2025-11-08|APPLE|
I03|M.A.G.L.A.R.&O!|2025-11-09|N:Crown Heights|M.A.G.L.A.R.O!
I03|Study Corps: Poetry Intervention|2025-11-11|ROCK|Study
I03|BE A NEW YORKER 101|2025-11-15|TSP|Lamp Club
I03|Passion Party: Parallel Play|2025-11-18|N:Bushwick|Rebecca
I03|SoRA Train-the-Trainer|2025-11-19|SORA|SoRA
I03|Offline Book Club: Filterworld|2025-11-20|SNFL|NYPLBC
I03|Attention Lab SANCTUARY|2025-11-20|SORA|SoRA
I03|'Monthly Molting' Ecology Workshop|2025-11-23|PP|Kyle
I03|BUY NOTHING DAY|2025-11-28|TSP|
I03|Spotify Deletion Dance Party|2025-12-06|BOSHI|
I03|McGolrick Park Bird Club|2025-11-29|MCG|
I03|Awareness-Building Meditation|2025-11-24|N:Crown Heights|Phil
I03|BYOB: Bring Your Own Book|2025-11-25|N:Crown Heights|Connor
I04|SoRA Attention Lab "COALITION"|2025-11-02|SORA|SoRA
I04|ScreenMime|2025-11-08|APPLE|
I04|SHOULD WE GET OFF?|2025-11-14|875|
I04|BE A NEW YORKER 101|2025-11-15|TSP|Lamp Club
I04|Passion Party: Parallel Play|2025-11-18|N:Bushwick|Rebecca
I04|SoRA Train-the-Trainer|2025-11-19|SORA|SoRA
I04|Offline Book Club: Filterworld|2025-11-20|SNFL|NYPLBC
I04|Attention Lab SANCTUARY|2025-11-20|SORA|SoRA
I04|dumb.co Phone-Free Afterparty|2025-11-21|FULTON|dumb.co
I04|Consumption Book Club: Land of Milk and Honey|2025-11-22|TELOS|Consumption Book Club
I04|BUY NOTHING DAY|2025-11-28|TSP|
I04|'Monthly Molting' Ecology Workshop (Ginkgo)|2025-11-30|FGP|Kyle
I05|Sidewalk Study "PLAYING the POLITICAL"|2025-12-01|N:FiDi|Study
I05|HARD RESET Comedy Night|2025-12-02|MARYLOU|Hard Reset
I05|SoRA Attention Lab "COALITION"|2025-12-03|SORA|SoRA
I05|Cold Moon Party|2025-12-04|PP|Kyle
I05|Consumption Book Club: Land of Milk and Honey|2025-12-05|TELOS|Consumption Book Club
I05|Spotify Unwrapped|2025-12-06|BOSHI|boshi's place & Lamp Club
I05|Study Corps: Poetry Intervention|2025-12-06|BRYANT|Study
I05|How Do We Play?: Parallel Play|2025-12-07|N:Bushwick|Rebecca
I05|All Tech Is Human Responsible Tech Mixer|2025-12-08|KINGSTON|All Tech Is Human
I05|Heat Initiative Day of Action|2025-12-09|APPLES|Heat Initiative
I05|Idealist Poetry Showcase|2025-12-12|N:Midtown|Sedona Rose (Listening Lab)
I05|ACTION Potluck|2025-12-12|N:Crown Heights|Connor
I05|Press Play Fair|2025-12-14|PIONEER|Micaela Durand
I05|S.H.I.T.P.H.O.N.E. III|2025-12-13|APPLE|
I05|Monthly Molting: Goose|2025-12-14|PP|Kyle
I05|Social Infrastructure Building|2025-12-14|N:Lower Manhattan|Appstinence
I05|Christmas Presence w/ August Lamm & Andy Henley|2025-12-14|TJB|Aug
I05|Offline Book Club: Mood Machine|2025-12-18|SNFL|NYPLBC
I05|McGolrick Park Bird Club|2025-12-27|MCG|
I05|Awareness-Building Meditation|2025-12-29|N:Crown Heights|Phil
I06|SoRA Attention Lab "COALITION"|2025-12-03|SORA|SoRA
I06|Press Play|2025-12-14|PIONEER|Micaela Durand
I06|S.H.I.T.P.H.O.N.E. III|2025-12-13|APPLE|
I06|Monthly Molting: Goose|2025-12-14|PP|Kyle
I06|REALITY CHECK: Creating a New Normal|2025-12-14|LLAMA|Appstinence
I06|Christmas Presence w/ August Lamm & Andy Henley|2025-12-14|TJB|Aug
I06|BETTER MAN (M.A.G.L.A.R.&O!)|2025-12-17|N:Prospect Heights|M.A.G.L.A.R.O!
I06|Offline Book Club: Mood Machine|2025-12-18|SNFL|NYPLBC
I06|New Year's DELETE DAY|2026-01-03|N:Fort Greene|Dan Fox
I07|Poetry Project New Year's Day Marathon|2026-01-01|STMARKS|The Poetry Project
I07|Poster Party BROOKLYN|2026-01-02|TELOS|SoRA community
I07|New Year's Delete Day|2026-01-03|N:Fort Greene|Dan Fox
I07|Wolf Moon|2026-01-03|N:Park Slope|Kyle
I07|Circle Time (Parallel Play)|2026-01-25|N:Bushwick|Rebecca
I07|Month Offline Begins!|2026-01-05|BABYS|MO
I07|SoRA Attention Lab STUDY|2026-01-07|SORA|SoRA
I07|Poster Party MANHATTAN|2026-01-09|COL|SoRA community
I07|Action Potluck|2026-01-23|N:Crown Heights|Connor
I07|LETTING GO (M.A.G.L.A.R.O!)|2026-01-11|N:Bushwick|M.A.G.L.A.R.O!
I07|ATIH Responsible Tech Mixer|2026-01-12|PT|All Tech Is Human
I07|Awareness-Building Meditation|2026-01-19|N:Greenpoint|Phil
I07|Offline Book Club: Hum|2026-01-15|SNFL|NYPLBC
I07|ATTENSITY! Flash Mob|2026-01-17|WSP|
I07|Appstinence IRL Office Hours|2026-01-18|TELOS|Appstinence
I07|An Evening of Music (Andy & August)|2026-01-18|TJB|AugAndy
I07|ATTENSITY! Launch Party|2026-01-20|JUDSON|Friends of Attention
I07|Zing x Verci Phone-Free Cafe Night|2026-01-21|VERCI|Zing
I07|Event Facilitator Training|2026-01-27|222|OffTech
I08|Circle Time (Parallel Play)|2026-01-25|N:Bushwick|Rebecca
I08|Awareness-Building Meditation|2026-01-19|N:Greenpoint|Phil
I08|SoRA Attention Lab STUDY|2026-01-07|SORA|SoRA
I08|Offline Book Club: Hum|2026-01-15|SNFL|NYPLBC
I08|ATTENSITY! Flash Mob|2026-01-17|WSP|SoRA
I08|Letter Writing Soirée|2026-01-17|N:East Village|Amelia Gorman
I08|Appstinence IRL Office Hours|2026-01-18|TELOS|Appstinence
I08|An Evening of Music (Andy & August)|2026-01-18|TJB|AugAndy
I08|ATTENSITY! Launch Party|2026-01-20|JUDSON|Friends of Attention
I08|Zing x Verci Phone-Free Cafe Night|2026-01-21|VERCI|Zing
I08|The Friends of Attention at SJNY|2026-01-21|SJNY|Friends of Attention
I08|Action Potluck|2026-01-23|N:Crown Heights|Connor
I08|Event Facilitator Training|2026-01-27|222|OffTech
I08|Phone-Free Adelphi|2026-01-28|N:Fort Greene|Dan
I08|Computer Care Café|2026-01-31|N:Crown Heights|Kyle Barnes & Nick Plante
I08|Break Up with Google|2026-02-02|WONDER|Cache Me Outside & CyPurr Collective
I08|THE EXTRACTION ECONOMY (Tim Wu & Julia Angwin)|2026-02-03|COL|
I09|Circle Time (Parallel Play)|2026-02-22|N:Bushwick|Rebecca
I09|Break Up with Google|2026-02-02|WONDER|Cache Me Outside & CyPurr Collective
I09|Event Facilitator Workshop (weekly)|2026-02-24|222|OffTech
I09|THE EXTRACTION ECONOMY (Tim Wu & Julia Angwin)|2026-02-03|COL|
I09|Bay Ridge Figure Drawing|2026-02-03|UNDERLAND|Amanda Hanna-McLeer
I09|Phone-Free Adelphi|2026-02-25|N:Fort Greene|Dan
I09|Attention Lab "STUDY"|2026-02-05|SORA|SoRA
I09|Attention Lab "SANCTUARY"|2026-02-15|SORA|SoRA
I09|Attention Lab "COALITION"|2026-02-24|SORA|SoRA
I09|SNFL Crafternoon|2026-02-27|SNFL|NYPL
I09|Action Potluck|2026-02-21|N:Crown Heights|Connor
I09|Who Should Decide AI's Future?|2026-02-07|NYU|
I09|Requiem for the Home Computer Zine Release|2026-02-08|WONDER|ZineClubNYC
I09|Internet of Shit Teach-In|2026-02-12|WBLIB|
I09|Month Offline Exhibition|2026-02-16|NC101|MO
I09|Giorno Poetry Systems Live Programming Resumes|2026-02-19|222|Giorno Poetry Systems
I09|LET'S GET OFF TOGETHER|2026-02-20|TELOS|LGOT
I09|Games, Art, & Agency|2026-02-26|N:Upper West Side|Colin
I09|Collaborative Meet Cute|2026-02-27|N:Crown Heights|Connor
I09|Technocritical Writers Room|2026-02-25|JEFF|Logan Lane & Damian Thomas
I10|Circle Time (Parallel Play)|2026-02-22|N:Bushwick|Rebecca
I10|Event Facilitator Workshop (weekly)|2026-02-24|222|OffTech
I10|Phone-Free Adelphi|2026-02-25|N:Fort Greene|Dan
I10|Attention Lab STUDY|2026-02-05|SORA|SoRA
I10|Attention Lab SANCTUARY|2026-02-15|SORA|SoRA
I10|SNFL Crafternoon|2026-02-27|SNFL|NYPL
I10|Teaching Creative Tech in the Age of AI|2026-02-17|INDEXCT|
I10|Giorno Poetry Systems Live Programming Resumes|2026-02-19|222|Giorno Poetry Systems
I10|Break Up with Spotify|2026-02-20|JADE|
I10|LET'S GET OFF TOGETHER|2026-02-20|TELOS|LGOT
I10|VESSELS: Cotton King and A.I. God|2026-02-22|SORA|Taeyoon Choi
I10|Attention Lab "COALITION"|2026-02-24|SORA|SoRA
I10|Games, Art, & Agency|2026-02-26|N:Upper West Side|Colin
I10|An Evening of Music (Andy & August)|2026-03-01|TJB|AugAndy
I10|Technocritical Writers Room|2026-02-25|JEFF|Logan Lane & Damian Thomas
I11|'Ditch Spotify' Mix Tape Swap|2026-03-01|INTERF|
I11|An Evening of Music (Phone-Free)|2026-03-01|TJB|AugAndy
I11|Circle Time (Parallel Play)|2026-03-29|N:Bushwick|Rebecca
I11|Month Offline kickoff|2026-03-02|TELOS|MO
I11|Event Facilitator Workshop (weekly)|2026-03-31|222|OffTech
I11|Worm Moon|2026-03-03|N:Park Slope|Kyle
I11|Bay Ridge Figure Drawing|2026-03-03|UNDERLAND|Amanda Hanna-McLeer
I11|Divorcing Google Screening & Teach-In|2026-03-03|MAYDAY|
I11|Phone-Free Adelphi|2026-03-25|N:Fort Greene|Dan
I11|Attention Lab "STUDY"|2026-03-05|SORA|SoRA
I11|Break Up with Spotify|2026-03-05|RISO|Sonic Liberation Devices
I11|SNFL Crafternoon|2026-03-27|SNFL|NYPL
I11|Unplatform: Creatives Workshop|2026-03-21|BPL|Unplat
I11|President Protocol (play)|2026-03-07|TNS|Rodrigo Pocidônio
I11|Sidewalk Study 'RAVE'|2026-03-07|N:Bushwick|Study
I11|Sidewalk Study 'NEW RITUALS'|2026-03-08|N:Chinatown|Study
I11|Kill the Internet IRL|2026-03-10|LIFEWORLD|Kill the Internet coalition
I11|Civic Tech Open Assembly|2026-03-10|INDEXGP|
I11|Quietest Places Book Launch|2026-03-10|RIZZOLI|Nicole Kelner
I11|Sidewalk Study 'SECRET'S OUT!'|2026-03-11|WSP|Study
I11|Salon & Ludd Club Doc|2026-03-12|QUAKER|Luddite Club documentary team
I11|Social Media Horror Stories|2026-03-13|TSP|
I11|Action Potluck|2026-03-14|N:Crown Heights|Connor
I11|Attention Lab "SANCTUARY"|2026-03-16|SORA|SoRA
I11|FACE VALUE App Testing|2026-03-18|N:Midtown|
I11|Offline Book Club: Enshittification|2026-03-19|SNFL|NYPLBC
I11|PATTERN RECOGNITION|2026-03-20|N:Upper West Side|Colin
I11|Attention Lab "COALITION"|2026-03-24|SORA|SoRA
I11|Left to Their Own Devices: Jon Haidt|2026-03-31|COL|
I12|Circle Time (Parallel Play)|2026-03-29|N:Bushwick|Rebecca
I12|Phone-Free Adelphi|2026-03-25|N:Fort Greene|Dan
I12|SNFL Crafternoon|2026-03-27|SNFL|NYPL
I12|Technocritical Writers Room|2026-03-25|JEFF|Amalia
I12|Attention Lab STUDY|2026-03-05|SORA|SoRA
I12|Attention Lab SANCTUARY|2026-03-16|SORA|SoRA
I12|Attention Lab COALITION|2026-03-25|SORA|SoRA
I12|Offline Book Club: Enshittification|2026-03-19|SNFL|NYPLBC
I12|Spring Equinox|2026-03-20|MTPROSPECT|Kyle
I12|PATTERN RECOGNITION|2026-03-20|N:Upper West Side|Colin
I12|Unplatform: Creatives Workshop|2026-03-26|875|Unplat
I12|LIFE IS WATCHING (Earth Chxrch)|2026-03-29|QUAKER|Earth
I12|Left to Their Own Devices: Jon Haidt|2026-03-31|COL|
I12|St. Stupid's Day Parade|2026-04-01|ZUCC|Rude Mechanical Orchestra
I12|SoRA at NYPL (Attention Lab + ATTENSITY talk)|2026-04-01|SNFL|SoRA
I12|Month Offline Expo|2026-04-06|TELOS|MO
I12|Evening with Alex Bores|2026-04-07|COL|
I12|LET'S GET OFF TOGETHER|2026-04-10|TELOS|LGOT
I13|Attention Lab STUDY|2026-04-02|SORA|SoRA
I13|Technocritical Writers Room|2026-04-29|JEFF|Amalia
I13|SoRA at NYPL|2026-04-01|SNFL|SoRA
I13|Phone-Free Adelphi|2026-04-29|N:Fort Greene|Dan
I13|SNFL Crafternoon|2026-04-24|SNFL|NYPL
I13|Sidewalk Study: Rick Rubin on Art|2026-04-03|WHITNEY|Study
I13|Attention Activism 101 IN PERSON|2026-04-18|NAD|Czarina Ramos & Nick Plante
I13|Month Offline Expo|2026-04-06|TELOS|MO
I13|Evening with Alex Bores|2026-04-07|INDEXCT|
I13|Opening Reception: Idea, Score, Process, Object|2026-04-09|SORA|SoRA
I13|LET'S GET OFF TOGETHER|2026-04-10|TELOS|LGOT
I13|Turn the Q Train Quiet|2026-04-11|Q96|Kelner
I13|Attention Lab SANCTUARY|2026-04-11|SORA|SoRA
I13|Summer of Ludd 'Event Event'|2026-04-11|QUAKER|SoL
I13|Unplatform Creatives Workshop|2026-04-12|BPL|Unplat
I13|An Evening of Music (Screen-Free)|2026-04-12|TJB|AugAndy
I13|(Off) Tech Support|2026-04-14|CROWNINN|Connor
I13|Break Up with Google Again|2026-04-14|WONDER|Cache Me Outside
I13|Offline Book Club: Searches|2026-04-16|SNFL|NYPLBC
I13|Summer of Ludd Music Jam|2026-04-17|TSP|SoL
I13|Break Up with Spotify Again|2026-04-18|JADE|
I13|Attention Lab COALITION|2026-04-20|SORA|SoRA
I13|Unplatform Creatives Workshop|2026-04-23|875|Unplat
I13|Earth Chxrch w/ Rev. Billy|2026-04-26|QUAKER|Earth
I13|ATTENTION IS A SCHOOL: SoRA Workshops|2026-04-30|NAD|SoRA
I13|Mass Reading of "Howl"|2026-05-04|WSP|Adam Aleksic, Jeremy Ornstein & Nick Plante
I13|Luddite Club (weekly)|2026-04-26|BPL|BLC
I13|Circle Time (Parallel Play)|2026-04-26|N:Bushwick|Rebecca
I14|Technocritical Writers Room|2026-04-29|JEFF|Amalia
I14|SoRA at NYPL|2026-04-01|SNFL|SoRA
I14|Phone-Free Adelphi|2026-04-29|N:Fort Greene|Dan
I14|Attention Lab STUDY|2026-04-02|SORA|SoRA
I14|SNFL Crafternoon|2026-04-24|SNFL|NYPL
I14|Circle Time (Parallel Play)|2026-04-26|N:Bushwick|Rebecca
I14|Attention Lab at NoAD|2026-04-11|NAD|SoRA
I14|Luddite Club (weekly)|2026-04-26|BPL|BLC
I14|SoL Music Jamboree|2026-04-17|TSP|SoL
I14|Sunset in Silence (Astachal)|2026-04-18|BBP|Samvit Sengupta
I14|Break Up with Spotify Again|2026-04-18|JADE|
I14|Attention Lab COALITION|2026-04-20|SORA|SoRA
I14|Offline Book Club: Searches|2026-04-16|SNFL|NYPLBC
I14|Proteus: Phone-Free Creative Workshop|2026-04-21|EDGE|
I14|Unplatform Creatives Workshop|2026-04-23|875|Unplat
I14|Digital Security Workshop|2026-04-25|PEACE|
I14|WILD IRIS Sidewalk Study|2026-04-26|N:Bed-Stuy|Marcela Mulholland & Ethan Luk
I14|Earth Chxrch w/ Rev. Billy|2026-04-26|QUAKER|Earth
I14|Devotion and Distraction Talk|2026-04-28|COL|
I14|RED TIDE Sidewalk Study|2026-04-30|N:Gowanus|Kyle Barnes & Samvit Sengupta
I14|dumb.co Launch Party|2026-05-01|LOOKUP|dumb.co
I14|ATTENTION IS A SCHOOL: SoRA Workshops|2026-04-30|NAD|SoRA
I14|"Howl" Mass Reading|2026-05-04|WSP|Adam Aleksic, Jeremy Ornstein & Nick Plante
I14|Skin in the Game: Experiments in PlayDating|2026-05-14|METROROCK|How Do We Play
I15|Flower Moon + May Day|2026-05-01|N:Park Slope|
I15|dumb.co Launch Party|2026-05-01|LOOKUP|dumb.co
I15|Attention Lab STUDY|2026-05-02|SORA|SoRA
I15|We Are Already Gathered|2026-05-02|N:East Village|
I15|TWC: Ghost in the Machine Screening|2026-05-02|TNS|Tech Workers Coalition
I15|Leafing Out|2026-05-03|PP|Kyle
I15|Public Service|2026-05-03|HVK|Public Service
I15|MENding|2026-05-03|PP|
I15|"HOWL" Mass Reading|2026-05-04|WSP|nyc luddites
I15|Bay Ridge Figure Drawing|2026-05-05|UNDERLAND|Amanda Hanna-McLeer
I15|Burner Phone Zine Launch|2026-05-05|FUTURESPACE|BP
I15|NYC Mesh Open Mesh Night (weekly)|2026-05-26|MESH|Mesh
I15|Technocritical Writers Room|2026-05-27|JEFF|Amalia
I15|Phone-Free Adelphi|2026-05-27|N:Fort Greene|Dan
I15|Unplatform Creatives Workshop|2026-05-10|BPL|Unplat
I15|Newsreel Launch: The Feed Is Cooked|2026-05-11|BKBREW|Newsreel
I15|Attention Lab SANCTUARY|2026-05-12|SORA|SoRA
I15|We Are Already Gathered|2026-05-12|N:Chinatown|
I15|AI & Environmental Justice|2026-05-08|SORA|Counterstream & SoRA
I15|SofAI Launch|2026-05-08|TELOS|Sofia Antebi
I15|Skin in the Game: Experiments in PlayDating|2026-05-09|METROROCK|How Do We Play
I15|Brown Institute Media Party|2026-05-10|COL|Brown Institute
I15|Digital Security|2026-05-09|PEACE|
I15|Attention Lab (Rose Garden special)|2026-05-09|PP|SoRA
I15|"Event Event" (SoL Open House)|2026-05-09|QUAKER|SoL
I15|Intro to Linux Workshop|2026-05-10|INTERF|IWW NYC
I15|Attention Lab COALITION|2026-05-21|SORA|SoRA
I15|NYPL Offline Book Club|2026-05-14|SNFL|NYPLBC
I15|CLOSED AI|2026-05-15|SDR|NYC Luddites, QuitGPT & coalition
I15|Event Organizer Meetup|2026-05-19|WONDER|NYC Event Organizers Meetup
I15|Attention Lab SANCTUARY|2026-05-27|SORA|SoRA
I15|Unplatform Creatives Workshop|2026-05-28|875|Unplat
I15|SoL End-of-Month Meeting|2026-05-29|QUAKER|SoL
I15|Walt Whitman All Night|2026-05-30|SORA|Peter Schmidt & Nick Plante (SoRA)
I15|Earth Chxrch|2026-05-31|QUAKER|Earth
I15|Luddite Club (weekly)|2026-05-31|BPL|BLC
I15|Circle Time (Parallel Play)|2026-05-31|N:Bushwick|Rebecca
I15|Crafternoon (weekly)|2026-05-29|SNFL|NYPL
I16|Crafternoon (weekly)|2026-05-29|SNFL|NYPL
I16|Flower Moon + May Day|2026-05-01|N:Park Slope|
I16|dumb.co Launch Party|2026-05-01|LOOKUP|dumb.co
I16|Attention Lab STUDY|2026-05-02|SORA|SoRA
I16|Leafing Out|2026-05-03|PP|
I16|We Are Already Gathered|2026-05-02|N:East Village|
I16|TWC: Ghost in the Machine|2026-05-02|TNS|Tech Workers Coalition
I16|Luddite Club (weekly)|2026-05-31|BPL|BLC
I16|Public Service|2026-05-03|HVK|
I16|MENding|2026-05-03|PP|
I16|Circle Time (Parallel Play)|2026-05-31|N:Bushwick|Rebecca
I16|"HOWL" Mass Reading|2026-05-04|WSP|
I16|Bay Ridge Figure Drawing|2026-05-05|UNDERLAND|
I16|Burner Phone Zine Launch|2026-05-05|FUTURESPACE|
I16|NYC Mesh Open Mesh Night (weekly)|2026-05-26|MESH|Mesh
I16|Technocritical Writers Room|2026-05-27|JEFF|Amalia
I16|Phone-Free Adelphi|2026-05-27|N:Fort Greene|Dan
I16|AI & Environmental Justice|2026-05-08|SORA|
I16|SofAI Launch|2026-05-08|TELOS|
I16|Skin in the Game|2026-05-08|METROROCK|
I16|Brown Institute Media Party|2026-05-10|COL|Brown Institute
I16|Digital Security|2026-05-09|PEACE|
I16|Attention Lab PROSPECT PARK|2026-05-09|PP|SoRA
I16|"Event Event" (SoL Open House)|2026-05-09|QUAKER|SoL
I16|Unplatform Creatives Workshop|2026-05-10|BPL|Unplat
I16|Intro to Linux Workshop|2026-05-10|INTERF|
I16|Newsreel: Feed Is Cooked|2026-05-11|BKBREW|
I16|We Are Already Gathered|2026-05-12|N:Chinatown|
I16|Attention Lab SANCTUARY|2026-05-12|SORA|SoRA
I16|NYPL Offline Book Club|2026-05-14|SNFL|NYPLBC
I16|CLOSED AI|2026-05-15|SDR|
I16|Global Endurance Collective Launch|2026-05-18|BKBREW|Global Endurance Collective
I16|Event Organizer Meetup|2026-05-19|WONDER|NYC Event Organizers Meetup
I16|Attention Lab COALITION|2026-05-21|SORA|SoRA
I16|Escape the Internet|2026-05-28|MOMI|Lucas Rizzotto
I16|Unplatform Creatives Workshop|2026-05-28|875|Unplat
I16|Summer of Ludd End-of-Month Meeting|2026-05-29|QUAKER|SoL
I16|Airplane Mode (Phone-Free)|2026-05-29|BENCH|
I16|Cut the Chord Concert|2026-05-29|TELOS|The Vinyl Word × dumb.co
I16|Attention Lab SANCTUARY|2026-05-27|SORA|SoRA
I16|Walt Whitman All Night|2026-05-30|SORA|Peter Schmidt & Nick Plante (SoRA)
I16|Creature Emergence|2026-05-31|HUNTERS|
I16|Earth Chrxch|2026-05-31|QUAKER|Earth
I16|"Your Attention Please" NY Premiere|2026-06-02|BRIC|
I17|'Your Attention Please' NYC Premiere|2026-06-02|BRIC|
I17|Proteus Club Launch|2026-06-02|AMELIAS|The Proteus Club
I17|NYC Mesh Open Mesh Night (weekly)|2026-06-23|MESH|Mesh
I17|Attention Lab: STUDY|2026-06-03|SORA|SoRA
I17|Technocritical Writers Room|2026-06-24|JEFF|Amalia
I17|Phone-Free Adelphi|2026-07-01|N:Fort Greene|Dan
I17|Off Tech Tabling (weekly)|2026-06-25|WSP|OffTech
I17|Beyond "Dark Flow" — Boshi's & SoRA Opening|2026-06-04|SORA|boshi's place & SoRA
I17|Quiet Reading (weekly)|2026-06-25|N:Crown Heights|Connor
I17|'Event Event' Facilitation Workshop|2026-06-05|TSP|SoL
I17|Crafternoon (weekly)|2026-06-26|SNFL|NYPL
I17|Zines for Cybersecurity|2026-06-06|TRANSPECOS|CyPurr
I17|Fractal Convalescence Gallery|2026-06-06|STUDIODEM|
I17|Public Art Builds|2026-06-28|TSP|SoL
I17|Luddite Club (weekly)|2026-06-21|BPL|BLC
I17|Month Offline Gallery Exhibition|2026-06-08|TELOS|MO
I17|Covering the Environment When the Data Disappears|2026-06-08|CRYSTAL|News and Brews
I17|Burner Phone Writing Group|2026-06-24|LALINS|
I17|Hat Making & Teach-in ("BREAD AND PUPPET")|2026-06-11|QUAKER|SoL
I17|Hat Making & Teach-in ("DOGMA OR DIE")|2026-06-13|QUAKER|SoL
I17|Attention Lab: SANCTUARY|2026-06-13|SORA|SoRA
I17|ChatGTFO|2026-06-13|875|Young People's Alliance, QuitGPT & coalition
I17|NYPL Offline Book Club: The Machine Stops|2026-06-18|SNFL|NYPLBC
I17|Attention Lab: COALITION|2026-06-23|SORA|SoRA
I17|SoL Press Conference|2026-06-23|TSP|SoL
I17|Airplane Mode Vol. 6|2026-06-26|BENCH|
I17|Turn the Q Train Quiet|2026-06-27|Q96|Kelner
I17|Summer of Ludd Opening Ceremony|2026-06-28|TSP|SoL
I17|Make Your Own Community Calendars|2026-06-29|LAPLAZA|
I17|Luddite Conference on Participatory Futures|2026-06-30|TNS|
I17|Computer Care Café|2026-07-02|QUAKER|
I17|SoL Music Jamboree|2026-07-03|TSP|SoL
I17|LET'S GET OFF TOGETHER|2026-07-03|TELOS|LGOT
I17|SHITPHONE|2026-07-04|TSP|SoL
I18|'Your Attention Please' NYC Premiere|2026-06-02|BRIC|
I18|Proteus Club Launch|2026-06-02|AMELIAS|
I18|NYC Mesh Open Mesh Night (weekly)|2026-06-23|MESH|
I18|Attention Lab: STUDY|2026-06-03|SORA|SoRA
I18|Technocritical Writers Room|2026-06-24|JEFF|Amalia
I18|Phone-Free Adelphi|2026-07-01|N:Fort Greene|Dan
I18|Off Tech Tabling (weekly)|2026-06-25|WSP|
I18|Beyond "Dark Flow" Opening|2026-06-04|SORA|
I18|Quiet Reading (weekly)|2026-06-25|N:Crown Heights|Connor
I18|'Event Event' Facilitation Workshop|2026-06-05|TSP|
I18|Crafternoon (weekly)|2026-06-26|SNFL|
I18|Zines for Cybersecurity|2026-06-06|TRANSPECOS|
I18|Fractal Convalescence Gallery|2026-06-06|STUDIODEM|
I18|Luddite Club (weekly)|2026-06-21|BPL|BLC
I18|When the Data Disappears|2026-06-08|CRYSTAL|
I18|Month Offline Gallery Exhibition|2026-06-08|TELOS|
I18|Burner Phone Writing Group|2026-06-24|LALINS|
I18|Pre-SoL Teach-in|2026-06-11|QUAKER|
I18|Attention Lab: SANCTUARY|2026-06-13|SORA|SoRA
I18|ChatGTFO!|2026-06-13|875|
I18|Science Fair (Open House)|2026-06-15|136MILTON|
I18|Commonality Salon #1|2026-06-16|TSP|Commonality magazine
I18|NYPL Offline Book Club: The Machine Stops|2026-06-18|SNFL|NYPLBC
I18|Experimental Games Presentations w/ boshi's place|2026-06-20|SORA|Boshi
I18|PATTERN RECOGNITION: Mario Kart|2026-06-20|N:Upper West Side|
I18|Sidewalk Study: Reshaping Relations|2026-06-24|N:Bed-Stuy|
I18|SoL Press Conference|2026-06-23|TSP|SoL
I18|Attention Lab: COALITION|2026-06-23|SORA|SoRA
I18|Airplane Mode Vol. 6|2026-06-26|BENCH|
I18|Turn the Q Train Quiet|2026-06-27|Q96|Kelner
I18|Summer of Ludd Opening Ceremony|2026-06-28|TSP|SoL
I18|What Are You Doing Tonight? Make Your Own Event Calendar|2026-06-29|LAPLAZA|Damian Thomas (Unplatform)
I18|Luddite Conference on Participatory Futures|2026-06-30|TNS|
I18|Computer Care Café|2026-07-02|QUAKER|
I18|SoL Music Jamboree|2026-07-03|TSP|SoL
I18|LET'S GET OFF TOGETHER|2026-07-03|TELOS|LGOT
I18|SHITPHONE|2026-07-04|TSP|SoL
I18|SoL Prop Builds|2026-06-28|TSP|SoL
I19|Daily Meditation (daily)|2026-07-04|TSP|SoL
I19|Sunday Pride with ACT UP|2026-06-28|WSP|ACT UP
I19|Intro to Self-Defense|2026-06-28|MARIAH|SoL
I19|Luddite Club Tea Party|2026-06-28|TSP|SoL
I19|My Stitchwork is Garbage: Saddle Stitching Workshop|2026-06-28|TSP|SoL
I19|Luddite Recreations Theatre + Opening/Closing performances|2026-07-05|TSP|SoL
I19|Glenn Blurton's Clown Clar|2026-06-28|TSP|Glenn Blurton
I19|Museum of Interesting Things: 16mm Speakeasy|2026-06-28|177|Museum of Interesting Things
I19|One Billion Souls Dream Weaving Ceremony|2026-06-28|TSP|SoL
I19|Google In Real Life|2026-06-29|TSP|SoL
I19|Radio in Public Space (RIPS)|2026-07-01|TSP|SoL
I19|What Is the Summer of Ludd? + Clean Up the Park|2026-06-29|TSP|SoL
I19|FREE LUNCH (daily)|2026-07-05|TSP|SoL
I19|Luddite Recreations Theatre Performance|2026-07-02|PP|SoL
I19|Defense Against the (Big Tech) Dark Arts|2026-06-30|QUAKER|Tech Reclaimers & Opt Out Project
I19|Music Jamboree & Open Mic (multiple days)|2026-07-03|TSP|SoL
I19|What Are You Doing Tonight? Start Your Own Events Calendar|2026-06-29|LAPLAZA|Damian Thomas (Unplatform)
I19|Music, Literature, Techno-Criticism, Peace, and Love|2026-06-29|TSP|SoL
I19|Special Screening: 'It Came From the Basement'|2026-06-29|NC101|SoL
I19|Jews On Time|2026-06-29|TSP|SoL
I19|POPS: History & Practice|2026-06-29|180|SoL
I19|Strawberry Moon Ritual|2026-06-29|FGP|SoL
I19|The Luddite Conference on Participatory Futures|2026-06-30|TNS|SoL
I19|Post-Conference Action (Palantir)|2026-06-30|6365|SoL
I19|Men-ding Workshop|2026-06-30|TSP|SoL
I19|Stevie Wonder vs. The Nazis Teach-In|2026-06-30|QUAKER|SoL
I19|Introducing the First Fully Offline Presidential Candidate|2026-06-30|WSP|Dan Fox
I19|Third World Newsreels: The Business of America|2026-06-30|ELJARDIN|SoL
I19|Mass Poetry Reading|2026-06-30|WSP|SoL
I19|New Rat City|2026-06-30|TSP|SoL
I19|Public Interest Postal Service Zine Making|2026-07-01|QUAKER|Public Interest Postal Service
I19|Attention Activism Teach-In|2026-07-01|TSP|SoL
I19|Paper Route: Bicycle Doodle Tour|2026-07-01|TSP|SoL
I19|Cantastoria Workshop|2026-07-01|TSP|Bread and Puppet & Boxcutter Collective
I19|'The Foot' Performance|2026-07-01|TSP|SoL
I19|Leafing Out|2026-07-01|TSP|SoL
I19|Ecosocialism: Coming to a Horizon Near You|2026-07-01|STUY|SoL
I19|Pure Lunacy [postponed]|2026-07-01|STUY|SoL
I19|Live Texting|2026-07-01|LAPLAZA|SoL
I19|We Are All Already Cyborgs (Teach-In)|2026-07-01|TSP|SoL
I19|Phone-Free Adelphi|2026-07-01|FGP|Dan
I19|Not One, Not Two: Meditative Exploration of Attention|2026-07-01|TSP|SoL
I19|Instructions on Getting Lost|2026-07-01|TSP|SoL
I19|Earth Chxrch|2026-07-01|QUAKER|Earth
I19|Group Hug|2026-07-02|TSP|SoL
I19|Puppet Experimentation [cancelled]|2026-07-02|TSP|Boxcutter Collective
I19|Visible Mending [cancelled]|2026-07-02|TSP|SoL
I19|Piracy 101|2026-07-02|MORUS|SoL
I19|Deep Listening|2026-07-02|TSP|SoL
I19|The Artist Is Not Present|2026-07-02|TSP|SoL
I19|Your Phone Is 4.6 Billion Years Old|2026-07-02|TSP|SoL
I19|Bread and Puppet Puppet Show|2026-07-02|TSP|Bread & Puppet
I19|Computer Care Café|2026-07-02|QUAKER|SoL
I19|Yerba Mate Ceremony [cancelled]|2026-07-03|TSP|Natasha (The Mate Monologues)
I19|Taking Back Our Territory Teach-in [cancelled]|2026-07-03|TSP|SoL
I19|Soil Chromatography|2026-07-03|TSP|SoL
I19|Field Day! Cooperative Games|2026-07-03|PP|SoL
I19|Radical Imagination|2026-07-03|TSP|SoL
I19|Against the Attention Harvest|2026-07-03|TSP|SoL
I19|Street Clowning Workshop|2026-07-03|TSP|SoL
I19|Tompkins Sq. History Lesson|2026-07-03|TSP|SoL
I19|On Luddite Rizz|2026-07-03|TSP|SoL
I19|Puppet Show: 7 Dances for the End of the World|2026-07-03|TSP|SoL
I19|Embodying Tech Justice [cancelled]|2026-07-03|TSP|SoL
I19|Community Tapestry|2026-07-03|TSP|SoL
I19|Flirtation Rehabilitation|2026-07-03|LITTLEISLAND|SoL
I19|A Performance by Boxcutter Collective|2026-07-03|TSP|Boxcutter Collective
I19|Human Scavenger Hunt|2026-07-03|TSP|SoL
I19|Don't Be Afraid of the Dark|2026-07-03|TSP|SoL
I19|LET'S GET OFF TOGETHER|2026-07-03|TELOS|LGOT
I19|AI Data Centers Teach-In|2026-07-04|TSP|SoL
I19|How to Talk with a Tree|2026-07-04|TSP|SoL
I19|S.H.I.T.P.H.O.N.E.|2026-07-04|TSP|SoL
I19|The Card Catalog of Potential|2026-07-04|LAPLAZA|SoL
I19|Beach Kookout for a New America|2026-07-04|BEACH90|SoL
I19|'Anna By The Window' Screening + Brainrot Detox|2026-07-04|TSP|SoL
I19|Soft & Lovely Dance Party|2026-07-04|NUBLU|SoL
I19|Morning Hike|2026-07-05|CP106|SoL
I19|Info Security + Zine Making Workshop|2026-07-05|CLEMENTE|SoL
I19|Miming in the Park|2026-07-05|WSP|SoL
I19|"Exits" Teach-In|2026-07-05|ROOSEVELT|SoL
I19|The Real Ned Ludd Lecture|2026-07-05|GREENOASIS|SoL
I19|Closing Ceremony|2026-07-05|TSP|Lady Ludd (SoL)
I19|Secret Film Speakeasy|2026-07-05|177|Museum of Interesting Things
I19|Organizing and the Internet|2026-07-05|TSP|SoL
I20|Summer of Ludd (still going strong)|2026-07-05|TSP|SoL
I21|RAD Collective Soft Launch Picnic|2026-07-11|TSP|RAD Collective
I21|Luddite Club Tompkins OPENING CELEBRATION|2026-07-12|TSP|LC
I21|boshi's spontaneous orchestra|2026-07-12|BOSHI|Boshi
I21|Public Service|2026-07-12|CLASSON|Public Service
I21|Ghost in the Machine Screening|2026-07-13|BAM|
I21|Unplug: A New Moon Ritual|2026-07-14|FGP|
I21|Sidewalk Study "Ensouled Beauty"|2026-07-14|MSP|Study
I21|Attention Lab COALITION|2026-07-15|SORA|SoRA
I21|Luddite Dating Ad Creation [postponed]|2026-07-15|TSP|LUDD LOVER
I21|Theory of the Earth Teach-In|2026-07-15|N:Crown Heights|Henry & Connor
I21|New Rat City [postponed]|2026-07-15|TSP|Kyle
I21|Landscape Art|2026-07-16|TSP|
I21|Offline Book Club: More Than Words|2026-07-16|SNFL|NYPLBC
I21|The Living Room|2026-07-16|TSP|
I21|The Spectacular Vermin Sisters|2026-07-18|UNDERSTMARKS|Amelia & Avi Gorman
I21|Come write a scathing postcard|2026-07-17|WSP|
I21|How to Throw a Party|2026-07-17|PP|Kyle
I21|boshi's lecture series: C. Thi Nguyen|2026-07-17|BOSHI|Boshi
I21|CyPurr Collective: AI and You|2026-07-18|BPL|CyPurr
I21|Trephelobia Poetry Circle|2026-07-18|PP|
I21|BrooklynHike|2026-07-19|BBP|
I21|Contact improv jam & open decks|2026-07-19|N:Bushwick|Event Runners
I21|Paul Chan on "Content"|2026-07-20|WOODBINE|
I21|CDNY Dance Lab|2026-07-21|CDNY520|CDNY
I21|Burner Phone Writing Group|2026-07-22|LALINS|
I21|Anna by the Window Special Screenings|2026-07-26|DENIZEN|Baggy
I21|Naming Ceremony|2026-07-24|PP|
I21|Action Theater Pop-Up Class|2026-07-24|LIGHTNING|
I21|Guided Nature Walk|2026-07-26|HUDSON|Trail
I21|Life Drawing|2026-07-26|TSP|
I21|Sewing Repair Café|2026-07-26|CORNER|Corner
I21|Earth Chrxch|2026-07-26|QUAKER|Earth
I21|Ludds in D.C.|2026-07-28|CAPITOL|LC
I21|Quazar Radio|2026-07-28|NEWTOWN|Quazar
I21|Buck Moon Ritual|2026-07-29|FGP|
I21|MASS FOR THE MAGNETIC FIELD|2026-08-01|WSP|Connor
I21|Free Laptop Giveaway|2026-08-03|BONDST|Alex House Project
I21|Junk Journal Night|2026-08-07|SNFL|NYPL
I21|Dan's Phone Free Birthday Bash|2026-08-08|FGP|Dan
I21|Month Offline Gallery Exhibition|2026-08-10|TELOS|
I21|Luddite Club (weekly)|2026-07-26|TSP|LC
I21|Crown Heights Silent Reading (weekly)|2026-07-30|N:Crown Heights|Connor
I21|Crafternoon (weekly)|2026-07-31|SNFL|NYPL
I21|Internet & Tech Addicts Anonymous (weekly)|2026-07-25|ITAA208|ITAA
I22|Handmade Datasets|2026-08-01|NAD|Aarati Akkapeddi
I22|MASS FOR THE MAGNETIC FIELD|2026-08-01|WSP|Connor
I22|boshi's spontaneous orchestra|2026-08-02|BOSHI|Boshi
I22|Sacred Sites Art Gallery|2026-08-02|BARNARD|Teresa Lawlor & Cam My Nguyen
I22|Luddite Club PAPER ROUTE|2026-08-02|TSP|LC
I22|Conflict Lab|2026-08-11|TSP|
I22|Attention Lab SANCTUARY|2026-08-05|SORA|SoRA
I22|Junk Journal Night|2026-08-07|SNFL|NYPL
I22|Moving offline in an online age|2026-08-07|NC101|Aug
I22|Singles Dating Using Palantir Data|2026-08-07|PRODUCERS|
I22|Junction|2026-08-07|CASSETTE|Anagouti & jsn
I22|Out Loud Reading Series|2026-08-08|RIDGEWOODLIB|L-Train Literary Club
I22|Dan's Phone Free Birthday Bash|2026-08-08|FGP|Dan
I22|Contact improv jam & open decks|2026-08-08|N:Bushwick|Event Runners
I22|MO Gallery Exhibition (Free Offline Expo)|2026-08-10|TELOS|Month Offline & dumb.co
I22|Physical Media Swap [cancelled]|2026-08-11|TSP|
I22|CDNY Dance Lab|2026-08-11|CDNY520|CDNY
I22|GUNK's Third Birthday Party|2026-08-15|RISO|GUNK
I22|OPT OUT OF UTOPIA: an art pop-up|2026-08-15|WSP|Young People's Alliance & friends
I22|Cybernetic Salon: Re-Feel Your Emotions|2026-08-15|TORST|
I22|ManhattanHike|2026-08-16|215|Koll
I22|Poetry Today Reading|2026-08-16|BOOKCLUBBAR|Daniel
I22|Unplatform ORGANIZER MEETUP|2026-08-19|875|Unplat
I22|Offline Book Club: Moderation|2026-08-20|SNFL|NYPLBC
I22|Radical Attention & Economies of Care|2026-08-20|SORA|SoRA
I22|Trephelobia Poetry Circle|2026-08-22|PP|Josh
I22|Attention Sanctuary Salon|2026-08-24|SORA|SoRA
I22|Tech Policy Q&A|2026-08-28|TSP|Kendall Schrohe
I22|Vainglory Record Release Show|2026-08-30|SULTAN|Miles Hewitt
I22|STRANGERS Teach-In|2026-09-12|TSP|Nick (NYC Off Tech)
I22|Luddite Club (weekly)|2026-08-30|TSP|LC
I22|Crown Heights Silent Reading (weekly)|2026-08-27|N:Crown Heights|Connor
I22|Crafternoon (weekly)|2026-08-28|SNFL|NYPL
I22|Fort Tilden & Breezy Point Beach Cleanup (weekly)|2026-08-29|FTILDEN|
I22|Internet & Tech Addicts Anonymous (weekly)|2026-08-29|ITAA208|ITAA
I23|GUNK's Third Birthday Party|2026-08-15|RISO|GUNK
I23|Small Press Flea|2026-08-15|AMANT|
I23|OPT OUT OF UTOPIA: an art pop-up|2026-08-15|WSP|Young People's Alliance & friends
I23|Cybernetic Salon: Re-Feel Your Emotions|2026-08-15|TORST|
I23|ManhattanHike|2026-08-16|215|Koll
I23|Poetry Today Reading|2026-08-16|BOOKCLUBBAR|Daniel
I23|Against Tech Oligarchy Book Launch|2026-08-17|VERSO|DSA Tech Action & Verso Books
I23|Unplatform ORGANIZER MEETUP|2026-08-19|875|Unplat
I23|Burner Phone Writing Group|2026-09-02|LALINS|
I23|Offline Book Club: Moderation|2026-08-20|SNFL|NYPLBC
I23|Radical Attention & Economies of Care|2026-08-20|SORA|SoRA
I23|Soldering for Beginners II|2026-08-22|CORNER|Corner
I23|Trephelobia Poetry Circle|2026-08-22|PP|Josh
I23|Sewing Repair Café (Part Deux)|2026-08-23|CORNER|Corner
I23|Attention Sanctuary Salon|2026-08-24|SORA|SoRA
I23|Leftist Buddhist Book Club|2026-08-26|FGP|Max
I23|INFRASTRUCTURE PARTY! (rooftop)|2026-08-27|N:Crown Heights|
I23|Tech Policy Q&A|2026-08-28|TSP|Kendall Schrohe
I23|Odes in a Secret Amphitheater|2026-08-30|BBG|
I23|Vainglory Record Release Show|2026-08-30|SULTAN|Miles Hewitt
I23|The Trial of Jeff Bezos|2026-09-10|NYU|Authors of Against Tech Oligarchy
I23|New Moon Study Group: Amusing Ourselves To Death|2026-09-10|FGP|
I23|STRANGERS Teach-In|2026-09-12|TSP|Nick (NYC Off Tech)
I23|Luddite Club (weekly)|2026-08-30|TSP|LC
I23|Crown Heights Silent Reading (weekly)|2026-08-27|N:Crown Heights|Connor
I23|Crafternoon (weekly)|2026-08-28|SNFL|NYPL
I23|Fort Tilden & Breezy Point Beach Cleanup (weekly)|2026-08-29|FTILDEN|
I23|Internet & Tech Addicts Anonymous (weekly)|2026-08-29|ITAA208|ITAA
I24|Epistolary Explorations|2026-09-29|N:Crown Heights|Connor
I24|Burner Phone Writing Group|2026-09-16|LALINS|
I24|Singles Dating Matching Using Palantir Data|2026-10-01|PRODUCERS|
I24|Fall in Love with the City|2026-09-06|CORNER|Corner
I24|Anna by the Window Screenings (Sundays)|2026-09-27|DENIZEN|Baggy
I24|Anna by the Window Screening|2026-09-14|BEACON|Baggy
I24|Anna by the Window Screening|2026-09-26|JALOPY|Baggy
I24|45th Annual Rope Climb|2026-09-08|157E37|
I24|"Can Games Change the World?" Showcase|2026-09-13|BOSHI|Boshi
I24|Prospect Park Sunset Circlesing|2026-09-09|PP|
I24|The Trial of Jeff Bezos|2026-09-10|NYU|Authors of Against Tech Oligarchy
I24|New Moon Study Group: Amusing Ourselves To Death|2026-09-10|FGP|
I24|STRANGERS Teach-In|2026-09-12|TSP|Nick (NYC Off Tech)
I24|soup sets (rooftop)|2026-09-12|N:Bed-Stuy|Let's Get Off Together DJs
I24|Public Service|2026-09-13|MARIAH|Public Service
I24|boshi's spontaneous orchestra|2026-09-13|BOSHI|Boshi
I24|Intro to Creative Coding|2026-09-13|CORNER|Corner
I24|JAMBOREE (Street Jamboree)|2026-09-15|TSP|
I24|Phone-Free Adelphi|2026-09-16|N:Fort Greene|Dan
I24|New Rat City|2026-09-16|TSP|Kyle
I24|NYPL Offline Book Club: Resisting Big Tech|2026-09-17|SNFL|NYPLBC
I24|Trephelobia Poetry Circle|2026-09-17|PP|Josh
I24|Burner Phone MISS WORLD Launch Party|2026-09-18|SULTAN|BP
I24|Guided Nature Walk|2026-09-19|HUDSON|Trail
I24|AI and You|2026-09-19|BPL|CyPurr
I24|Out Loud Reading Series: El Gallo de Oro|2026-09-19|MILMUNDOS|Out Loud Reading Series
I24|EYE-CATCH! Fashion Show|2026-09-19|SORA|SoRA
I24|Kings&QueensHike|2026-09-20|ERIE|Koll
I24|TEDxCarnegie Hill|2026-09-22|DORRIANS|TEDxCarnegieHill
I24|INFRASTRUCTURE PARTY! (rooftop)|2026-09-24|N:Crown Heights|
I24|Washington Square Mass Read-in|2026-09-26|WSP|
I24|How to Throw a Party at the End of the World|2026-09-26|FGP|Kyle
I24|Corn Moon|2026-09-26|FGP|
I24|Sewing Repair Café|2026-09-27|CORNER|Corner
I24|News & Brews #2: Prediction Markets|2026-09-29|CRYSTAL|
I24|The Odyssey Nonstop|2026-10-03|GCT|Phil, Nick & pals
I24|Bateson Double Book Launch and Signing|2026-10-07|PLAYERS|NY Society for General Semantics
I24|Luddite Club (weekly)|2026-09-27|TSP|LC
I24|Druid School (twice weekly)|2026-09-29|PP|
I24|Crown Heights Silent Reading (weekly)|2026-09-24|N:Crown Heights|Connor
I24|Crafternoon (weekly)|2026-09-25|SNFL|NYPL
I24|Fort Tilden & Breezy Point Beach Cleanup (weekly)|2026-09-26|FTILDEN|
I24|Tompkins Distro (weekly)|2026-09-26|TSP|
I24|Internet & Tech Addicts Anonymous (weekly)|2026-09-26|ITAA208|ITAA
I25|Ghost in the Machine Free Screening|2026-09-14|HUNTER|Hunter College
I25|JAMBOREE|2026-09-15|TSP|
I25|Epistolary Explorations|2026-09-29|N:Crown Heights|Connor
I25|Burner Phone Writing Group|2026-09-16|LALINS|BP
I25|Phone-Free Adelphi|2026-09-16|N:Fort Greene|Dan
I25|New Rat City|2026-09-16|TSP|Kyle
I25|Hang Out Like It's 1996|2026-09-17|BEARDED|
I25|NYPL Offline Book Club: Resisting Big Tech|2026-09-17|SNFL|NYPLBC
I25|Trephelobia Poetry Circle|2026-09-17|PP|Josh
I25|Burner Phone MISS WORLD Launch Party|2026-09-18|SULTAN|BP
I25|DISORIENTATION|2026-09-18|NEWTOWN|Friendly Stranger Studios & Quazar
I25|Guided Nature Walk|2026-09-19|HUDSON|Trail
I25|AI and You|2026-09-19|BPL|CyPurr
I25|Out Loud Reading Series: El Gallo de Oro|2026-09-19|MILMUNDOS|Out Loud Reading Series
I25|CDNY: SWING & SET|2026-09-19|CHURCHVILLAGE|CDNY
I25|EYE-CATCH! Fashion Show & Dance Party|2026-09-19|SORA|SoRA
I25|Kings&QueensHike|2026-09-20|ERIE|Koll
I25|Anna by the Window Screenings (Sundays)|2026-09-27|DENIZEN|Baggy
I25|Anna by the Window Screening|2026-09-14|BEACON|Baggy
I25|Anna by the Window Screening|2026-09-26|JALOPY|Baggy
I25|TEDxCarnegieHill|2026-09-22|DORRIANS|TEDxCarnegieHill
I25|INFRASTRUCTURE PARTY! (rooftop)|2026-09-24|N:Crown Heights|
I25|Does Expertise Matter?|2026-09-24|INDEXCT|
I25|WEAVE NYC [postponed]|2026-09-25|BBP|Jasmine Zimmerman
I25|WEAVE NYC [postponed]|2026-09-26|MCCARREN|Jasmine Zimmerman
I25|WEAVE NYC [postponed]|2026-09-27|TSP|Jasmine Zimmerman
I25|Speed Book Clubbing|2026-09-25|MCCARREN|Commonplace.NYC
I25|PLAY-IN!|2026-09-26|197EB|
I25|Washington Square Mass Read-in|2026-09-26|WSP|
I25|How to Throw a Party at the End of the World [cancelled]|2026-09-26|FGP|Kyle
I25|Corn Moon (moved inside)|2026-09-26|N:Park Slope|
I25|"Song of Myself" Marathon|2026-09-27|TANE|Walt Whitman Initiative
I25|Sewing Repair Café|2026-09-27|CORNER|Corner
I25|Who Gets to Decide How AI Enters Our Schools?|2026-09-28|SNFL|Data & Society
I25|News & Brews #2: Prediction Markets|2026-09-29|CRYSTAL|
I25|Singles Dating Matching Using Palantir Data|2026-10-01|PRODUCERS|
I25|Attention Lab FASHION|2026-10-02|SORA|SoRA
I25|Gel Conference|2026-10-03|ACCORD|Mark Hurst (Techtonic)
I25|The Art of Leonard Peltier Comes to NYC|2026-10-04|QUAKER|Church of Stop Shopping
I25|Communal Letter Writing (UWS)|2026-10-26|N:Upper West Side|
I25|Communal Letter Writing (Crown Heights)|2026-10-13|N:Crown Heights|
I25|Communal Letter Writing (Williamsburg)|2026-10-28|N:Williamsburg|
I25|Communal Letter Writing (East Village)|2026-10-22|N:East Village|
I25|Communal Letter Writing (Astoria)|2026-10-15|N:Astoria|
I25|Bateson Double Book Launch and Signing|2026-10-07|PLAYERS|NY Society for General Semantics
I25|Will and Attention Book Club|2026-10-24|N:Undisclosed|Connor
I25|Luddite Club (weekly)|2026-09-27|TSP|LC
I25|Druid School (twice weekly)|2026-10-01|PP|
I25|Crown Heights Silent Reading (weekly)|2026-10-08|N:Crown Heights|Connor
I25|Crafternoon (weekly)|2026-10-02|SNFL|NYPL
I25|Fort Tilden & Breezy Point Beach Cleanup (weekly)|2026-10-03|FTILDEN|
I25|Tompkins Distro (weekly)|2026-10-03|TSP|
I25|Internet & Tech Addicts Anonymous (weekly)|2026-10-03|ITAA208|ITAA
I26|EYECATCH! Exhibition Opening|2026-10-01|SORA|SoRA
I26|Singles Dating Matching Using Palantir Data|2026-10-01|PRODUCERS|
I26|Phone Free Fridays Launch|2026-10-02|MOMI|MoMI LAB, Light Phone & Dan Fox
I26|Attention Lab FASHION|2026-10-02|SORA|SoRA
I26|Gel Conference|2026-10-03|ACCORD|Mark Hurst (Techtonic)
I26|Community Craft Workshop|2026-10-03|OPENSOURCE|Mary Pat Klein
I26|Jungle Games|2026-10-03|BBP|Samvit Sengupta
I26|Makerspace Open House|2026-10-04|CORNER|Corner
I26|CHAOS & ORDER!|2026-10-04|N:West Village|Katie Nguyen (SoRA)
I26|CHAOS & ORDER!|2026-10-25|N:Midtown|Katie Nguyen (SoRA)
I26|Songwriter Circle|2026-10-04|N:Bushwick|Lazlo
I26|inner child potluck|2026-10-04|N:Flatbush|
I26|The Art of Leonard Peltier Comes to NYC|2026-10-04|QUAKER|Church of Stop Shopping
I26|Circlesing|2026-10-05|SOUTHOXFORD|
I26|News & Brews #2: Prediction Markets|2026-10-05|CRYSTAL|
I26|You Don't Need a Smartphone Book Launch|2026-10-05|STRAND|Aug
I26|LETTER WRITING CIRCLE (UWS)|2026-10-26|N:Upper West Side|
I26|LETTER WRITING CIRCLE (Crown Heights)|2026-10-13|N:Crown Heights|
I26|LETTER WRITING CIRCLE (East Village)|2026-10-22|N:East Village|
I26|LETTER WRITING CIRCLE (Astoria)|2026-10-15|N:Astoria|
I26|LETTER WRITING CIRCLE (Williamsburg)|2026-10-28|N:Williamsburg|
I26|You Don't Need a Smartphone Book Launch|2026-10-06|GREENLIGHT|Aug
I26|The Examined Review Vol. 2 Launch Party|2026-10-07|GARNET|The Examined Review
I26|Bateson Double Book Launch and Signing|2026-10-07|PLAYERS|NY Society for General Semantics
I26|Attention Lab WORLDBUILDING|2026-10-08|SORA|SoRA
I26|Local Multiplayer|2026-10-10|TSP|
I26|Will and Attention Book Club|2026-10-24|N:Undisclosed|Connor
I26|SPINSTER: Art-Curious Club|2026-10-10|MAGENTA|SPINSTER
I26|IHATEMYPHONEILOVEMYPHONE|2026-10-10|PETES|
I26|October New Moon Study Circle: Technopoly|2026-10-11|FGP|
I26|ARTIFICIAL INTIMACY with Sherry Turkle|2026-10-14|ALLSOULS|New Center for Holistic Learning & Wisdomfeed
I26|"BRIGHT FIVE" Presentation Party|2026-10-15|PETES|
I26|Offline Book Club: Martyr Loser King|2026-10-15|SNFL|NYPLBC
I26|CORVID CAPER|2026-10-17|GREENWOOD|
I26|GET LOST DAY|2026-10-17|PP|
I26|LUDD LOVERS Zine Party|2026-10-17|FGP|
I26|BrooklynHike II|2026-10-18|MANHBRIDGE|
I26|The People's AI Assembly|2026-10-19|WEBSTER|AI Now Institute & More Perfect Union
I26|No Lights, No Lycra|2026-10-21|PRIME|
I26|Phone Free Comedy w/ Dan Fox|2026-10-23|PETES|Dan Fox
I26|Spooky Synthesizer Show and Tell|2026-10-24|CORNER|Corner
I26|Pirates of Prospect Park Annual Treasure Hunt|2026-11-07|PP|Mad Hatchery
I26|Sewing Repair Café|2026-10-25|CORNER|Corner
I26|Contact improv jam & open decks|2026-10-25|N:Bushwick|Event Runners
I26|Falling Leaves Moon|2026-10-26|FGP|
I26|Midterm Mania|2026-10-29|100SUTTON|Newsreel
I26|The Dance of an Open Mind: Toni Morrison's Radical Attentions|2026-10-30|SORA|Prof. Namwali Serpell
I26|Capture the Future|2026-10-30|PP|
I26|REAL LIFE TONIGHT|2026-11-03|CAVEAT|Ian & Amelia
I26|How to Start a Letter-Writing Circle|2026-11-09|N:Undisclosed|Connor
I26|Luddite Club (weekly)|2026-10-25|TSP|LC
I26|Druid School (twice weekly)|2026-10-29|PP|
I26|CDNY English Country Dance & Contra (twice weekly)|2026-10-31|CHURCHVILLAGE|CDNY
I26|Phone-Free Adelphi (weekly)|2026-10-28|N:Fort Greene|Dan
I26|Crown Heights Silent Reading (weekly)|2026-10-29|N:Crown Heights|Connor
I26|Crafternoon (weekly)|2026-10-30|SNFL|NYPL
I26|Fort Tilden & Breezy Point Beach Cleanup (weekly)|2026-10-31|FTILDEN|
I26|Tompkins Distro (weekly)|2026-10-31|TSP|
I26|Internet & Tech Addicts Anonymous (weekly)|2026-10-31|ITAA208|ITAA
I27|Letter Writing Circles (UWS)|2026-10-26|N:Upper West Side|
I27|Letter Writing Circles (Williamsburg)|2026-10-28|N:Williamsburg|
I27|Letter Writing Circles (East Village)|2026-10-22|N:East Village|
I27|Luddite Club Documentary OPEN STUDIOS|2026-10-18|N:Gowanus|
I27|GET LOST DAY|2026-10-17|PP|
I27|CORVID CAPER|2026-10-17|GREENWOOD|
I27|LUDD LOVERS Zine Party|2026-10-17|FGP|
I27|BrooklynHike II|2026-10-18|MANHBRIDGE|
I27|Brooklyn Contra Dancing LUDDITE NIGHT|2026-10-18|CAMPFRIEND|Brooklyn Contra
I27|Attention Lab FOR TEACHERS|2026-10-19|SORA|SoRA
I27|The People's AI Assembly|2026-10-19|WEBSTER|AI Now Institute & More Perfect Union
I27|AI Chatbot PUBLIC CONVERSATION|2026-10-21|BHLIB|
I27|No Lights, No Lycra|2026-10-21|PRIME|
I27|Phone Free Comedy w/ Dan Fox|2026-10-23|PETES|Dan Fox
I27|We're Ready to (Dis)believe You|2026-10-24|CAVEAT|
I27|Spooky Synthesizer Show and Tell|2026-10-24|CORNER|
I27|Pirates of Prospect Park Annual Treasure Hunt|2026-11-07|PP|
I27|Autumn Hike (Bull Hill Short Loop)|2026-10-25|HUDSON|Trail
I27|Attention Lab FEAR|2026-10-25|SORA|SoRA
I27|Sewing Repair Café|2026-10-25|CORNER|
I27|contact improv jam & open decks|2026-10-25|N:Bushwick|Event Runners
I27|Falling Leaves Moon|2026-10-26|FGP|
I27|Midterm Mania|2026-10-29|100SUTTON|Newsreel
I27|The Dance of an Open Mind: Toni Morrison's Radical Attentions|2026-10-30|SORA|Prof. Namwali Serpell
I27|Capture the Future (phone-free Halloween party)|2026-10-30|PP|
I27|Hidden City Halloween "Demons of Litchfield Villa"|2026-10-31|N:Bushwick|
I27|Songwriting Circle|2026-11-01|N:Bushwick|
I27|EMPTY SET Issue 2 Launch Party|2026-11-03|RODEO|Empty Set
I27|REAL LIFE TONIGHT|2026-11-03|CAVEAT|Ian & Amelia
I27|Dear Dear: An Afternoon with Reuben Gelley Newman|2026-11-07|TANE|
I27|"BRIGHT FIVE" Presentation Party|2026-11-07|PETES|
I27|THE EMPIRE STATE STRIKES BACK|2026-11-12|COLLIDER|NY Tech Accountability Project (NYTAP)
I27|Luddite Club (weekly)|2026-10-25|TSP|LC
I27|Druid School (twice weekly)|2026-10-29|PP|
I27|CDNY English Country Dance & Contra (twice weekly)|2026-10-31|CHURCHVILLAGE|CDNY
I27|Phone-Free Adelphi (weekly)|2026-10-28|N:Fort Greene|Dan
I27|Crown Heights Silent Reading (weekly)|2026-10-29|N:Crown Heights|Connor
I27|Pick Up Pigeons Trash Clean Up (weekly)|2026-10-29|N:Rotating neighborhoods|Pick Up Pigeons
I27|Crafternoon (weekly)|2026-10-30|SNFL|NYPL
I27|Phone Free Fridays (weekly)|2026-10-30|MOMI|MoMI, Light Phone & Dan Fox
I27|Fort Tilden & Breezy Point Beach Cleanup (weekly)|2026-10-31|FTILDEN|
I27|Tompkins Distro (weekly)|2026-10-31|TSP|
I27|Internet & Tech Addicts Anonymous (weekly)|2026-10-31|ITAA208|ITAA
"""

def rows():
    out = []
    for line in RAW.strip().splitlines():
        iss, ev, d, vc, host = line.split("|")
        out.append(dict(issue=iss, event=ev, date=d, vcode=vc, host=h(host.strip())))
    return out
