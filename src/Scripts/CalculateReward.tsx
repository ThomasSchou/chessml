export function CalculateReward(state: any[]) {
    let reward = 0
    for (let index = 0; index < state.length; index++) {
        reward += state[index]
        }
    if(!state.find(v => v === 6)) {
        reward -= 20
    } else if (!state.find(v => v === 6)) {
        reward += 20
    }
    console.log("reward: " + reward)
    return reward
}