const plans = {
    free: {
        capacity: 10,
        refillRate: 1
    },
    pro: {
        capacity: 100,
        refillRate: 5
    },
    enterprise: {
        capacity: 1000,
        refillRate: 20
    }
};

function getPlan(planName) {
    return plans[planName] || null;
}

function listPlans() {
    return plans;
}

module.exports = {
    getPlan,
    listPlans
};