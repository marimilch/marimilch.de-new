export function wave(t){
    if (t < 0) return 0
    return 1 / (Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2) * Math.sin(25 * x)
}