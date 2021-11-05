const convertNum = (num: number): string => (num > 0 && num < 10 ? `0${num}` : `${num}`);

export const createUserCode = (): string =>{
	const t = new Date()

    const yyyy = t.getFullYear()
    const mm = t.getMonth() + 1
    const dd = t.getDate()
    const h = t.getHours()
    const m = t.getMinutes()
    const s = t.getSeconds()
    
    return `${convertNum(yyyy)}${convertNum(mm)}${convertNum(dd)}${convertNum(h)}${convertNum(m)}${convertNum(s)}`
}