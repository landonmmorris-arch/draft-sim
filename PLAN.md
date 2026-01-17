# Implementation Plan: Master List, Position Filter, Headshots, and Counter Offers

## Overview
Implementing four key features:
1. Use NFL Draft 2026.txt as the master prospect list
2. Add position filter/sort in the draft UI
3. Add ESPN headshots for top 50 players
4. Add counter offer functionality for trade down options

## 1. Master Prospect List from NFL Draft 2026.txt

### Current State
- Prospects are hard-coded in `generateProspects()` function (lines 250-547)
- Mix of ESPN rankings and other sources
- User's custom rankings in NFL Draft 2026.txt file

### Implementation Approach
- Parse NFL Draft 2026.txt to extract:
  - Overall top 50 rankings (lines 73-123 in .txt)
  - Position-specific rankings (lines 1-72 in .txt)
- Use user's overall top 50 as the primary order
- For ranks 51+, use existing ESPN/other source data
- Map grades based on ranking position:
  - Rank 1: grade 98
  - Rank 2: grade 97
  - Rank 3: grade 96
  - Continue curve down to rank 50 (grade ~75-80)
  - Ranks 51+ use existing grades

### Technical Details
- Create `parseUserRankings()` function to read and parse NFL Draft 2026.txt
- Create mapping from player names to positions (using position rankings section)
- Merge user's top 50 with existing prospect data for school info
- Generate final prospect list with correct ordering and grades

### Files to Modify
- `/Users/landonmorris/Documents/draft-sim/src/nfl_mock_draft_2026.tsx:250-547`

## 2. Position Filter UI

### Current State
- No filtering available in draft UI
- All available players shown in one list

### Implementation Approach
- Add position filter dropdown/buttons above the available players list
- Options: "All", "QB", "RB", "WR", "TE", "OT", "OG", "C", "EDGE", "DT", "LB", "CB", "S"
- Filter the `available` array based on selected position
- Maintain "All" as default to show current behavior

### Technical Details
- Add state: `const [positionFilter, setPositionFilter] = useState<string>('All')`
- Create filtered list: `const filteredAvailable = positionFilter === 'All' ? available : available.filter(p => p.position === positionFilter)`
- Add UI component with position buttons
- Style selected position button differently

### Files to Modify
- `/Users/landonmorris/Documents/draft-sim/src/nfl_mock_draft_2026.tsx` (add state and UI)

## 3. ESPN Headshots for Top 50

### Current State
- Players display with initials in colored circles
- Position colors already implemented (lines 598-607)

### Implementation Approach
- Add `headshot` field to Player type
- For top 50 players, attempt to fetch headshots from ESPN
- ESPN URL pattern: `https://a.espncdn.com/i/headshots/college-football/players/full/{PLAYER_ID}.png`
- **Challenge**: Need to map player names to ESPN player IDs
- **Solution Options**:
  1. Manual mapping for top 50 players (most reliable)
  2. Search ESPN API if available
  3. Fallback to initials if headshot not found

### Recommended Approach
- Add headshot URLs manually for top 50 players
- Use ESPN's college football player database
- Structure: `{ name: 'Fernando Mendoza', position: 'QB', school: 'Indiana', grade: 98, headshot: 'https://...' }`
- In UI, try to load headshot, fallback to initials on error

### Technical Details
- Modify Player type to include `headshot?: string`
- Update UI to show `<img>` if headshot exists, with `onError` fallback to initials
- Add headshot URLs to top 50 players in prospect list

### Files to Modify
- `/Users/landonmorris/Documents/draft-sim/src/nfl_mock_draft_2026.tsx` (type definition and prospect data)

## 4. Counter Offer for Trade Down

### Current State
- Trade down offers are accept/decline only (line 932)
- If declined, shows alert and closes menu
- Similar counter offer pattern exists for trade up (lines 580-585 show `counterOffer` state)

### Implementation Approach
- When trade down is declined, show counter offer UI instead of alert
- Allow user to modify the picks they're asking for
- Show original offer vs counter offer side-by-side
- Re-calculate acceptance chance based on counter offer
- Allow AI to accept/decline counter offer

### Technical Details
- Modify `offerTradeDown` to set counter offer state on decline
- Add UI to show counter offer form:
  - Display original offer
  - Let user select different/additional picks
  - Calculate new trade value and acceptance probability
  - Submit counter offer
- Re-evaluate trade with new picks
- Acceptance probability should decrease with more aggressive counter offers

### Implementation Steps
1. Modify `offerTradeDown(option)`:
   - On decline, set `setCounterOffer({ type: 'down', original: option })`
   - Don't show alert, let UI handle it
2. Add counter offer UI in trade menu
3. Add `submitCounterTradeDown()` function:
   - Takes modified picks
   - Calculates new value and acceptance chance
   - Runs accept/decline logic
4. UI shows:
   - "Counter Offer" section
   - Original picks offered
   - Modified picks user wants
   - Accept/Decline buttons

### Files to Modify
- `/Users/landonmorris/Documents/draft-sim/src/nfl_mock_draft_2026.tsx:932-979` (offerTradeDown)
- UI section around line 1821 (trade menu)

## Implementation Order

1. **Start with master list integration** - Foundational change
2. **Add position filter** - Simpler UI enhancement
3. **Add headshots** - Visual improvement (can be done in parallel with #4)
4. **Add counter offers** - More complex feature

## Risk Considerations

- **Master list parsing**: Ensure player name matching is robust (handle typos, spacing)
- **Headshots**: Manual mapping required, time-consuming for 50 players
- **Counter offers**: Need to balance AI acceptance to keep feature useful but not exploitable

## Testing Checklist

- [ ] Master list loads correctly with user's top 50 in order
- [ ] Grades properly assigned based on ranking position
- [ ] Position filter works for all positions
- [ ] Filter doesn't break draft mechanics
- [ ] Headshots load for top 50 players
- [ ] Fallback to initials works when headshot fails
- [ ] Counter offer UI appears when trade declined
- [ ] Counter offer acceptance probability calculated correctly
- [ ] Trade executes properly after counter offer accepted
