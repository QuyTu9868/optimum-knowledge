import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from svglib import *

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "public", "diagrams")

# ------------------------------------------------------------------ 1. rlnc.svg
s = SVG(960, 440, "rlnc")
for x, t in ((28, "ORIGINAL DATA"), (290, "CODED SHARDS"), (540, "RELAY NODE"), (770, "RECEIVER")):
    s.title(x, 34, t)
for i, t in enumerate(("x1", "x2", "x3")):
    s.chip(28 + i * 72, 66, 62, 50, t, stroke=LINE, size=17)
s.text(125, 142, "k = 3 pieces", 13, MUTED)
s.lines(125, 196, ["Every shard is a", "random mix of the", "pieces"], 13, TEXT, lh=19)
s.arrow(242, 92, 282, 92, CODED, 2)
s.text(251, 80, "mix", 12.5, CODED, 600)
for i, (t, lost) in enumerate((("mix A", 0), ("mix B", 0), ("mix C", 0), ("mix D", 1))):
    y = 62 + i * 52
    s.chip(290, y, 130, 40, t, stroke=(RED if lost else CODED), dash=("5 4" if lost else None), color=(MUTED if lost else WHITE))
    if lost:
        s.cross(440, y + 20)
        s.text(458, y + 25, "lost", 12.5, RED, 600, "start")
s.lines(355, 296, ["n shards, n can be larger", "than k. Lost ones do not", "matter if k independent", "mixes still arrive"], 12.5, MUTED, lh=17, maxw=190)
s.box(540, 62, 190, 130, "Relay", ["mixes the shards it holds", "into a new shard,", "without decoding"])
s.arrow(424, 82, 536, 100, CODED, 1.8)
s.arrow(424, 134, 536, 134, CODED, 1.8)
s.arrow(424, 186, 536, 168, CODED, 1.8)
s.chip(570, 222, 130, 40, "new mix E", stroke=CODED, fill="rgba(166,176,255,0.14)")
s.arrow(635, 194, 635, 218, CODED, 1.8)
s.lines(635, 288, ["Docs: peer shards are recoded", "after enough of them arrived"], 12.5, MUTED, lh=17, maxw=230)
s.box(770, 62, 166, 130, "Receiver", ["needs any k", "independent mixes", "(here k = 3)"])
s.arrow(734, 110, 766, 110, CODED, 1.8)
s.arrow(704, 242, 792, 198, CODED, 1.8)
s.arrow(853, 196, 853, 236, CODED, 2)
s.text(865, 222, "solve", 12.5, CODED, 600, "start")
for i, t in enumerate(("x1", "x2", "x3")):
    s.chip(770 + i * 58, 244, 50, 44, t, stroke=LINE, size=16)
s.text(853, 312, "original data rebuilt", 12.5, MUTED)
s.text(28, 420, "Illustration. Real systems compute the mixes over a finite field.", 12.5, MUTED, anchor="start")
s.save(OUT)

# ------------------------------------------------------------------ 2. rlnc-equations.svg
s = SVG(960, 400, "rlnc-equations")
s.rect(24, 24, 444, 330, PANEL, DIM, 1.2, 12)
s.rect(492, 24, 444, 330, PANEL, DIM, 1.2, 12)
s.title(44, 56, "PLAIN COPIES")
s.title(512, 56, "MIXES")
s.chip(56, 90, 130, 40, "x1", stroke=LINE)
s.chip(56, 142, 130, 40, "x1 again", stroke=WARN, dash="5 4", color=WARN)
s.chip(56, 194, 130, 40, "x2", stroke=LINE)
for y, ty in ((110, 125), (162, 160), (214, 195)):
    s.arrow(190, y, 296, ty, LINE, 1.5)
s.box(300, 100, 140, 120, "Receiver", ["has x1 and x2", "still waits for x3"], fill=PANEL2)
s.lines(246, 268, ["A repeated copy of x1 only", "protects against losing x1."], 13, WARN, lh=19, maxw=410)
s.chip(524, 90, 190, 40, "3x1 + 2x2 + x3", stroke=CODED)
s.chip(524, 142, 190, 40, "x1 + x2 + 5x3", stroke=CODED)
s.chip(524, 194, 190, 40, "11x1 + 2x2 + 13x3", stroke=CODED)
for y, ty in ((110, 125), (162, 160), (214, 195)):
    s.arrow(718, y, 772, ty, CODED, 1.6)
