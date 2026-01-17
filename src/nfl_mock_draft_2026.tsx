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
    'Los Angeles Rams', 'New England Patriots', 'Denver Broncos', 'Seattle Seahawks'
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
    'Miami Dolphins': ['OT', 'EDGE', 'DT', 'LB', 'RB'],
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
    'New England Patriots': ['QB', 'WR', 'OT', 'EDGE', 'CB'],
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
      { name: 'Caleb Downs', position: 'S', school: 'Ohio State', grade: 97, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870706.png', analysis: 'Premium safety prospect with rare range and ball skills. Downs combines elite athleticism with excellent football instincts. His versatility allows him to play both deep safety and in the box, making him scheme-diverse and a potential All-Pro caliber player. NFL Comparison: Derwin James - do-it-all safety with Pro Bowl upside.' },
      { name: 'David Bailey', position: 'EDGE', school: 'Texas Tech', grade: 96.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685248.png', analysis: 'Elite pass rusher with rare blend of speed and power. Bailey showcases exceptional get-off and bend around the edge. His relentless motor and array of pass-rush moves make him a game-changing presence off the edge. NFL Comparison: Myles Garrett - explosive athlete with dominant pass-rush ability.' },
      { name: 'Rueben Bain Jr.', position: 'EDGE', school: 'Miami', grade: 96, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870618.png', analysis: 'Explosive edge defender with natural pass-rush instincts and exceptional athleticism. Bain excels at converting speed to power and shows advanced hand usage for his experience level. Projects as an impact starter from day one. NFL Comparison: Nick Bosa - technically refined with relentless motor.' },
      { name: 'Jordyn Tyson', position: 'WR', school: 'Arizona State', grade: 95.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4880281.png', analysis: 'Dynamic playmaker with elite route-running ability and exceptional ball tracking. Tyson creates separation at all levels and shows strong hands in traffic. His versatility to line up anywhere makes him a matchup nightmare. NFL Comparison: CeeDee Lamb - polished route runner with exceptional playmaking ability.' },
      { name: 'Carnell Tate', position: 'WR', school: 'Ohio State', grade: 95, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871023.png', analysis: 'Smooth receiver with outstanding body control and reliable hands. Tate runs crisp routes and shows excellent awareness in zone coverage. His size-speed combination and competitive nature make him a complete receiver prospect. NFL Comparison: Chris Olave - smooth technician with reliable hands and route precision.' },
      { name: 'Mansoor Delane', position: 'CB', school: 'LSU', grade: 94.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4880124.png', analysis: 'Lockdown corner with excellent length and fluid hips. Delane mirrors receivers in man coverage and shows great anticipation in zone. His physicality at the line and ball skills make him a true CB1 prospect. NFL Comparison: Jalen Ramsey - physical lockdown corner with elite ball skills.' },
      { name: 'Peter Woods', position: 'DT', school: 'Clemson', grade: 94, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871063.png', analysis: 'Dominant interior presence with exceptional strength and quickness. Woods consistently wins one-on-ones and shows the ability to collapse the pocket. His motor never stops and he impacts both run and pass defense. NFL Comparison: Quinnen Williams - disruptive interior force with rare quickness.' },
      { name: 'Jeremiyah Love', position: 'RB', school: 'Notre Dame', grade: 93.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870808.png', analysis: 'Electric runner with home-run speed and excellent vision. Love shows patience behind blockers and burst through gaps. His receiving ability out of the backfield adds another dimension to his game as a true three-down back. NFL Comparison: Jahmyr Gibbs - explosive playmaker with three-down capability.' },
      { name: 'Spencer Fano', position: 'OT', school: 'Utah', grade: 93, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870723.png', analysis: 'Massive tackle with excellent footwork and power at the point of attack. Fano anchors well against bull rushes and shows surprising agility for his size. His technique and consistency make him a safe pick who can start immediately. NFL Comparison: Lane Johnson - athletic mauler with excellent technique.' },
      { name: 'Jermod McCoy', position: 'CB', school: 'Tennessee', grade: 92.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5157289.png', analysis: 'Instinctive cornerback with excellent ball production and tight coverage skills. McCoy shows great anticipation to jump routes and close speed to recover. His aggressive style and playmaking ability make him a valuable asset in any secondary. NFL Comparison: Trevon Diggs - ball-hawking corner with big-play ability.' },
      { name: 'Francis Mauigoa', position: 'OT', school: 'Miami', grade: 92, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870914.png', analysis: 'Athletic tackle with impressive movement skills and strength. Mauigoa excels in pass protection with quick hands and solid technique. His upside is through the roof as he continues to develop his craft and add strength. NFL Comparison: Tristan Wirfs - athletic tackle with elite upside.' },
      { name: 'Makai Lemon', position: 'WR', school: 'USC', grade: 91.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870795.png', analysis: 'Big-bodied receiver with excellent catch radius and contested-catch ability. Lemon uses his size well to box out defenders and makes tough grabs look routine. His red zone presence and physicality add immediate value. NFL Comparison: Mike Evans - physical red zone weapon with strong hands.' },
      { name: 'Avieon Terrell', position: 'CB', school: 'Clemson', grade: 91, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870988.png', analysis: 'Versatile defensive back with elite speed and coverage skills. Terrell shows the ability to match up against any receiver type and excels in press-man coverage. His awareness and ball skills translate to consistent playmaking ability. NFL Comparison: Sauce Gardner - press-man specialist with elite coverage ability.' },
      { name: 'Sonny Styles', position: 'LB', school: 'Ohio State', grade: 90.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081807.png', analysis: 'Versatile defender who can play multiple positions in the secondary and at linebacker. Styles brings physicality and range, excelling against both run and pass. His football intelligence and leadership make him a defensive captain type. NFL Comparison: Isaiah Simmons - positionless defender with rare versatility.' },
      { name: 'Keldric Faulk', position: 'EDGE', school: 'Auburn', grade: 90, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870707.png', analysis: 'Explosive edge rusher with quick first step and violent hands. Faulk shows the ability to win with speed or power and has developed a nice array of counter moves. His relentless effort and motor make him a consistent disruptor. NFL Comparison: Brian Burns - quick-twitch edge with relentless motor.' },
      { name: 'Cashius Howell', position: 'EDGE', school: 'Texas A&M', grade: 89.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4710752.png', analysis: 'Powerful edge defender with exceptional length and strength. Howell sets a strong edge against the run and shows improving pass-rush skills. His high upside and physicality make him an intriguing developmental prospect. NFL Comparison: Montez Sweat - long, athletic edge with developing pass-rush arsenal.' },
      { name: 'Caleb Banks', position: 'DT', school: 'Florida', grade: 89, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4602019.png', analysis: 'Powerful interior lineman with exceptional strength and a non-stop motor. Banks clogs running lanes and pushes the pocket consistently. His size and physicality make him a force in the trenches who can anchor a defensive line. NFL Comparison: Vita Vea - massive run-stuffer with interior power.' },
      { name: 'Kayden McDonald', position: 'DT', school: 'Ohio State', grade: 88.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870893.png', analysis: 'Athletic defensive tackle with quickness off the snap and solid technique. McDonald shows good gap penetration and pursuit. His combination of size and agility makes him a disruptive force in both run and pass defense. NFL Comparison: Dexter Lawrence - athletic interior force with gap penetration.' },
      { name: 'KC Concepcion', position: 'WR', school: 'Texas A&M', grade: 88, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870653.png', analysis: 'Explosive playmaker with exceptional speed and yards-after-catch ability. Concepcion creates separation vertically and shows great hands. His big-play ability and route versatility make him a dangerous weapon at all levels. NFL Comparison: Tyreek Hill - game-breaking speed with big-play ability.' },
      { name: 'Olaivavega Ioane', position: 'OG', school: 'Penn State', grade: 87.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832793.png', analysis: 'Massive guard with road-grading ability in the run game. Ioane shows impressive power at the point of attack and solid anchor in pass protection. His physicality and mean streak make him an ideal interior run blocker. NFL Comparison: Zack Martin - powerful run blocker with elite technique.' },
      { name: 'Akheem Mesidor', position: 'EDGE', school: 'Miami', grade: 87, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4429190.png', analysis: 'Experienced edge rusher with power and relentless effort. Mesidor wins with bull rushes and shows improving pass-rush moves. His consistency and production make him a reliable starter at the next level. NFL Comparison: Josh Sweat - productive edge with power and effort.' },
      { name: 'Denzel Boston', position: 'WR', school: 'Washington', grade: 86.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832800.png', analysis: 'Reliable receiver with excellent hands and route precision. Boston consistently gets open and makes contested catches. His football IQ and dependability make him a trusted target in crucial situations. NFL Comparison: Keenan Allen - reliable possession receiver with great hands.' },
      { name: 'Ty Simpson', position: 'QB', school: 'Alabama', grade: 86, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685522.png', analysis: 'Mobile quarterback with strong arm and good decision-making. Simpson shows poise under pressure and ability to make plays with his legs. His dual-threat capability and leadership traits make him an intriguing developmental QB. NFL Comparison: Jalen Hurts - dual-threat QB with leadership intangibles.' },
      { name: 'Kenyon Sadiq', position: 'TE', school: 'Oregon', grade: 85.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5083315.png', analysis: 'Athletic tight end with excellent receiving skills and soft hands. Sadiq creates mismatches in the passing game and shows solid blocking fundamentals. His versatility and upside make him a modern pass-catching TE prospect. NFL Comparison: David Njoku - athletic receiving TE with upside.' },
      { name: 'Caleb Lomu', position: 'OT', school: 'Utah', grade: 85, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4921438.png', analysis: 'Massive tackle with elite length and strength. Lomu dominates at the point of attack in the run game and shows steady improvement in pass protection. His physical tools and technique make him a high-floor starter. NFL Comparison: Penei Sewell - powerful tackle with elite physical tools.' },
      { name: 'Kadyn Proctor', position: 'OT', school: 'Alabama', grade: 84.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870976.png', analysis: 'Highly-touted tackle with impressive athleticism and footwork. Proctor shows smooth movement in space and solid anchor. His upside is significant as he continues developing his craft at the highest level of competition. NFL Comparison: Evan Neal - high-ceiling tackle with elite traits.' },
      { name: 'CJ Allen', position: 'LB', school: 'Georgia', grade: 84, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870598.png', analysis: 'Instinctive linebacker with excellent gap discipline and tackling ability. Allen reads plays quickly and flows to the ball with urgency. His consistency and football IQ make him a dependable starter at the next level. NFL Comparison: Devin Lloyd - instinctive linebacker with high football IQ.' },
      { name: 'R Mason Thomas', position: 'EDGE', school: 'Oklahoma', grade: 83.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081927.png', analysis: 'Long and athletic edge rusher with high motor and good bend. Thomas shows potential as both a rusher and in coverage. His length and motor make him an intriguing developmental edge defender with starter upside. NFL Comparison: Azeez Ojulari - athletic edge with developing pass-rush moves.' },
      { name: 'Colton Hood', position: 'CB', school: 'Tennessee', grade: 83, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4921249.png', analysis: 'Physical corner with excellent size and press technique. Hood is comfortable in man coverage and shows solid ball skills. His physicality and competitive nature make him a reliable outside corner prospect. NFL Comparison: Carlton Davis - physical press corner with size.' },
      { name: 'Christen Miller', position: 'DT', school: 'Georgia', grade: 82.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685479.png', analysis: 'Powerful defensive tackle with excellent lateral quickness. Miller commands double teams and pursues well sideline-to-sideline. His motor and versatility along the defensive line make him a valuable rotational piece. NFL Comparison: Javon Hargrave - versatile interior defender with motor.' },
      { name: 'Elijah Sarratt', position: 'WR', school: 'Indiana', grade: 82, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5088338.png', analysis: 'Productive receiver with reliable hands and strong route running. Sarratt finds soft spots in zone coverage and makes clutch catches. His consistency and high-level production make him a dependable NFL receiver. NFL Comparison: Adam Thielen - reliable possession receiver with production.' },
      { name: 'Brandon Cisse', position: 'CB', school: 'South Carolina', grade: 81.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5076652.png', analysis: 'Long corner with good speed and press ability. Cisse shows potential in man coverage and has the frame to match up with bigger receivers. His physical tools and improving technique make him a solid developmental corner. NFL Comparison: Tre\'Davious White - long corner with press ability.' },
      { name: 'Anthony Hill Jr.', position: 'LB', school: 'Texas', grade: 81, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870805.png', analysis: 'Athletic linebacker with elite speed and pursuit ability. Hill excels in space and shows potential as a blitzer. His sideline-to-sideline range and athletic upside make him an exciting modern linebacker prospect. NFL Comparison: Jeremiah Owusu-Koramoah - athletic hybrid linebacker.' },
      { name: 'Chris Bell', position: 'WR', school: 'Louisville', grade: 80.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4869961.png', analysis: 'Smooth receiver with excellent body control and adjustment skills. Bell wins at the catch point and shows strong hands. His reliable play and ability to win contested catches make him a solid WR2/3 option. NFL Comparison: Darnell Mooney - smooth route runner with reliable hands.' },
      { name: 'Monroe Freeling', position: 'OT', school: 'Georgia', grade: 80, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870694.png', analysis: 'Well-coached tackle with solid fundamentals and good size. Freeling shows consistent technique and reliable pass protection. His steady play and Georgia pedigree make him a dependable starting tackle prospect. NFL Comparison: Garrett Bolles - technically sound tackle with consistency.' },
      { name: 'Keith Abney II', position: 'CB', school: 'Arizona State', grade: 79.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5093004.png', analysis: 'Quick corner with good ball skills and aggressiveness. Abney plays physical at the catch point and shows solid man-coverage ability. His competitiveness and production make him a quality mid-round corner option. NFL Comparison: Emmanuel Moseley - aggressive corner with ball skills.' },
      { name: 'Germie Bernard', position: 'WR', school: 'Alabama', grade: 79, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685261.png', analysis: 'Explosive slot receiver with excellent quickness and route running. Bernard creates separation from the slot and makes plays after the catch. His versatility and playmaking ability make him a valuable weapon in the passing game. NFL Comparison: Jamison Crowder - versatile slot receiver with quickness.' },
      { name: 'Emmanuel Pregnon', position: 'OG', school: 'Oregon', grade: 78.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4608929.png', analysis: 'Strong interior lineman with good power and technique. Pregnon moves well for his size and anchors in pass protection. His consistency and physicality make him a solid guard prospect who can start early. NFL Comparison: Wyatt Teller - powerful guard with run-blocking strength.' },
      { name: 'A.J. Haulcy', position: 'S', school: 'LSU', grade: 77, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4905664.png', analysis: 'Versatile safety with good range and instincts. Haulcy shows ability to play both deep and in the box effectively. His football IQ and tackling ability make him a reliable safety option at the next level. NFL Comparison: Jayron Kearse - versatile safety with size and range.' },
      { name: 'Chris Johnson', position: 'CB', school: 'San Diego State', grade: 76.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4869579.png', analysis: 'Competitive corner with solid technique and good speed. Johnson shows consistency in coverage and willingness to tackle. His well-rounded game and production make him a quality rotational corner prospect. NFL Comparison: Chidobe Awuzie - solid technical corner with consistency.' },
      { name: 'Zion Young', position: 'EDGE', school: 'Missouri', grade: 76, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4839501.png', analysis: 'Athletic edge defender with length and potential. Young shows flashes of pass-rush ability and solid run defense. His physical tools and motor give him developmental upside as a rotational edge rusher. NFL Comparison: Uchenna Nwosu - athletic edge with developmental upside.' },
      { name: 'Eli Stowers', position: 'TE', school: 'Vanderbilt', grade: 75.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431574.png', analysis: 'Productive tight end with reliable hands and good blocking. Stowers shows versatility as both a receiver and blocker. His well-rounded skill set makes him a solid mid-round TE prospect. NFL Comparison: Tyler Conklin - reliable TE with balanced skill set.' },
      { name: 'Caleb Tiernan', position: 'OT', school: 'Northwestern', grade: 75, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4430901.png', analysis: 'Technically sound tackle with good length and footwork. Tiernan shows consistent fundamentals and steady play. His technique and intelligence make him a developmental tackle with starting potential. NFL Comparison: Matt Peart - technically sound developmental tackle.' },
      { name: 'Jonah Coleman', position: 'RB', school: 'Washington', grade: 74.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4430875.png', analysis: 'Versatile running back with good vision and receiving ability. Coleman shows patience and ability to create after contact. His well-rounded skill set makes him a quality backup with three-down potential. NFL Comparison: Devin Singletary - patient runner with receiving ability.' },
      { name: 'Dillon Thieneman', position: 'S', school: 'Oregon', grade: 74, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4954445.png', analysis: 'Hard-hitting safety with good instincts and tackling ability. Thieneman shows range in coverage and physicality near the line. His versatility and aggressive style make him a valuable safety prospect. NFL Comparison: Vonn Bell - hard-hitting safety with physicality.' },
      { name: 'LT Overton', position: 'EDGE', school: 'Alabama', grade: 73.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685725.png', analysis: 'Strong edge defender with power and effort. Overton sets a solid edge and shows improving pass-rush skills. His motor and physicality make him a developmental edge prospect with rotational value. NFL Comparison: Charles Omenihu - developmental edge with power.' },
      // Additional prospects (ranks 51+)
      { name: 'Trevor Goosby', position: 'OT', school: 'Texas', grade: 73, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4918430.png', analysis: 'Experienced tackle with good size and solid fundamentals. Goosby shows consistency in pass protection and improving run blocking. His technique and football IQ make him a reliable backup tackle. NFL Comparison: Cam Robinson - solid starter with consistency.' },
      { name: 'T.J. Parker', position: 'LB', school: 'Clemson', grade: 72.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870886.png', analysis: 'Athletic linebacker with good range and solid tackling. Parker shows ability to cover ground and make plays in space. His Clemson pedigree and fundamentals make him a quality rotational linebacker. NFL Comparison: Shaq Thompson - athletic linebacker with coverage ability.' },
      { name: 'Harold Perkins Jr.', position: 'LB', school: 'LSU', grade: 72, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685502.png', analysis: 'Explosive linebacker with elite athleticism and blitzing ability. Perkins shows burst off the edge and can make plays all over the field. His versatility and playmaking make him an exciting linebacker prospect. NFL Comparison: Devin White - explosive athletic linebacker with blitz ability.' },
      { name: 'Taurean York', position: 'LB', school: 'Texas A&M', grade: 71.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4917859.png', analysis: 'Physical linebacker with strong tackling and run-stopping ability. York excels near the line of scrimmage and shows improving coverage skills. His toughness makes him a valuable two-down linebacker. NFL Comparison: Josey Jewell - physical thumper with run-stopping ability.' },
      { name: 'Ja\'Kobi Lane', position: 'WR', school: 'USC', grade: 71, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870847.png', analysis: 'Elusive receiver with excellent quickness and route running from the slot. Lane creates separation quickly and makes plays after the catch. His agility makes him a dangerous weapon in space. NFL Comparison: Jakobi Meyers - crafty slot receiver with separation quickness.' },
      { name: 'Austin Barber', position: 'OT', school: 'Florida', grade: 70.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4597310.png', analysis: 'Long tackle with good athleticism and developing technique. Barber shows potential in pass protection and continues to add strength. His physical tools give him developmental upside. NFL Comparison: Kaleb McGary - athletic tackle with developing technique.' },
      { name: 'Matayo Uiagalelei', position: 'EDGE', school: 'Oregon', grade: 70, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4871052.png', analysis: 'Powerful edge rusher with excellent size and strength. Uiagalelei wins with power and shows improving pass-rush technique. His physicality makes him a valuable run defender and developing pass rusher. NFL Comparison: Chauncey Golston - powerful edge with size and strength.' },
      { name: 'Davison Igbinosun', position: 'CB', school: 'Ohio State', grade: 69.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4832035.png', analysis: 'Versatile defensive back with good size and coverage skills. Igbinosun shows consistency in man coverage and solid ball skills. His reliability makes him a quality depth corner. NFL Comparison: Rock Ya-Sin - versatile corner with solid technique.' },
      { name: 'Tyreak Sapp', position: 'DT', school: 'Florida', grade: 69, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4889957.png', analysis: 'Strong interior defender with good power and motor. Sapp clogs lanes and shows effort as a pass rusher. His strength makes him a valuable rotational defensive tackle. NFL Comparison: Jonathan Hankins - powerful run-stuffer with size.' },
      { name: 'Malik Muhammad', position: 'CB', school: 'Texas', grade: 68.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870953.png', analysis: 'Quick corner with good anticipation and ball skills. Muhammad shows solid technique in coverage and willingness to tackle. His competitiveness makes him a reliable depth corner. NFL Comparison: Tre Flowers - athletic corner with size and length.' },
      { name: 'Jake Golday', position: 'LB', school: 'Cincinnati', grade: 68, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4877652.png', analysis: 'Productive linebacker with excellent instincts and tackling ability. Golday reads plays well and flows to the ball consistently. His high production and football IQ make him a valuable backup. NFL Comparison: Nick Vigil - instinctive linebacker with production.' },
      { name: 'Emmanuel McNeil-Warren', position: 'S', school: 'Toledo', grade: 67.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4837186.png', analysis: 'Versatile safety with good ball skills and coverage ability. McNeil-Warren shows range in the deep third and can play near the line. His playmaking ability makes him an intriguing developmental safety. NFL Comparison: Tre Boston - versatile safety with ball skills.' },
      { name: 'Max Klare', position: 'TE', school: 'Ohio State', grade: 67, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4833029.png', analysis: 'Big-bodied tight end with reliable hands and solid blocking. Klare shows ability as a red zone target and improving route running. His size makes him a useful H-back type. NFL Comparison: Harrison Bryant - reliable receiving TE with size.' },
      { name: 'Lee Hunter', position: 'DT', school: 'Texas Tech', grade: 66.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4431551.png', analysis: 'Powerful defensive tackle with good strength and motor. Hunter occupies blockers and shows effort in pursuit. His size and power make him a rotational run defender. NFL Comparison: P.J. Hall - powerful interior defender with motor.' },
      { name: 'Logan Jones', position: 'C', school: 'Iowa', grade: 66, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4686907.png', analysis: 'Smart center with excellent technique and consistency. Jones shows solid fundamentals and good snap accuracy. His football IQ and Iowa pedigree make him a reliable backup center. NFL Comparison: J.C. Tretter - technically sound center with smarts.' },
      { name: 'Zxavian Harris', position: 'DT', school: 'Ole Miss', grade: 65.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685365.png', analysis: 'Quick defensive tackle with good penetration ability. Harris shows burst off the snap and effort in pursuit. His quickness makes him a disruptive interior rotational piece. NFL Comparison: Derrick Nnadi - quick interior defender with penetration.' },
      { name: 'Connor Lew', position: 'C', school: 'Auburn', grade: 65, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870866.png', analysis: 'Tough center with good strength and competitive nature. Lew shows solid blocking fundamentals and leadership. His toughness makes him a quality backup center. NFL Comparison: Bradley Bozeman - tough, competitive center.' },
      { name: 'Domani Jackson', position: 'CB', school: 'Alabama', grade: 64.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685402.png', analysis: 'Athletic corner with good length and coverage potential. Jackson shows flashes of press ability and solid speed. His physical traits give him developmental upside as a corner. NFL Comparison: Greg Stroman - athletic corner with developmental traits.' },
      { name: 'Jake Slaughter', position: 'C', school: 'Florida', grade: 64, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4682506.png', analysis: 'Experienced center with solid technique and consistency. Slaughter shows good snap mechanics and blocking fundamentals. His reliability makes him a solid backup center option. NFL Comparison: Ethan Pocic - reliable backup center with experience.' },
      { name: 'John Mateer', position: 'QB', school: 'Oklahoma', grade: 63.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4915980.png', analysis: 'Dual-threat quarterback with good mobility and playmaking ability. Mateer shows ability to extend plays with his legs and decent arm strength. His athleticism gives him developmental QB2 potential. NFL Comparison: Tyler Huntley - mobile backup QB with playmaking ability.' },
      { name: 'Drew Allar', position: 'QB', school: 'Penn State', grade: 63, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4714771.png', analysis: 'Big-armed quarterback with good size and pocket presence. Allar shows ability to make tight-window throws and solid decision-making. His arm talent and pedigree give him developmental QB potential. NFL Comparison: Sam Darnold - talented QB with developmental potential.' },
      { name: 'Carter Smith', position: 'OT', school: 'Indiana', grade: 62.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4819239.png', analysis: 'Solid tackle with good length and improving technique. Smith shows consistency in pass protection and solid fundamentals. His steady play makes him a developmental tackle option. NFL Comparison: Jamarco Jones - reliable backup tackle with fundamentals.' },
      { name: 'Michael Taaffe', position: 'S', school: 'Texas', grade: 62, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4880346.png', analysis: 'Physical safety with good tackling ability and run support. Taaffe shows toughness near the line and developing coverage skills. His physicality makes him a valuable special teams contributor. NFL Comparison: Deon Bush - physical safety with special teams value.' },
      { name: 'Eric Singleton Jr.', position: 'WR', school: 'Auburn', grade: 61.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5095360.png', analysis: 'Speedy receiver with good vertical ability and route running. Singleton shows ability to stretch the field and make plays downfield. His speed makes him a vertical threat. NFL Comparison: John Ross - speed receiver with vertical ability.' },
      { name: 'Austin Siereveld', position: 'OT', school: 'Ohio State', grade: 61, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4917984.png', analysis: 'Developing tackle with good size and improving fundamentals. Siereveld shows potential in pass protection and continues to develop. His Ohio State coaching gives him developmental potential. NFL Comparison: Thayer Munford - developmental tackle with size.' },
      { name: 'Kaytron Allen', position: 'RB', school: 'Penn State', grade: 60.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685246.png', analysis: 'Physical runner with good power and contact balance. Allen shows ability to run between the tackles and solid hands. His physicality makes him a valuable short-yardage back. NFL Comparison: Damien Harris - physical downhill runner.' },
      { name: 'Chris Brazzell II', position: 'WR', school: 'Tennessee', grade: 60, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5091739.png', analysis: 'Big receiver with good size and developing route running. Brazzell shows ability to win contested catches and solid hands. His size makes him a red zone option. NFL Comparison: Josh Palmer - big receiver with developing skills.' },
      { name: 'Antonio Williams', position: 'WR', school: 'Clemson', grade: 59.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/5081432.png', analysis: 'Athletic receiver with good speed and route running ability. Williams shows ability to create separation and make plays. His athleticism makes him an intriguing developmental receiver. NFL Comparison: Laviska Shenault - athletic playmaker with versatility.' },
      { name: 'Garrett Nussmeier', position: 'QB', school: 'LSU', grade: 59, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4567747.png', analysis: 'Experienced quarterback with good arm strength and leadership. Nussmeier shows ability to make throws and manage the game. His experience makes him a solid developmental QB. NFL Comparison: Will Grier - experienced college QB with arm talent.' },
      { name: 'Carson Beck', position: 'QB', school: 'Miami', grade: 58.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4430841.png', analysis: 'Veteran quarterback with good size and pocket awareness. Beck shows experience reading defenses and solid arm talent. His veteran presence makes him a backup QB option. NFL Comparison: Jake Fromm - experienced QB with game management skills.' },
      { name: 'Jadarian Price', position: 'RB', school: 'Notre Dame', grade: 58, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685512.png', analysis: 'Explosive runner with good speed and elusiveness. Price shows ability to hit holes quickly and make defenders miss. His burst makes him a change-of-pace back. NFL Comparison: Nyheim Hines - elusive speedster with receiving ability.' },
      { name: 'Zachariah Branch', position: 'WR', school: 'Georgia', grade: 57.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4870612.png', analysis: 'Dynamic playmaker with excellent speed and return ability. Branch shows big-play potential as a receiver and returner. His explosiveness makes him a special teams weapon. NFL Comparison: Mecole Hardman - speed weapon with return value.' },
      { name: 'Kamari Ramsey', position: 'S', school: 'USC', grade: 57, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685518.png', analysis: 'Athletic safety with good range and ball skills. Ramsey shows ability to cover ground and make plays on the ball. His athleticism makes him a developmental safety. NFL Comparison: Terrell Burgess - athletic safety with coverage ability.' },
      { name: 'A\'Mauri Washington', position: 'DT', school: 'Oregon', grade: 56.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4899488.png', analysis: 'Big defensive tackle with good size and power. Washington shows ability to occupy blockers and clog running lanes. His size makes him a valuable rotational nose tackle. NFL Comparison: Daniel Ekuale - big-bodied rotational nose tackle.' },
      { name: 'Quincy Rhodes Jr.', position: 'EDGE', school: 'Arkansas', grade: 56, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4918136.png', analysis: 'Athletic edge rusher with good speed and developing moves. Rhodes shows ability to bend and hustle to the ball. His motor makes him a rotational pass rusher. NFL Comparison: Wyatt Hubert - developmental edge with motor.' },
      { name: 'LaNorris Sellers', position: 'QB', school: 'South Carolina', grade: 55.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4875127.png', analysis: 'Athletic quarterback with good mobility and arm strength. Sellers shows ability to make plays with his legs and developing accuracy. His dual-threat ability makes him a developmental project. NFL Comparison: Malik Willis - athletic project QB with tools.' },
      { name: 'Domonique Orange', position: 'DT', school: 'Iowa State', grade: 55, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4698728.png', analysis: 'Strong interior defender with good power and effort. Orange shows ability to push the pocket and pursue. His strength makes him a rotational interior defender. NFL Comparison: Grady Jarrett - undersized interior force with power.' },
      { name: 'Jaishawn Barham', position: 'LB', school: 'Michigan', grade: 54.5, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4685266.png', analysis: 'Versatile linebacker with good athleticism and football IQ. Barham shows ability to play multiple positions and special teams value. His versatility makes him a valuable depth piece. NFL Comparison: Curtis Bolton - versatile backup linebacker.' },
      { name: 'Michael Trigg', position: 'TE', school: 'Baylor', grade: 54, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4594749.png', analysis: 'Athletic tight end with good hands and route running. Trigg shows ability to create separation and make plays. His receiving ability makes him a developmental pass-catching TE. NFL Comparison: Ian Thomas - athletic receiving tight end.' },
      { name: 'Deion Burks', position: 'WR', school: 'Oklahoma', grade: 54, headshot: 'https://a.espncdn.com/i/headshots/college-football/players/full/4683151.png', analysis: 'Big receiver with good size and contested-catch ability. Burks shows solid hands and improving route running. His size makes him a developmental red zone target. NFL Comparison: Allen Lazard - big-bodied possession receiver.' },
      { name: 'Derrick Moore', position: 'EDGE', school: 'Michigan', grade: 53, analysis: 'Physical edge rusher with good power and motor. Moore shows ability to set the edge and developing pass-rush moves. His effort and toughness make him a developmental rotational edge. NFL Comparison: Austin Bryant - developmental edge with physicality.' },
      { name: 'Zane Durant', position: 'DT', school: 'Penn State', grade: 53, analysis: 'Solid defensive tackle with good strength and fundamentals. Durant shows ability to hold the point and pursue. His Penn State coaching makes him a reliable backup interior defender. NFL Comparison: Tyler Lancaster - solid backup interior defender.' },
      { name: 'Darrell Jackson Jr.', position: 'DT', school: 'Florida State', grade: 52, analysis: 'Powerful interior defender with good size and strength. Jackson shows ability to clog lanes and occupy blockers. His power makes him a rotational run-stuffer. NFL Comparison: Corey Liuget - powerful rotational interior presence.' },
      { name: 'Josiah Trotter', position: 'LB', school: 'Missouri', grade: 52, analysis: 'Instinctive linebacker with good football IQ and tackling. Trotter shows solid fundamentals and understanding of the game. His intelligence makes him a valuable backup linebacker. NFL Comparison: Joe Schobert - smart backup linebacker with fundamentals.' },
      { name: 'Dontay Corleone', position: 'DT', school: 'Cincinnati', grade: 51, analysis: 'Physical nose tackle with good power and toughness. Corleone shows ability to anchor and clog the middle. His strength makes him a developmental nose tackle. NFL Comparison: Eli Ankou - powerful backup nose tackle.' },
      { name: 'Anthony Lucas', position: 'DT', school: 'USC', grade: 51, analysis: 'Athletic interior defender with good quickness and motor. Lucas shows ability to penetrate gaps and pursue. His athleticism makes him an intriguing developmental tackle. NFL Comparison: Matt Ioannidis - athletic interior defender with upside.' },
      { name: 'Jeremiah Cobb', position: 'RB', school: 'Auburn', grade: 50, analysis: 'Versatile running back with good hands and vision. Cobb shows ability to contribute on third down and as a receiver. His versatility makes him a valuable depth running back. NFL Comparison: Boston Scott - versatile change-of-pace back.' },
      { name: 'Mikail Kamara', position: 'EDGE', school: 'Indiana', grade: 50, analysis: 'Developing edge rusher with good length and athleticism. Kamara shows flashes of pass-rush ability and motor. His physical tools give him developmental upside. NFL Comparison: Quinton Bell - developmental edge with tools.' },
      { name: 'Tacario Davis', position: 'CB', school: 'Washington', grade: 49, analysis: 'Quick corner with good ball skills and competitiveness. Davis shows solid technique in coverage and willingness to tackle. His competitive nature makes him a depth corner option. NFL Comparison: Torry McTyer - developmental corner with competitiveness.' },
      { name: 'Jack Endries', position: 'TE', school: 'Texas', grade: 49, analysis: 'Big tight end with good hands and developing blocking. Endries shows ability to be a red zone target and improving route running. His size makes him a developmental H-back type. NFL Comparison: Eric Saubert - big-bodied backup tight end.' },
      { name: 'Jyaire Hill', position: 'CB', school: 'Michigan', grade: 48 },
      { name: 'Julian Neal', position: 'CB', school: 'Arkansas', grade: 48 },
      // Ranks 101-150
      { name: 'Kenyatta Jackson Jr.', position: 'EDGE', school: 'Ohio State', grade: 47 },
      { name: 'DeMonte Capehart', position: 'DT', school: 'Clemson', grade: 47 },
      { name: 'Bray Hubbard', position: 'S', school: 'Alabama', grade: 46 },
      { name: 'Caden Curry', position: 'EDGE', school: 'Ohio State', grade: 46 },
      { name: 'Patrick Payton', position: 'EDGE', school: 'LSU', grade: 45 },
      { name: 'Devin Moore', position: 'CB', school: 'Florida', grade: 45 },
      { name: 'Rayshaun Benny', position: 'DT', school: 'Michigan', grade: 44 },
      { name: 'Lander Barton', position: 'LB', school: 'Utah', grade: 44 },
      { name: 'James Smith', position: 'DT', school: 'Alabama', grade: 43 },
      { name: 'Amare Ferrell', position: 'S', school: 'Indiana', grade: 43 },
      { name: 'Omar Cooper Jr.', position: 'WR', school: 'Indiana', grade: 42 },
      { name: 'Tim Keenan III', position: 'DT', school: 'Alabama', grade: 42 },
      { name: 'Kevin Coleman Jr.', position: 'WR', school: 'Missouri', grade: 41 },
      { name: 'Brian Parker II', position: 'OT', school: 'Duke', grade: 41 },
      { name: 'Max Llewellyn', position: 'EDGE', school: 'Iowa', grade: 40 },
      { name: 'Cade Klubnik', position: 'QB', school: 'Clemson', grade: 40 },
      { name: 'Isaac Smith', position: 'S', school: 'Mississippi State', grade: 39 },
      { name: 'Nick Singleton', position: 'RB', school: 'Penn State', grade: 39 },
      { name: 'Rod Moore', position: 'S', school: 'Michigan', grade: 38 },
      { name: 'Raylen Wilson', position: 'LB', school: 'Georgia', grade: 38 },
      { name: 'Demond Claiborne', position: 'RB', school: 'Wake Forest', grade: 37 },
      { name: 'Chase Bisontis', position: 'OG', school: 'Texas A&M', grade: 37 },
      { name: 'Chandler Rivers', position: 'CB', school: 'Duke', grade: 36 },
      { name: 'Malachi Fields', position: 'WR', school: 'Notre Dame', grade: 36 },
      { name: 'Jacob Rodriguez', position: 'LB', school: 'Texas Tech', grade: 35 },
      { name: 'Ar\'Maj Reed-Adams', position: 'OG', school: 'Texas A&M', grade: 35 },
      { name: 'T.J. Hall', position: 'CB', school: 'Iowa', grade: 34 },
      { name: 'Blake Miller', position: 'OT', school: 'Clemson', grade: 34 },
      { name: 'T.J. Guy', position: 'EDGE', school: 'Michigan', grade: 33 },
      { name: 'Kage Casey', position: 'OT', school: 'Boise State', grade: 33 },
      { name: 'Parker Brailsford', position: 'C', school: 'Alabama', grade: 32 },
      { name: 'Aaron Anderson', position: 'WR', school: 'LSU', grade: 32 },
      { name: 'Beau Stephens', position: 'OG', school: 'Iowa', grade: 31 },
      { name: 'Jalen Huskey', position: 'S', school: 'Maryland', grade: 31 },
      { name: 'Bishop Fitzgerald', position: 'S', school: 'USC', grade: 30 },
      { name: 'Earnest Greene III', position: 'OT', school: 'Georgia', grade: 30 },
      { name: 'Trey Moore', position: 'EDGE', school: 'Texas', grade: 29 },
      { name: 'Boubacar Traore', position: 'EDGE', school: 'Notre Dame', grade: 29 },
      { name: 'Oscar Delp', position: 'TE', school: 'Georgia', grade: 28 },
      { name: 'D.J. Campbell', position: 'OG', school: 'Texas', grade: 28 },
      { name: 'Jude Bowry', position: 'OT', school: 'Boston College', grade: 27 },
      { name: 'Josh Moten', position: 'CB', school: 'Southern Miss', grade: 27 },
      { name: 'Eric Rivers', position: 'WR', school: 'Georgia Tech', grade: 26 },
      { name: 'Emmett Johnson', position: 'RB', school: 'Nebraska', grade: 26 },
      { name: 'Kelby Collins', position: 'DT', school: 'Alabama', grade: 25 },
      { name: 'Drew Shelton', position: 'OT', school: 'Penn State', grade: 25 },
      { name: 'Jermaine Mathews Jr.', position: 'CB', school: 'Ohio State', grade: 24 },
      { name: 'Josh Thompson', position: 'OG', school: 'LSU', grade: 24 },
      { name: 'Dae\'Quan Wright', position: 'TE', school: 'Ole Miss', grade: 23 },
      { name: 'Albert Regis', position: 'DT', school: 'Texas A&M', grade: 23 },
      // Ranks 151-200
      { name: 'J\'Mari Taylor', position: 'RB', school: 'Virginia', grade: 22 },
      { name: 'J.C. Davis', position: 'OT', school: 'Illinois', grade: 22 },
      { name: 'Aaron Graves', position: 'DT', school: 'Iowa', grade: 21 },
      { name: 'Jimmy Rolder', position: 'LB', school: 'Michigan', grade: 21 },
      { name: 'Jaeden Roberts', position: 'OG', school: 'Alabama', grade: 20 },
      { name: 'DeShon Singleton', position: 'S', school: 'Nebraska', grade: 20 },
      { name: 'Wendell Moe Jr.', position: 'OG', school: 'Tennessee', grade: 19 },
      { name: 'Lawson Luckie', position: 'TE', school: 'Georgia', grade: 19 },
      { name: 'Peyton Bowen', position: 'S', school: 'Oklahoma', grade: 18 },
      { name: 'Isaiah Sategna III', position: 'WR', school: 'Oklahoma', grade: 18 },
      { name: 'Will Lee III', position: 'CB', school: 'Texas A&M', grade: 17 },
      { name: 'Tyrique Tucker', position: 'DT', school: 'Indiana', grade: 17 },
      { name: 'Alex Harkey', position: 'OT', school: 'Oregon', grade: 16 },
      { name: 'Le\'Veon Moss', position: 'RB', school: 'Texas A&M', grade: 16 },
      { name: 'Bryce Boettcher', position: 'LB', school: 'Oregon', grade: 15 },
      { name: 'Taylen Green', position: 'QB', school: 'Arkansas', grade: 15 },
      { name: 'Hank Beatty', position: 'WR', school: 'Illinois', grade: 14 },
      { name: 'Louis Moore', position: 'S', school: 'Indiana', grade: 14 },
      { name: 'Trey Zuhn III', position: 'OT', school: 'Texas A&M', grade: 13 },
      { name: 'Keionte Scott', position: 'S', school: 'Miami', grade: 13 },
      { name: 'Aiden Fisher', position: 'LB', school: 'Indiana', grade: 12 },
      { name: 'Collin Wright', position: 'CB', school: 'Stanford', grade: 12 },
      { name: 'Ted Hurst', position: 'WR', school: 'Georgia State', grade: 11 },
      { name: 'P.J. Williams', position: 'OT', school: 'SMU', grade: 11 },
      { name: 'Xavier Scott', position: 'CB', school: 'Illinois', grade: 10 },
      { name: 'Chase Roberts', position: 'WR', school: 'BYU', grade: 10 },
      { name: 'Eric O\'Neill', position: 'EDGE', school: 'Rutgers', grade: 9 },
      { name: 'Roman Hemby', position: 'RB', school: 'Indiana', grade: 9 },
      { name: 'Kahlil Benson', position: 'OT', school: 'Indiana', grade: 8 },
      { name: 'Justin Joly', position: 'TE', school: 'NC State', grade: 8 },
      { name: 'Stephen Daley', position: 'EDGE', school: 'Indiana', grade: 7 },
      { name: 'Thaddeus Dixon', position: 'CB', school: 'North Carolina', grade: 7 },
      { name: 'Riley Nowakowski', position: 'TE', school: 'Indiana', grade: 6 },
      { name: 'Hezekiah Masses', position: 'CB', school: 'California', grade: 6 },
      { name: 'Kelley Jones', position: 'CB', school: 'Mississippi State', grade: 5 },
      { name: 'Trinidad Chambliss', position: 'QB', school: 'Ole Miss', grade: 5 },
      { name: 'Peter Clarke', position: 'TE', school: 'Temple', grade: 52 },
      { name: 'Isaiah Smith', position: 'EDGE', school: 'SMU', grade: 52 },
      { name: 'Skyler Bell', position: 'WR', school: 'Connecticut', grade: 50 },
      { name: 'Nadame Tucker', position: 'EDGE', school: 'Western Michigan', grade: 50 },
      { name: 'Keanu Tanuvasa', position: 'DT', school: 'BYU', grade: 48 },
      { name: 'Ephesians Prysock', position: 'CB', school: 'Washington', grade: 48 },
      { name: 'O\'Mega Blake', position: 'WR', school: 'Arkansas', grade: 50 },
      // Ranks 201-250
      { name: 'Josh Cameron', position: 'WR', school: 'Baylor', grade: 45 },
      { name: 'Joe Royer', position: 'TE', school: 'Cincinnati', grade: 45 },
      { name: 'Sawyer Robertson', position: 'QB', school: 'Baylor', grade: 45 },
      { name: 'Niki Prongos', position: 'OT', school: 'Stanford', grade: 45 },
      { name: 'Ernest Hausmann', position: 'LB', school: 'Michigan', grade: 45 },
      { name: 'Bryce Foster', position: 'C', school: 'Kansas', grade: 45 },
      { name: 'Kyle Louis', position: 'LB', school: 'Pittsburgh', grade: 45 },
      { name: 'C.J. Daniels', position: 'WR', school: 'Miami', grade: 45 },
      { name: 'V.J. Payne', position: 'S', school: 'Kansas State', grade: 45 },
      { name: 'Jam Miller', position: 'RB', school: 'Alabama', grade: 45 },
      { name: 'Matt Gulbin', position: 'C', school: 'Michigan State', grade: 45 },
      { name: 'Keylan Rutledge', position: 'OG', school: 'Georgia Tech', grade: 45 },
      { name: 'DeAndre Moore Jr.', position: 'WR', school: 'Texas', grade: 45 },
      { name: 'Rodrick Pleasant', position: 'CB', school: 'UCLA', grade: 45 },
      { name: 'Darius Taylor', position: 'RB', school: 'Minnesota', grade: 45 },
      { name: 'Xavier Nwankpa', position: 'S', school: 'Iowa', grade: 45 },
      { name: 'Terion Stewart', position: 'RB', school: 'Virginia Tech', grade: 45 },
      { name: 'Keyron Crawford', position: 'EDGE', school: 'Auburn', grade: 45 },
      { name: 'Keagen Trost', position: 'OT', school: 'Missouri', grade: 45 },
      { name: 'Colbie Young', position: 'WR', school: 'Georgia', grade: 45 },
      { name: 'Christian Gray', position: 'CB', school: 'Notre Dame', grade: 45 },
      { name: 'Justin Jefferson', position: 'LB', school: 'Alabama', grade: 45 },
      { name: 'Isaiah Horton', position: 'WR', school: 'Alabama', grade: 45 },
      { name: 'Ethan Burke', position: 'DT', school: 'Texas', grade: 45 },
      { name: 'Evan Stewart', position: 'WR', school: 'Oregon', grade: 45 },
      { name: 'Connor Tollison', position: 'C', school: 'Missouri', grade: 45 },
      { name: 'Max Iheanachor', position: 'OT', school: 'Arizona State', grade: 45 },
      { name: 'Deven Eastern', position: 'DT', school: 'Minnesota', grade: 45 },
      { name: 'Noah Whittington', position: 'RB', school: 'Oregon', grade: 45 },
      { name: 'Zakee Wheatley', position: 'S', school: 'Penn State', grade: 45 },
      { name: 'Tanner Koziol', position: 'TE', school: 'Houston', grade: 45 },
      { name: 'Bryan Thomas Jr.', position: 'EDGE', school: 'South Carolina', grade: 45 },
      { name: 'Jakobe Thomas', position: 'S', school: 'Miami', grade: 45 },
      { name: 'Cam\'Ron Stewart', position: 'EDGE', school: 'Temple', grade: 45 },
      { name: 'Chris McClellan', position: 'DT', school: 'Missouri', grade: 45 },
      { name: 'Skyler Gill-Howard', position: 'DT', school: 'Texas Tech', grade: 45 },
      { name: 'Jalen Catalon', position: 'S', school: 'Missouri', grade: 45 },
      { name: 'Kaleb Proctor', position: 'DT', school: 'SE Louisiana', grade: 45 },
      { name: 'Harrison Wallace III', position: 'WR', school: 'Ole Miss', grade: 45 },
      { name: 'Cameron Ball', position: 'DT', school: 'Arkansas', grade: 45 },
      { name: 'Josh Gesky', position: 'OG', school: 'Illinois', grade: 45 },
      { name: 'Diego Pavia', position: 'QB', school: 'Vanderbilt', grade: 45 },
      { name: 'Carson Hinzman', position: 'C', school: 'Ohio State', grade: 45 },
      { name: 'Barion Brown', position: 'WR', school: 'LSU', grade: 45 },
      { name: 'Pat Coogan', position: 'C', school: 'Indiana', grade: 45 },
      { name: 'Bryson Washington', position: 'RB', school: 'Baylor', grade: 45 },
      { name: 'Keyshaun Elliott', position: 'LB', school: 'Arizona State', grade: 45 },
      { name: 'Anez Cooper', position: 'OG', school: 'Miami', grade: 45 },
      { name: 'West Weeks', position: 'LB', school: 'LSU', grade: 45 },
      { name: 'Genesis Smith', position: 'S', school: 'Arizona State', grade: 45 },
      // Ranks 251-300
      { name: 'Charles Demmings', position: 'CB', school: 'Stephen F Austin', grade: 45 },
      { name: 'Will Whitson', position: 'EDGE', school: 'Mississippi State', grade: 45 },
      { name: 'Jalon Kilgore', position: 'S', school: 'South Carolina', grade: 45 },
      { name: 'Kendal Daniels', position: 'S', school: 'Oklahoma', grade: 45 },
      { name: 'Bud Clark', position: 'S', school: 'TCU', grade: 45 },
      { name: 'Logan Fano', position: 'EDGE', school: 'Utah', grade: 45 },
      { name: 'Red Murdock', position: 'LB', school: 'Buffalo', grade: 45 },
      { name: 'Brandon Cleveland', position: 'DT', school: 'NC State', grade: 45 },
      { name: 'Terry Moore', position: 'S', school: 'Duke', grade: 45 },
      { name: 'Brent Austin', position: 'CB', school: 'Cal', grade: 45 },
      { name: 'Dametrious Crownover', position: 'OT', school: 'Texas A&M', grade: 45 },
      { name: 'Wesley Williams', position: 'EDGE', school: 'Duke', grade: 45 },
      { name: 'Jadon Canady', position: 'CB', school: 'Oregon', grade: 45 },
      { name: 'Gary Smith III', position: 'DT', school: 'UCLA', grade: 45 },
      { name: 'Rahsul Faison', position: 'RB', school: 'South Carolina', grade: 45 },
      { name: 'Marques White', position: 'EDGE', school: 'UMass', grade: 45 },
      { name: 'Desmond Purnell', position: 'LB', school: 'Kansas State', grade: 45 },
      { name: 'Kwabena Asamoah', position: 'OG', school: 'Rutgers', grade: 45 },
      { name: 'Ahmari Harvey', position: 'CB', school: 'Georgia Tech', grade: 45 },
      { name: 'Sam Roush', position: 'TE', school: 'Stanford', grade: 45 },
      { name: 'Cyrus Allen', position: 'WR', school: 'Cincinnati', grade: 45 },
      { name: 'Drew Bobo', position: 'C', school: 'Georgia', grade: 45 },
      { name: 'Mike Washington Jr.', position: 'RB', school: 'Arkansas', grade: 45 },
      { name: 'Reggie Virgil', position: 'WR', school: 'Texas Tech', grade: 45 },
      { name: 'Drayk Bowen', position: 'LB', school: 'Notre Dame', grade: 45 },
      { name: 'Namdi Obiazor', position: 'LB', school: 'TCU', grade: 45 },
      { name: 'Sam Hecht', position: 'C', school: 'Kansas State', grade: 45 },
      { name: 'Tyler Onyedim', position: 'DT', school: 'Texas A&M', grade: 45 },
      { name: 'Jaren Kump', position: 'C', school: 'Utah', grade: 45 },
      { name: 'Nate Boerkircher', position: 'TE', school: 'Texas A&M', grade: 45 },
      { name: 'Kemari Copeland', position: 'DT', school: 'Virginia Tech', grade: 45 },
      { name: 'Logan Taylor', position: 'OG', school: 'Boston College', grade: 45 },
      { name: 'Damari Brown', position: 'CB', school: 'Miami', grade: 45 },
      { name: 'Ryan Baer', position: 'OT', school: 'Pittsburgh', grade: 45 },
      { name: 'Malik Spencer', position: 'S', school: 'Michigan State', grade: 45 },
      { name: 'George Gumbs', position: 'EDGE', school: 'Florida', grade: 45 },
      { name: 'Bryson Eason', position: 'DT', school: 'Tennessee', grade: 45 },
      { name: 'Gracen Halton', position: 'DT', school: 'Oklahoma', grade: 45 },
      { name: 'Enrique Cruz Jr.', position: 'OT', school: 'Kansas', grade: 45 },
      { name: 'Diego Pounds', position: 'OT', school: 'Ole Miss', grade: 45 },
      { name: 'Adam Randall', position: 'RB', school: 'Clemson', grade: 45 },
      { name: 'Nick Dawkins', position: 'C', school: 'Penn State', grade: 45 },
      { name: 'Owen Heinecke', position: 'LB', school: 'Oklahoma', grade: 45 },
      { name: 'Luke Montgomery', position: 'OG', school: 'Ohio State', grade: 45 },
      { name: 'James Thompson Jr.', position: 'DT', school: 'Illinois', grade: 45 },
      { name: 'Kody Huisman', position: 'DT', school: 'Virginia Tech', grade: 45 },
      { name: 'Preston Zachman', position: 'S', school: 'Wisconsin', grade: 45 },
      { name: 'Miller Moss', position: 'QB', school: 'Louisville', grade: 45 },
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
  const formatPickDisplay = (round: number, year: number, team?: string, actualPickNum?: number) => {
    if (year === 2026 && actualPickNum !== undefined) {
      // For 2026 with actual pick number, show it
      return team ? `Pick #${actualPickNum + 1} (from ${team})` : `Pick #${actualPickNum + 1}`;
    } else if (year === 2026 && team) {
      // For 2026 with team, calculate pick number based on team's draft position
      const teamPosition = getTeamDraftPosition(team);
      const pickNum = (round - 1) * 32 + teamPosition;
      return `Pick #${pickNum + 1} (from ${team})`;
    } else if (year === 2026) {
      // For 2026, show year and round when we don't have exact pick or team
      return `2026 R${round}`;
    } else {
      // For future years, show year and round
      return team ? `${year} R${round} (from ${team})` : `${year} R${round}`;
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
  const [speed, setSpeed] = useState('medium');
  const [myTeams, setMyTeams] = useState<string[]>([]);
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
  const [showCustomTrade, setShowCustomTrade] = useState(false);
  const [customTradeTeam, setCustomTradeTeam] = useState<string | null>(null);
  const [customTradeGive, setCustomTradeGive] = useState<DraftPick[]>([]);
  const [customTradeReceive, setCustomTradeReceive] = useState<DraftPick[]>([]);
  const [positionFilter, setPositionFilter] = useState<string>('All');
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

  // Check if a team has a compelling reason to trade up (high-grade player filling a need)
  const teamWantsToTradeUp = (team: string, currentPickNum: number) => {
    const teamNeeds = getTeamNeeds(team);
    const teamPickPosition = initialDraftOrder.indexOf(team);
    const picksBetween = teamPickPosition - (currentPickNum % 32);

    if (picksBetween <= 0) return { wants: false, targetPlayer: null };

    // Look for a player that:
    // 1. Has grade 85+ (elite prospect)
    // 2. Fills a top-3 need for the team
    // 3. Likely won't be available at their pick
    const topAvailable = available.slice(0, Math.min(picksBetween + 3, available.length));

    for (const player of topAvailable) {
      const needIndex = teamNeeds.indexOf(player.position);
      const isTopNeed = needIndex >= 0 && needIndex <= 2;
      const isElite = player.grade >= 85;

      // The earlier the player is in available, the less likely they'll last
      const playerRank = available.indexOf(player);
      const likelyGone = playerRank < picksBetween;

      if (isElite && isTopNeed && likelyGone) {
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
      return wants;
    });

    if (motivatedBuyers.length === 0) return null;

    // Pick a random motivated buyer
    const buyerTeam = motivatedBuyers[Math.floor(Math.random() * motivatedBuyers.length)];
    const buyerPickPosition = initialDraftOrder.indexOf(buyerTeam);
    const buyerPickNum = currentRound * 32 + buyerPickPosition;

    // Calculate what they'd give up
    const currentValue = getPickValue(currentPickNum + 1);
    const buyerValue = getPickValue(buyerPickNum + 1);

    // They need to offer more value
    const extraPicksNeeded = Math.ceil((currentValue - buyerValue) / getPickValue(Math.min(buyerPickNum + 32, rounds * 32)));

    if (extraPicksNeeded <= 0 || extraPicksNeeded > 3) return null;

    // Generate future picks to include
    const futurePicks: string[] = [];
    for (let i = 0; i < extraPicksNeeded; i++) {
      const futureRound = currentRound + 2 + i;
      if (futureRound <= rounds) {
        // Calculate actual pick number for this round based on buyer's position
        const estimatedPickNum = (futureRound - 1) * 32 + buyerPickPosition;
        futurePicks.push(formatPickDisplay(futureRound, 2026, buyerTeam, estimatedPickNum));
      } else {
        futurePicks.push(formatPickDisplay(i + 2, 2027, buyerTeam));
      }
    }

    return {
      fromTeam: buyerTeam,
      toTeam: currentTeamName,
      pickGiven: currentPickNum,
      pickReceived: buyerPickNum,
      additionalPicks: futurePicks,
      forUser
    };
  };

  const shouldTradingHappen = (pickNum: number, currentTradesThisRound: number) => {
    const pickInCurrentRound = pickNum % 32;

    // Target 2-5 trades per round (randomly chosen at start of each round)
    // Average will be around 3.5 trades per round
    const targetTrades = pickInCurrentRound === 0
      ? Math.floor(Math.random() * 4) + 2  // Random number between 2-5
      : 4;  // Use max if we're mid-round (will be capped by tradesNeeded)

    const remainingPicks = 32 - pickInCurrentRound;
    const tradesNeeded = Math.max(2, targetTrades) - currentTradesThisRound;

    // Don't stop trades until we hit at least the minimum
    if (currentTradesThisRound >= 5 || remainingPicks < 3) return false;

    // Probability increases as we need more trades with fewer picks left
    // Higher base probability to ensure we hit 2-5 trades per round
    const baseProbability = 0.15;  // 15% base chance
    const urgencyMultiplier = currentTradesThisRound < 2 ? 1.5 : 1.0;  // Higher chance if we haven't hit 2 yet
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
    if (pick === 0 && available.some(p => p.name === 'Fernando Mendoza')) {
      if (Math.random() < 0.97) return available.find(p => p.name === 'Fernando Mendoza');
    }

    const needs = getTeamNeeds(team);
    const pickInDraft = pick + 1; // Overall pick number (1-224)

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
      let score = p.grade;

      // Add positional value bonus
      score += positionalValue[p.position] || 0;

      // Need bonus - reduced for early picks to favor BPA
      const needIdx = needs.indexOf(p.position);
      if (needIdx !== -1) {
        // Early picks (top 5) care less about need
        const needWeight = pickInDraft <= 5 ? 0.5 : pickInDraft <= 15 ? 0.75 : 1.0;
        score += (5 - needIdx) * 3 * needWeight;
      }

      return { player: p, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // More randomness for early picks (top 10)
    const randomRange = pickInDraft <= 10 ? Math.min(5, scored.length) : Math.min(3, scored.length);
    return scored[Math.floor(Math.random() * randomRange)].player;
  };

  const makePick = (player: any) => {
    const newPick = { round, pick: pickInRound, team: currentTeam, player };
    setPicks([...picks, newPick]);
    setRecentPicks([newPick, ...recentPicks].slice(0, 3));
    setAvailable(available.filter(p => p.name !== player.name));
    setPendingTradeOffer(null);

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
    // DON'T jump to the new pick - let the draft continue normally
    // The draft order has been updated, so when it reaches the traded pick position,
    // the user will be picking there. Continue from current position.
  };

  const declineTrade = () => {
    setPendingTradeOffer(null);
  };

  const generateTradeDownOptions = () => {
    const currentRound = Math.floor(pick / 32);
    const myPickPosition = pick % 32;
    const options: any[] = [];

    // Find teams AFTER us that we could trade down to
    for (let i = myPickPosition + 1; i < 32; i++) {
      const targetTeam = draftOrder[i];
      if (myTeams.includes(targetTeam)) continue; // Can't trade with ourselves

      const targetPickNum = currentRound * 32 + i;
      const myPickNum = pick;

      const myValue = getPickValue(myPickNum + 1);
      const targetValue = getPickValue(targetPickNum + 1);

      // Calculate what we'd receive (they give us extra picks)
      const extraPicksReceived = Math.ceil((myValue - targetValue) / getPickValue(Math.min(targetPickNum + 32, rounds * 32)));

      if (extraPicksReceived > 3 || extraPicksReceived < 1) continue;

      const futurePicks: string[] = [];
      for (let j = 0; j < extraPicksReceived; j++) {
        const futureRound = currentRound + 2 + j;
        if (futureRound <= rounds) {
          // Calculate actual pick number for this round (estimate mid-round for their pick)
          const estimatedPickNum = (futureRound - 1) * 32 + (i); // Use their position in round
          futurePicks.push(formatPickDisplay(futureRound, 2026, undefined, estimatedPickNum));
        } else {
          futurePicks.push(formatPickDisplay(j + 2, 2027));
        }
      }

      const option = {
        targetTeam,
        targetPickNum,
        targetPickInRound: i + 1,
        myPickNum,
        additionalPicks: futurePicks,
        // AI acceptance probability - they want to move up!
        acceptChance: Math.min(0.85, 0.6 + (extraPicksReceived * 0.1))
      };
      console.log('Trade DOWN option created:', option);
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
    for (let i = currentPickInRound; i < 32; i++) {
      const targetTeam = draftOrder[i];
      if (myTeams.includes(targetTeam)) continue;

      const targetPickNum = currentRound * 32 + i;
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

          options.push({
            targetTeam,
            targetPickNum,
            targetPickInRound: i + 1,
            userPickNum,
            userPickInRound: userNextPickPos + 1,
            additionalPicks: futurePicks,
            useFuturePicks: false,
            acceptChance: Math.min(0.8, 0.4 + (extraPicksNeeded * 0.15))
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
          options.push({
            targetTeam,
            targetPickNum,
            targetPickInRound: i + 1,
            userPickNum: null,
            userPickInRound: null,
            additionalPicks: picksToOffer,
            useFuturePicks: true,
            acceptChance: Math.min(0.6, 0.3 + (picksToOffer.length * 0.1))
          });
        }
      }
    }

    return options;
  };

  const offerTradeDown = (option: any) => {
    if (Math.random() < option.acceptChance) {
      const userTeam = myTeams[0] || currentTeam;

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
    if (Math.random() < option.acceptChance) {
      const userTeam = myTeams[0];

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
    setSelectedCounterPicks([]);
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
    if (!counterOffer || selectedCounterPicks.length === 0) return;

    // Calculate if counter offer is reasonable (70% chance they accept if value is close)
    const acceptChance = Math.min(0.7, 0.3 + (selectedCounterPicks.length * 0.15));

    if (Math.random() < acceptChance) {
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
      setPick(counterOffer.theyGive);
    } else {
      alert(`${counterOffer.targetTeam} rejected your counter offer.`);
      setCounterOffer(null);
      setSelectedCounterPicks([]);
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

    // AI accepts if they're getting good value (or at least close)
    const valueRatio = giveValue / Math.max(receiveValue, 1);
    const acceptChance = valueRatio >= 1.0 ? 0.9 : valueRatio >= 0.8 ? 0.6 : valueRatio >= 0.6 ? 0.3 : 0.1;

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
      // Generate trade offer for user when it's their pick
      if (!pendingTradeOffer && Math.random() < 0.3) {
        const offer = generateTradeOffer(currentPick, currentTeamNow, true);
        if (offer) {
          setPendingTradeOffer(offer);
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
                <label className="text-white text-lg font-semibold mb-3 block">Teams ({myTeams.length}) - Listed by 1st Pick</label>
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
                    { team: 'New England Patriots', pick: 30, round: 1 },
                    { team: 'Denver Broncos', pick: 31, round: 1 },
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
        <audio ref={draftAudioRef} src="/nfl-draft-theme.mp3" preload="auto" volume="1.0" />
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

        {isMyPick && !pendingTradeOffer && !showTradeUp && !showCustomTrade && (
          <div className="mb-4 flex gap-3">
            <button
              onClick={() => openTradeMenu('down')}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold flex items-center gap-2"
            >
              <ArrowRightLeft className="w-5 h-5" />
              Trade Down
            </button>
            <button
              onClick={openCustomTrade}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold flex items-center gap-2"
            >
              <ArrowRightLeft className="w-5 h-5" />
              Custom Trade
            </button>
          </div>
        )}

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
                  {tradeMode === 'up' ? 'Trade Up Options' : 'Trade Down Options'}
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
            <div className="flex items-center gap-3 mb-4">
              <ArrowRightLeft className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-purple-200">Trade Offer!</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-white text-lg mb-2">
                <span className="font-bold text-purple-300">{pendingTradeOffer.fromTeam}</span> wants to trade up
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">You give:</p>
                  <p className="text-white font-semibold">Pick #{pendingTradeOffer.pickGiven + 1} (current)</p>
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
            <div className="flex gap-3">
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

            <div className="flex gap-3">
              <button
                onClick={submitCounterOffer}
                disabled={selectedCounterPicks.length === 0}
                className={`flex-1 py-3 rounded-lg font-bold ${selectedCounterPicks.length > 0 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
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
                {[...new Set(draftOrder)].filter(t => !myTeams.includes(t)).map(team => (
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
                          {formatPickDisplay(p.round, p.year, p.fromTeam)}
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
                          {formatPickDisplay(p.round, p.year, p.fromTeam)}
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