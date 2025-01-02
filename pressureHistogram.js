// Takes a week number as input and returns a hsitorgram (an array of intergers)
const { DateTime } = dv.luxon
const begin = DateTime.fromString("Nov 1, 2024", "LLL d, yyyy")
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
	return buckets
}

function row(i) {
	return [i, ...getWeeklyHistogram(i)]
}

function drawHistogram() {
	let nWeeks = Math.ceil(DateTime.now().diff(begin, 'days').days / 7)
	let weeks = []
	for (let i = 0; i < nWeeks; i++) {
		weeks.push(i + 1)
	}
    dv.table(
        ["Week #", "< 110", "< 115", "< 120", "< 125", "< 130", "< 135", "< 140", "< 145", "< 150", "< 155", "< 160", "Gt 160"], 
		weeks.map((i) => row(i))
	)
}

drawHistogram()
