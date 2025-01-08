// Takes a week number as input and returns a hsitorgram (an array of intergers)
const { DateTime } = dv.luxon
const begin = DateTime.fromString("Nov 1, 2024", "LLL d, yyyy")
let sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function getWeeklyHistogram(wkNum) {
	const offset = 7*(wkNum - 1)
	const beginInWeek = begin.plus({days: offset})
	const endInWeek = beginInWeek.plus({days: 7});
	let p = dv.pages('"Health"')
		.filter(q => ((beginInWeek <= q.file.ctime) && (q.file.ctime <= endInWeek)))

	let buckets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	p.forEach((page) => {
		if (page.systolic == null) {
			return;
		}
		buckets = buckets.map((num, index) => {
			if (index == 0) {
				num += page.systolic.reduce((numInRange, curr) => {
						return numInRange + (curr < 110)
					}, 0)
			} else if (index == 11) {
				num += page.systolic.reduce((numInRange, curr) => {
						let low = 110 + (index - 1)*5;
						return numInRange + (low <= curr)
					}, 0)
			} else {
				num += page.systolic.reduce((numInRange, curr) => {
						let low = 110 + (index - 1)*5;
						return numInRange + ((low <= curr) && (curr < (low + 5)))
					}, 0)
			}
			return num
		})		
	})
	sums = sums.map((v, i) => buckets[i] + v)
	let max = Math.max(...buckets)
	return buckets.map((v) => {
		if (v == 0) {
			return ""
		} else if (v == max) {
			return "**" + String(v) + "**"
		} else {
			return String(v)
		}
	})
}

function drawHistogram() {
	let nWeeks = Math.ceil(DateTime.now().diff(begin, 'days').days / 7)
	let weeks = []
	for (let i = 0; i < nWeeks; i++) {
		weeks.push(i + 1)
	}
	let rows = weeks.map((i) => [i, ...getWeeklyHistogram(i)])
	rows.push(["Total", ...sums])
    dv.table(
        ["Week #", "< 110", "< 115", "< 120", "< 125", "< 130", "< 135", "< 140", "< 145", "< 150", "< 155", "< 160", "Gt 160"], 
		rows
	)
}

drawHistogram()
