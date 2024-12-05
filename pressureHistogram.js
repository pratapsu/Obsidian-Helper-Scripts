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


function drawHistogram() {
    let buckets1 = getWeeklyHistogram(1)
    let buckets2 = getWeeklyHistogram(2)
    let buckets3 = getWeeklyHistogram(3)
    let buckets4 = getWeeklyHistogram(4)
    let buckets5 = getWeeklyHistogram(5)

    dv.table(
	    ["Week #", "< 110", "< 115", "< 120", "< 125", "< 130", "< 135", "< 140", "< 145", "< 150", "< 155", "< 160", "Gt 160"], 
    	[
    		// ["11/1 - 11/7", buckets1[0], buckets1[1], buckets1[2], buckets1[3], buckets1[4], buckets1[5], buckets1[6], buckets1[7], buckets1[8], buckets1[9], buckets1[10], buckets1[11]],
			// ["11/8 - 11/14", buckets2[0], buckets2[1], buckets2[2], buckets2[3], buckets2[4], buckets2[5], buckets2[6], buckets2[7], buckets2[8], buckets2[9], buckets2[10], buckets2[11]],
    		// ["11/15 - 11/21", buckets3[0], buckets3[1], buckets3[2], buckets3[3], buckets3[4], buckets3[5], buckets3[6], buckets3[7], buckets3[8], buckets3[9], buckets3[10], buckets3[11]],
    		// ["11/22 - 11/28", buckets4[0], buckets4[1], buckets4[2], buckets4[3], buckets4[4], buckets4[5], buckets4[6], buckets4[7], buckets4[8], buckets4[9], buckets4[10], buckets4[11]],		
    		// ["11/29 - 12/5", buckets5[0], buckets5[1], buckets5[2], buckets5[3], buckets5[4], buckets5[5], buckets5[6], buckets5[7], buckets5[8], buckets5[9], buckets5[10], buckets5[11]]		
			// ["11/1 - 11/7", ...buckets1], 
			["11/1 -- 11/7", ...getWeeklyHistogram(1)],
			["11/8 - 11/14", ...getWeeklyHistogram(2)],
			["11/15 - 11/21", ...getWeeklyHistogram(3)], 
			["11/22 - 11/28", ...getWeeklyHistogram(4)],
			["11/29 - 12/5", ...getWeeklyHistogram(5)]
		]
    )
}

drawHistogram()

