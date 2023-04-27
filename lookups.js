export const phoneTypes = {
    1: {
        type: 'Work',
        isWork: true,
        isPhone: true
    },
    2: {
        type: 'Home',
        isWork: false,
        isPhone: true
    },
    3: {
        type: 'Work 2',
        isWork: true,
        isPhone: true
    },
    4: {
        type: 'Home 2',
        isWork: false,
        isPhone: true
    },
    5: {
        type: 'Work Fax',
        isWork: true,
        isPhone: false
    },
    6: {
        type: 'Home Fax',
        isWork: false,
        isPhone: false
    },
    7: {
        type: 'Cell',
        isWork: false,
        isPhone: true
    },
    8: {
        type: 'Pager',
        isWork: false,
        isPhone: false
    },
    9: {
        type: 'Other',
        isWork: false,
        isPhone: false
    },
    10: {
        type: 'Work Cell',
        isWork: true,
        isPhone: true
    },
    11: {
        type: 'Home Cell',
        isWork: false,
        isPhone: true
    }
};
export const emailTypes = {
    0: {
        type: 'Primary'
    },
    1: {
        type: 'Pay Statement'
    },
    2: {
        type: 'Alert'
    },
    3: {
        type: 'Home'
    },
    4: {
        type: 'Work'
    },
    5: {
        type: 'Tax Slips'
    }
};
export const vacationCodes = {
    0: 'Not Accrued or Paid',
    1: 'Paid Each Period',
    2: 'Accrued',
    3: 'Pay Out Accrued'
};
export const glTypes = {
    'a': 'G/L Account',
    'g': 'G/L Group'
};
