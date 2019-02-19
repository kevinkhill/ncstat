const CATEGORIES = {
  MOTION: {
    'G00': 'RAPID',
    'G01': 'LINEAR',
    'G02': 'CW_ARC',
    'G03': 'CCW_ARC',
    'G04': 'DWELL',
    'G05': 'NON-MODAL_RAPID',
    'G09': 'EXACT_STOP_CHECK',
  }
}

_.forEach(MOTION, (code, action) => {
  G_CODES[code] = {
    ACTION: action,
    CATEGORY: 'MOTION'
  }
})

const G_CODES = {
  'G00': {
    DESC: 'RAPID',
    CATEGORY: 'MOTION'
  },
  'G01':  {
    DESC: 'LINEAR',
    CATEGORY: 'MOTION'
  },
  'G02':  {
    DESC: 'CW_ARC',
    CATEGORY: 'MOTION'
  },
  'G03':  {
    DESC: 'CCW_ARC',
    CATEGORY: 'MOTION'
  },
  'G04':  {
    DESC: 'DWELL',
    CATEGORY: 'MOTION'
  },
  'G05': {
    DESC: 'NON-MODAL_RAPID',
    CATEGORY: 'MOTION'
  },
  'G09': {
    DESC: 'EXACT_STOP_CHECK',
    CATEGORY: 'MOTION'
  },

  'G80': {
    DESC: 'CANCEL_CANNED_CYCLE',
    CATEGORY: 'CANNED'
  },
  'G81':  {
    DESC: 'DRILL_NO_PECK_CANNED_CYCLE',
    CATEGORY: 'CANNED'
  },
  'G82': {
    DESC: 'DRILL_NO_PECK_WITH_DWELL',
    CATEGORY: 'CANNED'
  },
  'G83': {
    DESC: 'DRILL_WITH_PECK',
    CATEGORY: 'CANNED'
  },
  'G84': {
    DESC: 'TAPPING',
    CATEGORY: 'CANNED'
  },
  'G85': {
    DESC: 'REAMING', CATEGORY 'CANNED'
  },
  'G86': '',
  'G87': '',
  G73: 'DRILL_CHIP_BREAK'
}

module.exports = G_CODES