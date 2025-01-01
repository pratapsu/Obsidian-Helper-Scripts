// Takes a week number as input and returns a hsitorgram (an array of intergers)
function getWeeklyHistogram(wkNum) {
	const { DateTime } = dv.luxon
	const offset = 7*(wkNum - 1)
	const begin = DateTime.fromString("Nov 1, 2024", "LLL d, yyyy").plus({days: offset})
	const end = begin.plus({days: 7});
	let p = dv.pages('"Health"')
		.filter(q => ((begin <= q.file.ctime) && (q.file.ctime <= end)))

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
    dv.table(
        ["Week #", "< 110", "< 115", "< 120", "< 125", "< 130", "< 135", "< 140", "< 145", "< 150", "< 155", "< 160", "Gt 160"], 
   		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => row(i))
	)
}

drawHistogram()