s.box(776, 100, 150, 120, "Receiver", ["has 3 independent", "mixes: solves for", "x1, x2 and x3"], fill=PANEL2, stroke=CODED)
s.lines(714, 268, ["Any three independent mixes", "are enough for three pieces."], 13, CODED, lh=19, maxw=410)
s.text(480, 384, "Medard's whiteboard example. The numbers are for illustration, real systems use a finite field.", 12.5, MUTED, maxw=900)
s.save(OUT)

# ------------------------------------------------------------------ 3. rlnc-recoding.svg
s = SVG(960, 500, "rlnc-recoding")


def chain(y, recode):
    names = (("Source", 28, 120), ("Relay 1", 300, 120), ("Relay 2", 530, 120), ("Receiver", 790, 140))
    for n, x, w in names:
        coded = recode and n.startswith("Relay")
        s.box(x, y, w, 54, n, None, fill=PANEL, stroke=(CODED if coded else LINE), tsize=15)
        if coded:
            s.pill(x + 14, y + 62, w - 28, "recodes", CODED, "rgba(166,176,255,0.12)")
    for (x1, x2) in ((148, 296), (420, 526), (650, 786)):
        s.arrow(x1, y + 27, x2, y + 27, CODED if recode else LINE, 1.8)
        s.cross((x1 + x2) // 2, y + 27, 8)


s.title(28, 34, "END-TO-END CODING")
chain(54, False)
s.text(480, 156, "The losses of every hop add up, so the source must cover all three links in advance.", 13, TEXT, maxw=900)
s.title(28, 204, "RECODING AT EACH RELAY")
chain(224, True)
s.text(480, 336, "Each hop repairs its own loss, so quality follows the weakest link.", 13, TEXT, maxw=900)
s.text(28, 364, "x = a lost shard on that link", 13, RED, anchor="start")
s.rect(24, 380, 912, 100, PANEL2, DIM, 1.2, 10)
s.text(44, 408, "OPTIMUM'S OWN EXAMPLE (a shorter chain: source, one relay, receiver; one loss per link)", 12, MUTED, 600, "start", spacing="1")
s.text(44, 436, "Forward-only relays: 9 transmissions.", 13.5, TEXT, anchor="start")
s.text(44, 458, "Decode and re-encode in the middle: 8 transmissions, 8 time slots.", 13.5, TEXT, anchor="start")
s.text(520, 436, "Recode, no decoding: 8 transmissions, 5 slots", 13.5, CODED, 600, "start", maxw=410)
s.text(520, 458, "(both links work in a pipeline)", 12.5, MUTED, anchor="start")
s.save(OUT)

# ------------------------------------------------------------------ 4. why-gossip-slow.svg
s = SVG(960, 470, "why-gossip-slow")
s.title(40, 34, "ONE ETHEREUM SLOT: 12 SECONDS")
s.rect(40, 50, 880, 46, PANEL, DIM, 1.2, 8)
s.rect(40, 50, 293, 46, "rgba(166,176,255,0.20)", CODED, 1.5, 8)
s.text(186, 78, "about 4 s", 15, WHITE, 600, maxw=270)
s.text(626, 78, "the rest of the 12 seconds", 14, MUTED, maxw=560)
s.lines(186, 124, ["Validators agree on the head", "of the chain"], 13, TEXT, lh=18, maxw=290)
s.text(626, 124, "Time spent on stale data is lost from this budget.", 13, WARN, maxw=560)
s.line(40, 150, 920, 150, DIM, 1)
s.title(40, 178, "WHO LOSES MORE TIME (MEDARD'S ARGUMENT)")
s.box(40, 230, 130, 70, "Block source", ["builder, proposer"], fill=PANEL2)
s.circle(270, 250, 14)
s.circle(270, 280, 14)
s.arrow(174, 258, 250, 252, LINE, 1.6)
s.arrow(174, 272, 250, 278, LINE, 1.6)
s.text(272, 320, "Near the source", 13.5, WHITE, 600)
s.text(272, 340, "blocks arrive early,", 12.5, MUTED)
s.text(272, 357, "repeats cost less", 12.5, MUTED)
s.circle(740, 250, 14)
s.circle(740, 280, 14)
s.curve("M174 254 C 400 200, 520 200, 716 248", WARN, 1.8, "7 5")
s.curve("M174 276 C 400 312, 520 312, 716 282", WARN, 1.8, "7 5")
s.text(450, 204, "long path, repeated copies pile up", 12.5, WARN)
s.text(742, 320, "Far from the source", 13.5, WHITE, 600)
s.text(742, 340, "sees older information,", 12.5, MUTED)
s.text(742, 357, "repeats hurt more", 12.5, MUTED)
s.text(272, 376, "so being close earns a premium: colocation", 12.5, WARN)
s.rect(40, 392, 880, 56, "rgba(166,176,255,0.12)", CODED, 1.4, 10)
s.text(480, 416, "With coded mixes every incoming piece counts, so far-away validators lose less time.", 14, WHITE, 600, maxw=860)
s.text(480, 436, "Optimum's claim: it keeps validators in different places on a more equal footing.", 12.5, MUTED, maxw=860)
s.save(OUT)

# ------------------------------------------------------------------ 5. publish-path.svg
s = SVG(960, 590, "publish-path")
s.title(24, 34, "PUBLISHER")
s.box(24, 48, 270, 150, "Publisher", ["adds a length prefix, splits the", "message into k fragments and", "creates coded shards:", "ShredFactor x PublisherShardMultiplier"], fill=PANEL2, stroke=CODED, ssize=12)
s.title(360, 34, "MESH PEERS")
ys = (48, 114, 180)
for i, y in enumerate(ys):
    s.box(360, y, 150, 54, f"Mesh peer {i + 1}", None)
    s.arrow(298, 123, 356, y + 27, CODED, 1.7)
s.text(159, 226, "different shards go to different", 12.5, MUTED)
s.text(159, 243, "peers, in round-robin order", 12.5, MUTED)
s.title(580, 34, "A NODE THAT RECEIVES A SHARD")
s.rect(580, 48, 356, 296, PANEL, LINE, 1.3, 12)
steps = (
    ("1", ["Checks it: a shard that is not", "linearly independent is dropped"]),
    ("2", ["Stores it with the other", "shards of the same message"]),
    ("3", ["Decodes once it holds", "k unique shards"]),
    ("4", ["Forwarding, publisher shards: sent", "to all mesh peers at once"]),
    ("5", ["Forwarding, peer shards: recoded and", "sent once enough have arrived (the docs", "state the threshold two ways)"]),
)
y = 74
for n, ls in steps:
    s.circle(606, y - 3, 12, "rgba(166,176,255,0.18)", CODED, 1.4)
    s.text(606, y + 2, n, 13, WHITE, 600)
    s.lines(630, y, ls, 12.5, TEXT, lh=16, anchor="start", maxw=292)
    y += 16 * len(ls) + 20
s.arrow(514, 141, 576, 141, CODED, 1.7)
s.title(24, 380, "CONTROL MESSAGES (THEY EXTEND GOSSIPSUB'S)")
s.rect(24, 394, 912, 170, PANEL, DIM, 1.2, 12)
items = (
    ("IDONTWANT", ["stop sending shards of", "a message I already", "decoded"]),
    ("IHAVE", ["advertises that a node", "holds shards of a", "message"]),
    ("IWANT", ["asks for more shards", "of a message not", "decoded yet"]),
    ("GRAFT", ["adds a peer to the mesh:", "a metadata-only link", "becomes a full link"]),
    ("PRUNE", ["removes a peer: a full", "link goes back to", "metadata-only"]),
)
for i, (n, ls) in enumerate(items):
    cx = 24 + 912 / 5 * (i + 0.5)
    s.text(cx, 432, n, 14.5, CODED, 600)
    s.lines(cx, 458, ls, 12.5, TEXT, lh=18, maxw=170)
s.text(480, 544, "Mesh size is set by MeshDegreeTarget, Min and Max. The libp2p spec's ideal degree is 6, 4 to 12 acceptable.", 12.5, MUTED, maxw=880)
s.save(OUT)

# ------------------------------------------------------------------ 6. sidecar-gateway.svg
s = SVG(960, 530, "sidecar-gateway")
s.box(24, 28, 230, 52, "Ethereum gossip network", None, fill=PANEL)
s.box(24, 150, 230, 150, "Consensus client", ["for example Prysm", "keeps its own normal", "libp2p stack (GossipSub)"], fill=PANEL2)
s.arrow(139, 84, 139, 146, LINE, 1.6, both=True)
s.text(150, 122, "gossip", 12.5, MUTED, anchor="start")
s.rect(330, 40, 340, 392, "rgba(255,255,255,0.02)", LINE, 1.5, 14, dash="7 5")
s.title(346, 66, "OPTIMUM GATEWAY (A SEPARATE PROGRAM)")
s.box(352, 84, 296, 74, "libp2p host", ["TCP 33212, faces the client"], fill=PANEL2)
s.box(352, 196, 296, 84, "Dedup cache + SSZ re-encode", ["XXHash fingerprint,", "cache of about one minute"], fill=PANEL2)
s.box(352, 318, 296, 74, "mump2p host", ["TCP 33213, faces the mesh"], fill=PANEL2, stroke=CODED)
s.arrow(500, 160, 500, 192, LINE, 1.6, both=True)
s.arrow(500, 282, 500, 314, CODED, 1.6, both=True)
s.text(500, 420, "telemetry HTTP 48123: /health, /api/v1/self_info", 12, MUTED, maxw=320)
s.arrow(258, 225, 348, 125, LINE, 1.8, both=True)
s.lines(168, 322, ["the client peers with the", "Gateway: one peer setting,", "no client code change"], 12.5, TEXT, lh=17, maxw=220)
s.box(740, 150, 196, 150, "mump2p mesh", ["other gateways", "RLNC coded shards"], fill=PANEL, stroke=CODED)
s.arrow(652, 355, 738, 270, CODED, 1.8, both=True)
s.rect(24, 452, 912, 62, PANEL2, DIM, 1.2, 10)
s.text(44, 476, "Optimum says: no new slashing conditions, no access to validator keys.", 12.5, TEXT, anchor="start", maxw=880)
s.text(44, 498, "ProbeLab found it does not change signing logic, beacon state or attestation duties.", 12.5, TEXT, anchor="start", maxw=880)
s.save(OUT)

# ------------------------------------------------------------------ 7. flexnodes.svg
s = SVG(960, 520, "flexnodes")
s.title(24, 34, "SENDER SIDE")
s.box(24, 48, 170, 56, "Block builder", ["assembles a block"], fill=PANEL)
s.box(24, 150, 170, 56, "Proposer", ["sends the block out"], fill=PANEL2)
s.arrow(109, 108, 109, 146, LINE, 1.6)
s.title(330, 34, "FLEXNODES ON THE PATH")
for y in (48, 148, 248):
    s.box(330, y, 230, 70, "Flexnode", ["regenerates new coded", "equations on the path"], fill=PANEL2, stroke=CODED)
    s.arrow(198, 178, 326, y + 35, CODED, 1.6)
s.title(724, 34, "RECEIVERS")
s.rect(724, 48, 212, 232, PANEL, LINE, 1.3, 12)
s.box(740, 66, 180, 90, "Validator", ["may also run", "a Flexnode"], fill=PANEL2)
s.box(740, 172, 180, 90, "Other receivers", ["for example", "block builders"], fill=PANEL2)
for y in (83, 183, 283):
    s.arrow(564, y, 720, y - 10 if y < 200 else 245, CODED, 1.6)
s.text(642, 64, "equations", 12.5, CODED, 600)
s.curve("M830 284 C 830 400, 450 410, 450 340", WARN, 1.8, "7 5")
s.text(640, 408, "Planned: the receiver pays each Flexnode that supplies equations", 12.5, WARN, maxw=520)
s.text(640, 428, "(not running yet)", 12.5, WARN)
s.rect(24, 452, 440, 56, PANEL2, DIM, 1.2, 10)
s.lines(244, 474, ["Flexnodes are described as helping propagation.", "Data at rest (DeRAM) is planned for later."], 12.5, TEXT, lh=18, maxw=420)
s.rect(484, 452, 452, 56, PANEL2, DIM, 1.2, 10)
s.lines(710, 474, ["No slashing is planned: an offline Flexnode just earns", "nothing and the coded mesh keeps working."], 12.5, TEXT, lh=18, maxw=430)
s.save(OUT)

# ------------------------------------------------------------------ 8. tx-lifecycle.svg
s = SVG(960, 330, "tx-lifecycle")
steps = (
    ("Your device", None, 24, 124),
    ("Wi-Fi", ["access point"], 172, 128),
    ("Shared fiber", ["switches, routers"], 328, 170),
    ("Block builder", ["assembles a block"], 526, 142),
    ("Proposer", ["sends the block out"], 696, 118),
    ("Validators", ["must agree"], 842, 94),
)
for t, sub, x, w in steps:
    s.box(x, 70, w, 76, t, sub, fill=PANEL2 if t in ("Proposer", "Validators") else PANEL, tsize=14.5, ssize=12)
for x1, x2 in ((148, 168), (300, 324), (498, 522), (668, 692), (814, 838)):
    s.arrow(x1, 108, x2, 108, LINE, 1.6)
s.line(526, 168, 936, 168, WARN, 1.2)
s.text(731, 190, "the proposer must reach many validators", 12.5, WARN)
s.rect(24, 226, 912, 76, PANEL2, DIM, 1.2, 10)
s.text(480, 258, "Direct lines from every proposer to every validator are infeasible:", 14, TEXT, maxw=880)
s.text(480, 282, "about 1,000 validators (the real number is higher) would need roughly a million lines.", 14, WHITE, 600, maxw=880)
s.save(OUT)

# ------------------------------------------------------------------ 9. topologies.svg
s = SVG(960, 600, "topologies")


def panel(ox, oy, title, cap):
    s.rect(ox, oy, 450, 270, PANEL, DIM, 1.2, 12)
    s.title(ox + 20, oy + 30, title)
    s.lines(ox + 225, oy + 222, cap, 12.5, TEXT, lh=17, maxw=420)


def node(x, y, r=14, hot=False):
    s.circle(x, y, r, PANEL2 if not hot else "#434A78", CODED if hot else LINE, 1.6)


# A: star
ox, oy = 24, 24
panel(ox, oy, "ONE CONNECTION PER RECEIVER", ["The sender's outgoing link is shared:", "with n receivers each gets about 1/n of it."])
sx, sy = ox + 90, oy + 120
for ry in (70, 120, 170):
    s.arrow(sx + 16, sy, ox + 340, oy + ry, LINE, 1.5)
    node(ox + 356, oy + ry)
node(sx, sy, 18, True)
s.text(sx, sy + 40, "sender", 12.5, MUTED)
# B: tree
ox, oy = 486, 24
panel(ox, oy, "MULTICAST TREE", ["One copy travels along each shared link.", "Finding a good tree in a rich mesh is NP hard."])
sx, sy = ox + 70, oy + 120
tr = ((ox + 200, oy + 80), (ox + 200, oy + 160))
leaves = ((ox + 350, oy + 60), (ox + 350, oy + 100), (ox + 350, oy + 140), (ox + 350, oy + 180))
for (x, y) in tr:
    s.arrow(sx + 16, sy, x - 16, y, LINE, 1.5)
    node(x, y)
for i, (x, y) in enumerate(leaves):
    px, py = tr[0] if i < 2 else tr[1]
    s.arrow(px + 16, py, x - 14, y, LINE, 1.5)
    node(x, y)
node(sx, sy, 18, True)
s.text(sx, sy + 40, "sender", 12.5, MUTED)
# C and D: mesh
mesh = {"S": (90, 120), "a": (185, 70), "b": (185, 170), "c": (285, 80), "d": (285, 160), "R": (370, 120)}
edges = (("S", "a"), ("S", "b"), ("a", "b"), ("a", "c"), ("a", "d"), ("b", "c"), ("b", "d"), ("c", "R"), ("d", "R"))
for ox, oy, ttl, cap, coded in (
    (24, 310, "GOSSIP MESH", ["Uncoded gossip fights loss by limiting hops,", "and its throughput decays with each hop."], False),
    (486, 310, "CODED MESH", ["Every connection can carry equations and relays", "re-encode: throughput stays at the one-link optimum,", "at the cost of more hops and some extra delay."], True),
):
    panel(ox, oy, ttl, cap)
    for a, b in edges:
        (x1, y1), (x2, y2) = mesh[a], mesh[b]
        s.line(ox + x1, oy + y1 + 10, ox + x2, oy + y2 + 10, CODED if coded else DIM, 1.8 if coded else 1.4)
    for k, (x, y) in mesh.items():
        node(ox + x, oy + y + 10, 14 if k not in ("S", "R") else 17, coded or k in ("S", "R"))
    s.text(ox + mesh["S"][0], oy + mesh["S"][1] + 48, "sender", 12.5, MUTED)
    s.text(ox + mesh["R"][0], oy + mesh["R"][1] + 48, "receiver", 12.5, MUTED)
s.save(OUT)
print("diagrams written")
