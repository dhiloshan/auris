import majorScales from '@/lib/major-scales.json'
import minorScales from '@/lib/minor-scales.json'

export function getMajorKey() {
    let randomScale = Math.ceil(Math.random() * 5)
    let data = majorScales.sharpKeys[randomScale];
    return data;
}

