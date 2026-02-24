import { useState, useEffect, useRef } from 'react';
import { Trophy, User, Clock, CheckCircle, AlertCircle, ArrowRightLeft } from 'lucide-react';

const NFLMockDraft = () => {
  const teamLogos: { [key: string]: string } = {
    'Las Vegas Raiders': 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png',
    'New York Jets': 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png',
    'Arizona Cardinals': 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png',
    'Tennessee Titans': 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png',
    'New York Giants': 'https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png',
    'Cleveland Browns': 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png',
    'Washington Commanders': 'https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png',
    'New Orleans Saints': 'https://a.espncdn.com/i/teamlogos/nfl/500/no.png',
    'Kansas City Chiefs': 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
    'Cincinnati Bengals': 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png',
    'Miami Dolphins': 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png',
    'Dallas Cowboys': 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
    'Los Angeles Rams': 'https://a.espncdn.com/i/teamlogos/nfl/500/lar.png',
    'Baltimore Ravens': 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png',
    'Tampa Bay Buccaneers': 'https://a.espncdn.com/i/teamlogos/nfl/500/tb.png',
    'Detroit Lions': 'https://a.espncdn.com/i/teamlogos/nfl/500/det.png',
    'Minnesota Vikings': 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png',
    'Carolina Panthers': 'https://a.espncdn.com/i/teamlogos/nfl/500/car.png',
    'Pittsburgh Steelers': 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png',
    'Los Angeles Chargers': 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png',
    'Philadelphia Eagles': 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png',
    'Chicago Bears': 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png',
    'Buffalo Bills': 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
    'San Francisco 49ers': 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png',
    'Houston Texans': 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png',
    'New England Patriots': 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png',
    'Denver Broncos': 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
    'Seattle Seahawks': 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png',
    'Green Bay Packers': 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
    'Indianapolis Colts': 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png',
    'Jacksonville Jaguars': 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png',
    'Atlanta Falcons': 'https://a.espncdn.com/i/teamlogos/nfl/500/atl.png',
  };

  const initialDraftOrder = [
    'Las Vegas Raiders', 'New York Jets', 'Arizona Cardinals', 'Tennessee Titans',
    'New York Giants', 'Cleveland Browns', 'Washington Commanders', 'New Orleans Saints',
    'Kansas City Chiefs', 'Cincinnati Bengals', 'Miami Dolphins', 'Dallas Cowboys',
    'Los Angeles Rams', 'Baltimore Ravens', 'Tampa Bay Buccaneers', 'New York Jets',
    'Detroit Lions', 'Minnesota Vikings', 'Carolina Panthers', 'Dallas Cowboys',
    'Pittsburgh Steelers', 'Los Angeles Chargers', 'Philadelphia Eagles', 'Cleveland Browns',
    'Chicago Bears', 'Buffalo Bills', 'San Francisco 49ers', 'Houston Texans',
    'Los Angeles Rams', 'Denver Broncos', 'New England Patriots', 'Seattle Seahawks'
  ];

  const teamNeeds = {
    'Las Vegas Raiders': ['QB', 'EDGE', 'OT', 'WR', 'CB'],
    'New York Jets': ['QB', 'OT', 'EDGE', 'WR', 'S'],
    'Arizona Cardinals': ['QB', 'EDGE', 'OT', 'CB', 'LB'],
    'Tennessee Titans': ['QB', 'WR', 'OT', 'EDGE', 'CB'],
    'New York Giants': ['QB', 'EDGE', 'OT', 'WR', 'CB'],
    'Cleveland Browns': ['QB', 'WR', 'OT', 'OG', 'S'],
    'Washington Commanders': ['EDGE', 'CB', 'DT', 'WR', 'OT'],
    'New Orleans Saints': ['QB', 'OT', 'EDGE', 'CB', 'WR'],
    'Kansas City Chiefs': ['EDGE', 'CB', 'DT', 'OT', 'WR'],
    'Cincinnati Bengals': ['OT', 'DT', 'EDGE', 'CB', 'RB'],
    'Miami Dolphins': ['OT', 'EDGE', 'DT', 'LB', 'CB'],
    'Dallas Cowboys': ['RB', 'DT', 'EDGE', 'S', 'OT'],
    'Los Angeles Rams': ['EDGE', 'OT', 'CB', 'LB', 'S'],
    'Baltimore Ravens': ['WR', 'EDGE', 'OT', 'CB', 'S'],
    'Tampa Bay Buccaneers': ['OT', 'EDGE', 'QB', 'DT', 'WR'],
    'Detroit Lions': ['EDGE', 'CB', 'DT', 'S', 'LB'],
    'Minnesota Vikings': ['CB', 'EDGE', 'OT', 'DT', 'S'],
    'Carolina Panthers': ['QB', 'EDGE', 'OT', 'WR', 'CB'],
    'Pittsburgh Steelers': ['QB', 'OT', 'CB', 'EDGE', 'WR'],
    'Los Angeles Chargers': ['OT', 'DT', 'EDGE', 'WR', 'LB'],
    'Philadelphia Eagles': ['EDGE', 'CB', 'LB', 'S', 'WR'],
    'Chicago Bears': ['OT', 'EDGE', 'DT', 'CB', 'S'],
    'Buffalo Bills': ['WR', 'EDGE', 'DT', 'OT', 'RB'],
    'San Francisco 49ers': ['OT', 'EDGE', 'CB', 'DT', 'S'],
    'Houston Texans': ['EDGE', 'CB', 'OT', 'DT', 'WR'],
    'New England Patriots': ['WR', 'EDGE', 'OT', 'LB', 'DT'],
    'Denver Broncos': ['EDGE', 'OT', 'CB', 'DT', 'WR'],
    'Seattle Seahawks': ['OT', 'EDGE', 'DT', 'LB', 'CB']
  };

  // Team draft picks for 2026-2028 (based on current trades)
  // Format: { round: number, year: number, fromTeam?: string (if acquired via trade) }
  type DraftPick = { round: number; year: number; fromTeam?: string; traded?: boolean };

  const initialTeamDraftPicks: { [key: string]: DraftPick[] } = {
    'Las Vegas Raiders': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'New York Jets': [
      { round: 1, year: 2026 }, { round: 1, year: 2026, fromTeam: 'Indianapolis Colts' }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 1, year: 2027, fromTeam: 'Indianapolis Colts' }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Arizona Cardinals': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Tennessee Titans': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'New York Giants': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Cleveland Browns': [
      { round: 1, year: 2026 }, { round: 1, year: 2026, fromTeam: 'Jacksonville Jaguars' }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Washington Commanders': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'New Orleans Saints': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Kansas City Chiefs': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Cincinnati Bengals': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Miami Dolphins': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Dallas Cowboys': [
      { round: 1, year: 2026 }, { round: 1, year: 2026, fromTeam: 'Green Bay Packers' }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 1, year: 2027, fromTeam: 'Green Bay Packers' }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Los Angeles Rams': [
      { round: 1, year: 2026 }, { round: 1, year: 2026, fromTeam: 'Atlanta Falcons' }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Baltimore Ravens': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Tampa Bay Buccaneers': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Detroit Lions': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 3, year: 2026, fromTeam: 'New York Jets' }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Minnesota Vikings': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Carolina Panthers': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Pittsburgh Steelers': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 3, year: 2026, fromTeam: 'Dallas Cowboys' }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Los Angeles Chargers': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Philadelphia Eagles': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Chicago Bears': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Buffalo Bills': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'San Francisco 49ers': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Houston Texans': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'New England Patriots': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Denver Broncos': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Seattle Seahawks': [
      { round: 1, year: 2026 }, { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Green Bay Packers': [
      { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Indianapolis Colts': [
      { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Jacksonville Jaguars': [
      { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ],
    'Atlanta Falcons': [
      { round: 2, year: 2026 }, { round: 3, year: 2026 }, { round: 4, year: 2026 }, { round: 5, year: 2026 }, { round: 6, year: 2026 }, { round: 7, year: 2026 },
      { round: 1, year: 2027 }, { round: 2, year: 2027 }, { round: 3, year: 2027 }, { round: 4, year: 2027 }, { round: 5, year: 2027 }, { round: 6, year: 2027 }, { round: 7, year: 2027 },
      { round: 1, year: 2028 }, { round: 2, year: 2028 }, { round: 3, year: 2028 }, { round: 4, year: 2028 }, { round: 5, year: 2028 }, { round: 6, year: 2028 }, { round: 7, year: 2028 }
    ]
  };

  const generateProspects = () => {
    // User's NFL Draft 2026.txt rankings (top 50) + additional prospects
    // Grades: Rank 1 = 98, decreasing by 0.5 per rank
    const prospects = [
      // User's Top 50 from NFL Draft 2026.txt
      { name: 'Fernando Mendoza', position: 'QB', school: 'Indiana', grade: 98, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4837248.png', analysis: 'Elite QB prospect with exceptional arm talent and field vision. Mendoza displays NFL-level accuracy on all levels of the field and shows impressive poise in the pocket. His ability to process defenses quickly and make quick decisions makes him a Day 1 starter candidate. NFL Comparison: Joe Burrow - elite processor with deadly accuracy.' },
      { name: 'Arvell Reese', position: 'LB', school: 'Ohio State', grade: 97.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4950400.png', analysis: 'Dynamic linebacker with sideline-to-sideline speed and exceptional instincts. Reese excels in coverage and shows the versatility to rush the passer. His high football IQ and leadership qualities make him a three-down linebacker at the next level. NFL Comparison: Roquan Smith - versatile playmaker who impacts every phase.' },
      { name: 'Caleb Downs', position: 'S', school: 'Ohio State', grade: 97.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870706.png', analysis: 'Premium safety prospect with rare range and ball skills. Downs combines elite athleticism with excellent football instincts. His versatility allows him to play both deep safety and in the box, making him scheme-diverse and a potential All-Pro caliber player. NFL Comparison: Derwin James - do-it-all safety with Pro Bowl upside.' },
      { name: 'David Bailey', position: 'EDGE', school: 'Texas Tech', grade: 97, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685248.png', analysis: 'Elite pass rusher with rare blend of speed and power. Bailey showcases exceptional get-off and bend around the edge. His relentless motor and array of pass-rush moves make him a game-changing presence off the edge. NFL Comparison: Myles Garrett - explosive athlete with dominant pass-rush ability.' },
      { name: 'Rueben Bain Jr.', position: 'EDGE', school: 'Miami', grade: 97, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870617.png', analysis: 'Explosive edge defender with natural pass-rush instincts and exceptional athleticism. Bain excels at converting speed to power and shows advanced hand usage for his experience level. Projects as an impact starter from day one. NFL Comparison: Nick Bosa - technically refined with relentless motor.' },
      { name: 'Jordyn Tyson', position: 'WR', school: 'Arizona State', grade: 96.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4880281.png', analysis: 'Dynamic playmaker with elite route-running ability and exceptional ball tracking. Tyson creates separation at all levels and shows strong hands in traffic. His versatility to line up anywhere makes him a matchup nightmare. NFL Comparison: CeeDee Lamb - polished route runner with exceptional playmaking ability.' },
      { name: 'Carnell Tate', position: 'WR', school: 'Ohio State', grade: 96.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871023.png', analysis: 'Smooth receiver with outstanding body control and reliable hands. Tate runs crisp routes and shows excellent awareness in zone coverage. His size-speed combination and competitive nature make him a complete receiver prospect. NFL Comparison: Chris Olave - smooth technician with reliable hands and route precision.' },
      { name: 'Mansoor Delane', position: 'CB', school: 'LSU', grade: 96, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4880124.png', analysis: 'Lockdown corner with excellent length and fluid hips. Delane mirrors receivers in man coverage and shows great anticipation in zone. His physicality at the line and ball skills make him a true CB1 prospect. NFL Comparison: Jalen Ramsey - physical lockdown corner with elite ball skills.' },
      { name: 'Peter Woods', position: 'DT', school: 'Clemson', grade: 95.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871063.png', analysis: 'Dominant interior presence with exceptional strength and quickness. Woods consistently wins one-on-ones and shows the ability to collapse the pocket. His motor never stops and he impacts both run and pass defense. NFL Comparison: Quinnen Williams - disruptive interior force with rare quickness.' },
      { name: 'Jeremiyah Love', position: 'RB', school: 'Notre Dame', grade: 95.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870808.png', analysis: 'Electric runner with home-run speed and excellent vision. Love shows patience behind blockers and burst through gaps. His receiving ability out of the backfield adds another dimension to his game as a true three-down back. NFL Comparison: Jahmyr Gibbs - explosive playmaker with three-down capability.' },
      { name: 'Spencer Fano', position: 'OT', school: 'Utah', grade: 95, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870723.png', analysis: 'Massive tackle with excellent footwork and power at the point of attack. Fano anchors well against bull rushes and shows surprising agility for his size. His technique and consistency make him a safe pick who can start immediately. NFL Comparison: Lane Johnson - athletic mauler with excellent technique.' },
      { name: 'Jermod McCoy', position: 'CB', school: 'Tennessee', grade: 95, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5157289.png', analysis: 'Instinctive cornerback with excellent ball production and tight coverage skills. McCoy shows great anticipation to jump routes and close speed to recover. His aggressive style and playmaking ability make him a valuable asset in any secondary. NFL Comparison: Trevon Diggs - ball-hawking corner with big-play ability.' },
      { name: 'Francis Mauigoa', position: 'OT', school: 'Miami', grade: 94.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870914.png', analysis: 'Athletic tackle with impressive movement skills and strength. Mauigoa excels in pass protection with quick hands and solid technique. His upside is through the roof as he continues to develop his craft and add strength. NFL Comparison: Tristan Wirfs - athletic tackle with elite upside.' },
      { name: 'Makai Lemon', position: 'WR', school: 'USC', grade: 94.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870795.png', analysis: 'Big-bodied receiver with excellent catch radius and contested-catch ability. Lemon uses his size well to box out defenders and makes tough grabs look routine. His red zone presence and physicality add immediate value. NFL Comparison: Mike Evans - physical red zone weapon with strong hands.' },
      { name: 'Avieon Terrell', position: 'CB', school: 'Clemson', grade: 94, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870988.png', analysis: 'Versatile defensive back with elite speed and coverage skills. Terrell shows the ability to match up against any receiver type and excels in press-man coverage. His awareness and ball skills translate to consistent playmaking ability. NFL Comparison: Sauce Gardner - press-man specialist with elite coverage ability.' },
      { name: 'Sonny Styles', position: 'LB', school: 'Ohio State', grade: 95.75, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081807.png', analysis: 'Versatile defender who can play multiple positions in the secondary and at linebacker. Styles brings physicality and range, excelling against both run and pass. His football intelligence and leadership make him a defensive captain type. NFL Comparison: Isaiah Simmons - positionless defender with rare versatility.' },
      { name: 'Keldric Faulk', position: 'EDGE', school: 'Auburn', grade: 93.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870707.png', analysis: 'Explosive edge rusher with quick first step and violent hands. Faulk shows the ability to win with speed or power and has developed a nice array of counter moves. His relentless effort and motor make him a consistent disruptor. NFL Comparison: Brian Burns - quick-twitch edge with relentless motor.' },
      { name: 'Cashius Howell', position: 'EDGE', school: 'Texas A&M', grade: 93, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4710752.png', analysis: 'Powerful edge defender with exceptional length and strength. Howell sets a strong edge against the run and shows improving pass-rush skills. His high upside and physicality make him an intriguing developmental prospect. NFL Comparison: Montez Sweat - long, athletic edge with developing pass-rush arsenal.' },
      { name: 'Caleb Banks', position: 'DT', school: 'Florida', grade: 93, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4602019.png', analysis: 'Powerful interior lineman with exceptional strength and a non-stop motor. Banks clogs running lanes and pushes the pocket consistently. His size and physicality make him a force in the trenches who can anchor a defensive line. NFL Comparison: Vita Vea - massive run-stuffer with interior power.' },
      { name: 'Kayden McDonald', position: 'DT', school: 'Ohio State', grade: 92.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870893.png', analysis: 'Athletic defensive tackle with quickness off the snap and solid technique. McDonald shows good gap penetration and pursuit. His combination of size and agility makes him a disruptive force in both run and pass defense. NFL Comparison: Dexter Lawrence - athletic interior force with gap penetration.' },
      { name: 'KC Concepcion', position: 'WR', school: 'Texas A&M', grade: 92.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870653.png', analysis: 'Explosive playmaker with exceptional speed and yards-after-catch ability. Concepcion creates separation vertically and shows great hands. His big-play ability and route versatility make him a dangerous weapon at all levels. NFL Comparison: Tyreek Hill - game-breaking speed with big-play ability.' },
      { name: 'Olaivavega Ioane', position: 'OG', school: 'Penn State', grade: 92, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832793.png', analysis: 'Massive guard with road-grading ability in the run game. Ioane shows impressive power at the point of attack and solid anchor in pass protection. His physicality and mean streak make him an ideal interior run blocker. NFL Comparison: Zack Martin - powerful run blocker with elite technique.' },
      { name: 'Akheem Mesidor', position: 'EDGE', school: 'Miami', grade: 91.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4429190.png', analysis: 'Experienced edge rusher with power and relentless effort. Mesidor wins with bull rushes and shows improving pass-rush moves. His consistency and production make him a reliable starter at the next level. NFL Comparison: Josh Sweat - productive edge with power and effort.' },
      { name: 'Denzel Boston', position: 'WR', school: 'Washington', grade: 91.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832800.png', analysis: 'Reliable receiver with excellent hands and route precision. Boston consistently gets open and makes contested catches. His football IQ and dependability make him a trusted target in crucial situations. NFL Comparison: Keenan Allen - reliable possession receiver with great hands.' },
      { name: 'Ty Simpson', position: 'QB', school: 'Alabama', grade: 91, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685522.png', analysis: 'Mobile quarterback with strong arm and good decision-making. Simpson shows poise under pressure and ability to make plays with his legs. His dual-threat capability and leadership traits make him an intriguing developmental QB. NFL Comparison: Jalen Hurts - dual-threat QB with leadership intangibles.' },
      { name: 'Kenyon Sadiq', position: 'TE', school: 'Oregon', grade: 91, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5083315.png', analysis: 'Athletic tight end with excellent receiving skills and soft hands. Sadiq creates mismatches in the passing game and shows solid blocking fundamentals. His versatility and upside make him a modern pass-catching TE prospect. NFL Comparison: David Njoku - athletic receiving TE with upside.' },
      { name: 'Caleb Lomu', position: 'OT', school: 'Utah', grade: 90.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4921438.png', analysis: 'Massive tackle with elite length and strength. Lomu dominates at the point of attack in the run game and shows steady improvement in pass protection. His physical tools and technique make him a high-floor starter. NFL Comparison: Penei Sewell - powerful tackle with elite physical tools.' },
      { name: 'Kadyn Proctor', position: 'OT', school: 'Alabama', grade: 90.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870976.png', analysis: 'Highly-touted tackle with impressive athleticism and footwork. Proctor shows smooth movement in space and solid anchor. His upside is significant as he continues developing his craft at the highest level of competition. NFL Comparison: Evan Neal - high-ceiling tackle with elite traits.' },
      { name: 'CJ Allen', position: 'LB', school: 'Georgia', grade: 90, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870598.png', analysis: 'Instinctive linebacker with excellent gap discipline and tackling ability. Allen reads plays quickly and flows to the ball with urgency. His consistency and football IQ make him a dependable starter at the next level. NFL Comparison: Devin Lloyd - instinctive linebacker with high football IQ.' },
      { name: 'R Mason Thomas', position: 'EDGE', school: 'Oklahoma', grade: 89.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081927.png', analysis: 'Long and athletic edge rusher with high motor and good bend. Thomas shows potential as both a rusher and in coverage. His length and motor make him an intriguing developmental edge defender with starter upside. NFL Comparison: Azeez Ojulari - athletic edge with developing pass-rush moves.' },
      { name: 'Colton Hood', position: 'CB', school: 'Tennessee', grade: 89.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4921249.png', analysis: 'Physical corner with excellent size and press technique. Hood is comfortable in man coverage and shows solid ball skills. His physicality and competitive nature make him a reliable outside corner prospect. NFL Comparison: Carlton Davis - physical press corner with size.' },
      { name: 'Christen Miller', position: 'DT', school: 'Georgia', grade: 89, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685479.png', analysis: 'Powerful defensive tackle with excellent lateral quickness. Miller commands double teams and pursues well sideline-to-sideline. His motor and versatility along the defensive line make him a valuable rotational piece. NFL Comparison: Javon Hargrave - versatile interior defender with motor.' },
      { name: 'Elijah Sarratt', position: 'WR', school: 'Indiana', grade: 89, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5088338.png', analysis: 'Productive receiver with reliable hands and strong route running. Sarratt finds soft spots in zone coverage and makes clutch catches. His consistency and high-level production make him a dependable NFL receiver. NFL Comparison: Adam Thielen - reliable possession receiver with production.' },
      { name: 'Brandon Cisse', position: 'CB', school: 'South Carolina', grade: 88.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5076652.png', analysis: 'Long corner with good speed and press ability. Cisse shows potential in man coverage and has the frame to match up with bigger receivers. His physical tools and improving technique make him a solid developmental corner. NFL Comparison: Tre\'Davious White - long corner with press ability.' },
      { name: 'Anthony Hill Jr.', position: 'LB', school: 'Texas', grade: 88.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870805.png', analysis: 'Athletic linebacker with elite speed and pursuit ability. Hill excels in space and shows potential as a blitzer. His sideline-to-sideline range and athletic upside make him an exciting modern linebacker prospect. NFL Comparison: Jeremiah Owusu-Koramoah - athletic hybrid linebacker.' },
      { name: 'Chris Bell', position: 'WR', school: 'Louisville', grade: 88, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4869961.png', analysis: 'Smooth receiver with excellent body control and adjustment skills. Bell wins at the catch point and shows strong hands. His reliable play and ability to win contested catches make him a solid WR2/3 option. NFL Comparison: Darnell Mooney - smooth route runner with reliable hands.' },
      { name: 'Monroe Freeling', position: 'OT', school: 'Georgia', grade: 87.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870694.png', analysis: 'Well-coached tackle with solid fundamentals and good size. Freeling shows consistent technique and reliable pass protection. His steady play and Georgia pedigree make him a dependable starting tackle prospect. NFL Comparison: Garrett Bolles - technically sound tackle with consistency.' },
      { name: 'Keith Abney II', position: 'CB', school: 'Arizona State', grade: 87.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5093004.png', analysis: 'Quick corner with good ball skills and aggressiveness. Abney plays physical at the catch point and shows solid man-coverage ability. His competitiveness and production make him a quality mid-round corner option. NFL Comparison: Emmanuel Moseley - aggressive corner with ball skills.' },
      { name: 'Germie Bernard', position: 'WR', school: 'Alabama', grade: 87, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685261.png', analysis: 'Explosive slot receiver with excellent quickness and route running. Bernard creates separation from the slot and makes plays after the catch. His versatility and playmaking ability make him a valuable weapon in the passing game. NFL Comparison: Jamison Crowder - versatile slot receiver with quickness.' },
      { name: 'Emmanuel Pregnon', position: 'OG', school: 'Oregon', grade: 87, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4608929.png', analysis: 'Strong interior lineman with good power and technique. Pregnon moves well for his size and anchors in pass protection. His consistency and physicality make him a solid guard prospect who can start early. NFL Comparison: Wyatt Teller - powerful guard with run-blocking strength.' },
      { name: 'A.J. Haulcy', position: 'S', school: 'LSU', grade: 86, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4905664.png', analysis: 'Versatile safety with good range and instincts. Haulcy shows ability to play both deep and in the box effectively. His football IQ and tackling ability make him a reliable safety option at the next level. NFL Comparison: Jayron Kearse - versatile safety with size and range.' },
      { name: 'Chris Johnson', position: 'CB', school: 'San Diego State', grade: 85.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5159948.png', analysis: 'Competitive corner with solid technique and good speed. Johnson shows consistency in coverage and willingness to tackle. His well-rounded game and production make him a quality rotational corner prospect. NFL Comparison: Chidobe Awuzie - solid technical corner with consistency.' },
      { name: 'Zion Young', position: 'EDGE', school: 'Missouri', grade: 85.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4839501.png', analysis: 'Athletic edge defender with length and potential. Young shows flashes of pass-rush ability and solid run defense. His physical tools and motor give him developmental upside as a rotational edge rusher. NFL Comparison: Uchenna Nwosu - athletic edge with developmental upside.' },
      { name: 'Eli Stowers', position: 'TE', school: 'Vanderbilt', grade: 85, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431574.png', analysis: 'Productive tight end with reliable hands and good blocking. Stowers shows versatility as both a receiver and blocker. His well-rounded skill set makes him a solid mid-round TE prospect. NFL Comparison: Tyler Conklin - reliable TE with balanced skill set.' },
      { name: 'Caleb Tiernan', position: 'OT', school: 'Northwestern', grade: 85, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4592836.png', analysis: 'Technically sound tackle with good length and footwork. Tiernan shows consistent fundamentals and steady play. His technique and intelligence make him a developmental tackle with starting potential. NFL Comparison: Matt Peart - technically sound developmental tackle.' },
      { name: 'Jonah Coleman', position: 'RB', school: 'Washington', grade: 84.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4702555.png', analysis: 'Versatile running back with good vision and receiving ability. Coleman shows patience and ability to create after contact. His well-rounded skill set makes him a quality backup with three-down potential. NFL Comparison: Devin Singletary - patient runner with receiving ability.' },
      { name: 'Dillon Thieneman', position: 'S', school: 'Oregon', grade: 84.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4954445.png', analysis: 'Hard-hitting safety with good instincts and tackling ability. Thieneman shows range in coverage and physicality near the line. His versatility and aggressive style make him a valuable safety prospect. NFL Comparison: Vonn Bell - hard-hitting safety with physicality.' },
      { name: 'Trinidad Chambliss', position: 'QB', school: 'Ole Miss', grade: 84, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4911529.png', analysis: 'Strong-armed quarterback with excellent mobility and upside. Chambliss shows impressive physical tools and playmaking ability. His dual-threat capability and improving mechanics make him a high-upside QB3 prospect. NFL Comparison: Anthony Richardson - athletic QB with elite physical tools and developmental upside.' },
      // Additional prospects (ranks 51+)
      { name: 'LT Overton', position: 'EDGE', school: 'Alabama', grade: 84, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870960.png', analysis: 'Strong edge defender with power and effort. Overton sets a solid edge and shows improving pass-rush skills. His motor and physicality make him a developmental edge prospect with rotational value. NFL Comparison: Charles Omenihu - developmental edge with power.' },
      { name: 'Trevor Goosby', position: 'OT', school: 'Texas', grade: 84, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4918430.png', analysis: 'Experienced tackle with good size and solid fundamentals. Goosby shows consistency in pass protection and improving run blocking. His technique and football IQ make him a reliable backup tackle. NFL Comparison: Cam Robinson - solid starter with consistency.' },
      { name: 'T.J. Parker', position: 'LB', school: 'Clemson', grade: 83.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870886.png', analysis: 'Athletic linebacker with good range and solid tackling. Parker shows ability to cover ground and make plays in space. His Clemson pedigree and fundamentals make him a quality rotational linebacker. NFL Comparison: Shaq Thompson - athletic linebacker with coverage ability.' },
      { name: 'Harold Perkins Jr.', position: 'LB', school: 'LSU', grade: 83, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685502.png', analysis: 'Explosive linebacker with elite athleticism and blitzing ability. Perkins shows burst off the edge and can make plays all over the field. His versatility and playmaking make him an exciting linebacker prospect. NFL Comparison: Devin White - explosive athletic linebacker with blitz ability.' },
      { name: 'Taurean York', position: 'LB', school: 'Texas A&M', grade: 83, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4917859.png', analysis: 'Physical linebacker with strong tackling and run-stopping ability. York excels near the line of scrimmage and shows improving coverage skills. His toughness makes him a valuable two-down linebacker. NFL Comparison: Josey Jewell - physical thumper with run-stopping ability.' },
      { name: 'Ja\'Kobi Lane', position: 'WR', school: 'USC', grade: 82.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870847.png', analysis: 'Elusive receiver with excellent quickness and route running from the slot. Lane creates separation quickly and makes plays after the catch. His agility makes him a dangerous weapon in space. NFL Comparison: Jakobi Meyers - crafty slot receiver with separation quickness.' },
      { name: 'Austin Barber', position: 'OT', school: 'Florida', grade: 82.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4597310.png', analysis: 'Long tackle with good athleticism and developing technique. Barber shows potential in pass protection and continues to add strength. His physical tools give him developmental upside. NFL Comparison: Kaleb McGary - athletic tackle with developing technique.' },
      { name: 'Matayo Uiagalelei', position: 'EDGE', school: 'Oregon', grade: 82, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871052.png', analysis: 'Powerful edge rusher with excellent size and strength. Uiagalelei wins with power and shows improving pass-rush technique. His physicality makes him a valuable run defender and developing pass rusher. NFL Comparison: Chauncey Golston - powerful edge with size and strength.' },
      { name: 'Davison Igbinosun', position: 'CB', school: 'Ohio State', grade: 82, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832035.png', analysis: 'Versatile defensive back with good size and coverage skills. Igbinosun shows consistency in man coverage and solid ball skills. His reliability makes him a quality depth corner. NFL Comparison: Rock Ya-Sin - versatile corner with solid technique.' },
      { name: 'Tyreak Sapp', position: 'DT', school: 'Florida', grade: 81.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4889957.png', analysis: 'Strong interior defender with good power and motor. Sapp clogs lanes and shows effort as a pass rusher. His strength makes him a valuable rotational defensive tackle. NFL Comparison: Jonathan Hankins - powerful run-stuffer with size.' },
      { name: 'Malik Muhammad', position: 'CB', school: 'Texas', grade: 81, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870953.png', analysis: 'Quick corner with good anticipation and ball skills. Muhammad shows solid technique in coverage and willingness to tackle. His competitiveness makes him a reliable depth corner. NFL Comparison: Tre Flowers - athletic corner with size and length.' },
      { name: 'Jake Golday', position: 'LB', school: 'Cincinnati', grade: 81, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4877652.png', analysis: 'Productive linebacker with excellent instincts and tackling ability. Golday reads plays well and flows to the ball consistently. His high production and football IQ make him a valuable backup. NFL Comparison: Nick Vigil - instinctive linebacker with production.' },
      { name: 'Emmanuel McNeil-Warren', position: 'S', school: 'Toledo', grade: 80.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4837186.png', analysis: 'Versatile safety with good ball skills and coverage ability. McNeil-Warren shows range in the deep third and can play near the line. His playmaking ability makes him an intriguing developmental safety. NFL Comparison: Tre Boston - versatile safety with ball skills.' },
      { name: 'Max Klare', position: 'TE', school: 'Ohio State', grade: 80.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4833029.png', analysis: 'Big-bodied tight end with reliable hands and solid blocking. Klare shows ability as a red zone target and improving route running. His size makes him a useful H-back type. NFL Comparison: Harrison Bryant - reliable receiving TE with size.' },
      { name: 'Lee Hunter', position: 'DT', school: 'Texas Tech', grade: 80, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431551.png', analysis: 'Powerful defensive tackle with good strength and motor. Hunter occupies blockers and shows effort in pursuit. His size and power make him a rotational run defender. NFL Comparison: P.J. Hall - powerful interior defender with motor.' },
      { name: 'Logan Jones', position: 'C', school: 'Iowa', grade: 80, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4686907.png', analysis: 'Smart center with excellent technique and consistency. Jones shows solid fundamentals and good snap accuracy. His football IQ and Iowa pedigree make him a reliable backup center. NFL Comparison: J.C. Tretter - technically sound center with smarts.' },
      { name: 'Zxavian Harris', position: 'DT', school: 'Ole Miss', grade: 79.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685365.png', analysis: 'Quick defensive tackle with good penetration ability. Harris shows burst off the snap and effort in pursuit. His quickness makes him a disruptive interior rotational piece. NFL Comparison: Derrick Nnadi - quick interior defender with penetration.' },
      { name: 'Connor Lew', position: 'C', school: 'Auburn', grade: 79, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870866.png', analysis: 'Tough center with good strength and competitive nature. Lew shows solid blocking fundamentals and leadership. His toughness makes him a quality backup center. NFL Comparison: Bradley Bozeman - tough, competitive center.' },
      { name: 'Domani Jackson', position: 'CB', school: 'Alabama', grade: 79, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685402.png', analysis: 'Athletic corner with good length and coverage potential. Jackson shows flashes of press ability and solid speed. His physical traits give him developmental upside as a corner. NFL Comparison: Greg Stroman - athletic corner with developmental traits.' },
      { name: 'Jake Slaughter', position: 'C', school: 'Florida', grade: 78.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4682506.png', analysis: 'Experienced center with solid technique and consistency. Slaughter shows good snap mechanics and blocking fundamentals. His reliability makes him a solid backup center option. NFL Comparison: Ethan Pocic - reliable backup center with experience.' },
      { name: 'John Mateer', position: 'QB', school: 'Oklahoma', grade: 78.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4915980.png', analysis: 'Dual-threat quarterback with good mobility and playmaking ability. Mateer shows ability to extend plays with his legs and decent arm strength. His athleticism gives him developmental QB2 potential. NFL Comparison: Tyler Huntley - mobile backup QB with playmaking ability.' },
      { name: 'Drew Allar', position: 'QB', school: 'Penn State', grade: 78, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4714771.png', analysis: 'Big-armed quarterback with good size and pocket presence. Allar shows ability to make tight-window throws and solid decision-making. His arm talent and pedigree give him developmental QB potential. NFL Comparison: Sam Darnold - talented QB with developmental potential.' },
      { name: 'Carter Smith', position: 'OT', school: 'Indiana', grade: 78, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4819239.png', analysis: 'Solid tackle with good length and improving technique. Smith shows consistency in pass protection and solid fundamentals. His steady play makes him a developmental tackle option. NFL Comparison: Jamarco Jones - reliable backup tackle with fundamentals.' },
      { name: 'Michael Taaffe', position: 'S', school: 'Texas', grade: 77.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4880346.png', analysis: 'Physical safety with good tackling ability and run support. Taaffe shows toughness near the line and developing coverage skills. His physicality makes him a valuable special teams contributor. NFL Comparison: Deon Bush - physical safety with special teams value.' },
      { name: 'Eric Singleton Jr.', position: 'WR', school: 'Auburn', grade: 77, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5095360.png', analysis: 'Speedy receiver with good vertical ability and route running. Singleton shows ability to stretch the field and make plays downfield. His speed makes him a vertical threat. NFL Comparison: John Ross - speed receiver with vertical ability.' },
      { name: 'Austin Siereveld', position: 'OT', school: 'Ohio State', grade: 77, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4917984.png', analysis: 'Developing tackle with good size and improving fundamentals. Siereveld shows potential in pass protection and continues to develop. His Ohio State coaching gives him developmental potential. NFL Comparison: Thayer Munford - developmental tackle with size.' },
      { name: 'Kaytron Allen', position: 'RB', school: 'Penn State', grade: 76.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685246.png', analysis: 'Physical runner with good power and contact balance. Allen shows ability to run between the tackles and solid hands. His physicality makes him a valuable short-yardage back. NFL Comparison: Damien Harris - physical downhill runner.' },
      { name: 'Chris Brazzell II', position: 'WR', school: 'Tennessee', grade: 76.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5091739.png', analysis: 'Big receiver with good size and developing route running. Brazzell shows ability to win contested catches and solid hands. His size makes him a red zone option. NFL Comparison: Josh Palmer - big receiver with developing skills.' },
      { name: 'Antonio Williams', position: 'WR', school: 'Clemson', grade: 76, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081432.png', analysis: 'Athletic receiver with good speed and route running ability. Williams shows ability to create separation and make plays. His athleticism makes him an intriguing developmental receiver. NFL Comparison: Laviska Shenault - athletic playmaker with versatility.' },
      { name: 'Garrett Nussmeier', position: 'QB', school: 'LSU', grade: 76, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4567747.png', analysis: 'Experienced quarterback with good arm strength and leadership. Nussmeier shows ability to make throws and manage the game. His experience makes him a solid developmental QB. NFL Comparison: Will Grier - experienced college QB with arm talent.' },
      { name: 'Carson Beck', position: 'QB', school: 'Miami', grade: 75.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4430841.png', analysis: 'Veteran quarterback with good size and pocket awareness. Beck shows experience reading defenses and solid arm talent. His veteran presence makes him a backup QB option. NFL Comparison: Jake Fromm - experienced QB with game management skills.' },
      { name: 'Jadarian Price', position: 'RB', school: 'Notre Dame', grade: 75, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685512.png', analysis: 'Explosive runner with good speed and elusiveness. Price shows ability to hit holes quickly and make defenders miss. His burst makes him a change-of-pace back. NFL Comparison: Nyheim Hines - elusive speedster with receiving ability.' },
      { name: 'Zachariah Branch', position: 'WR', school: 'Georgia', grade: 75, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870612.png', analysis: 'Dynamic playmaker with excellent speed and return ability. Branch shows big-play potential as a receiver and returner. His explosiveness makes him a special teams weapon. NFL Comparison: Mecole Hardman - speed weapon with return value.' },
      { name: 'Kamari Ramsey', position: 'S', school: 'USC', grade: 74.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685518.png', analysis: 'Athletic safety with good range and ball skills. Ramsey shows ability to cover ground and make plays on the ball. His athleticism makes him a developmental safety. NFL Comparison: Terrell Burgess - athletic safety with coverage ability.' },
      { name: 'A\'Mauri Washington', position: 'DT', school: 'Oregon', grade: 74.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4899488.png', analysis: 'Big defensive tackle with good size and power. Washington shows ability to occupy blockers and clog running lanes. His size makes him a valuable rotational nose tackle. NFL Comparison: Daniel Ekuale - big-bodied rotational nose tackle.' },
      { name: 'Quincy Rhodes Jr.', position: 'EDGE', school: 'Arkansas', grade: 74, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4918136.png', analysis: 'Athletic edge rusher with good speed and developing moves. Rhodes shows ability to bend and hustle to the ball. His motor makes him a rotational pass rusher. NFL Comparison: Wyatt Hubert - developmental edge with motor.' },
      { name: 'LaNorris Sellers', position: 'QB', school: 'South Carolina', grade: 74, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4875127.png', analysis: 'Athletic quarterback with good mobility and arm strength. Sellers shows ability to make plays with his legs and developing accuracy. His dual-threat ability makes him a developmental project. NFL Comparison: Malik Willis - athletic project QB with tools.' },
      { name: 'Domonique Orange', position: 'DT', school: 'Iowa State', grade: 73.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4698728.png', analysis: 'Strong interior defender with good power and effort. Orange shows ability to push the pocket and pursue. His strength makes him a rotational interior defender. NFL Comparison: Grady Jarrett - undersized interior force with power.' },
      { name: 'Jaishawn Barham', position: 'LB', school: 'Michigan', grade: 73, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685266.png', analysis: 'Versatile linebacker with good athleticism and football IQ. Barham shows ability to play multiple positions and special teams value. His versatility makes him a valuable depth piece. NFL Comparison: Curtis Bolton - versatile backup linebacker.' },
      { name: 'Michael Trigg', position: 'TE', school: 'Baylor', grade: 73, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4594749.png', analysis: 'Athletic tight end with good hands and route running. Trigg shows ability to create separation and make plays. His receiving ability makes him a developmental pass-catching TE. NFL Comparison: Ian Thomas - athletic receiving tight end.' },
      { name: 'Deion Burks', position: 'WR', school: 'Oklahoma', grade: 73, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4683151.png', analysis: 'Big receiver with good size and contested-catch ability. Burks shows solid hands and improving route running. His size makes him a developmental red zone target. NFL Comparison: Allen Lazard - big-bodied possession receiver.' },
      { name: 'Derrick Moore', position: 'EDGE', school: 'Michigan', grade: 72.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685461.png', analysis: 'Physical edge rusher with good power and motor. Moore shows ability to set the edge and developing pass-rush moves. His effort and toughness make him a developmental rotational edge. NFL Comparison: Austin Bryant - developmental edge with physicality.' },
      { name: 'Zane Durant', position: 'DT', school: 'Penn State', grade: 72.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685347.png', analysis: 'Solid defensive tackle with good strength and fundamentals. Durant shows ability to hold the point and pursue. His Penn State coaching makes him a reliable backup interior defender. NFL Comparison: Tyler Lancaster - solid backup interior defender.' },
      { name: 'Darrell Jackson Jr.', position: 'DT', school: 'Florida State', grade: 72, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4612836.png', analysis: 'Powerful interior defender with good size and strength. Jackson shows ability to clog lanes and occupy blockers. His power makes him a rotational run-stuffer. NFL Comparison: Corey Liuget - powerful rotational interior presence.' },
      { name: 'Josiah Trotter', position: 'LB', school: 'Missouri', grade: 72, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870998.png', analysis: 'Instinctive linebacker with good football IQ and tackling. Trotter shows solid fundamentals and understanding of the game. His intelligence makes him a valuable backup linebacker. NFL Comparison: Joe Schobert - smart backup linebacker with fundamentals.' },
      { name: 'Dontay Corleone', position: 'DT', school: 'Cincinnati', grade: 71, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4594205.png', analysis: 'Physical nose tackle with good power and toughness. Corleone shows ability to anchor and clog the middle. His strength makes him a developmental nose tackle. NFL Comparison: Eli Ankou - powerful backup nose tackle.' },
      { name: 'Anthony Lucas', position: 'DT', school: 'USC', grade: 71, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685442.png', analysis: 'Athletic interior defender with good quickness and motor. Lucas shows ability to penetrate gaps and pursue. His athleticism makes him an intriguing developmental tackle. NFL Comparison: Matt Ioannidis - athletic interior defender with upside.' },
      { name: 'Jeremiah Cobb', position: 'RB', school: 'Auburn', grade: 70.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870642.png', analysis: 'Versatile running back with good hands and vision. Cobb shows ability to contribute on third down and as a receiver. His versatility makes him a valuable depth running back. NFL Comparison: Boston Scott - versatile change-of-pace back.' },
      { name: 'Mikail Kamara', position: 'EDGE', school: 'Indiana', grade: 70.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4696051.png', analysis: 'Developing edge rusher with good length and athleticism. Kamara shows flashes of pass-rush ability and motor. His physical tools give him developmental upside. NFL Comparison: Quinton Bell - developmental edge with tools.' },
      { name: 'Tacario Davis', position: 'CB', school: 'Washington', grade: 70, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4726127.png', analysis: 'Quick corner with good ball skills and competitiveness. Davis shows solid technique in coverage and willingness to tackle. His competitive nature makes him a depth corner option. NFL Comparison: Torry McTyer - developmental corner with competitiveness.' },
      { name: 'Jack Endries', position: 'TE', school: 'Texas', grade: 70, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5085189.png', analysis: 'Big tight end with good hands and developing blocking. Endries shows ability to be a red zone target and improving route running. His size makes him a developmental H-back type. NFL Comparison: Eric Saubert - big-bodied backup tight end.' },
      { name: 'Jyaire Hill', position: 'CB', school: 'Michigan', grade: 69.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4918449.png', analysis: 'Smooth corner with good technique and ball awareness. Hill shows solid coverage skills and good recovery speed. His consistency makes him a developmental outside corner. NFL Comparison: Tre Brown - technically sound corner with good awareness.' },
      { name: 'Julian Neal', position: 'CB', school: 'Arkansas', grade: 69.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4684543.png', analysis: 'Physical corner with good size and press technique. Neal shows willingness to support the run and compete at the catch point. His physicality makes him an intriguing boundary corner. NFL Comparison: Isaac Yiadom - physical developmental corner.' },
      // Ranks 101-150
      { name: 'Kenyatta Jackson Jr.', position: 'EDGE', school: 'Ohio State', grade: 69, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081821.png', analysis: 'Long edge rusher with good athleticism and developing technique. Jackson shows pass-rush potential and motor. His length gives him developmental upside as a rotational edge. NFL Comparison: Tariq Woolen (converted) - long athlete with tools.' },
      { name: 'DeMonte Capehart', position: 'DT', school: 'Clemson', grade: 69, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4429007.png', analysis: 'Massive nose tackle with elite strength and anchor. Capehart clogs the middle and occupies blockers. His power makes him a space-eating run defender. NFL Comparison: Danny Shelton - massive run-stuffing nose tackle.' },
      { name: 'Bray Hubbard', position: 'S', school: 'Alabama', grade: 68.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5077638.png', analysis: 'Rangy safety with good instincts and tackling. Hubbard shows ability to play center field and provide run support. His versatility makes him a backup safety with special teams value. NFL Comparison: Miles Killebrew - versatile safety with special teams ability.' },
      { name: 'Caden Curry', position: 'EDGE', school: 'Ohio State', grade: 68.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685324.png', analysis: 'Powerful edge defender with good strength and motor. Curry shows ability to set the edge and developing pass-rush moves. His physicality makes him a developmental 3-4 end. NFL Comparison: Jonathan Greenard - powerful edge with developing pass rush.' },
      { name: 'Patrick Payton', position: 'EDGE', school: 'LSU', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4596679.png', analysis: 'Quick edge rusher with good bend and burst. Payton shows ability to win with speed and developing hand usage. His athleticism makes him a rotational pass rusher. NFL Comparison: Carl Granderson - quick rotational edge rusher.' },
      { name: 'Devin Moore', position: 'CB', school: 'Florida', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4702577.png', analysis: 'Athletic corner with good speed and recovery ability. Moore shows solid coverage skills and willingness to tackle. His athleticism gives him developmental potential as a nickel corner. NFL Comparison: Anthony Averett - athletic developmental corner.' },
      { name: 'Rayshaun Benny', position: 'DT', school: 'Michigan', grade: 67, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4432661.png', analysis: 'Physical interior defender with good strength and technique. Benny shows ability to control gaps and pursue. His fundamentals make him a solid rotational defensive tackle. NFL Comparison: Vincent Taylor - solid rotational interior defender.' },
      { name: 'Lander Barton', position: 'LB', school: 'Utah', grade: 67, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685272.png', analysis: 'Instinctive linebacker with good football IQ and tackling. Barton shows solid fundamentals and understanding. His intelligence makes him a backup linebacker with special teams value. NFL Comparison: Nathan Gerry - smart backup linebacker.' },
      { name: 'James Smith', position: 'DT', school: 'Alabama', grade: 66.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870969.png', analysis: 'Strong interior defender with good power and motor. Smith shows ability to anchor and push the pocket. His strength makes him a rotational run-stopping tackle. NFL Comparison: Rodney Coe - powerful rotational nose tackle.' },
      { name: 'Amare Ferrell', position: 'S', school: 'Indiana', grade: 66.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870711.png', analysis: 'Hard-hitting safety with good size and physicality. Ferrell shows strong run support and developing coverage skills. His toughness makes him a depth strong safety. NFL Comparison: Damontae Kazee - physical strong safety.' },
      { name: 'Omar Cooper Jr.', position: 'WR', school: 'Indiana', grade: 66, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4723820.png', analysis: 'Speedy receiver with good acceleration and route running. Cooper shows ability to create separation and make plays after the catch. His speed makes him a developmental slot receiver. NFL Comparison: Darius Jennings - quick slot receiver.' },
      { name: 'Tim Keenan III', position: 'DT', school: 'Alabama', grade: 66, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431414.png', analysis: 'Athletic defensive tackle with good quickness and pursuit. Keenan shows ability to penetrate and disrupt. His Alabama pedigree makes him an intriguing developmental tackle. NFL Comparison: McTelvin Agim - athletic interior defender with upside.' },
      { name: 'Kevin Coleman Jr.', position: 'WR', school: 'Missouri', grade: 65.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685307.png', analysis: 'Explosive receiver with elite speed and big-play ability. Coleman shows ability to take the top off defenses and track deep balls. His speed makes him a developmental vertical threat. NFL Comparison: Willie Snead - quick receiver with deep speed.' },
      { name: 'Brian Parker II', position: 'OT', school: 'Duke', grade: 65.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4689117.png', analysis: 'Athletic tackle with good length and footwork. Parker shows solid technique and improving strength. His athleticism makes him a developmental swing tackle. NFL Comparison: Alex Taylor - athletic developmental tackle.' },
      { name: 'Max Llewellyn', position: 'EDGE', school: 'Iowa', grade: 65, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4683101.png', analysis: 'Relentless edge defender with high motor and effort. Llewellyn shows good technique and pursuit. His Iowa coaching makes him a fundamentally sound rotational edge. NFL Comparison: Nick Vigil - high-effort developmental edge.' },
      { name: 'Cade Klubnik', position: 'QB', school: 'Clemson', grade: 65, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685413.png', analysis: 'Dual-threat quarterback with good mobility and arm strength. Klubnik shows ability to extend plays and improving decision-making. His athleticism makes him a developmental backup QB. NFL Comparison: Jacoby Brissett - mobile backup with starting experience.' },
      { name: 'Isaac Smith', position: 'S', school: 'Mississippi State', grade: 64.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870972.png', analysis: 'Physical safety with good size and tackling. Smith shows strong box presence and developing coverage. His physicality makes him a depth strong safety. NFL Comparison: Dean Marlowe - physical backup safety.' },
      { name: 'Nick Singleton', position: 'RB', school: 'Penn State', grade: 64.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685555.png', analysis: 'Explosive running back with elite speed and big-play ability. Singleton shows home-run threat and improving vision. His speed makes him a change-of-pace back. NFL Comparison: Raheem Mostert - explosive speed back.' },
      { name: 'Rod Moore', position: 'S', school: 'Michigan', grade: 64, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4603101.png', analysis: 'Ball-hawking safety with excellent instincts and range. Moore shows great anticipation and playmaking ability. His coverage skills make him a free safety prospect. NFL Comparison: Jessie Bates - instinctive center fielder.' },
      { name: 'Raylen Wilson', position: 'LB', school: 'Georgia', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871074.png', analysis: 'Athletic linebacker with good speed and coverage ability. Wilson shows versatility and special teams value. His Georgia pedigree makes him a developmental linebacker. NFL Comparison: Quay Walker - athletic Georgia linebacker.' },
      { name: 'Demond Claiborne', position: 'RB', school: 'Wake Forest', grade: 63, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832846.png', analysis: 'Versatile back with good receiving skills and vision. Claiborne shows ability to contribute on third down. His pass-catching makes him a depth running back. NFL Comparison: Nyheim Hines - versatile receiving back.' },
      { name: 'Chase Bisontis', position: 'OG', school: 'Texas A&M', grade: 63, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870596.png', analysis: 'Powerful guard with good strength and run-blocking ability. Bisontis shows physicality at the point of attack. His power makes him a developmental guard. NFL Comparison: Nate Herbig - powerful backup guard.' },
      { name: 'Chandler Rivers', position: 'CB', school: 'Duke', grade: 62.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4702918.png', analysis: 'Quick corner with good ball skills and competitiveness. Rivers shows solid technique and awareness. His competitiveness makes him a depth corner. NFL Comparison: Kevin King - tall developmental corner.' },
      { name: 'Malachi Fields', position: 'WR', school: 'Notre Dame', grade: 62.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4682648.png', analysis: 'Reliable receiver with good hands and route running. Fields shows consistency and understanding of leverage. His reliability makes him a depth possession receiver. NFL Comparison: Equanimeous St. Brown - tall Notre Dame receiver.' },
      { name: 'Jacob Rodriguez', position: 'LB', school: 'Texas Tech', grade: 62, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4566094.png', analysis: 'Instinctive linebacker with good tackling and pursuit. Rodriguez shows solid fundamentals and motor. His instincts make him a backup linebacker. NFL Comparison: Dakota Allen - instinctive Texas Tech linebacker.' },
      { name: 'Ar\'Maj Reed-Adams', position: 'OG', school: 'Texas A&M', grade: 62, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4606712.png', analysis: 'Physical guard with good size and strength. Reed-Adams shows ability to move defenders in the run game. His physicality makes him a developmental interior lineman. NFL Comparison: Jordan Meredith - physical backup guard.' },
      { name: 'T.J. Hall', position: 'CB', school: 'Iowa', grade: 61.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4873075.png', analysis: 'Fundamentally sound corner with good technique and positioning. Hall shows Iowa coaching and consistency. His technique makes him a developmental corner. NFL Comparison: Michael Ojemudia - technically sound Iowa corner.' },
      { name: 'Blake Miller', position: 'OT', school: 'Clemson', grade: 61.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081450.png', analysis: 'Athletic tackle with good length and footwork. Miller shows solid pass protection and improving strength. His athleticism makes him a developmental tackle. NFL Comparison: Jordan Mills - athletic developmental tackle.' },
      { name: 'T.J. Guy', position: 'EDGE', school: 'Michigan', grade: 61, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4600387.png', analysis: 'Motor-driven edge rusher with relentless effort. Guy shows good pursuit and developing pass-rush moves. His motor makes him a rotational edge. NFL Comparison: Frank Clark - relentless Michigan edge.' },
      { name: 'Kage Casey', position: 'OT', school: 'Boise State', grade: 61, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4868598.png', analysis: 'Big tackle with good strength and toughness. Casey shows solid fundamentals and improving technique. His size makes him a developmental swing tackle. NFL Comparison: David Bakhtiari (Boise State) - developmental tackle prospect.' },
      { name: 'Parker Brailsford', position: 'C', school: 'Alabama', grade: 60.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4816090.png', analysis: 'Solid center with good intelligence and communication. Brailsford shows ability to make line calls and anchor. His Alabama coaching makes him a developmental center. NFL Comparison: Bradley Bozeman - Alabama center with smarts.' },
      { name: 'Aaron Anderson', position: 'WR', school: 'LSU', grade: 60.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4691138.png', analysis: 'Athletic receiver with good speed and ball tracking. Anderson shows ability to win vertically and make contested catches. His athleticism makes him a developmental receiver. NFL Comparison: Terrace Marshall Jr. - athletic LSU receiver.' },
      { name: 'Beau Stephens', position: 'OG', school: 'Iowa', grade: 60, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4592823.png', analysis: 'Fundamentally sound guard with good technique and effort. Stephens shows Iowa coaching and consistency. His fundamentals make him a backup guard. NFL Comparison: Sean Harlow - Iowa developmental guard.' },
      { name: 'Jalen Huskey', position: 'S', school: 'Maryland', grade: 60, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912185.png', analysis: 'Athletic safety with good range and ball skills. Huskey shows ability to cover ground and make plays. His athleticism makes him a depth safety. NFL Comparison: Deon Bush - athletic Maryland safety.' },
      { name: 'Bishop Fitzgerald', position: 'S', school: 'USC', grade: 59, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5151810.png', analysis: 'Physical safety with good tackling and run support. Fitzgerald shows strong box presence and toughness. His physicality makes him a backup strong safety. NFL Comparison: Su\'a Cravens - physical USC safety.' },
      { name: 'Earnest Greene III', position: 'OG', school: 'Georgia', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685360.png', analysis: 'Big tackle with good strength and footwork. Greene shows Georgia coaching and improving technique. His size makes him a developmental tackle. NFL Comparison: D\'Marcus Hayes - Georgia developmental tackle.' },
      { name: 'Trey Moore', position: 'EDGE', school: 'Texas', grade: 58.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4879212.png', analysis: 'Athletic edge rusher with good length and speed. Moore shows pass-rush upside and motor. His athleticism makes him a developmental edge. NFL Comparison: Joseph Ossai - athletic Texas edge.' },
      { name: 'Boubacar Traore', position: 'EDGE', school: 'Notre Dame', grade: 58.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871079.png', analysis: 'Physical edge defender with good power and effort. Traore shows ability to set the edge and pursue. His physicality makes him a rotational edge. NFL Comparison: Julian Okwara - Notre Dame developmental edge.' },
      { name: 'Oscar Delp', position: 'TE', school: 'Georgia', grade: 58, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4702559.png', analysis: 'Athletic tight end with good receiving skills and route running. Delp shows ability to create separation and make plays. His receiving ability makes him a pass-catching TE. NFL Comparison: Brevin Jordan - athletic receiving tight end.' },
      { name: 'D.J. Campbell', position: 'OG', school: 'Texas', grade: 58, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081977.png', analysis: 'Powerful guard with good strength and run-blocking. Campbell shows ability to move defenders and anchor. His power makes him a developmental guard. NFL Comparison: Denzel Okafor - powerful developmental guard.' },
      { name: 'Jude Bowry', position: 'OT', school: 'Boston College', grade: 57.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4869533.png', analysis: 'Athletic tackle with good length and mobility. Bowry shows solid pass protection and improving strength. His athleticism makes him a developmental swing tackle. NFL Comparison: Ben Petrula - BC developmental tackle.' },
      { name: 'Josh Moten', position: 'CB', school: 'Southern Miss', grade: 57.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685146.png', analysis: 'Quick corner with good ball skills and instincts. Moten shows ability to make plays on the ball. His ball skills make him a depth corner. NFL Comparison: Kyel Hemby - small school developmental corner.' },
      { name: 'Eric Rivers', position: 'WR', school: 'Georgia Tech', grade: 57, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4713277.png', analysis: 'Athletic receiver with good speed and hands. Rivers shows ability to stretch the field and make plays. His speed makes him a developmental receiver. NFL Comparison: Jalen Camp - Georgia Tech athletic receiver.' },
      { name: 'Emmett Johnson', position: 'RB', school: 'Nebraska', grade: 57, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832955.png', analysis: 'Physical running back with good power and toughness. Johnson shows ability to run between the tackles. His power makes him a short-yardage back. NFL Comparison: Devine Ozigbo - physical Nebraska back.' },
      { name: 'Kelby Collins', position: 'DT', school: 'LSU', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870667.png', analysis: 'Strong interior defender with good power and anchor. Collins shows Alabama coaching and fundamentals. His strength makes him a rotational tackle. NFL Comparison: D.J. Dale - Alabama developmental tackle.' },
      { name: 'Drew Shelton', position: 'OT', school: 'Penn State', grade: 56.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685554.png', analysis: 'Big tackle with good strength and length. Shelton shows solid fundamentals and improving technique. His size makes him a developmental tackle. NFL Comparison: Will Fries - Penn State developmental tackle.' },
      { name: 'Jermaine Mathews Jr.', position: 'CB', school: 'Ohio State', grade: 56, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5150710.png', analysis: 'Quick corner with good technique and ball skills. Mathews shows Ohio State coaching and awareness. His technique makes him a depth corner. NFL Comparison: Sevyn Banks - Ohio State developmental corner.' },
      { name: 'Josh Thompson', position: 'OG', school: 'LSU', grade: 56, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4682692.png', analysis: 'Physical guard with good strength and toughness. Thompson shows ability to move defenders in the run game. His power makes him a developmental guard. NFL Comparison: Ed Ingram - LSU powerful guard.' },
      { name: 'Dae\'Quan Wright', position: 'TE', school: 'Ole Miss', grade: 55.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4838696.png', analysis: 'Big tight end with good hands and size. Wright shows ability to be a red zone target. His size makes him a developmental blocking tight end. NFL Comparison: Dawson Knox - big Ole Miss tight end.' },
      { name: 'Albert Regis', position: 'DT', school: 'Texas A&M', grade: 55.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4612298.png', analysis: 'Strong nose tackle with good power and anchor. Regis shows ability to clog the middle and occupy blockers. His strength makes him a developmental nose tackle. NFL Comparison: McKinnley Jackson - Texas A&M nose tackle.' },
      // Ranks 151-200
      { name: 'J\'Mari Taylor', position: 'RB', school: 'Virginia', grade: 54.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4713118.png', analysis: 'Elusive running back with good vision and quickness. Taylor shows ability to make defenders miss and find creases. His elusiveness makes him a change-of-pace back. NFL Comparison: J.D. McKissic - elusive receiving back.' },
      { name: 'J.C. Davis', position: 'OT', school: 'Illinois', grade: 54.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5082353.png', analysis: 'Athletic tackle with good length and mobility. Davis shows solid pass protection and improving strength. His athleticism makes him a developmental swing tackle. NFL Comparison: Vederian Lowe - Illinois developmental tackle.' },
      { name: 'Aaron Graves', position: 'DT', school: 'Iowa', grade: 54, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685355.png', analysis: 'Fundamentally sound tackle with good technique and motor. Graves shows Iowa coaching and consistency. His technique makes him a rotational tackle. NFL Comparison: Chauncey Golston - Iowa developmental tackle.' },
      { name: 'Jimmy Rolder', position: 'LB', school: 'Michigan', grade: 54, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4896353.png', analysis: 'Physical linebacker with good tackling and effort. Rolder shows Michigan coaching and toughness. His physicality makes him a backup linebacker. NFL Comparison: Josh Ross - Michigan developmental linebacker.' },
      { name: 'Jaeden Roberts', position: 'OG', school: 'Alabama', grade: 53.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431529.png', analysis: 'Powerful guard with good strength and run-blocking. Roberts shows Alabama pedigree and fundamentals. His power makes him a developmental guard. NFL Comparison: Lester Cotton - Alabama developmental guard.' },
      { name: 'DeShon Singleton', position: 'S', school: 'Nebraska', grade: 53.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081093.png', analysis: 'Hard-hitting safety with good physicality and run support. Singleton shows strong box presence. His toughness makes him a backup strong safety. NFL Comparison: Lamar Jackson (Nebraska) - physical safety.' },
      { name: 'Wendell Moe Jr.', position: 'OG', school: 'Tennessee', grade: 53, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5086640.png', analysis: 'Big guard with good size and strength. Moe shows ability to move defenders in the run game. His size makes him a developmental guard. NFL Comparison: Jerome Carvin - Tennessee developmental guard.' },
      { name: 'Lawson Luckie', position: 'TE', school: 'Georgia', grade: 53, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870874.png', analysis: 'Athletic tight end with good hands and route running. Luckie shows Georgia coaching and receiving ability. His athleticism makes him a pass-catching TE. NFL Comparison: Charlie Woerner - Georgia tight end.' },
      { name: 'Peyton Bowen', position: 'S', school: 'Oklahoma', grade: 52.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870625.png', analysis: 'Versatile safety with good instincts and coverage ability. Bowen shows ability to play multiple positions. His versatility makes him a depth safety. NFL Comparison: Justin Broiles - versatile Oklahoma safety.' },
      { name: 'Isaiah Sategna III', position: 'WR', school: 'Oklahoma', grade: 52.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5080703.png', analysis: 'Explosive receiver with elite speed and return ability. Sategna shows big-play potential on offense and special teams. His speed makes him a gadget player. NFL Comparison: Mecole Hardman - explosive speed specialist.' },
      { name: 'Will Lee III', position: 'CB', school: 'Texas A&M', grade: 52, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5151083.png', analysis: 'Quick corner with good ball skills and competitiveness. Lee shows solid technique and awareness. His competitiveness makes him a depth corner. NFL Comparison: Keldrick Carper - Texas A&M developmental corner.' },
      { name: 'Tyrique Tucker', position: 'DT', school: 'Indiana', grade: 52, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912358.png', analysis: 'Athletic tackle with good quickness and motor. Tucker shows ability to penetrate and disrupt. His athleticism makes him a rotational tackle. NFL Comparison: Jerome Johnson - Indiana developmental tackle.' },
      { name: 'Alex Harkey', position: 'OT', school: 'Oregon', grade: 51.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5082660.png', analysis: 'Big tackle with good length and strength. Harkey shows solid fundamentals and improving technique. His size makes him a developmental tackle. NFL Comparison: George Moore - Oregon developmental tackle.' },
      { name: 'Le\'Veon Moss', position: 'RB', school: 'Texas A&M', grade: 51.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685470.png', analysis: 'Physical running back with good power and size. Moss shows ability to run through tackles and finish runs. His power makes him a short-yardage option. NFL Comparison: Zack Moss - powerful physical back.' },
      { name: 'Bryce Boettcher', position: 'LB', school: 'Oregon', grade: 50.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5088571.png', analysis: 'Hard-hitting linebacker with good tackling and motor. Boettcher shows Oregon coaching and effort. His toughness makes him a backup linebacker with special teams value. NFL Comparison: Troy Dye - Oregon developmental linebacker.' },
      { name: 'Taylen Green', position: 'QB', school: 'Arkansas', grade: 50.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431325.png', analysis: 'Dual-threat quarterback with excellent mobility and improving accuracy. Green shows ability to create plays with his legs. His athleticism makes him a developmental QB. NFL Comparison: Malik Willis - athletic developmental QB.' },
      { name: 'Hank Beatty', position: 'WR', school: 'Illinois', grade: 50, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4814930.png', analysis: 'Reliable receiver with good hands and route running. Beatty shows consistency and understanding. His reliability makes him a depth receiver. NFL Comparison: Dazz Newsome - Illinois possession receiver.' },
      { name: 'Louis Moore', position: 'S', school: 'Indiana', grade: 50, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081323.png', analysis: 'Athletic safety with good range and ball skills. Moore shows ability to cover ground and make plays. His athleticism makes him a depth safety. NFL Comparison: Devon Key - Indiana safety prospect.' },
      { name: 'Trey Zuhn III', position: 'OT', school: 'Texas A&M', grade: 49.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431623.png', analysis: 'Big tackle with good size and strength. Zuhn shows solid fundamentals and improving technique. His size makes him a developmental tackle. NFL Comparison: Dan Moore Jr. - developmental tackle prospect.' },
      { name: 'Keionte Scott', position: 'S', school: 'Miami', grade: 49.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5093694.png', analysis: 'Physical safety with good tackling and run support. Scott shows Miami toughness and aggressiveness. His physicality makes him a backup strong safety. NFL Comparison: Amari Carter - Miami physical safety.' },
      { name: 'Aiden Fisher', position: 'LB', school: 'Indiana', grade: 49, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912338.png', analysis: 'Instinctive linebacker with good football IQ and tackling. Fisher shows solid fundamentals and motor. His instincts make him a backup linebacker. NFL Comparison: Micah McFadden - Indiana linebacker.' },
      { name: 'Collin Wright', position: 'CB', school: 'Stanford', grade: 49, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4833376.png', analysis: 'Technical corner with good footwork and positioning. Wright shows Stanford coaching and intelligence. His technique makes him a depth corner. NFL Comparison: Paulson Adebo - Stanford technical corner.' },
      { name: 'Ted Hurst', position: 'WR', school: 'Georgia State', grade: 48.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5220680.png', analysis: 'Productive receiver with good hands and route running. Hurst shows ability to get open and make catches. His production makes him a depth receiver. NFL Comparison: Roger Lewis - small school productive receiver.' },
      { name: 'P.J. Williams', position: 'OT', school: 'SMU', grade: 48.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5088249.png', analysis: 'Athletic tackle with good length and mobility. Williams shows solid pass protection and improving strength. His athleticism makes him a developmental tackle. NFL Comparison: Jake Brendel - SMU developmental lineman.' },
      { name: 'Xavier Scott', position: 'CB', school: 'Illinois', grade: 48, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4917004.png', analysis: 'Quick corner with good ball skills and competitiveness. Scott shows solid technique and awareness. His competitiveness makes him a depth corner. NFL Comparison: Tahveon Nicholson - Illinois developmental corner.' },
      { name: 'Chase Roberts', position: 'WR', school: 'BYU', grade: 48, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4714388.png', analysis: 'Reliable receiver with good hands and route running. Roberts shows consistency and understanding. His reliability makes him a depth receiver. NFL Comparison: Neil Pau\'u - BYU possession receiver.' },
      { name: 'Eric O\'Neill', position: 'EDGE', school: 'Rutgers', grade: 47.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4892218.png', analysis: 'Motor-driven edge rusher with good effort and pursuit. O\'Neill shows relentless motor and developing technique. His effort makes him a depth edge. NFL Comparison: Elijah McGuire (converted) - Rutgers athlete.' },
      { name: 'Roman Hemby', position: 'RB', school: 'Indiana', grade: 47.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4688835.png', analysis: 'Quick running back with good vision and elusiveness. Hemby shows ability to make defenders miss. His quickness makes him a change-of-pace back. NFL Comparison: Stevie Scott - Indiana running back.' },
      { name: 'Kahlil Benson', position: 'OT', school: 'Indiana', grade: 46.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4566190.png', analysis: 'Big tackle with good size and strength. Benson shows solid fundamentals and improving technique. His size makes him a developmental tackle. NFL Comparison: Caleb Jones - Indiana developmental lineman.' },
      { name: 'Justin Joly', position: 'TE', school: 'NC State', grade: 46.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912052.png', analysis: 'Athletic tight end with good hands and route running. Joly shows receiving ability and developing blocking. His athleticism makes him a pass-catching TE. NFL Comparison: Dylan Parham - NC State athlete.' },
      { name: 'Stephen Daley', position: 'EDGE', school: 'Indiana', grade: 46, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912558.png', analysis: 'Relentless edge rusher with high motor and effort. Daley shows good pursuit and developing technique. His motor makes him a depth edge. NFL Comparison: Allen Stallings - Indiana defensive end.' },
      { name: 'Thaddeus Dixon', position: 'CB', school: 'North Carolina', grade: 46, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5151880.png', analysis: 'Quick corner with good ball skills and competitiveness. Dixon shows solid technique and awareness. His competitiveness makes him a depth corner. NFL Comparison: Storm Duck - North Carolina corner.' },
      { name: 'Riley Nowakowski', position: 'TE', school: 'Indiana', grade: 45.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4693370.png', analysis: 'Big tight end with good hands and developing blocking. Nowakowski shows ability to be a red zone target. His size makes him a developmental tight end. NFL Comparison: Peyton Hendershot - Indiana tight end.' },
      { name: 'Hezekiah Masses', position: 'CB', school: 'California', grade: 45.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4917354.png', analysis: 'Athletic corner with good speed and recovery ability. Masses shows solid coverage skills and athleticism. His speed makes him a depth corner. NFL Comparison: Josh Drayden - Cal developmental corner.' },
      { name: 'Kelley Jones', position: 'CB', school: 'Mississippi State', grade: 45, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5076950.png', analysis: 'Physical corner with good size and press technique. Jones shows willingness to compete at the catch point. His physicality makes him a depth corner. NFL Comparison: Martin Emerson - Mississippi State corner.' },
      { name: 'Peter Clarke', position: 'TE', school: 'Temple', grade: 72, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5080547.png', analysis: 'Big tight end with good size and hands. Clarke shows solid receiving skills and developing blocking. His size makes him a developmental H-back. NFL Comparison: Kenny Yeboah - Temple tight end.' },
      { name: 'Isaiah Smith', position: 'EDGE', school: 'SMU', grade: 72, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4816330.png', analysis: 'Athletic edge rusher with good speed and motor. Smith shows pass-rush upside and effort. His athleticism makes him a developmental edge. NFL Comparison: Delontae Scott - SMU edge rusher.' },
      { name: 'Skyler Bell', position: 'WR', school: 'Wisconsin', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4683153.png', analysis: 'Productive receiver with good hands and route running. Bell shows consistency and ability to get open. His production makes him a depth receiver. NFL Comparison: Aaron McLean - UConn receiver.' },
      { name: 'Nadame Tucker', position: 'EDGE', school: 'Western Michigan', grade: 70.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081483.png', analysis: 'Motor-driven edge rusher with good effort and pursuit. Tucker shows relentless motor and developing technique. His effort makes him a depth edge. NFL Comparison: Ali Fayad - MAC edge rusher.' },
      { name: 'Keanu Tanuvasa', position: 'DT', school: 'BYU', grade: 69.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912270.png', analysis: 'Physical nose tackle with good power and toughness. Tanuvasa shows ability to anchor and clog the middle. His power makes him a developmental nose tackle. NFL Comparison: Khyiris Tonga - BYU nose tackle.' },
      { name: 'Ephesians Prysock', position: 'CB', school: 'Washington', grade: 69.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685523.png', analysis: 'Athletic corner with good size and recovery speed. Prysock shows solid coverage skills and athleticism. His size makes him a developmental boundary corner. NFL Comparison: Elijah Molden - Washington corner.' },
      { name: 'O\'Mega Blake', position: 'WR', school: 'Arkansas', grade: 70.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4684173.png', analysis: 'Athletic receiver with good speed and ball tracking. Blake shows ability to stretch the field and make plays. His speed makes him a developmental deep threat. NFL Comparison: Treylon Burks - Arkansas athletic receiver.' },
      // Ranks 201-250
      { name: 'Josh Cameron', position: 'WR', school: 'Baylor', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4879194.png', analysis: 'Reliable receiver with good hands and route running. Cameron shows consistency and understanding. His reliability makes him a depth receiver. NFL Comparison: Denzel Mims - Baylor receiver.' },
      { name: 'Joe Royer', position: 'TE', school: 'Cincinnati', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4565859.png', analysis: 'Athletic tight end with good receiving skills. Royer shows ability to create separation and solid hands. His athleticism makes him a pass-catching TE. NFL Comparison: Leonard Taylor - Cincinnati tight end.' },
      { name: 'Sawyer Robertson', position: 'QB', school: 'Baylor', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4432759.png', analysis: 'Developmental quarterback with good arm and poise. Robertson shows solid decision-making and improving accuracy. His fundamentals make him a backup QB. NFL Comparison: Charlie Brewer - Baylor developmental QB.' },
      { name: 'Niki Prongos', position: 'OT', school: 'Stanford', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5086031.png', analysis: 'Technical tackle with good footwork and intelligence. Prongos shows Stanford coaching and fundamentals. His technique makes him a developmental tackle. NFL Comparison: Foster Sarell - Stanford tackle.' },
      { name: 'Ernest Hausmann', position: 'LB', school: 'Michigan', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4751681.png', analysis: 'Physical linebacker with good tackling and motor. Hausmann shows Michigan coaching and effort. His physicality makes him a backup linebacker. NFL Comparison: Cameron McGrone - Michigan linebacker.' },
      { name: 'Bryce Foster', position: 'C', school: 'Kansas', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431276.png', analysis: 'Strong center with good power and intelligence. Foster shows ability to make line calls and anchor. His strength makes him a developmental center. NFL Comparison: Creed Humphrey - Oklahoma center.' },
      { name: 'Kyle Louis', position: 'LB', school: 'Pittsburgh', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4880273.png', analysis: 'Instinctive linebacker with good tackling and pursuit. Louis shows solid fundamentals and motor. His instincts make him a backup linebacker. NFL Comparison: SirVocea Dennis - Pittsburgh linebacker.' },
      { name: 'C.J. Daniels', position: 'WR', school: 'Miami', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4605951.png', analysis: 'Athletic receiver with good speed and hands. Daniels shows ability to make plays and stretch the field. His athleticism makes him a developmental receiver. NFL Comparison: KJ Osborn - Miami receiver.' },
      { name: 'V.J. Payne', position: 'S', school: 'Kansas State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4837388.png', analysis: 'Physical safety with good tackling and run support. Payne shows strong box presence and toughness. His physicality makes him a backup strong safety. NFL Comparison: Josh Hayes - Kansas State safety.' },
      { name: 'Jam Miller', position: 'RB', school: 'Alabama', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685477.png', analysis: 'Physical running back with good power and vision. Miller shows Alabama coaching and toughness. His power makes him a short-yardage back. NFL Comparison: Brian Robinson - Alabama power back.' },
      { name: 'Matt Gulbin', position: 'C', school: 'Michigan State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4683463.png', analysis: 'Solid center with good intelligence and fundamentals. Gulbin shows ability to make line calls. His intelligence makes him a developmental center. NFL Comparison: Matt Allen - Michigan State center.' },
      { name: 'Keylan Rutledge', position: 'OG', school: 'Georgia Tech', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4839498.png', analysis: 'Physical guard with good strength and run-blocking. Rutledge shows ability to move defenders. His power makes him a developmental guard. NFL Comparison: Zach Quinney - Georgia Tech guard.' },
      { name: 'DeAndre Moore Jr.', position: 'WR', school: 'Texas', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870860.png', analysis: 'Athletic receiver with good speed and ball tracking. Moore shows ability to stretch the field and make plays. His speed makes him a developmental receiver. NFL Comparison: Jordan Whittington - Texas receiver.' },
      { name: 'Rodrick Pleasant', position: 'CB', school: 'Oregon', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870973.png', analysis: 'Quick corner with good ball skills and competitiveness. Pleasant shows solid technique and awareness. His competitiveness makes him a depth corner. NFL Comparison: Stephan Blaylock - UCLA corner.' },
      { name: 'Darius Taylor', position: 'RB', school: 'Minnesota', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4920901.png', analysis: 'Elusive running back with good vision and quickness. Taylor shows ability to make defenders miss. His elusiveness makes him a change-of-pace back. NFL Comparison: Mohamed Ibrahim - Minnesota running back.' },
      { name: 'Xavier Nwankpa', position: 'S', school: 'Iowa', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685491.png', analysis: 'Ball-hawking safety with good instincts and range. Nwankpa shows Iowa coaching and awareness. His instincts make him a developmental free safety. NFL Comparison: Kaevon Merriweather - Iowa safety.' },
      { name: 'Terion Stewart', position: 'RB', school: 'Virginia Tech', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4565318.png', analysis: 'Physical running back with good power and toughness. Stewart shows ability to run through tackles. His power makes him a short-yardage option. NFL Comparison: Raheem Blackshear - Virginia Tech back.' },
      { name: 'Keyron Crawford', position: 'EDGE', school: 'Auburn', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4911904.png', analysis: 'Athletic edge rusher with good speed and motor. Crawford shows pass-rush upside and effort. His athleticism makes him a developmental edge. NFL Comparison: Big Kat Bryant - Auburn edge rusher.' },
      { name: 'Keagen Trost', position: 'OT', school: 'Missouri', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4575003.png', analysis: 'Big tackle with good size and strength. Trost shows solid fundamentals and improving technique. His size makes him a developmental tackle. NFL Comparison: Javon Foster - Missouri tackle.' },
      { name: 'Colbie Young', position: 'WR', school: 'Georgia', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5092508.png', analysis: 'Athletic receiver with good size and ball skills. Young shows ability to win contested catches. His size makes him a developmental receiver. NFL Comparison: Kearis Jackson - Georgia receiver.' },
      { name: 'Christian Gray', position: 'CB', school: 'Notre Dame', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870708.png', analysis: 'Physical corner with press coverage ability and NFL size. Gray shows good technique and competitiveness. His physicality makes him a late-round developmental corner. NFL Comparison: Cam Taylor-Britt - physical Notre Dame corner.' },
      { name: 'Justin Jefferson', position: 'LB', school: 'Alabama', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5150249.png', analysis: 'Athletic linebacker with good instincts from Alabama defense. Jefferson shows pursuit ability and tackling. His athleticism makes him a developmental linebacker. NFL Comparison: Christian Harris - Alabama linebacker prospect.' },
      { name: 'Isaiah Horton', position: 'WR', school: 'Alabama', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685383.png', analysis: 'Speed receiver with deep threat ability and big play potential. Horton shows vertical threat capability. His speed makes him a developmental deep threat. NFL Comparison: John Metchie - Alabama speed receiver.' },
      { name: 'Ethan Burke', position: 'DT', school: 'Texas', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4908867.png', analysis: 'Solid interior defender with good size and strength. Burke shows ability to occupy blockers and clog lanes. His size makes him a developmental nose tackle. NFL Comparison: Byron Murphy - Texas defensive tackle.' },
      { name: 'Evan Stewart', position: 'WR', school: 'Oregon', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685565.png', analysis: 'Dynamic playmaker with exceptional speed and route running ability. Stewart shows elite separation skills and consistency. His talent makes him a high-upside receiver. NFL Comparison: Jaxon Smith-Njigba - elite route runner with separation.' },
      { name: 'Connor Tollison', position: 'C', school: 'Missouri', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4595024.png', analysis: 'Smart center with good technique and football IQ. Tollison shows consistency in protection and line calls. His reliability makes him a developmental center. NFL Comparison: Creed Humphrey - Missouri center.' },
      { name: 'Max Iheanachor', position: 'OT', school: 'Arizona State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5150136.png', analysis: 'Tall tackle with good athleticism and length. Iheanachor shows potential in pass protection. His tools make him a developmental tackle. NFL Comparison: Dohnovan West - athletic developmental lineman.' },
      { name: 'Deven Eastern', position: 'DT', school: 'Minnesota', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4609203.png', analysis: 'Physical defensive tackle with good strength and motor. Eastern shows ability to penetrate and disrupt. His strength makes him a rotational defensive tackle. NFL Comparison: Esezi Otomewo - Minnesota defensive tackle.' },
      { name: 'Noah Whittington', position: 'RB', school: 'Oregon', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4432631.png', analysis: 'Elusive back with good vision and quickness. Whittington shows ability to make defenders miss. His elusiveness makes him a developmental backup. NFL Comparison: CJ Verdell - Oregon running back.' },
      { name: 'Zakee Wheatley', position: 'S', school: 'Penn State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4566384.png', analysis: 'Versatile safety with good range and ball skills. Wheatley shows ability to play both deep and in the box. His versatility makes him a developmental safety. NFL Comparison: Ji Ayir Brown - Penn State safety.' },
      { name: 'Tanner Koziol', position: 'TE', school: 'Houston', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4917427.png', analysis: 'Reliable tight end with good blocking and receiving skills. Koziol shows consistency and toughness. His reliability makes him a developmental tight end. NFL Comparison: Christian Trahan - Houston tight end.' },
      { name: 'Bryan Thomas Jr.', position: 'EDGE', school: 'South Carolina', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4836472.png', analysis: 'Athletic edge rusher with good speed and bend. Thomas shows potential as a speed rusher. His athleticism makes him a developmental edge. NFL Comparison: Jordan Burch - South Carolina edge rusher.' },
      { name: 'Jakobe Thomas', position: 'S', school: 'Miami', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4710865.png', analysis: 'Physical safety with good tackling and run support. Thomas shows toughness and aggressiveness. His physicality makes him a developmental strong safety. NFL Comparison: Kamren Kinchens - Miami safety.' },
      { name: 'CamRon Stewart', position: 'EDGE', school: 'Temple', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4682643.png', analysis: 'Quick edge rusher with good motor and effort. Stewart shows relentless pursuit. His motor makes him a developmental edge. NFL Comparison: Arnold Ebiketie - Temple edge rusher.' },
      { name: 'Chris McClellan', position: 'DT', school: 'Missouri', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4820574.png', analysis: 'Strong interior lineman with good power and size. McClellan shows ability to anchor against the run. His strength makes him a developmental run stuffer. NFL Comparison: Kobie Whiteside - Missouri defensive tackle.' },
      { name: 'Skyler Gill-Howard', position: 'DT', school: 'Texas Tech', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5103940.png', analysis: 'Active defensive tackle with good quickness and penetration. Gill-Howard shows disruptive ability. His quickness makes him a developmental three-tech. NFL Comparison: Tony Bradford - Texas Tech defensive tackle.' },
      { name: 'Jalen Catalon', position: 'S', school: 'Missouri', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4429385.png', analysis: 'Instinctive safety with good ball skills and range. Catalon shows playmaking ability. His instincts make him a developmental free safety. NFL Comparison: Trey Dean - versatile safety prospect.' },
      { name: 'Kaleb Proctor', position: 'DT', school: 'SE Louisiana', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5084514.png', analysis: 'Raw defensive tackle from small school with good size. Proctor shows potential and athleticism. His rawness makes him a developmental project. NFL Comparison: Khyiris Tonga - small school defensive tackle.' },
      { name: 'Harrison Wallace III', position: 'WR', school: 'Ole Miss', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4699354.png', analysis: 'Smooth receiver with good hands and route running. Wallace shows consistency and reliability. His smoothness makes him a developmental slot receiver. NFL Comparison: Malik Heath - Ole Miss receiver.' },
      { name: 'Cameron Ball', position: 'DT', school: 'Arkansas', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4691878.png', analysis: 'Physical nose tackle with good strength and size. Ball shows ability to clog running lanes. His strength makes him a developmental run defender. NFL Comparison: Isaiah Nichols - Arkansas defensive tackle.' },
      { name: 'Josh Gesky', position: 'OG', school: 'Illinois', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4687706.png', analysis: 'Solid guard with good technique and consistency. Gesky shows understanding of blocking schemes. His reliability makes him a developmental interior lineman. NFL Comparison: Kendrick Green - Illinois guard.' },
      { name: 'Diego Pavia', position: 'QB', school: 'Vanderbilt', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5084180.png', analysis: 'Gritty quarterback with good toughness and competitiveness. Pavia shows leadership and heart. His toughness makes him a developmental backup. NFL Comparison: Jake Haener - tough underdog quarterback.' },
      { name: 'Carson Hinzman', position: 'C', school: 'Ohio State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685384.png', analysis: 'Smart center with good football IQ and technique. Hinzman shows consistency in protection. His intelligence makes him a developmental center. NFL Comparison: Josh Myers - Ohio State center.' },
      { name: 'Barion Brown', position: 'WR', school: 'LSU', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4698597.png', analysis: 'Explosive receiver with elite speed and return ability. Brown shows game-breaking speed. His speed makes him a developmental deep threat and returner. NFL Comparison: Jameson Williams - elite speed threat.' },
      { name: 'Pat Coogan', position: 'C', school: 'Indiana', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4596542.png', analysis: 'Experienced center with good size and strength. Coogan shows leadership and reliability. His experience makes him a developmental center. NFL Comparison: Dylan Parham - reliable interior lineman.' },
      { name: 'Bryson Washington', position: 'RB', school: 'Baylor', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4954455.png', analysis: 'Powerful back with good vision and contact balance. Washington shows ability to break tackles. His power makes him a short-yardage back. NFL Comparison: Abram Smith - Baylor power back.' },
      { name: 'Keyshaun Elliott', position: 'LB', school: 'Arizona State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4911952.png', analysis: 'Athletic linebacker with good speed and sideline-to-sideline range. Elliott shows pursuit ability. His athleticism makes him a developmental linebacker. NFL Comparison: Darien Butler - Arizona State linebacker.' },
      { name: 'Anez Cooper', position: 'OG', school: 'Miami', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4905597.png', analysis: 'Physical guard with good power and nastiness. Cooper shows ability to move defenders. His physicality makes him a developmental guard. NFL Comparison: Jalen Rivers - Miami guard.' },
      { name: 'West Weeks', position: 'LB', school: 'LSU', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4587724.png', analysis: 'Instinctive linebacker with good football IQ and tackling. Weeks shows understanding of the position. His instincts make him a developmental linebacker. NFL Comparison: Greg Penn - LSU linebacker.' },
      { name: 'Genesis Smith', position: 'S', school: 'Arizona State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4950551.png', analysis: 'Rangy safety with good ball skills and coverage ability. Smith shows playmaking potential. His range makes him a developmental free safety. NFL Comparison: Evan Fields - Arizona State safety.' },
      // Ranks 251-300
      { name: 'Charles Demmings', position: 'CB', school: 'Stephen F Austin', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5091793.png', analysis: 'Raw corner from small school with good athleticism. Demmings shows potential and competitiveness. His rawness makes him a developmental project. NFL Comparison: Rachad Wildgoose - small school corner.' },
      { name: 'Will Whitson', position: 'EDGE', school: 'Mississippi State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4251322.png', analysis: 'Athletic edge rusher with good motor and effort. Whitson shows relentless pursuit. His motor makes him a developmental edge. NFL Comparison: Kobe Jones - Mississippi State edge rusher.' },
      { name: 'Jalon Kilgore', position: 'S', school: 'South Carolina', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5076951.png', analysis: 'Physical safety with good tackling and run support. Kilgore shows toughness in the box. His physicality makes him a developmental strong safety. NFL Comparison: Nick Emmanwori - South Carolina safety.' },
      { name: 'Kendal Daniels', position: 'S', school: 'Oklahoma', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4595343.png', analysis: 'Rangy safety with good ball skills and coverage ability. Daniels shows playmaking instincts. His range makes him a developmental free safety. NFL Comparison: Billy Bowman - Oklahoma safety.' },
      { name: 'Bud Clark', position: 'S', school: 'TCU', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4430262.png', analysis: 'Athletic safety with good versatility and ball skills. Clark shows ability to play multiple roles. His versatility makes him a developmental safety. NFL Comparison: Mark Perry - TCU safety.' },
      { name: 'Logan Fano', position: 'EDGE', school: 'Utah', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5080699.png', analysis: 'Powerful edge defender with exceptional strength at the point of attack. Fano shows ability to set the edge in the run game and generate interior pressure. His power and motor make him an intriguing developmental pass rusher. NFL Comparison: Lukas Van Ness - similar power-based edge with run-stopping ability.' },
      { name: 'Red Murdock', position: 'LB', school: 'Buffalo', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912190.png', analysis: 'Athletic linebacker with good range and instincts in coverage. Murdock displays solid tackling technique and sideline-to-sideline speed. His versatility allows him to play multiple linebacker positions. NFL Comparison: Kaden Elliss - similar athletic linebacker with coverage skills from mid-major background.' },
      { name: 'Brandon Cleveland', position: 'DT', school: 'NC State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685305.png', analysis: 'Stout interior defender with good gap discipline and run-stopping ability. Cleveland shows solid hand usage and ability to control blockers. His strength makes him a developmental nose tackle. NFL Comparison: Mazi Smith - similar run-stuffing nose tackle with gap control.' },
      { name: 'Terry Moore', position: 'S', school: 'Duke', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4869820.png', analysis: 'Rangy safety with good ball skills and coverage instincts. Moore displays solid zone awareness and ability to read quarterbacks. His range makes him a developmental free safety prospect. NFL Comparison: JL Skinner - similar rangy safety with ball skills from ACC background.' },
      { name: 'Brent Austin', position: 'CB', school: 'Cal', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5082398.png', analysis: 'Physical corner with good press technique and competitive toughness. Austin shows willingness to support the run and play physical at the line. His physicality makes him a developmental boundary corner. NFL Comparison: Kyu Blu Kelly - similar physical corner with press skills.' },
      { name: 'Dametrious Crownover', position: 'OT', school: 'Texas A&M', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431526.png', analysis: 'Massive tackle with good length and power in the run game. Crownover displays solid fundamentals and ability to move defenders in the ground game. His size makes him a developmental right tackle prospect. NFL Comparison: Matt Peart - similar developmental tackle with size and power.' },
      { name: 'Wesley Williams', position: 'EDGE', school: 'Duke', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832922.png', analysis: 'Athletic edge rusher with good burst and bend around the corner. Williams shows ability to convert speed to power and finish at the quarterback. His athleticism makes him a developmental edge prospect. NFL Comparison: Malcolm Koonce - similar athletic edge with burst and bend.' },
      { name: 'Jadon Canady', position: 'CB', school: 'Oregon', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4710706.png', analysis: 'Quick-footed corner with good agility and ability to mirror receivers. Canady displays solid ball skills and competitive nature in coverage. His quickness makes him a developmental slot corner. NFL Comparison: Christian Gonzalez - similar Oregon corner with mirror skills and agility.' },
      { name: 'Gary Smith III', position: 'DT', school: 'UCLA', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431390.png', analysis: 'Disruptive interior defender with good quickness and penetration ability. Smith shows ability to shoot gaps and disrupt running plays. His quickness makes him a developmental three-technique tackle. NFL Comparison: Levi Onwuzurike - similar penetrating three-technique with quickness.' },
      { name: 'Rahsul Faison', position: 'RB', school: 'South Carolina', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5156933.png', analysis: 'Powerful between-the-tackles runner with good vision and patience. Faison displays ability to break tackles and fall forward for extra yards. His power makes him a developmental short-yardage specialist. NFL Comparison: Justice Hill - similar power back with vision and tackle-breaking ability.' },
      { name: 'Marques White', position: 'EDGE', school: 'UMass', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4571284.png', analysis: 'High-motor edge rusher with relentless pursuit and effort. White shows good chase speed and ability to track down plays from the backside. His motor makes him a developmental rotational edge. NFL Comparison: Trey Hendrickson - similar relentless pass rusher with exceptional motor.' },
      { name: 'Desmond Purnell', position: 'LB', school: 'Kansas State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4705978.png', analysis: 'Instinctive linebacker with good tackling and run-fit discipline. Purnell displays solid processing speed and ability to diagnose plays quickly. His instincts make him a developmental Mike linebacker. NFL Comparison: Daniel Bituli - similar instinctive linebacker with tackling ability.' },
      { name: 'Kwabena Asamoah', position: 'OG', school: 'Rutgers', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4714999.png', analysis: 'Powerful guard with good strength and ability to create movement in the run game. Asamoah shows solid anchor against bull rushes and improving pass protection. His power makes him a developmental run-blocking guard. NFL Comparison: John Michael Schmitz - similar powerful interior lineman with run-blocking strength.' },
      { name: 'Ahmari Harvey', position: 'CB', school: 'Georgia Tech', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4432709.png', analysis: 'Long corner with good length and ability to disrupt passing lanes. Harvey displays solid ball skills and competitive nature in contested situations. His length makes him a developmental boundary corner. NFL Comparison: Tre Hawkins III - similar long corner with ball skills.' },
      { name: 'Sam Roush', position: 'TE', school: 'Stanford', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685504.png', analysis: 'Reliable receiving tight end with good hands and route-running ability. Roush shows solid blocking effort and ability to contribute in the passing game. His hands make him a developmental move tight end. NFL Comparison: Durham Smythe - similar reliable tight end with hands and blocking effort.' },
      { name: 'Cyrus Allen', position: 'WR', school: 'Cincinnati', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4912218.png', analysis: 'Quick receiver with good route-running and separation ability. Allen displays reliable hands and ability to work the middle of the field. His quickness makes him a developmental slot receiver. NFL Comparison: Jauan Jennings - similar possession receiver with route-running skills.' },
      { name: 'Drew Bobo', position: 'C', school: 'Georgia', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4896304.png', analysis: 'Smart center with good football IQ and line call ability. Bobo shows solid technique and ability to handle interior pressure. His intelligence makes him a developmental backup center. NFL Comparison: Drew Dalman - similar Georgia center with intelligence and technique.' },
      { name: 'Mike Washington Jr.', position: 'RB', school: 'Arkansas', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4686658.png', analysis: 'Elusive runner with good vision and ability to make defenders miss in space. Washington displays solid receiving skills and pass protection awareness. His elusiveness makes him a developmental third-down back. NFL Comparison: AJ Dillon - similar powerful back with receiving skills.' },
      { name: 'Reggie Virgil', position: 'WR', school: 'Texas Tech', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4869132.png', analysis: 'Speed receiver with ability to stretch the field vertically. Virgil shows solid tracking ability on deep balls and yards-after-catch potential. His speed makes him a developmental field-stretcher. NFL Comparison: Marquez Valdes-Scantling - similar vertical threat with speed.' },
      { name: 'Drayk Bowen', position: 'LB', school: 'Notre Dame', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870622.png', analysis: 'Athletic linebacker with good sideline-to-sideline range and pursuit. Bowen displays solid instincts and ability to play in space. His athleticism makes him a developmental Will linebacker. NFL Comparison: JD Bertrand - similar Notre Dame linebacker with range and instincts.' },
      { name: 'Namdi Obiazor', position: 'LB', school: 'TCU', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5085407.png', analysis: 'Physical linebacker with good tackling and run-stopping ability. Obiazor shows toughness taking on blocks and playing downhill. His physicality makes him a developmental Mike linebacker. NFL Comparison: Shaun Dion Hamilton - similar physical linebacker with tackling ability.' },
      { name: 'Sam Hecht', position: 'C', school: 'Kansas State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4874515.png', analysis: 'Solid center with good anchor and ability to handle nose tackles. Hecht displays reliable snapping and ability to reach second level. His reliability makes him a developmental backup center. NFL Comparison: Nick Harris - similar reliable center with solid technique.' },
      { name: 'Tyler Onyedim', position: 'DT', school: 'Texas A&M', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4683535.png', analysis: 'Powerful nose tackle with good strength and ability to occupy blockers. Onyedim shows solid gap control and run-stopping ability. His strength makes him a developmental nose tackle. NFL Comparison: Davon Godchaux - similar powerful nose with run-stopping ability.' },
      { name: 'Jaren Kump', position: 'C', school: 'Utah', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4608746.png', analysis: 'Experienced center with good football IQ and pass protection ability. Kump displays solid awareness and ability to handle blitzes. His experience makes him a developmental backup center. NFL Comparison: Connor McGovern - similar versatile interior lineman with experience.' },
      { name: 'Nate Boerkircher', position: 'TE', school: 'Texas A&M', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4686248.png', analysis: 'Blocking-oriented tight end with good strength and ability to move defenders. Boerkircher shows solid effort and improving receiving skills. His blocking makes him a developmental inline tight end. NFL Comparison: Tucker Fisk - similar blocking tight end with effort.' },
      { name: 'Kemari Copeland', position: 'DT', school: 'Virginia Tech', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5082172.png', analysis: 'Athletic interior defender with good quickness and penetration ability. Copeland displays ability to shoot gaps and disrupt plays in the backfield. His quickness makes him a developmental three-technique. NFL Comparison: Jordan Davis - similar athletic interior defender with penetration ability.' },
      { name: 'Logan Taylor', position: 'OG', school: 'Boston College', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5106895.png', analysis: 'Tough guard with good nasty streak and ability to finish blocks. Taylor shows solid power and improving technique in pass protection. His toughness makes him a developmental guard. NFL Comparison: Zion Johnson - similar tough guard with nasty streak.' },
      { name: 'Damari Brown', position: 'CB', school: 'Miami', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870650.png', analysis: 'Physical corner with good press ability and competitive nature. Brown displays solid recovery speed and willingness to support the run. His physicality makes him a developmental boundary corner. NFL Comparison: Jalen Ramsey - similar physical Miami corner with press skills.' },
      { name: 'Ryan Baer', position: 'OT', school: 'Pittsburgh', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4819223.png', analysis: 'Solid tackle with good length and ability to mirror edge rushers. Baer shows improving technique and solid anchor in pass protection. His length makes him a developmental swing tackle. NFL Comparison: Chukwuma Okorafor - similar Pitt tackle with length and mirror ability.' },
      { name: 'Malik Spencer', position: 'S', school: 'Michigan State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4782664.png', analysis: 'Versatile safety with ability to play in the box and in coverage. Spencer displays solid tackling and run support instincts. His versatility makes him a developmental strong safety. NFL Comparison: Xavier McKinney - similar versatile safety with tackling ability.' },
      { name: 'George Gumbs', position: 'EDGE', school: 'Florida', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4708238.png', analysis: 'Athletic edge rusher with good length and ability to set the edge. Gumbs shows solid motor and improving pass-rush repertoire. His length makes him a developmental edge defender. NFL Comparison: Josh Uche - similar athletic edge with length and developing moves.' },
      { name: 'Bryson Eason', position: 'DT', school: 'Tennessee', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4692563.png', analysis: 'Powerful interior defender with good strength and ability to control gaps. Eason displays solid run-stopping ability and improving pass-rush moves. His power makes him a developmental nose tackle. NFL Comparison: Jeffery Simmons - similar Tennessee defensive tackle with power.' },
      { name: 'Gracen Halton', position: 'DT', school: 'Oklahoma', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685369.png', analysis: 'Quick interior defender with good first step and penetration ability. Halton shows ability to disrupt plays in the backfield and collapse the pocket. His quickness makes him a developmental three-technique. NFL Comparison: Perrion Winfrey - similar Oklahoma tackle with quickness and penetration.' },
      { name: 'Enrique Cruz Jr.', position: 'OT', school: 'Kansas', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4691556.png', analysis: 'Athletic tackle with good movement skills and ability to reach second level. Cruz displays solid footwork and improving anchor in pass protection. His athleticism makes him a developmental swing tackle. NFL Comparison: Daniel Faalele - similar athletic tackle with movement skills.' },
      { name: 'Diego Pounds', position: 'OT', school: 'Ole Miss', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4602984.png', analysis: 'Massive tackle with good size and power at the point of attack. Pounds shows ability to create movement in the run game and solid anchor. His size makes him a developmental right tackle. NFL Comparison: Greg Little - similar massive tackle with power in run game.' },
      { name: 'Adam Randall', position: 'RB', school: 'Clemson', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685526.png', analysis: 'Shifty runner with good change of direction and elusiveness. Randall displays solid vision and ability to make defenders miss in tight spaces. His elusiveness makes him a developmental change-of-pace back. NFL Comparison: Travis Etienne - similar Clemson back with elusiveness and vision.' },
      { name: 'Nick Dawkins', position: 'C', school: 'Penn State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431060.png', analysis: 'Smart center with good snap consistency and line communication. Dawkins shows solid technique and ability to handle interior pressure. His intelligence makes him a developmental backup center. NFL Comparison: Juice Scruggs - similar smart center with technique and awareness.' },
      { name: 'Owen Heinecke', position: 'LB', school: 'Oklahoma', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081928.png', analysis: 'Athletic linebacker with good coverage ability and sideline-to-sideline range. Heinecke displays solid processing speed and tackling in space. His coverage skills make him a developmental Will linebacker. NFL Comparison: Danny Stutsman - similar Oklahoma linebacker with range and coverage ability.' },
      { name: 'Luke Montgomery', position: 'OG', school: 'Ohio State', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870946.png', analysis: 'Versatile guard with good athleticism and ability to play multiple positions. Montgomery shows solid power and improving technique in pass protection. His versatility makes him a developmental interior lineman. NFL Comparison: Matthew Jones - similar versatile Ohio State guard with athleticism.' },
      { name: 'James Thompson Jr.', position: 'DT', school: 'Illinois', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4693371.png', analysis: 'Powerful nose tackle with good strength and ability to occupy multiple blockers. Thompson displays solid gap control and run-stopping ability. His power makes him a developmental nose tackle. NFL Comparison: Khalen Saunders - similar powerful nose with run-stopping ability.' },
      { name: 'Kody Huisman', position: 'DT', school: 'Virginia Tech', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4879270.png', analysis: 'Quick interior defender with good penetration and disruption ability. Huisman shows ability to shoot gaps and make plays in the backfield. His quickness makes him a developmental three-technique. NFL Comparison: Amare Barno - similar Virginia Tech defender with quickness and penetration.' },
      { name: 'Preston Zachman', position: 'S', school: 'Wisconsin', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4605838.png', analysis: 'Physical safety with good tackling and run support ability. Zachman displays solid instincts and ability to play in the box. His physicality makes him a developmental strong safety. NFL Comparison: Hunter Wohler - similar Wisconsin safety with physicality and tackling.' },
      { name: 'Miller Moss', position: 'QB', school: 'Louisville', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431580.png', analysis: 'Intelligent quarterback with good field vision and decision-making ability. Moss displays solid accuracy on short-to-intermediate routes and pocket awareness. His processing speed makes him a developmental backup quarterback. NFL Comparison: Gardner Minshew - similar intelligent QB with accuracy and pocket awareness.' },
    ];

    // Add rank to each player (1-based ranking)
    return prospects.map((p, i) => ({ ...p, rank: i + 1 }));
  };

  // Helper to get team's draft position (0-31)
  const getTeamDraftPosition = (team: string): number => {
    const position = initialDraftOrder.indexOf(team);
    return position !== -1 ? position : 15; // Default to middle if not found
  };

  // Helper to format pick display
  const formatPickDisplay = (round: number, year: number, fromTeam?: string, actualPickNum?: number, ownerTeam?: string) => {
    if (year === 2026) {
      // For 2026 picks, calculate actual pick number
      const teamToUse = fromTeam || ownerTeam;
      if (teamToUse) {
        const teamPosition = getTeamDraftPosition(teamToUse);
        const pickNum = actualPickNum !== undefined ? actualPickNum : (round - 1) * 32 + teamPosition;
        // Only show "(from Team)" if it's actually a traded pick (fromTeam exists)
        if (fromTeam) {
          return `2026 R${round} - Pick #${pickNum + 1} (from ${fromTeam})`;
        } else {
          return `2026 R${round} - Pick #${pickNum + 1}`;
        }
      }
      // Fallback if no team info
      return `2026 R${round}`;
    } else {
      // For future years, show year and round
      return fromTeam ? `${year} R${round} (from ${fromTeam})` : `${year} R${round}`;
    }
  };

  const getPickValue = (pickNum: number) => {
    if (pickNum <= 5) return 3000 - pickNum * 200;
    if (pickNum <= 10) return 2000 - (pickNum - 5) * 150;
    if (pickNum <= 20) return 1250 - (pickNum - 10) * 75;
    if (pickNum <= 32) return 500 - (pickNum - 20) * 25;
    return Math.max(50, 200 - (pickNum - 32) * 5);
  };

  const getLetterGrade = (grade: number): string => {
    if (grade >= 97) return 'A+';
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    if (grade >= 77) return 'C+';
    if (grade >= 73) return 'C';
    if (grade >= 70) return 'C-';
    if (grade >= 67) return 'D+';
    if (grade >= 63) return 'D';
    if (grade >= 60) return 'D-';
    return 'F';
  };

  const [state, setState] = useState('setup');
  const [rounds, setRounds] = useState(1);
  const [speed, setSpeed] = useState('fast');
  const [myTeams, setMyTeams] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pick, setPick] = useState(0);
  const [picks, setPicks] = useState<any[]>([]);
  const [available, setAvailable] = useState(generateProspects());
  const [recentPicks, setRecentPicks] = useState<any[]>([]);
  const [draftOrder, setDraftOrder] = useState([...initialDraftOrder]);
  const [trades, setTrades] = useState<any[]>([]);
  const [pendingTradeOffer, setPendingTradeOffer] = useState<any>(null);
  const [recentTrade, setRecentTrade] = useState<any>(null);
  const [tradesThisRound, setTradesThisRound] = useState(0);
  const [showTradeUp, setShowTradeUp] = useState(false);
  const [tradeUpTargets, setTradeUpTargets] = useState<any[]>([]);
  const [tradeMode, setTradeMode] = useState<'up' | 'down' | null>(null);
  const [draftPaused, setDraftPaused] = useState(false);
  const [teamDraftPicks, setTeamDraftPicks] = useState<{ [key: string]: DraftPick[] }>(
    JSON.parse(JSON.stringify(initialTeamDraftPicks))
  );
  const [acquiredPicks, setAcquiredPicks] = useState<DraftPick[]>([]);
  const [tradedAwayPicks, setTradedAwayPicks] = useState<DraftPick[]>([]);
  const [counterOffer, setCounterOffer] = useState<any>(null);
  const [selectedCounterPicks, setSelectedCounterPicks] = useState<DraftPick[]>([]);
  const [selectedCounterGivePicks, setSelectedCounterGivePicks] = useState<DraftPick[]>([]);
  const [showCustomTrade, setShowCustomTrade] = useState(false);
  const [customTradeTeam, setCustomTradeTeam] = useState<string | null>(null);
  const [customTradeGive, setCustomTradeGive] = useState<DraftPick[]>([]);
  const [customTradeReceive, setCustomTradeReceive] = useState<DraftPick[]>([]);
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const [allTradeOffers, setAllTradeOffers] = useState<any[]>([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPlayerAnalysis, setExpandedPlayerAnalysis] = useState<string | null>(null);
  const pickInProgress = useRef(false);
  const draftAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioPlayed = useRef(false);

  const speeds = { slow: 2000, medium: 1000, fast: 300, turbo: 50 };
  const totalPicks = rounds * 32;
  const currentTeam = draftOrder[pick % 32];
  const isMyPick = myTeams.includes(currentTeam);
  const round = Math.floor(pick / 32) + 1;
  const pickInRound = (pick % 32) + 1;

  const getTeamNeeds = (team: string) => teamNeeds[team as keyof typeof teamNeeds] || [];

  // Filter available players by position and search query
  const filteredAvailable = available.filter(p => {
    const matchesPosition = positionFilter === 'All' || p.position === positionFilter;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesSearch;
  });

  // All unique positions
  const allPositions = ['All', 'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'S'];

  // Position colors for player avatars
  const positionColors: { [key: string]: string } = {
    'QB': 'bg-red-600',
    'RB': 'bg-green-600',
    'WR': 'bg-blue-600',
    'TE': 'bg-orange-600',
    'OT': 'bg-yellow-600',
    'OG': 'bg-yellow-500',
    'C': 'bg-yellow-400',
    'DT': 'bg-purple-600',
    'EDGE': 'bg-pink-600',
    'LB': 'bg-indigo-600',
    'CB': 'bg-cyan-600',
    'S': 'bg-teal-600'
  };

  const getPlayerInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // NFL division mapping for trade reluctance
  const divisions: { [key: string]: string[] } = {
    'AFC East': ['Buffalo Bills', 'Miami Dolphins', 'New England Patriots', 'New York Jets'],
    'AFC North': ['Baltimore Ravens', 'Cincinnati Bengals', 'Cleveland Browns', 'Pittsburgh Steelers'],
    'AFC South': ['Houston Texans', 'Tennessee Titans', 'Jacksonville Jaguars', 'Indianapolis Colts'],
    'AFC West': ['Denver Broncos', 'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers'],
    'NFC East': ['Dallas Cowboys', 'New York Giants', 'Philadelphia Eagles', 'Washington Commanders'],
    'NFC North': ['Chicago Bears', 'Detroit Lions', 'Minnesota Vikings', 'Green Bay Packers'],
    'NFC South': ['Carolina Panthers', 'New Orleans Saints', 'Tampa Bay Buccaneers', 'Atlanta Falcons'],
    'NFC West': ['Arizona Cardinals', 'Los Angeles Rams', 'San Francisco 49ers', 'Seattle Seahawks'],
  };

  const areDivisionRivals = (team1: string, team2: string): boolean => {
    return Object.values(divisions).some(div => div.includes(team1) && div.includes(team2));
  };

  // Check if a team has a compelling reason to trade up (high-grade player filling a need)
  const teamWantsToTradeUp = (team: string, currentPickNum: number) => {
    const teamNeeds = getTeamNeeds(team);
    const teamPickPosition = initialDraftOrder.indexOf(team);
    const picksBetween = teamPickPosition - (currentPickNum % 32);
    const currentRound = Math.floor(currentPickNum / 32) + 1;

    if (picksBetween <= 0) return { wants: false, targetPlayer: null };

    // Later rounds require bigger gaps and higher grades to motivate a trade
    const minGrade = currentRound === 1 ? 85 : currentRound === 2 ? 78 : 72;
    const minPickGap = currentRound === 1 ? 3 : currentRound === 2 ? 5 : 8;

    if (picksBetween < minPickGap) return { wants: false, targetPlayer: null };

    // Look for a player that fills a need and is elite enough to trade up for
    const topAvailable = available.slice(0, Math.min(picksBetween + 3, available.length));

    for (const player of topAvailable) {
      const needIndex = teamNeeds.indexOf(player.position);
      const isTopNeed = needIndex >= 0 && needIndex <= 2;
      const isElite = player.grade >= minGrade;

      // QB-needy teams are more aggressive - widen need check for QBs
      const isQBNeed = teamNeeds[0] === 'QB' && player.position === 'QB';
      const needMatch = isTopNeed || isQBNeed;

      // The earlier the player is in available, the less likely they'll last
      const playerRank = available.indexOf(player);
      const likelyGone = playerRank < picksBetween;

      // Check position scarcity - more motivation if few prospects at position
      const positionScarcity = available.filter(p =>
        p.position === player.position && p.grade >= (minGrade - 5)
      ).length;
      const isPositionScarce = positionScarcity <= 2;

      // QB scarcity is extra important - teams panic when QBs are scarce
      const qbUrgency = isQBNeed && positionScarcity <= 3;

      if (isElite && needMatch && (likelyGone || isPositionScarce || qbUrgency)) {
        return { wants: true, targetPlayer: player };
      }
    }

    return { wants: false, targetPlayer: null };
  };

  const generateTradeOffer = (currentPickNum: number, currentTeamName: string, forUser: boolean) => {
    const currentRound = Math.floor(currentPickNum / 32);

    // Find teams that might want to trade up
    const potentialBuyers = initialDraftOrder
      .filter((t, i) => i > (currentPickNum % 32) && t !== currentTeamName && !myTeams.includes(t))
      .filter((t, i, arr) => arr.indexOf(t) === i); // unique teams

    if (potentialBuyers.length === 0) return null;

    // Filter to only teams that actually want to trade up (have a compelling target)
    const motivatedBuyers = potentialBuyers.filter(team => {
      const { wants } = teamWantsToTradeUp(team, currentPickNum);
      if (!wants) return false;

      // Division rivals rarely trade with each other (only 15% of the time)
      if (areDivisionRivals(team, currentTeamName) && Math.random() > 0.15) return false;

      return true;
    });

    if (motivatedBuyers.length === 0) return null;

    // Prefer the most motivated buyer (closest to the pick, strongest need)
    const scoredBuyers = motivatedBuyers.map(team => {
      const { targetPlayer } = teamWantsToTradeUp(team, currentPickNum);
      const teamPos = initialDraftOrder.indexOf(team);
      const pickGap = teamPos - (currentPickNum % 32);
      const needs = getTeamNeeds(team);
      const needPriority = targetPlayer ? needs.indexOf(targetPlayer.position) : 3;
      // Score: higher grade target + closer pick gap + higher need priority = more motivated
      const score = (targetPlayer?.grade || 0) * 2 - pickGap * 3 - needPriority * 5;
      return { team, score, targetPlayer };
    }).sort((a, b) => b.score - a.score);

    // Pick from top 3 most motivated (with some randomness)
    const topBuyers = scoredBuyers.slice(0, Math.min(3, scoredBuyers.length));
    const selected = topBuyers[Math.floor(Math.random() * topBuyers.length)];
    const buyerTeam = selected.team;
    const buyerPickPosition = initialDraftOrder.indexOf(buyerTeam);
    const buyerPickNum = currentRound * 32 + buyerPickPosition;

    // Calculate what they'd give up using realistic NFL draft value chart
    const currentValue = getPickValue(currentPickNum + 1);
    const buyerValue = getPickValue(buyerPickNum + 1);
    const valueDiff = currentValue - buyerValue;

    if (valueDiff <= 0) return null;

    // They need to offer picks to cover the value gap
    const nextRoundPickValue = getPickValue(Math.min(buyerPickNum + 32, rounds * 32));
    let extraPicksNeeded = Math.ceil(valueDiff / nextRoundPickValue);

    // Cap at 3 extra picks - bigger gaps just don't happen
    if (extraPicksNeeded <= 0 || extraPicksNeeded > 3) return null;

    // Sometimes the buyer wants an additional pick from the seller (~40% chance)
    // This makes the trade more realistic - e.g. "I'll give you my 1st + 3rd,
    // but I also want your 4th rounder"
    let requestedPick: string | null = null;
    if (Math.random() < 0.40 && extraPicksNeeded >= 1) {
      const roundsLater = 2 + Math.floor(Math.random() * 2); // 2-3 rounds later
      const requestableRound = currentRound + 1 + roundsLater;
      const sellerPos = initialDraftOrder.indexOf(currentTeamName);

      if (requestableRound <= 7) {
        const requestedPickNum = (requestableRound - 1) * 32 + (sellerPos !== -1 ? sellerPos : 16);
        requestedPick = formatPickDisplay(requestableRound, 2026, undefined, requestedPickNum);
      } else {
        // Ask for a future year pick
        const futureYear = Math.random() < 0.7 ? 2027 : 2028;
        requestedPick = `${futureYear} R${Math.min(roundsLater + 1, 5)}`;
      }
      // Since they're asking for a pick back, they give one more pick in return
      extraPicksNeeded += 1;
    }

    // Generate compensation picks - mix of current year and future years
    const futurePicks: string[] = [];
    for (let i = 0; i < extraPicksNeeded; i++) {
      const futureRound = currentRound + 2 + i;

      // First pick usually current year, later picks mix in future years more
      const useFutureYear = futureRound > rounds || (i > 0 && Math.random() < 0.55) || (i === 0 && Math.random() < 0.25);

      if (!useFutureYear && futureRound <= rounds) {
        const estimatedPickNum = (futureRound - 1) * 32 + buyerPickPosition;
        futurePicks.push(formatPickDisplay(futureRound, 2026, buyerTeam, estimatedPickNum));
      } else {
        // 2027 or 2028 picks
        const futureYear = Math.random() < 0.75 ? 2027 : 2028;
        const futureRoundNum = Math.min(currentRound + 1 + i + 1, 7);
        futurePicks.push(formatPickDisplay(futureRoundNum, futureYear, buyerTeam));
      }
    }

    return {
      fromTeam: buyerTeam,
      toTeam: currentTeamName,
      pickGiven: currentPickNum,
      pickReceived: buyerPickNum,
      additionalPicks: futurePicks,
      requestedPick, // Pick they want from you (in addition to current pick)
      forUser
    };
  };

  const shouldTradingHappen = (pickNum: number, currentTradesThisRound: number) => {
    const pickInCurrentRound = pickNum % 32;
    const currentRound = Math.floor(pickNum / 32) + 1;

    // Realistic trade frequency by round:
    // Round 1: 3-6 trades (most active, teams jockey for QBs and top talent)
    // Round 2: 2-4 trades
    // Round 3: 1-3 trades
    // Round 4+: 1-2 trades
    const maxTradesByRound = currentRound === 1 ? 6 : currentRound === 2 ? 4 : currentRound === 3 ? 3 : 2;
    const minTradesByRound = currentRound === 1 ? 3 : currentRound === 2 ? 2 : 1;

    const targetTrades = pickInCurrentRound === 0
      ? Math.floor(Math.random() * (maxTradesByRound - minTradesByRound + 1)) + minTradesByRound
      : maxTradesByRound;

    const remainingPicks = 32 - pickInCurrentRound;
    const tradesNeeded = Math.max(minTradesByRound, targetTrades) - currentTradesThisRound;

    if (currentTradesThisRound >= maxTradesByRound || remainingPicks < 3) return false;

    // Don't trade in the first 2 picks of round 1 (picks 1-2 are almost never traded)
    if (currentRound === 1 && pickInCurrentRound < 2) return false;

    // Base probability scales with round (more trades in earlier rounds)
    const baseProbability = currentRound === 1 ? 0.18 : currentRound === 2 ? 0.12 : 0.08;
    const urgencyMultiplier = currentTradesThisRound < minTradesByRound ? 1.5 : 1.0;
    const probability = Math.min(0.35, baseProbability + (tradesNeeded / remainingPicks) * urgencyMultiplier);

    return Math.random() < probability;
  };

  const executeTrade = (trade: any) => {
    const newDraftOrder = [...draftOrder];
    const fromIdx = trade.pickGiven % 32;
    const toIdx = trade.pickReceived % 32;

    // Swap the teams in the draft order for current round
    newDraftOrder[fromIdx] = trade.fromTeam;
    newDraftOrder[toIdx] = trade.toTeam;

    setDraftOrder(newDraftOrder);
    setTrades([...trades, trade]);
    setTradesThisRound(tradesThisRound + 1);
    setRecentTrade(trade);

    // Clear recent trade notification after delay
    setTimeout(() => setRecentTrade(null), 3000);
  };

  const smartAutoPick = (team: string) => {
    const pickInDraft = pick + 1; // Overall pick number (1-224)

    // ABSOLUTE FLOORS - These players NEVER fall past their floor pick

    // Fernando Mendoza - absolute floor at pick #2
    if (pickInDraft === 2 && available.some(p => p.name === 'Fernando Mendoza')) {
      return available.find(p => p.name === 'Fernando Mendoza');
    }

    // Arvell Reese - absolute floor at pick #10 (should go top 5 naturally)
    if (pickInDraft === 10 && available.some(p => p.name === 'Arvell Reese')) {
      return available.find(p => p.name === 'Arvell Reese');
    }

    // Caleb Downs - absolute floor at pick #10 (should go top 5 naturally)
    if (pickInDraft === 10 && available.some(p => p.name === 'Caleb Downs')) {
      return available.find(p => p.name === 'Caleb Downs');
    }

    // Jordyn Tyson - absolute floor at pick #13
    if (pickInDraft === 13 && available.some(p => p.name === 'Jordyn Tyson')) {
      return available.find(p => p.name === 'Jordyn Tyson');
    }

    // Carnell Tate - absolute floor at pick #13
    if (pickInDraft === 13 && available.some(p => p.name === 'Carnell Tate')) {
      return available.find(p => p.name === 'Carnell Tate');
    }

    const needs = getTeamNeeds(team);

    // Positional value - premium positions get bonuses in top 10
    const positionalValue: { [key: string]: number } = {
      'QB': pickInDraft <= 10 ? 8 : pickInDraft <= 20 ? 4 : 2,
      'EDGE': pickInDraft <= 10 ? 6 : pickInDraft <= 20 ? 4 : 2,
      'OT': pickInDraft <= 10 ? 5 : pickInDraft <= 20 ? 4 : 2,
      'CB': pickInDraft <= 10 ? 5 : pickInDraft <= 20 ? 3 : 1,
      'WR': pickInDraft <= 10 ? 4 : pickInDraft <= 20 ? 3 : 2,
      'S': pickInDraft <= 10 ? 3 : 2,
      'DT': pickInDraft <= 10 ? 3 : 2,
      'LB': pickInDraft <= 10 ? 2 : 2,
      'TE': 2,
      'OG': 1,
      'C': 1,
      'RB': 1
    };

    const scored = available.map(p => {
      let score = p.grade * 2; // Weight grade more heavily

      // Add positional value bonus (reduced)
      score += (positionalValue[p.position] || 0) * 0.5;

      // Need bonus - much smaller impact, BPA is priority
      const needIdx = needs.indexOf(p.position);
      if (needIdx !== -1) {
        // Small need bonus, decreases with pick position
        const needWeight = pickInDraft <= 10 ? 0.3 : pickInDraft <= 20 ? 0.5 : 0.7;
        score += (5 - needIdx) * 2 * needWeight;
      }

      // Add small random variance (±2 points) to create slight unpredictability
      score += (Math.random() - 0.5) * 4;

      return { player: p, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // Very limited randomness - mostly pick the top player, slight chance of #2
    const randomChance = Math.random();
    if (randomChance < 0.85 || scored.length === 1) {
      // 85% of the time, pick the best available
      return scored[0].player;
    } else {
      // 15% of the time, pick from top 2
      return scored[Math.floor(Math.random() * Math.min(2, scored.length))].player;
    }
  };

  const makePick = (player: any) => {
    const newPick = { round, pick: pickInRound, team: currentTeam, player };
    setPicks([...picks, newPick]);
    setRecentPicks([newPick, ...recentPicks].slice(0, 3));
    setAvailable(available.filter(p => p.name !== player.name));
    setPendingTradeOffer(null);
    setAllTradeOffers([]);
    setCurrentOfferIndex(0);

    // Remove the used pick from the team that originally owned this draft slot
    const pickPosition = pick % 32;
    const originalOwner = initialDraftOrder[pickPosition];
    const newTeamPicks = { ...teamDraftPicks };
    const ownerPicks = [...(newTeamPicks[originalOwner] || [])];
    const usedPickIdx = ownerPicks.findIndex(p => p.round === round && p.year === 2026);
    if (usedPickIdx !== -1) {
      ownerPicks.splice(usedPickIdx, 1);
      newTeamPicks[originalOwner] = ownerPicks;
      setTeamDraftPicks(newTeamPicks);
    }

    if (pick + 1 >= totalPicks) setState('complete');
    else setPick(pick + 1);
  };

  const acceptTrade = () => {
    if (!pendingTradeOffer) return;
    executeTrade(pendingTradeOffer);
    setPendingTradeOffer(null);
    setAllTradeOffers([]);
    setCurrentOfferIndex(0);
    // DON'T jump to the new pick - let the draft continue normally
    // The draft order has been updated, so when it reaches the traded pick position,
    // the user will be picking there. Continue from current position.
  };

  const declineTrade = () => {
    setPendingTradeOffer(null);
    setAllTradeOffers([]);
    setCurrentOfferIndex(0);
  };

  // Handler for Select All teams toggle
  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setMyTeams([]);
      setSelectAll(false);
    } else {
      // Select all teams
      const allTeams = Object.keys(teamLogos);
      setMyTeams(allTeams);
      setSelectAll(true);
    }
  };

  // Sync selectAll state when individual teams are toggled
  useEffect(() => {
    const allTeams = Object.keys(teamLogos);
    const allSelected = myTeams.length === allTeams.length && myTeams.length > 0;
    const noneSelected = myTeams.length === 0;

    if (allSelected && !selectAll) {
      setSelectAll(true);
    } else if ((noneSelected || (!allSelected && myTeams.length > 0)) && selectAll) {
      setSelectAll(false);
    }
  }, [myTeams.length, selectAll]);

  // Helper function to check if team would want to trade up for current prospects
  const wouldTeamTradeUpForProspect = (
    teamName: string,
    currentPickNum: number,
    availableProspects: { name: string; position: string; school: string; grade: number; headshot: string; analysis: string }[]
  ): boolean => {
    const teamDraftPos = getTeamDraftPosition(teamName);
    const currentRound = Math.floor(pick / 32) + 1;
    const needs = getTeamNeeds(teamName).slice(0, 3);

    // Division rivals almost never trade (15% chance)
    const userTeam = myTeams[0] || draftOrder[currentPickNum % 32];
    if (areDivisionRivals(teamName, userTeam) && Math.random() > 0.15) return false;

    // Scale grade threshold by round
    const minGrade = currentRound === 1 ? 82 : currentRound === 2 ? 76 : 70;
    const minGap = currentRound === 1 ? 3 : currentRound === 2 ? 4 : 6;

    // Find prospects matching their top needs
    const neededProspects = availableProspects.filter(p =>
      p.grade >= minGrade && needs.includes(p.position)
    );

    // QB-needy teams are more desperate
    const isQBNeedy = needs[0] === 'QB';
    const qbAvailable = availableProspects.some(p => p.position === 'QB' && p.grade >= minGrade);
    const qbDesperate = isQBNeedy && qbAvailable;

    // Team wants to trade up if needs match and gap is significant
    const gap = teamDraftPos - currentPickNum;
    return (neededProspects.length > 0 || qbDesperate) && gap >= minGap;
  };

  // Helper function to check if team is willing to trade down
  const wouldTeamTradeDown = (
    teamName: string,
    teamPickNum: number,
    availableProspects: { name: string; position: string; school: string; grade: number; headshot: string; analysis: string }[]
  ): boolean => {
    const needs = getTeamNeeds(teamName);
    const topNeeds = needs.slice(0, 3);
    const currentRound = Math.floor(pick / 32) + 1;

    // Division rivals almost never trade
    const userTeam = myTeams[0] || draftOrder[pick % 32];
    if (areDivisionRivals(teamName, userTeam) && Math.random() > 0.15) return false;

    // Teams needing a QB as #1 priority almost never trade down in round 1
    if (needs[0] === 'QB' && currentRound === 1) {
      const qbsAvailable = availableProspects.filter(p => p.position === 'QB' && p.grade >= 80);
      if (qbsAvailable.length <= 3) return false; // Scarce QBs = won't trade down
    }

    // Find prospects matching team needs
    const neededProspects = availableProspects.filter(p =>
      needs.includes(p.position)
    );

    // Must-have threshold scales by round
    const mustHaveGrade = currentRound === 1 ? 95 : currentRound === 2 ? 88 : 82;

    const mustHaveProspects = neededProspects.filter(p =>
      p.grade >= mustHaveGrade && topNeeds.includes(p.position)
    );

    // Team willing to trade down if:
    // 1. No must-have prospect at their position of need
    // 2. OR enough depth that they'll still get someone good later
    const hasDepth = topNeeds.some(pos => {
      const prospectsAtPos = availableProspects.filter(p => p.position === pos && p.grade >= (mustHaveGrade - 8));
      return prospectsAtPos.length >= 4; // Plenty of options = safe to trade down
    });

    return mustHaveProspects.length === 0 || hasDepth;
  };

  const generateTradeDownOptions = () => {
    const currentRound = Math.floor(pick / 32);
    const myPickPosition = pick % 32;
    const options: any[] = [];

    // Find teams AFTER us that we could trade down to
    const availableProspects = available;

    for (let i = myPickPosition + 1; i < 32; i++) {
      const targetTeam = draftOrder[i];
      if (myTeams.includes(targetTeam)) {
        continue; // Can't trade with ourselves
      }

      // Smart filtering: Only show teams that actually want to trade up for available prospects
      if (!wouldTeamTradeUpForProspect(targetTeam, myPickPosition, availableProspects)) continue;

      const targetPickNum = currentRound * 32 + i;
      const myPickNum = pick;

      const myValue = getPickValue(myPickNum + 1);
      const targetValue = getPickValue(targetPickNum + 1);
      const valueDifference = myValue - targetValue;

      // Calculate what we'd receive (they give us extra picks)
      // Use the value of a mid-round pick for the divisor (more consistent)
      const nextRoundPickValue = getPickValue(Math.min(targetPickNum + 32, 224));
      const extraPicksReceived = Math.max(1, Math.ceil(valueDifference / nextRoundPickValue));

      // Require 1-4 extra picks (no one-for-one trades, not too many either)
      if (extraPicksReceived > 4 || extraPicksReceived < 1) {
        continue;
      }

      const futurePicks: string[] = [];
      for (let j = 0; j < extraPicksReceived; j++) {
        const futureRound = currentRound + 1 + j;

        // Mix of 2026 and future year picks - at least one should be from a different year
        // First pick is usually current year, subsequent picks mix in future years
        const useFutureYear = futureRound >= 7 || (j > 0 && Math.random() < 0.55) || (j === 0 && Math.random() < 0.25);

        if (!useFutureYear && futureRound < 7) {
          const estimatedPickNum = futureRound * 32 + (i);
          futurePicks.push(formatPickDisplay(futureRound + 1, 2026, undefined, estimatedPickNum, targetTeam));
        } else {
          // 2027 or occasionally 2028 picks
          const futureYear = Math.random() < 0.75 ? 2027 : 2028;
          const futureRoundNum = Math.min(currentRound + 1 + j + 1, 7);
          futurePicks.push(formatPickDisplay(futureRoundNum, futureYear, undefined, undefined, targetTeam));
        }
      }

      // AI acceptance probability factors in:
      // - How many extra picks they're giving (more = less likely)
      // - How far they're moving up (bigger jumps = more desperate = higher acceptance)
      // - Division rivalry (less likely)
      const jumpSize = i - myPickPosition;
      const isDivRival = areDivisionRivals(targetTeam, myTeams[0] || currentTeam);
      const baseAccept = 0.55;
      const jumpBonus = Math.min(0.2, jumpSize * 0.02); // Bigger jump = more motivated
      const pickPenalty = extraPicksReceived * 0.05; // More picks given = less willing
      const divPenalty = isDivRival ? 0.3 : 0;
      const acceptChance = Math.min(0.85, Math.max(0.15, baseAccept + jumpBonus - pickPenalty - divPenalty));

      const option = {
        targetTeam,
        targetPickNum,
        targetPickInRound: i + 1,
        myPickNum,
        additionalPicks: futurePicks,
        acceptChance
      };
      options.push(option);
    }

    return options;
  };

  // Get user's available picks for trading (including future years and later rounds)
  const getUserAvailablePicks = () => {
    const userTeam = myTeams[0];
    if (!userTeam) return [];

    const currentRound = Math.floor(pick / 32) + 1;
    const userPicks = teamDraftPicks[userTeam] || [];

    // Filter picks that can be traded (not already used in this draft)
    return userPicks.filter(p => {
      // Future year picks are always available
      if (p.year > 2026) return true;
      // 2026 picks in later rounds are available
      if (p.year === 2026 && p.round > currentRound) return true;
      return false;
    });
  };

  const generateTradeUpOptions = () => {
    const currentRound = Math.floor(pick / 32);
    const currentPickInRound = pick % 32;
    const options: any[] = [];

    // Find the user's next pick position in the current round (if any)
    let userNextPickPos = -1;
    for (let i = currentPickInRound; i < 32; i++) {
      if (myTeams.includes(draftOrder[i])) {
        userNextPickPos = i;
        break;
      }
    }

    // Get user's available picks for trading
    const availableForTrade = getUserAvailablePicks();
    const hasTradeAssets = availableForTrade.length > 0 || userNextPickPos !== -1;

    if (!hasTradeAssets) return options;

    // Find teams we could trade with (all teams from current pick forward)
    const availableProspects = available;

    for (let i = currentPickInRound; i < 32; i++) {
      const targetTeam = draftOrder[i];
      if (myTeams.includes(targetTeam)) continue;

      const targetPickNum = currentRound * 32 + i;

      // Smart filtering: Only show teams willing to trade down
      if (!wouldTeamTradeDown(targetTeam, i, availableProspects)) continue;

      const targetValue = getPickValue(targetPickNum + 1);

      // If user has a pick this round, calculate based on swapping
      if (userNextPickPos !== -1 && i < userNextPickPos) {
        const userPickNum = currentRound * 32 + userNextPickPos;
        const userValue = getPickValue(userPickNum + 1);

        // Calculate what we'd need to give up
        const valueDiff = targetValue - userValue;
        const extraPicksNeeded = Math.ceil(valueDiff / getPickValue(Math.min(userPickNum + 32, rounds * 32)));

        if (extraPicksNeeded <= 3) {
          const futurePicks: DraftPick[] = [];
          for (let j = 0; j < extraPicksNeeded && j < availableForTrade.length; j++) {
            futurePicks.push(availableForTrade[j]);
          }

          // Acceptance factors: value offered, division rivalry, how far they're moving back
          const isDivRival = areDivisionRivals(targetTeam, myTeams[0] || currentTeam);
          const moveBack = userNextPickPos - i;
          const tradeUpAccept = Math.min(0.8, Math.max(0.2,
            0.4 + (extraPicksNeeded * 0.12) + (moveBack > 10 ? 0.1 : 0) - (isDivRival ? 0.25 : 0)
          ));

          options.push({
            targetTeam,
            targetPickNum,
            targetPickInRound: i + 1,
            userPickNum,
            userPickInRound: userNextPickPos + 1,
            additionalPicks: futurePicks,
            useFuturePicks: false,
            acceptChance: tradeUpAccept
          });
        }
      } else if (availableForTrade.length > 0) {
        // User has no pick this round, must use future picks only
        const requiredValue = targetValue;
        let offeredValue = 0;
        const picksToOffer: DraftPick[] = [];

        // Collect enough picks to match value
        for (const p of availableForTrade) {
          const pickValue = p.year === 2026
            ? getPickValue((p.round - 1) * 32 + 16) // Estimate mid-round value
            : getPickValue((p.round - 1) * 32 + 16) * (p.year === 2027 ? 0.85 : 0.7); // Discount future years

          picksToOffer.push(p);
          offeredValue += pickValue;

          if (offeredValue >= requiredValue * 0.9) break; // Allow slight underpay
          if (picksToOffer.length >= 4) break; // Max 4 picks
        }

        if (offeredValue >= requiredValue * 0.7) {
          const isDivRival = areDivisionRivals(targetTeam, myTeams[0] || currentTeam);
          const valueRatio = offeredValue / requiredValue;
          const futureAccept = Math.min(0.6, Math.max(0.1,
            0.2 + (valueRatio * 0.3) + (picksToOffer.length * 0.05) - (isDivRival ? 0.2 : 0)
          ));

          options.push({
            targetTeam,
            targetPickNum,
            targetPickInRound: i + 1,
            userPickNum: null,
            userPickInRound: null,
            additionalPicks: picksToOffer,
            useFuturePicks: true,
            acceptChance: futureAccept
          });
        }
      }
    }

    return options;
  };

  const offerTradeDown = (option: any) => {
    const userTeam = myTeams[0] || currentTeam;
    // Auto-accept if user controls both teams
    const controlsBothTeams = myTeams.includes(option.targetTeam);

    if (controlsBothTeams || Math.random() < option.acceptChance) {

      // Add the additional picks we're receiving to acquired picks AND teamDraftPicks
      const newAcquired = [...acquiredPicks];
      const newTeamPicks = { ...teamDraftPicks };
      const userPicks = [...(newTeamPicks[userTeam] || [])];

      option.additionalPicks.forEach((pickStr: string) => {
        // Parse the pick string to create a DraftPick object
        // Try new format first: "Pick #48" or "Pick #48 (from TeamName)"
        let pickMatch = pickStr.match(/Pick #(\d+)/);
        if (pickMatch) {
          const pickNum = parseInt(pickMatch[1]) - 1; // Convert to 0-indexed
          const roundNum = Math.floor(pickNum / 32) + 1;
          const year = pickStr.includes('2027') ? 2027 : pickStr.includes('2028') ? 2028 : 2026;
          const fromTeamMatch = pickStr.match(/from ([^)]+)/);
          const draftPick = { round: roundNum, year, fromTeam: fromTeamMatch ? fromTeamMatch[1] : option.targetTeam };
          newAcquired.push(draftPick);
          userPicks.push(draftPick);
        } else {
          // Fall back to old format: "2026 R2" or "Round 2"
          const roundMatch = pickStr.match(/(?:Round |R)(\d+)/);
          if (roundMatch) {
            const roundNum = parseInt(roundMatch[1]);
            const year = pickStr.includes('2027') ? 2027 : pickStr.includes('2028') ? 2028 : 2026;
            const draftPick = { round: roundNum, year, fromTeam: option.targetTeam };
            newAcquired.push(draftPick);
            userPicks.push(draftPick);
          }
        }
      });
      setAcquiredPicks(newAcquired);
      newTeamPicks[userTeam] = userPicks;
      setTeamDraftPicks(newTeamPicks);

      const trade = {
        fromTeam: option.targetTeam,
        toTeam: userTeam,
        pickGiven: pick,
        pickReceived: option.targetPickNum,
        additionalPicks: option.additionalPicks,
        forUser: true,
        userInitiated: true
      };

      // Swap in draft order - other team gets our current pick, we get their later pick
      const newDraftOrder = [...draftOrder];
      const myIdx = pick % 32;
      const theirIdx = option.targetPickNum % 32;
      newDraftOrder[myIdx] = option.targetTeam;
      newDraftOrder[theirIdx] = userTeam;
      setDraftOrder(newDraftOrder);

      setTrades([...trades, trade]);
      setTradesThisRound(tradesThisRound + 1);
      setRecentTrade({ ...trade, fromTeam: option.targetTeam, toTeam: userTeam });
      setTimeout(() => setRecentTrade(null), 3000);
      closeTradeMenu();

      // DON'T skip to the later pick - let the draft continue normally
      // The other team will now pick at our former position (current pick)
      // When the draft reaches our new position, we'll pick there
    } else {
      // Offer declined - show counter offer UI
      setCounterOffer({ type: 'down', original: option });
      setSelectedCounterPicks([]); // Reset counter picks
    }
  };

  const submitCounterTradeDown = () => {
    if (!counterOffer || selectedCounterPicks.length === 0) return;

    const option = counterOffer.original;
    const userTeam = myTeams[0] || currentTeam;

    // Calculate new acceptance probability based on counter offer
    // More picks requested = lower acceptance chance
    const originalPickCount = option.additionalPicks.length;
    const counterPickCount = selectedCounterPicks.length;
    const pickDifference = counterPickCount - originalPickCount;

    // Reduce acceptance chance by 20% for each additional pick requested
    let newAcceptChance = option.acceptChance - (pickDifference * 0.20);
    newAcceptChance = Math.max(0.1, Math.min(0.9, newAcceptChance)); // Clamp between 10% and 90%

    if (Math.random() < newAcceptChance) {
      // Counter offer accepted!
      const newAcquired = [...acquiredPicks];
      const newTeamPicks = { ...teamDraftPicks };
      const userPicks = [...(newTeamPicks[userTeam] || [])];

      selectedCounterPicks.forEach((p: DraftPick) => {
        newAcquired.push({ ...p, fromTeam: option.targetTeam });
        userPicks.push({ ...p, fromTeam: option.targetTeam });
      });
      setAcquiredPicks(newAcquired);
      newTeamPicks[userTeam] = userPicks;
      setTeamDraftPicks(newTeamPicks);

      const trade = {
        fromTeam: option.targetTeam,
        toTeam: userTeam,
        pickGiven: pick,
        pickReceived: option.targetPickNum,
        additionalPicks: selectedCounterPicks.map((p: DraftPick) => formatPickDisplay(p.round, p.year, p.fromTeam)),
        forUser: true,
        userInitiated: true
      };

      // Swap in draft order
      const newDraftOrder = [...draftOrder];
      const myIdx = pick % 32;
      const theirIdx = option.targetPickNum % 32;
      newDraftOrder[myIdx] = option.targetTeam;
      newDraftOrder[theirIdx] = userTeam;
      setDraftOrder(newDraftOrder);

      setTrades([...trades, trade]);
      setTradesThisRound(tradesThisRound + 1);
      setRecentTrade({ ...trade, fromTeam: option.targetTeam, toTeam: userTeam });
      setTimeout(() => setRecentTrade(null), 3000);
      setCounterOffer(null);
      setPendingTradeOffer(null); // Clear any pending offers
      setDraftPaused(false); // Ensure draft continues
      closeTradeMenu();

      // DON'T skip to the later pick - let the draft continue normally
      // The other team will now pick at our former position (current pick)
      // When the draft reaches our new position, we'll pick there
    } else {
      alert(`${option.targetTeam} declined your counter offer.`);
      setCounterOffer(null);
    }
  };
  const offerTradeUp = (option: any) => {
    const userTeam = myTeams[0];
    // Auto-accept if user controls both teams
    const controlsBothTeams = myTeams.includes(option.targetTeam);

    if (controlsBothTeams || Math.random() < option.acceptChance) {

      // Format picks given for display
      const picksGivenDisplay = option.useFuturePicks
        ? option.additionalPicks.map((p: DraftPick) => formatPickDisplay(p.round, p.year, p.fromTeam))
        : option.userPickInRound
          ? [`Pick #${option.userPickInRound}`, ...option.additionalPicks.map((p: DraftPick) => formatPickDisplay(p.round, p.year, p.fromTeam))]
          : option.additionalPicks.map((p: DraftPick) => formatPickDisplay(p.round, p.year, p.fromTeam));

      const trade = {
        fromTeam: userTeam,
        toTeam: option.targetTeam,
        pickGiven: option.userPickNum,
        pickReceived: option.targetPickNum,
        additionalPicks: picksGivenDisplay,
        forUser: true,
        userInitiated: true,
        useFuturePicks: option.useFuturePicks
      };

      // Update team draft picks - remove traded picks from user
      if (option.additionalPicks && option.additionalPicks.length > 0) {
        const newTeamPicks = { ...teamDraftPicks };
        const userPicks = [...(newTeamPicks[userTeam] || [])];
        const newTradedAway = [...tradedAwayPicks];

        option.additionalPicks.forEach((tradedPick: DraftPick) => {
          const idx = userPicks.findIndex(p => p.round === tradedPick.round && p.year === tradedPick.year && !p.traded);
          if (idx !== -1) {
            userPicks.splice(idx, 1);
            // Track the traded away pick
            newTradedAway.push({ ...tradedPick, fromTeam: option.targetTeam });
          }
        });

        newTeamPicks[userTeam] = userPicks;
        setTeamDraftPicks(newTeamPicks);
        setTradedAwayPicks(newTradedAway);
      }

      // Swap in draft order - user gets the traded pick position, other team gets user's original position
      const newDraftOrder = [...draftOrder];
      const targetIdx = option.targetPickNum % 32;

      if (!option.useFuturePicks && option.userPickNum !== null) {
        const userIdx = option.userPickNum % 32;
        newDraftOrder[targetIdx] = userTeam;
        newDraftOrder[userIdx] = option.targetTeam;
      } else {
        // Trading with future picks only - just give user the target slot
        newDraftOrder[targetIdx] = userTeam;
      }
      setDraftOrder(newDraftOrder);

      setTrades([...trades, trade]);
      setTradesThisRound(tradesThisRound + 1);
      setRecentTrade({ ...trade, fromTeam: userTeam, toTeam: option.targetTeam });
      setTimeout(() => setRecentTrade(null), 3000);
      closeTradeMenu();

      // DON'T jump to the target pick - let the draft continue normally
      // The draft order has been updated, so when it reaches the target pick position,
      // the user will be picking there. Resume from current position.
      // (The draft was paused when we opened the trade menu)
    } else {
      alert(`${option.targetTeam} declined your trade offer.`);
    }
  };

  // Counter offer functionality
  const startCounterOffer = (originalOffer: any) => {
    setCounterOffer({
      originalOffer,
      targetTeam: originalOffer.fromTeam,
      theyGive: originalOffer.pickReceived,
      theyGiveExtra: originalOffer.additionalPicks,
    });
    setPendingTradeOffer(null);
    setAllTradeOffers([]);
    setCurrentOfferIndex(0);
    setSelectedCounterPicks([]);
    setSelectedCounterGivePicks([]);
  };

  const toggleCounterPick = (pick: DraftPick) => {
    const exists = selectedCounterPicks.find(p => p.round === pick.round && p.year === pick.year);
    if (exists) {
      setSelectedCounterPicks(selectedCounterPicks.filter(p => !(p.round === pick.round && p.year === pick.year)));
    } else {
      setSelectedCounterPicks([...selectedCounterPicks, pick]);
    }
  };

  const submitCounterOffer = () => {
    if (!counterOffer) return;

    const userTeam = myTeams[0];

    // Check if user controls both teams - if so, auto-accept
    const controlsBothTeams = myTeams.includes(counterOffer.targetTeam);

    // Calculate if counter offer is reasonable (70% chance they accept if value is close)
    const acceptChance = Math.min(0.7, 0.3 + (selectedCounterPicks.length * 0.15));

    if (controlsBothTeams || Math.random() < acceptChance) {
      const userTeam = myTeams[0];

      const trade = {
        fromTeam: counterOffer.targetTeam,
        toTeam: userTeam,
        pickGiven: pick,
        pickReceived: counterOffer.theyGive,
        additionalPicks: [
          ...counterOffer.theyGiveExtra,
          ...selectedCounterPicks.map((p: DraftPick) => `${p.year} Round ${p.round}`)
        ],
        forUser: true,
        userInitiated: false,
        counterOffer: true
      };

      // Add received picks to acquired picks
      const newAcquired = [...acquiredPicks];
      selectedCounterPicks.forEach(p => {
        newAcquired.push({ ...p, fromTeam: counterOffer.targetTeam });
      });
      setAcquiredPicks(newAcquired);

      executeTrade(trade);
      setCounterOffer(null);
      setSelectedCounterPicks([]);
      setSelectedCounterGivePicks([]);
      setPick(counterOffer.theyGive);
    } else {
      alert(`${counterOffer.targetTeam} rejected your counter offer.`);
      setCounterOffer(null);
      setSelectedCounterPicks([]);
      setSelectedCounterGivePicks([]);
    }
  };

  const cancelCounterOffer = () => {
    setCounterOffer(null);
    setSelectedCounterPicks([]);
  };

  // Custom trade popup functions
  const openCustomTrade = () => {
    setShowCustomTrade(true);
    setCustomTradeTeam(null);
    setCustomTradeGive([]);
    setCustomTradeReceive([]);
    setDraftPaused(true);
  };

  const closeCustomTrade = () => {
    setShowCustomTrade(false);
    setCustomTradeTeam(null);
    setCustomTradeGive([]);
    setCustomTradeReceive([]);
    setDraftPaused(false);
  };

  const toggleCustomGivePick = (p: DraftPick, index: number) => {
    const pickKey = `${p.year}-${p.round}-${index}`;
    const existsIdx = customTradeGive.findIndex(x => (x as any)._key === pickKey);
    if (existsIdx !== -1) {
      setCustomTradeGive(customTradeGive.filter((_, i) => i !== existsIdx));
    } else {
      setCustomTradeGive([...customTradeGive, { ...p, _key: pickKey } as any]);
    }
  };

  const toggleCustomReceivePick = (p: DraftPick, index: number) => {
    const pickKey = `${p.year}-${p.round}-${index}`;
    const existsIdx = customTradeReceive.findIndex(x => (x as any)._key === pickKey);
    if (existsIdx !== -1) {
      setCustomTradeReceive(customTradeReceive.filter((_, i) => i !== existsIdx));
    } else {
      setCustomTradeReceive([...customTradeReceive, { ...p, _key: pickKey } as any]);
    }
  };

  const isPickSelected = (picks: DraftPick[], year: number, round: number, index: number) => {
    const pickKey = `${year}-${round}-${index}`;
    return picks.some(x => (x as any)._key === pickKey);
  };

  const submitCustomTrade = () => {
    if (!customTradeTeam || (customTradeGive.length === 0 && customTradeReceive.length === 0)) {
      alert('Please select a team and at least one pick to trade.');
      return;
    }

    // Calculate trade value - AI decides based on value
    let giveValue = 0;
    let receiveValue = 0;

    customTradeGive.forEach(p => {
      const baseValue = p.year === 2026
        ? getPickValue((p.round - 1) * 32 + 16)
        : getPickValue((p.round - 1) * 32 + 16) * (p.year === 2027 ? 0.85 : 0.7);
      giveValue += baseValue;
    });

    customTradeReceive.forEach(p => {
      const baseValue = p.year === 2026
        ? getPickValue((p.round - 1) * 32 + 16)
        : getPickValue((p.round - 1) * 32 + 16) * (p.year === 2027 ? 0.85 : 0.7);
      receiveValue += baseValue;
    });

    // AI accepts based on value, division rivalry, and whether trade helps their needs
    const valueRatio = giveValue / Math.max(receiveValue, 1);
    const isDivRival = areDivisionRivals(customTradeTeam, myTeams[0] || currentTeam);
    const divPenalty = isDivRival ? 0.25 : 0;
    const baseAccept = valueRatio >= 1.1 ? 0.9 : valueRatio >= 0.9 ? 0.7 : valueRatio >= 0.7 ? 0.4 : valueRatio >= 0.5 ? 0.15 : 0.05;
    const acceptChance = Math.max(0.05, baseAccept - divPenalty);

    if (Math.random() < acceptChance) {
      const userTeam = myTeams[0];

      const trade = {
        fromTeam: userTeam,
        toTeam: customTradeTeam,
        pickGiven: pick,
        pickReceived: pick,
        additionalPicks: [
          ...customTradeGive.map(p => `You gave: ${p.year} R${p.round}`),
          ...customTradeReceive.map(p => `You got: ${p.year} R${p.round}`)
        ],
        forUser: true,
        userInitiated: true,
        customTrade: true
      };

      // Update team draft picks
      const newTeamPicks = { ...teamDraftPicks };
      const newTradedAway = [...tradedAwayPicks];

      // Remove picks user is giving
      const userPicks = [...(newTeamPicks[userTeam] || [])];
      customTradeGive.forEach(p => {
        const idx = userPicks.findIndex(x => x.round === p.round && x.year === p.year);
        if (idx !== -1) {
          userPicks.splice(idx, 1);
          // Track the traded away pick
          newTradedAway.push({ ...p, fromTeam: customTradeTeam });
        }
      });
      newTeamPicks[userTeam] = userPicks;
      setTradedAwayPicks(newTradedAway);

      // Add picks user is receiving to acquired picks
      const newAcquired = [...acquiredPicks];
      customTradeReceive.forEach(p => {
        newAcquired.push({ ...p, fromTeam: customTradeTeam });
        userPicks.push({ ...p, fromTeam: customTradeTeam });
      });
      setAcquiredPicks(newAcquired);
      newTeamPicks[userTeam] = userPicks;

      setTeamDraftPicks(newTeamPicks);

      // Update draft order for 2026 picks being traded
      const newDraftOrder = [...draftOrder];

      // For picks the user is giving away (2026 only)
      customTradeGive.forEach(p => {
        if (p.year === 2026) {
          // Find the position of this pick in the initial draft order
          const pickOwner = p.fromTeam || userTeam;
          const pickPosition = initialDraftOrder.indexOf(pickOwner);
          if (pickPosition !== -1) {
            // The other team now picks at this position
            newDraftOrder[pickPosition] = customTradeTeam;
          }
        }
      });

      // For picks the user is receiving (2026 only)
      customTradeReceive.forEach(p => {
        if (p.year === 2026) {
          // Find the position of this pick in the initial draft order
          const pickOwner = p.fromTeam || customTradeTeam;
          const pickPosition = initialDraftOrder.indexOf(pickOwner);
          if (pickPosition !== -1) {
            // The user now picks at this position
            newDraftOrder[pickPosition] = userTeam;
          }
        }
      });

      setDraftOrder(newDraftOrder);
      setTrades([...trades, trade]);
      setTradesThisRound(tradesThisRound + 1);

      alert(`Trade accepted! ${customTradeTeam} agreed to the trade.`);
      closeCustomTrade();
    } else {
      alert(`${customTradeTeam} rejected your trade offer. Try offering more value.`);
    }
  };

  const openTradeMenu = (type: 'up' | 'down') => {
    const options = type === 'up' ? generateTradeUpOptions() : generateTradeDownOptions();
    setTradeUpTargets(options);
    setShowTradeUp(true);
    setTradeMode(type);
    if (type === 'up') {
      setDraftPaused(true);
    }
  };

  const closeTradeMenu = () => {
    setShowTradeUp(false);
    setTradeUpTargets([]);
    setTradeMode(null);
    setDraftPaused(false);
  };

  // Play audio when draft starts - must happen AFTER state changes to avoid unmounting
  useEffect(() => {
    if (state === 'drafting' && !audioPlayed.current && draftAudioRef.current) {
      audioPlayed.current = true;
      // Small delay to ensure audio element is mounted in new state
      setTimeout(() => {
        if (draftAudioRef.current) {
          console.log('Attempting to play audio after state change...');
          console.log('Audio element:', draftAudioRef.current);
          console.log('Audio src:', draftAudioRef.current.src);
          draftAudioRef.current.volume = 1.0;
          draftAudioRef.current.play()
            .then(() => {
              console.log('Audio started successfully');
              console.log('Audio paused?', draftAudioRef.current?.paused);
              console.log('Audio current time:', draftAudioRef.current?.currentTime);
            })
            .catch(err => {
              console.error('Audio playback failed:', err);
            });
        }
      }, 100);
    }
  }, [state]);

  // Reset trades count at start of each round
  useEffect(() => {
    if (pick % 32 === 0) {
      setTradesThisRound(0);
    }
  }, [Math.floor(pick / 32)]);

  useEffect(() => {
    if (state !== 'drafting' || pick >= totalPicks || draftPaused) {
      pickInProgress.current = false;
      return;
    }

    // Get current values to avoid stale closures
    const currentTeamNow = draftOrder[pick % 32];
    const isMyPickNow = myTeams.includes(currentTeamNow);
    const speedMs = speeds[speed as keyof typeof speeds];
    const currentPick = pick; // Capture current pick value

    if (!isMyPickNow) {
      // Prevent double-picks
      if (pickInProgress.current) return;

      // Check if a trade should happen before this pick (only if no recent trade)
      if (!recentTrade && shouldTradingHappen(currentPick, tradesThisRound)) {
        const trade = generateTradeOffer(currentPick, currentTeamNow, false);
        if (trade) {
          executeTrade(trade);
        }
      }

      // Set up the pick timer for AI teams
      pickInProgress.current = true;
      const timer = setTimeout(() => {
        // Verify we're still on the same pick
        const teamToPick = draftOrder[currentPick % 32];
        const playerToPick = smartAutoPick(teamToPick);
        if (playerToPick) {
          makePick(playerToPick);
        }
        pickInProgress.current = false;
      }, speedMs);
      return () => {
        clearTimeout(timer);
        pickInProgress.current = false;
      };
    } else {
      pickInProgress.current = false;
      // Generate random trade offers for user when it's their pick
      if (!pendingTradeOffer && allTradeOffers.length === 0) {
        const tradeDownOffers = generateTradeDownOptions();

        if (tradeDownOffers.length > 0) {
          // Not every pick gets trade offers (60% chance in R1, 40% in R2, 25% later)
          const offerChance = round === 1 ? 0.6 : round === 2 ? 0.4 : 0.25;
          if (Math.random() > offerChance) {
            // No offers this pick
          } else {
          // Realistically 1-2 offers max
          const numOffers = Math.min(tradeDownOffers.length, Math.random() < 0.7 ? 1 : 2);
          const shuffled = [...tradeDownOffers].sort(() => Math.random() - 0.5);
          const selectedOffers = shuffled.slice(0, numOffers);

          // Convert the offers to the format expected by pendingTradeOffer
          const currentRoundNum = Math.floor(currentPick / 32) + 1;
          const formattedOffers = selectedOffers.map(offer => {
            // Team trading up sometimes wants one of your later picks too (~40% in R1, ~50% in R2+)
            // This is common in real NFL trades - e.g. "swap 1sts and you throw in a 4th"
            let requestedPick: string | null = null;
            const askChance = currentRoundNum === 1 ? 0.40 : 0.50;
            if (Math.random() < askChance) {
              // Ask for a pick 2-3 rounds later (or a future year pick)
              const roundsLater = 2 + Math.floor(Math.random() * 2); // 2-3 rounds later
              const askRound = currentRoundNum + roundsLater;
              const userTeam = myTeams[0] || currentTeamNow;
              const userPos = initialDraftOrder.indexOf(userTeam);

              if (askRound <= 7) {
                // Ask for a 2026 pick in a later round
                const askPickNum = (askRound - 1) * 32 + (userPos !== -1 ? userPos : 16);
                requestedPick = formatPickDisplay(askRound, 2026, undefined, askPickNum);
              } else {
                // Ask for a future year pick instead
                const futureYear = Math.random() < 0.7 ? 2027 : 2028;
                requestedPick = `${futureYear} R${Math.min(currentRoundNum + roundsLater - 1, 5)}`;
              }

              // Give an extra pick in return to sweeten the deal
              const bonusYear = Math.random() < 0.6 ? 2027 : 2028;
              const bonusRound = Math.min(currentRoundNum + 1, 5);
              offer.additionalPicks.push(formatPickDisplay(bonusRound, bonusYear, undefined, undefined, offer.targetTeam));
            }

            // Also ensure at least one future year pick in the compensation
            // Replace one 2026 pick with a future year pick if all are 2026
            const allCurrent = offer.additionalPicks.every((p: string) => p.includes('2026'));
            if (allCurrent && offer.additionalPicks.length > 0 && Math.random() < 0.5) {
              const replaceIdx = offer.additionalPicks.length - 1;
              const futureYear = Math.random() < 0.75 ? 2027 : 2028;
              const futureRound = Math.min(currentRoundNum + replaceIdx + 1, 6);
              offer.additionalPicks[replaceIdx] = formatPickDisplay(futureRound, futureYear, undefined, undefined, offer.targetTeam);
            }

            return {
              fromTeam: offer.targetTeam,
              toTeam: currentTeamNow,
              pickGiven: currentPick,
              pickReceived: offer.targetPickNum,
              additionalPicks: offer.additionalPicks,
              requestedPick,
              forUser: true
            };
          });

          setAllTradeOffers(formattedOffers);
          setCurrentOfferIndex(0);
          setPendingTradeOffer(formattedOffers[0]);
          }
        }
      }
    }
  }, [pick, state, draftOrder, myTeams, speed, recentTrade, draftPaused]);

  // Calculate grade for a single pick
  const calculatePickGrade = (pickData: any, team: string) => {
    const needs = getTeamNeeds(team);
    const allProspects = generateProspects();

    const playerGrade = pickData.player.grade;
    const needIdx = needs.indexOf(pickData.player.position);
    const isNeed = needIdx !== -1;

    // Calculate pick position (overall pick number)
    const pickPosition = (pickData.round - 1) * 32 + pickData.pick;

    // Find what players were actually available at this pick
    const draftedPlayerNames = picks
      .filter((pick: any) => {
        const pickNum = (pick.round - 1) * 32 + pick.pick;
        return pickNum < pickPosition;
      })
      .map((pick: any) => pick.player.name);

    const availableAtPick = allProspects.filter(
      prospect => !draftedPlayerNames.includes(prospect.name)
    );

    const bestAvailableGrade = availableAtPick.length > 0
      ? Math.max(...availableAtPick.map(pl => pl.grade))
      : 50;

    // Find best available at position of need
    const bestNeedAvailable = availableAtPick
      .filter(prospect => needs.includes(prospect.position))
      .sort((a, b) => b.grade - a.grade)[0];

    const gradeVsBest = playerGrade - bestAvailableGrade;

    // Base score starts at 75 (C+/B- range)
    let pickScore = 75;

    // Add/subtract based on how close to best available
    pickScore += gradeVsBest * 0.5;

    // Bonus for filling a need (+8 to +16)
    if (isNeed) {
      pickScore += 10 + (3 - needIdx) * 2; // Top need = +16, 2nd = +14, 3rd = +12
    }

    // Extra bonus if you took the best available player at a need position
    if (isNeed && bestNeedAvailable && pickData.player.name === bestNeedAvailable.name) {
      pickScore += 8;
    }

    // Penalty for reaching (taking a much lower graded player)
    if (gradeVsBest < -15) {
      pickScore -= 10;
    }

    // Apply curve based on late-round picks
    const roundCurve = Math.max(0, (pickData.round - 1) * 3);
    pickScore += roundCurve;

    const finalPickScore = Math.max(40, Math.min(100, pickScore));
    return { score: Math.round(finalPickScore), letterGrade: getLetterGrade(finalPickScore) };
  };

  const calculateGrade = (team: string, teamPicks: any[]) => {
    if (teamPicks.length === 0) return { grade: 'N/A', score: 0, details: '' };

    const needs = getTeamNeeds(team);
    const allProspects = generateProspects();
    let totalScore = 0;
    let needsAddressed = 0;

    teamPicks.forEach((p: any) => {
      const playerGrade = p.player.grade;
      const needIdx = needs.indexOf(p.player.position);
      const isNeed = needIdx !== -1;

      if (isNeed) needsAddressed++;

      // Calculate pick position (overall pick number)
      const pickPosition = (p.round - 1) * 32 + p.pick;

      // Find what players were actually available at this pick
      // (excluding players already drafted before this pick)
      const draftedPlayerNames = picks
        .filter((pick: any) => {
          const pickNum = (pick.round - 1) * 32 + pick.pick;
          return pickNum < pickPosition;
        })
        .map((pick: any) => pick.player.name);

      const availableAtPick = allProspects.filter(
        prospect => !draftedPlayerNames.includes(prospect.name)
      );

      const bestAvailableGrade = availableAtPick.length > 0
        ? Math.max(...availableAtPick.map(pl => pl.grade))
        : 50;

      // Find best available at position of need
      const bestNeedAvailable = availableAtPick
        .filter(prospect => needs.includes(prospect.position))
        .sort((a, b) => b.grade - a.grade)[0];

      // Calculate curved score:
      // If you took the best available player, you did well
      // If you took a player much worse than what was available, you did poorly
      const gradeVsBest = playerGrade - bestAvailableGrade;

      // Base score starts at 75 (C+/B- range)
      let pickScore = 75;

      // Add/subtract based on how close to best available
      pickScore += gradeVsBest * 0.5; // Each point of difference = 0.5 score

      // Bonus for filling a need (+8 to +16)
      if (isNeed) {
        pickScore += 10 + (3 - needIdx) * 2; // Top need = +16, 2nd = +14, 3rd = +12
      }

      // Extra bonus if you took the best available player at a need position
      if (isNeed && bestNeedAvailable && p.player.name === bestNeedAvailable.name) {
        pickScore += 8;
      }

      // Penalty for reaching (taking a much lower graded player)
      if (gradeVsBest < -15) {
        pickScore -= 10; // Big reach penalty
      }

      // Apply curve based on late-round picks - later picks have lower available grades
      // so we give a boost to account for diminished talent pool
      const roundCurve = Math.max(0, (p.round - 1) * 3); // +3 per round after R1
      pickScore += roundCurve;

      totalScore += Math.max(40, Math.min(100, pickScore));
    });

    const avgScore = totalScore / teamPicks.length;
    const finalScore = Math.round(Math.min(100, avgScore));

    let grade = 'F';
    if (finalScore >= 95) grade = 'A+';
    else if (finalScore >= 90) grade = 'A';
    else if (finalScore >= 85) grade = 'A-';
    else if (finalScore >= 80) grade = 'B+';
    else if (finalScore >= 75) grade = 'B';
    else if (finalScore >= 70) grade = 'B-';
    else if (finalScore >= 65) grade = 'C+';
    else if (finalScore >= 60) grade = 'C';
    else if (finalScore >= 55) grade = 'C-';
    else if (finalScore >= 50) grade = 'D+';
    else if (finalScore >= 45) grade = 'D';

    return { grade, score: finalScore, details: needsAddressed + '/' + Math.min(teamPicks.length, needs.length) + ' needs' };
  };

  if (state === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h1 className="text-4xl font-bold text-white mb-6">Draft Setup</h1>
            
            <div className="space-y-6">
              <div>
                <label className="text-white text-lg font-semibold mb-3 block">Rounds</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5,6,7].map(r => (
                    <button key={r} onClick={() => setRounds(r)}
                      className={'px-6 py-3 rounded-lg font-bold ' + (rounds === r ? 'bg-blue-500' : 'bg-white/10 hover:bg-white/20') + ' text-white'}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white text-lg font-semibold mb-3 block">Speed</label>
                <div className="flex gap-2">
                  {['slow','medium','fast','turbo'].map(s => (
                    <button key={s} onClick={() => setSpeed(s)}
                      className={'px-6 py-3 rounded-lg font-bold capitalize ' + (speed === s ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20') + ' text-white'}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white text-lg font-semibold">Teams ({myTeams.length}) - Listed by 1st Pick</label>
                  <label className="flex items-center space-x-2 cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-white font-semibold">Select All</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto bg-black/20 p-4 rounded-lg">
                  {/* All 32 teams with their first pick - some have 1st round, some have 2nd round as their first */}
                  {[
                    { team: 'Las Vegas Raiders', pick: 1, round: 1 },
                    { team: 'New York Jets', pick: 2, round: 1 },
                    { team: 'Arizona Cardinals', pick: 3, round: 1 },
                    { team: 'Tennessee Titans', pick: 4, round: 1 },
                    { team: 'New York Giants', pick: 5, round: 1 },
                    { team: 'Cleveland Browns', pick: 6, round: 1 },
                    { team: 'Washington Commanders', pick: 7, round: 1 },
                    { team: 'New Orleans Saints', pick: 8, round: 1 },
                    { team: 'Kansas City Chiefs', pick: 9, round: 1 },
                    { team: 'Cincinnati Bengals', pick: 10, round: 1 },
                    { team: 'Miami Dolphins', pick: 11, round: 1 },
                    { team: 'Dallas Cowboys', pick: 12, round: 1 },
                    { team: 'Los Angeles Rams', pick: 13, round: 1 },
                    { team: 'Baltimore Ravens', pick: 14, round: 1 },
                    { team: 'Tampa Bay Buccaneers', pick: 15, round: 1 },
                    { team: 'Detroit Lions', pick: 17, round: 1 },
                    { team: 'Minnesota Vikings', pick: 18, round: 1 },
                    { team: 'Carolina Panthers', pick: 19, round: 1 },
                    { team: 'Pittsburgh Steelers', pick: 21, round: 1 },
                    { team: 'Los Angeles Chargers', pick: 22, round: 1 },
                    { team: 'Philadelphia Eagles', pick: 23, round: 1 },
                    { team: 'Chicago Bears', pick: 25, round: 1 },
                    { team: 'Buffalo Bills', pick: 26, round: 1 },
                    { team: 'San Francisco 49ers', pick: 27, round: 1 },
                    { team: 'Houston Texans', pick: 28, round: 1 },
                    { team: 'Denver Broncos', pick: 30, round: 1 },
                    { team: 'New England Patriots', pick: 31, round: 1 },
                    { team: 'Seattle Seahawks', pick: 32, round: 1 },
                    { team: 'Indianapolis Colts', pick: 47, round: 2 },
                    { team: 'Atlanta Falcons', pick: 48, round: 2 },
                    { team: 'Green Bay Packers', pick: 52, round: 2 },
                    { team: 'Jacksonville Jaguars', pick: 56, round: 2 },
                  ].sort((a, b) => a.pick - b.pick).map(({ team, pick, round }) => (
                    <button key={team} onClick={() => setMyTeams(p => p.includes(team) ? p.filter(t => t !== team) : [...p, team])}
                      className={'p-3 rounded-lg flex items-center gap-3 ' + (myTeams.includes(team) ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20') + ' text-white'}>
                      <span className={`font-bold w-10 text-center text-xs ${round === 2 ? 'text-orange-400' : 'text-yellow-400'}`}>
                        #{pick}
                      </span>
                      <img src={teamLogos[team]} alt={team} className="w-8 h-8 object-contain" />
                      <span className="flex-1 text-left text-sm">{team}</span>
                      {myTeams.includes(team) && <CheckCircle className="w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setState('drafting')}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-bold text-xl">
                {myTeams.length > 0 ? 'Start Draft' : 'Start Draft (Spectator Mode)'}
              </button>
            </div>
          </div>
        </div>
        {/* NFL Draft Theme Audio - must be available in setup state */}
        <audio ref={draftAudioRef} src="/nfl-draft-theme.mp3" preload="auto" />
      </div>
    );
  }

  if (state === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-6 border border-white/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Trophy className="w-12 h-12 text-yellow-400" />
                <h1 className="text-4xl font-bold text-white">Draft Complete!</h1>
              </div>
              <button onClick={() => window.location.reload()}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
                New Draft
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {myTeams.map(team => {
              const teamPicks = picks.filter(p => p.team === team);
              const {score, details} = calculateGrade(team, teamPicks);
              const needs = getTeamNeeds(team);

              // Calculate average player grade
              const avgPlayerGrade = teamPicks.length > 0
                ? (teamPicks.reduce((sum, p) => sum + p.player.grade, 0) / teamPicks.length).toFixed(1)
                : 'N/A';

              return (
                <div key={team} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">{team}</h2>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-yellow-400">{getLetterGrade(score)}</div>
                      <div className="text-lg text-white">{score}/100</div>
                      <div className="text-xs text-gray-400">Avg Grade: {avgPlayerGrade}</div>
                      <div className="text-xs text-gray-300">{details}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                    <div className="text-sm text-white font-semibold mb-2">Needs:</div>
                    <div className="flex flex-wrap gap-2">
                      {needs.map(pos => (
                        <span key={pos}
                          className={'px-2 py-1 rounded text-xs font-bold ' + (teamPicks.some(p => p.player.position === pos) ? 'bg-green-600' : 'bg-red-600/50') + ' text-white'}>
                          {pos}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {teamPicks.map((p,i) => {
                      const isNeed = needs.includes(p.player.position);
                      const pickGradeData = calculatePickGrade(p, team);

                      // Color based on grade
                      const gradeColor =
                        pickGradeData.score >= 95 ? 'text-green-400' :
                        pickGradeData.score >= 90 ? 'text-green-300' :
                        pickGradeData.score >= 85 ? 'text-blue-400' :
                        pickGradeData.score >= 80 ? 'text-yellow-300' :
                        pickGradeData.score >= 70 ? 'text-orange-400' :
                        'text-red-400';

                      return (
                        <div key={i} className={'p-3 rounded-lg ' + (isNeed ? 'bg-green-900/30 border border-green-500/30' : 'bg-white/5')}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1">
                              <div className="text-white font-semibold text-sm">R{p.round}-{p.pick}: {p.player.name}</div>
                              {isNeed && <CheckCircle className="w-4 h-4 text-green-400" />}
                            </div>
                            <div className={`font-bold text-lg ${gradeColor}`}>
                              {pickGradeData.letterGrade}
                            </div>
                          </div>
                          <div className="text-xs text-gray-300">{p.player.position} - {p.player.school} - Grade: {p.player.grade} (#{(p.player as any).rank})</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Your Gains Section */}
          {(acquiredPicks.length > 0 || trades.filter(t => t.forUser && !t.userInitiated).length > 0) && (
            <div className="bg-green-500/10 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Your Gains from Trades</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Acquired future picks */}
                {acquiredPicks.length > 0 && (
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="text-green-400 font-bold mb-2">Acquired Draft Picks</h3>
                    <div className="space-y-2">
                      {acquiredPicks.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-white text-sm">
                          <span className="text-green-400">+</span>
                          <span>{formatPickDisplay(p.round, p.year, p.fromTeam)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Traded away picks */}
                {tradedAwayPicks.length > 0 && (
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="text-red-400 font-bold mb-2">Traded Away Picks</h3>
                    <div className="space-y-2">
                      {tradedAwayPicks.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-white text-sm">
                          <span className="text-red-400">-</span>
                          <span>{formatPickDisplay(p.round, p.year, p.fromTeam)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Summary of trade gains */}
                <div className="bg-black/20 p-4 rounded-lg">
                  <h3 className="text-green-400 font-bold mb-2">Trade Summary</h3>
                  <div className="text-white text-sm space-y-1">
                    <p>Trades initiated by you: {trades.filter(t => t.userInitiated).length}</p>
                    <p>Trade offers accepted: {trades.filter(t => t.forUser && !t.userInitiated).length}</p>
                    <p>Counter offers made: {trades.filter(t => t.counterOffer).length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {trades.length > 0 && (
            <div className="bg-orange-500/10 backdrop-blur-lg rounded-xl p-6 border border-orange-500/30 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRightLeft className="w-8 h-8 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">Trades Made ({trades.length})</h2>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {trades.map((t, i) => (
                  <div key={i} className="bg-black/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-400 font-bold">{t.fromTeam}</span>
                      <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                      <span className="text-orange-400 font-bold">{t.toTeam}</span>
                      {t.userInitiated && <span className="text-xs bg-purple-600 px-2 py-1 rounded text-white">You initiated</span>}
                      {t.forUser && !t.userInitiated && <span className="text-xs bg-blue-600 px-2 py-1 rounded text-white">Offered to you</span>}
                      {t.counterOffer && <span className="text-xs bg-yellow-600 px-2 py-1 rounded text-white">Counter offer</span>}
                    </div>
                    <div className="text-gray-300 text-sm">
                      <span className="text-white">{t.fromTeam}</span> traded up to Pick #{t.pickGiven + 1}
                      {t.additionalPicks && t.additionalPicks.length > 0 && (
                        <span> • <span className="text-white">{t.toTeam}</span> received: Pick #{t.pickReceived + 1}, {t.additionalPicks.join(', ')}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">All Picks</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {picks.map((p,i) => (
                <div key={i} className="bg-green-900/30 p-3 rounded-lg flex justify-between">
                  <div>
                    <span className="text-yellow-400 font-bold text-sm">R{p.round}-{p.pick}</span>
                    <span className="text-white ml-2 text-sm">{p.team}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">{p.player.name}</div>
                    <div className="text-xs text-gray-300">{p.player.position} - {p.player.school}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentNeeds = getTeamNeeds(currentTeam);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {recentTrade && !recentTrade.forUser && (
          <div className="bg-orange-500/20 backdrop-blur-lg rounded-xl p-4 mb-4 border border-orange-500/50 animate-pulse">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-6 h-6 text-orange-400" />
              <div>
                <h3 className="text-lg font-bold text-orange-200">Trade!</h3>
                <p className="text-white">
                  <span className="font-semibold">{recentTrade.fromTeam}</span> trades up with{' '}
                  <span className="font-semibold">{recentTrade.toTeam}</span>
                </p>
                <p className="text-gray-300 text-sm">
                  {recentTrade.toTeam} receives: Pick #{recentTrade.pickReceived + 1}
                  {recentTrade.additionalPicks.length > 0 && `, ${recentTrade.additionalPicks.join(', ')}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {!isMyPick && recentPicks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-3">Recent Picks</h3>
            <div className="grid grid-cols-3 gap-3">
              {recentPicks.map((p,i) => (
                <div key={i} className="bg-green-900/30 p-3 rounded-lg border border-green-500/30 flex items-center gap-3">
                  <img src={teamLogos[p.team]} alt={p.team} className="w-10 h-10 object-contain" />
                  <div>
                    <div className="text-yellow-400 font-bold text-sm">R{p.round}-{p.pick}</div>
                    <div className="text-white font-semibold text-sm">{p.team}</div>
                    <div className="text-white">{p.player.name}</div>
                    <div className="text-gray-300 text-xs">{p.player.position} - {p.player.school}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">2026 NFL Draft <span className="text-xs text-gray-400">v1.1</span></h1>
            <div className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>R{round} | Pick {pick+1}/{totalPicks}</span>
            </div>
          </div>
          
          <div className={'p-6 rounded-lg ' + (isMyPick ? 'bg-gradient-to-r from-green-600 to-blue-600' : 'bg-gradient-to-r from-gray-600 to-gray-700')}>
            <div className="flex items-center gap-3 mb-2">
              <User className="w-6 h-6 text-white" />
              <span className="text-white/80 text-sm font-semibold">{isMyPick ? 'YOUR PICK' : 'AUTO-DRAFTING'}</span>
            </div>
            <div className="text-white flex items-center gap-4">
              <img src={teamLogos[currentTeam]} alt={currentTeam} className="w-16 h-16 object-contain" />
              <div>
                <div className="text-2xl font-bold">Round {round}, Pick {pickInRound}</div>
                <div className="text-xl mb-3">{currentTeam}</div>
              </div>
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">Needs:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentNeeds.map((n,i) => (
                  <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isMyPick && !pendingTradeOffer && !showTradeUp && !showCustomTrade && (() => {
          let hasOffers = false;
          try {
            const offers = generateTradeDownOptions();
            hasOffers = offers.length > 0;
          } catch (e) {
            console.error('Trade offer error:', e);
          }

          return (
            <div className="mb-4 flex gap-3">
              {hasOffers && (
                <button
                  onClick={() => openTradeMenu('down')}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                  Trade Offers
                </button>
              )}
              <button
                onClick={openCustomTrade}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold flex items-center gap-2"
              >
                <ArrowRightLeft className="w-5 h-5" />
                Custom Trade
              </button>
            </div>
          );
        })()}

        {!isMyPick && !showTradeUp && !showCustomTrade && (
          <div className="mb-4 flex gap-3 flex-wrap">
            <button
              onClick={() => setDraftPaused(!draftPaused)}
              className={`px-6 py-3 ${draftPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white rounded-lg font-bold flex items-center gap-2`}
            >
              {draftPaused ? '▶ Resume Draft' : '⏸ Pause Draft'}
            </button>
            {draftPaused && (
              <>
                <button
                  onClick={() => openTradeMenu('up')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                  Trade Up
                </button>
                <button
                  onClick={openCustomTrade}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                  Custom Trade
                </button>
              </>
            )}
          </div>
        )}

        {showTradeUp && (
          <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-purple-500/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-purple-200">
                  {tradeMode === 'up' ? 'Trade Up Options' : 'Trade Offers'}
                </h3>
              </div>
              <button
                onClick={closeTradeMenu}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
            {tradeUpTargets.length === 0 ? (
              <p className="text-gray-300">
                {tradeMode === 'up'
                  ? 'No trade up options available. You need picks to trade (current round picks or future picks).'
                  : 'No trade down options available.'}
              </p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {tradeUpTargets.map((option, i) => (
                  <div key={i} className="bg-black/20 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={teamLogos[option.targetTeam]} alt={option.targetTeam} className="w-10 h-10 object-contain" />
                      <div>
                        <p className="text-white font-semibold">Pick #{tradeMode === 'up' ? option.targetPickNum + 1 : option.targetPickNum + 1} - {option.targetTeam}</p>
                        <p className="text-gray-300 text-sm">
                          {tradeMode === 'up' ? (
                            option.useFuturePicks ? (
                              <>You give: {option.additionalPicks.map((p: DraftPick) => formatPickDisplay(p.round, p.year, p.fromTeam)).join(', ')}</>
                            ) : (
                              <>You give: Pick #{option.userPickNum + 1}
                                {option.additionalPicks.length > 0 && ` + ${option.additionalPicks.map((p: DraftPick) => formatPickDisplay(p.round, p.year, p.fromTeam)).join(', ')}`}
                              </>
                            )
                          ) : (
                            <>You receive: Pick #{option.targetPickNum + 1}
                              {option.additionalPicks.length > 0 && ` + ${option.additionalPicks.map((pickStr: string) => {
                                console.log('Additional pick string:', pickStr);
                                return pickStr;
                              }).join(', ')}`}
                            </>
                          )}
                        </p>
                        {option.useFuturePicks && (
                          <p className="text-yellow-400 text-xs">Trading future picks only</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => tradeMode === 'up' ? offerTradeUp(option) : offerTradeDown(option)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
                    >
                      Offer Trade
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {counterOffer && counterOffer.type === 'down' && (
          <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-yellow-500/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-yellow-200">Counter Offer</h3>
              </div>
              <button
                onClick={() => setCounterOffer(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>

            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-white mb-2">
                <span className="font-bold text-red-400">{counterOffer.original.targetTeam}</span> declined your initial offer
              </p>
              <p className="text-gray-300 text-sm mb-3">
                Original offer: Pick #{counterOffer.original.targetPickInRound}
                {counterOffer.original.additionalPicks.length > 0 && ` + ${counterOffer.original.additionalPicks.join(', ')}`}
              </p>
              <p className="text-yellow-200 font-semibold mb-2">Select different picks to ask for:</p>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {getUserAvailablePicks().map((p, idx) => {
                  const pickKey = `${p.year}-${p.round}-${idx}`;
                  const isSelected = selectedCounterPicks.some((sp: DraftPick) =>
                    sp.year === p.year && sp.round === p.round && (sp as any)._idx === idx
                  );

                  return (
                    <button
                      key={pickKey}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedCounterPicks(selectedCounterPicks.filter((sp: DraftPick) =>
                            !( sp.year === p.year && sp.round === p.round && (sp as any)._idx === idx)
                          ));
                        } else {
                          setSelectedCounterPicks([...selectedCounterPicks, { ...p, _idx: idx } as any]);
                        }
                      }}
                      className={`w-full p-3 rounded-lg border flex items-center gap-3 ${
                        isSelected
                          ? 'bg-green-900/50 border-green-500'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 ${
                        isSelected ? 'bg-green-500 border-green-500' : 'border-gray-400'
                      }`} />
                      <span className="text-white">
                        {formatPickDisplay(p.round, p.year, p.fromTeam)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={submitCounterTradeDown}
                disabled={selectedCounterPicks.length === 0}
                className={`flex-1 py-3 rounded-lg font-bold ${
                  selectedCounterPicks.length === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Submit Counter Offer ({selectedCounterPicks.length} picks)
              </button>
            </div>
          </div>
        )}

        {pendingTradeOffer && isMyPick && !counterOffer && (
          <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-purple-500/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-purple-200">Trade Offer {allTradeOffers.length > 0 ? `(${currentOfferIndex + 1} of ${allTradeOffers.length})` : ''}</h3>
              </div>
              {allTradeOffers.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newIndex = currentOfferIndex > 0 ? currentOfferIndex - 1 : allTradeOffers.length - 1;
                      setCurrentOfferIndex(newIndex);
                      setPendingTradeOffer(allTradeOffers[newIndex]);
                    }}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => {
                      const newIndex = currentOfferIndex < allTradeOffers.length - 1 ? currentOfferIndex + 1 : 0;
                      setCurrentOfferIndex(newIndex);
                      setPendingTradeOffer(allTradeOffers[newIndex]);
                    }}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-white text-lg mb-2">
                <span className="font-bold text-purple-300">{pendingTradeOffer.fromTeam}</span> wants to trade up
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">You give:</p>
                  <p className="text-white font-semibold">Pick #{pendingTradeOffer.pickGiven + 1} (current)</p>
                  {pendingTradeOffer.requestedPick && (
                    <p className="text-red-400 font-semibold">+ {pendingTradeOffer.requestedPick}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">You receive:</p>
                  <p className="text-white font-semibold">Pick #{pendingTradeOffer.pickReceived + 1}</p>
                  {pendingTradeOffer.additionalPicks.map((pick: string, i: number) => (
                    <p key={i} className="text-green-400 font-semibold">+ {pick}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-3">
              <button
                onClick={acceptTrade}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
              >
                Accept
              </button>
              <button
                onClick={() => startCounterOffer(pendingTradeOffer)}
                className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-bold"
              >
                Counter
              </button>
              <button
                onClick={declineTrade}
                className="flex-1 py-3 bg-red-600/50 hover:bg-red-600 text-white rounded-lg font-bold"
              >
                Decline
              </button>
            </div>
            <div className="flex justify-center mt-3">
              <button
                onClick={() => {
                  setPendingTradeOffer(null);
                  setAllTradeOffers([]);
                  setCurrentOfferIndex(0);
                  openCustomTrade();
                }}
                className="px-4 py-2 bg-cyan-600/70 hover:bg-cyan-600 text-white rounded-lg font-semibold text-sm"
              >
                Propose My Own Trade Instead
              </button>
            </div>
          </div>
        )}

        {/* Counter Offer UI */}
        {counterOffer && (
          <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <ArrowRightLeft className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-200">Make Counter Offer to {counterOffer.targetTeam}</h3>
            </div>

            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-white text-lg mb-2">Their original offer:</p>
              <p className="text-gray-300 text-sm">
                They give: Pick #{counterOffer.theyGive + 1}
                {counterOffer.theyGiveExtra.length > 0 && `, ${counterOffer.theyGiveExtra.join(', ')}`}
              </p>
              <p className="text-gray-300 text-sm">They want: Pick #{pick + 1} (your current pick)</p>
            </div>

            <div className="mb-4">
              <p className="text-white font-semibold mb-2">Select additional picks you want from them:</p>
              <p className="text-gray-400 text-xs mb-3">Click on picks to add/remove them from your counter offer</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {/* Show the other team's available picks */}
                {(initialTeamDraftPicks[counterOffer.targetTeam] || []).map((p, i) => {
                  const isSelected = selectedCounterPicks.some(sp => sp.round === p.round && sp.year === p.year);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleCounterPick(p)}
                      className={`p-2 rounded-lg text-sm ${isSelected ? 'bg-yellow-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                    >
                      {formatPickDisplay(p.round, p.year, p.fromTeam)}
                    </button>
                  );
                })}
              </div>

              {selectedCounterPicks.length > 0 && (
                <div className="mt-3 p-3 bg-yellow-900/30 rounded-lg">
                  <p className="text-yellow-300 font-semibold">Your counter: You want their:</p>
                  <p className="text-white text-sm">
                    Pick #{counterOffer.theyGive + 1}
                    {counterOffer.theyGiveExtra.length > 0 && `, ${counterOffer.theyGiveExtra.join(', ')}`}
                    {selectedCounterPicks.map(p => `, ${p.year} Round ${p.round}`)}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-white font-semibold mb-2">Select additional picks YOU will give them (optional):</p>
              <p className="text-gray-400 text-xs mb-3">Click on your picks to add them to sweeten the deal</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {/* Show user's available picks */}
                {(teamDraftPicks[myTeams[0]] || []).map((p, i) => {
                  const isSelected = selectedCounterGivePicks.some(sp => sp.round === p.round && sp.year === p.year);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const exists = selectedCounterGivePicks.find(sp => sp.round === p.round && sp.year === p.year);
                        if (exists) {
                          setSelectedCounterGivePicks(selectedCounterGivePicks.filter(sp => !(sp.round === p.round && sp.year === p.year)));
                        } else {
                          setSelectedCounterGivePicks([...selectedCounterGivePicks, p]);
                        }
                      }}
                      className={`p-2 rounded-lg text-sm ${isSelected ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                    >
                      {formatPickDisplay(p.round, p.year, p.fromTeam)}
                    </button>
                  );
                })}
              </div>

              {selectedCounterGivePicks.length > 0 && (
                <div className="mt-3 p-3 bg-red-900/30 rounded-lg">
                  <p className="text-red-300 font-semibold">You will also give them:</p>
                  <p className="text-white text-sm">
                    {selectedCounterGivePicks.map(p => `${p.year} Round ${p.round}`).join(', ')}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={submitCounterOffer}
                className="flex-1 py-3 rounded-lg font-bold bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Counter Offer
              </button>
              <button
                onClick={cancelCounterOffer}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Custom Trade Popup */}
        {showCustomTrade && (
          <div className="bg-cyan-500/20 backdrop-blur-lg rounded-xl p-6 mb-6 border border-cyan-500/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-cyan-200">Custom Trade Builder</h3>
              </div>
              <button
                onClick={closeCustomTrade}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>

            {/* Step 1: Select Team */}
            <div className="mb-4">
              <p className="text-white font-semibold mb-2">1. Select team to trade with:</p>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-32 overflow-y-auto">
                {[...new Set(draftOrder)].filter(t => t !== currentTeam).map(team => (
                  <button
                    key={team}
                    onClick={() => setCustomTradeTeam(team)}
                    className={`p-2 rounded-lg flex flex-col items-center gap-1 ${customTradeTeam === team ? 'bg-cyan-600' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    <img src={teamLogos[team]} alt={team} className="w-8 h-8 object-contain" />
                    <span className="text-white text-xs text-center truncate w-full">{team.split(' ').pop()}</span>
                  </button>
                ))}
              </div>
            </div>

            {customTradeTeam && (
              <>
                {/* Step 2: Select picks to give */}
                <div className="mb-4">
                  <p className="text-white font-semibold mb-2">2. Select picks YOU give to {customTradeTeam.split(' ').pop()}:</p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                    {(teamDraftPicks[myTeams[0]] || []).filter(p => {
                      // Only allow trading future picks (not picks that have already been used)
                      if (p.year > 2026) return true; // Future draft years
                      if (p.year < 2026) return false; // Past draft years
                      // For 2026 picks, they should already be filtered out when used (via makePick)
                      // This list should only contain picks that haven't been made yet
                      return true;
                    }).map((p, i) => {
                      const isSelected = isPickSelected(customTradeGive, p.year, p.round, i);
                      return (
                        <button
                          key={i}
                          onClick={() => toggleCustomGivePick(p, i)}
                          className={`p-2 rounded-lg text-sm ${isSelected ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                        >
                          {formatPickDisplay(p.round, p.year, p.fromTeam, undefined, myTeams[0])}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Select picks to receive */}
                <div className="mb-4">
                  <p className="text-white font-semibold mb-2">3. Select picks YOU want from {customTradeTeam.split(' ').pop()}:</p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                    {(teamDraftPicks[customTradeTeam] || []).filter(p => {
                      // Only allow trading future picks (not picks that have already been used)
                      if (p.year > 2026) return true; // Future draft years
                      if (p.year < 2026) return false; // Past draft years
                      // For 2026 picks, they should already be filtered out when used (via makePick)
                      return true;
                    }).map((p, i) => {
                      const isSelected = isPickSelected(customTradeReceive, p.year, p.round, i);
                      return (
                        <button
                          key={i}
                          onClick={() => toggleCustomReceivePick(p, i)}
                          className={`p-2 rounded-lg text-sm ${isSelected ? 'bg-green-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                        >
                          {formatPickDisplay(p.round, p.year, p.fromTeam, undefined, customTradeTeam)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Trade Summary */}
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <p className="text-cyan-300 font-semibold mb-2">Trade Summary:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-red-400 text-sm font-semibold">You give:</p>
                      {customTradeGive.length === 0 ? (
                        <p className="text-gray-400 text-sm">None selected</p>
                      ) : (
                        customTradeGive.map((p, i) => (
                          <p key={i} className="text-white text-sm">{formatPickDisplay(p.round, p.year, p.fromTeam)}</p>
                        ))
                      )}
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-semibold">You receive:</p>
                      {customTradeReceive.length === 0 ? (
                        <p className="text-gray-400 text-sm">None selected</p>
                      ) : (
                        customTradeReceive.map((p, i) => (
                          <p key={i} className="text-white text-sm">{formatPickDisplay(p.round, p.year, p.fromTeam)}</p>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={submitCustomTrade}
                  disabled={customTradeGive.length === 0 && customTradeReceive.length === 0}
                  className={`w-full py-3 rounded-lg font-bold ${(customTradeGive.length > 0 || customTradeReceive.length > 0) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                >
                  Submit Trade Offer
                </button>
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Available Players</h2>

              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name, school, or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Position Filter */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {allPositions.map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setPositionFilter(pos)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        positionFilter === pos
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Showing {filteredAvailable.length} player{filteredAvailable.length !== 1 ? 's' : ''}
                </div>
              </div>

              {!isMyPick && (
                <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-200">
                  Waiting for {currentTeam}...
                </div>
              )}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredAvailable.slice(0,100).map((p,i) => {
                  const isNeed = currentNeeds.includes(p.position);
                  const hasAnalysis = (p as any).analysis;
                  const isExpanded = expandedPlayerAnalysis === p.name;
                  return (
                    <div key={i} className={'w-full rounded-lg border ' + (isMyPick ? (isNeed ? 'bg-green-900/30 border-green-500/50' : 'bg-white/5 border-white/10') : 'bg-white/5 border-white/10 opacity-50')}>
                      <button onClick={() => isMyPick && makePick(p)} disabled={!isMyPick}
                        className={'w-full p-3 flex items-center gap-3 ' + (isMyPick ? 'hover:bg-white/10 cursor-pointer' : '')}>
                        {/* Player Rank and Avatar */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-gray-400 text-lg font-bold min-w-[40px]">
                            #{(p as any).rank}
                          </div>
                          <div className={`w-10 h-10 rounded-full ${positionColors[p.position] || 'bg-gray-600'} flex items-center justify-center text-white font-bold text-sm overflow-hidden`}>
                            {(p as any).headshot ? (
                              <img
                                src={(p as any).headshot}
                                alt={p.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  if (e.currentTarget.nextSibling) {
                                    (e.currentTarget.nextSibling as HTMLElement).style.display = 'block';
                                  }
                                }}
                              />
                            ) : null}
                            <span className={(p as any).headshot ? 'hidden' : ''}>
                              {getPlayerInitials(p.name)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold">{p.name}</span>
                            {isNeed && <CheckCircle className="w-4 h-4 text-green-400" />}
                          </div>
                          <div className="text-gray-300 text-sm">{p.school}</div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div>
                            <div className={`font-semibold text-sm px-2 py-1 rounded ${positionColors[p.position] || 'bg-gray-600'} text-white`}>
                              {p.position}
                            </div>
                            <div className="text-yellow-400 text-sm font-bold mt-1">{p.grade}</div>
                          </div>
                          {hasAnalysis && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedPlayerAnalysis(isExpanded ? null : p.name);
                              }}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </button>
                      {hasAnalysis && isExpanded && (
                        <div className="px-3 pb-3 text-gray-300 text-sm border-t border-white/10 pt-2 mt-1">
                          {(p as any).analysis}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 sticky top-6">
              <h2 className="text-2xl font-bold text-white mb-4">Recent</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {picks.slice().reverse().map((p,i) => (
                  <div key={i} className="bg-green-900/30 p-3 rounded-lg border border-green-500/30 flex items-center gap-2">
                    <img src={teamLogos[p.team]} alt={p.team} className="w-8 h-8 object-contain" />
                    <div>
                      <div className="text-yellow-400 font-bold text-sm">R{p.round}-{p.pick}</div>
                      <div className="text-white font-semibold text-sm">{p.player.name}</div>
                      <div className="text-gray-300 text-xs">{p.team}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NFL Draft Theme Audio */}
        <audio ref={draftAudioRef} src="/nfl-draft-theme.mp3" preload="auto" />
      </div>
    </div>
  );
};

export default NFLMockDraft;